
-- =========================================================
-- ENUMS
-- =========================================================
create type public.app_role as enum ('customer', 'editor', 'super_admin');
create type public.order_status as enum ('pending','confirmed','handmade','shipping','completed','cancelled');
create type public.payment_status as enum ('unpaid','paid','refunded');
create type public.ticket_status as enum ('open','in_progress','resolved','closed');

-- =========================================================
-- PROFILES
-- =========================================================
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  blocked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Users read own profile" on public.profiles for select to authenticated using (auth.uid() = user_id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = user_id);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = user_id);

-- =========================================================
-- USER ROLES (separate table; no recursion)
-- =========================================================
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.is_staff(_user_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role in ('editor','super_admin')) $$;

-- Auto-create profile + assign customer role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), new.email);
  insert into public.user_roles (user_id, role) values (new.id, 'customer');
  return new;
end; $$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger trg_profiles_updated before update on public.profiles for each row execute function public.set_updated_at();

-- =========================================================
-- CATALOG: categories, collections, products, product_images
-- =========================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text
);
grant select on public.categories to anon, authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "Public read categories" on public.categories for select using (true);
create policy "Staff manage categories" on public.categories for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text
);
grant select on public.collections to anon, authenticated;
grant all on public.collections to service_role;
alter table public.collections enable row level security;
create policy "Public read collections" on public.collections for select using (true);
create policy "Staff manage collections" on public.collections for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  product_story text,
  price numeric(12,2) not null,
  stock_quantity int not null default 0,
  category_id uuid references public.categories(id) on delete set null,
  collection_id uuid references public.collections(id) on delete set null,
  material text,
  image_url text,
  active boolean not null default true,
  featured boolean not null default false,
  rating numeric(2,1) default 5.0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "Public read active products" on public.products for select using (active = true);
create policy "Staff manage products" on public.products for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));
create trigger trg_products_updated before update on public.products for each row execute function public.set_updated_at();

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0
);
grant select on public.product_images to anon, authenticated;
grant all on public.product_images to service_role;
alter table public.product_images enable row level security;
create policy "Public read product images" on public.product_images for select using (true);
create policy "Staff manage product images" on public.product_images for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- =========================================================
-- CHARMS
-- =========================================================
create table public.charm_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text
);
grant select on public.charm_categories to anon, authenticated;
grant all on public.charm_categories to service_role;
alter table public.charm_categories enable row level security;
create policy "Public read charm categories" on public.charm_categories for select using (true);
create policy "Staff manage charm categories" on public.charm_categories for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create table public.charms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references public.charm_categories(id) on delete set null,
  material text,
  color text,
  image_url text,
  price numeric(12,2) not null default 0,
  stock_quantity int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.charms to anon, authenticated;
grant all on public.charms to service_role;
alter table public.charms enable row level security;
create policy "Public read charms" on public.charms for select using (active = true);
create policy "Staff manage charms" on public.charms for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create table public.bracelet_materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text,
  image_url text,
  base_price numeric(12,2) not null default 0,
  active boolean not null default true
);
grant select on public.bracelet_materials to anon, authenticated;
grant all on public.bracelet_materials to service_role;
alter table public.bracelet_materials enable row level security;
create policy "Public read materials" on public.bracelet_materials for select using (active = true);
create policy "Staff manage materials" on public.bracelet_materials for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create table public.bracelet_sizes (
  id uuid primary key default gen_random_uuid(),
  size_name text not null,
  wrist_cm numeric(4,1) not null,
  description text
);
grant select on public.bracelet_sizes to anon, authenticated;
grant all on public.bracelet_sizes to service_role;
alter table public.bracelet_sizes enable row level security;
create policy "Public read sizes" on public.bracelet_sizes for select using (true);
create policy "Staff manage sizes" on public.bracelet_sizes for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- =========================================================
-- CUSTOM DESIGNS (saved bracelet customizations)
-- =========================================================
create table public.custom_designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  base_material_id uuid references public.bracelet_materials(id),
  size_id uuid references public.bracelet_sizes(id),
  cord_color text,
  personal_note text,
  preview_image_url text,
  total_price numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.custom_designs to authenticated;
grant all on public.custom_designs to service_role;
alter table public.custom_designs enable row level security;
create policy "Users own custom designs" on public.custom_designs for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Staff read custom designs" on public.custom_designs for select to authenticated
  using (public.is_staff(auth.uid()));

create table public.custom_design_charms (
  id uuid primary key default gen_random_uuid(),
  custom_design_id uuid not null references public.custom_designs(id) on delete cascade,
  charm_id uuid not null references public.charms(id),
  quantity int not null default 1,
  position_index int not null default 0,
  price_at_time numeric(12,2) not null default 0
);
grant select, insert, update, delete on public.custom_design_charms to authenticated;
grant all on public.custom_design_charms to service_role;
alter table public.custom_design_charms enable row level security;
create policy "Users own design charms" on public.custom_design_charms for all to authenticated
  using (exists (select 1 from public.custom_designs d where d.id = custom_design_id and d.user_id = auth.uid()))
  with check (exists (select 1 from public.custom_designs d where d.id = custom_design_id and d.user_id = auth.uid()));
create policy "Staff read design charms" on public.custom_design_charms for select to authenticated
  using (public.is_staff(auth.uid()));

-- =========================================================
-- CART
-- =========================================================
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  customization_id uuid references public.custom_designs(id) on delete cascade,
  quantity int not null default 1,
  unit_price numeric(12,2) not null,
  created_at timestamptz not null default now(),
  check (product_id is not null or customization_id is not null)
);
grant select, insert, update, delete on public.cart_items to authenticated;
grant all on public.cart_items to service_role;
alter table public.cart_items enable row level security;
create policy "Users own cart" on public.cart_items for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================
-- COUPONS
-- =========================================================
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percent','amount')),
  discount_value numeric(12,2) not null,
  usage_limit int,
  used_count int not null default 0,
  expires_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.coupons to authenticated;
grant all on public.coupons to service_role;
alter table public.coupons enable row level security;
create policy "Authenticated read active coupons" on public.coupons for select to authenticated
  using (active = true);
create policy "Staff manage coupons" on public.coupons for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- =========================================================
-- ORDERS
-- =========================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_code text not null unique default ('PF-' || to_char(now(),'YYMMDD') || '-' || upper(substr(md5(random()::text),1,6))),
  customer_name text not null,
  phone text not null,
  email text not null,
  shipping_address text not null,
  subtotal numeric(12,2) not null,
  discount_amount numeric(12,2) not null default 0,
  shipping_fee numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null,
  payment_method text not null,
  payment_status public.payment_status not null default 'unpaid',
  order_status public.order_status not null default 'pending',
  tracking_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "Users read own orders" on public.orders for select to authenticated
  using (auth.uid() = user_id or public.is_staff(auth.uid()));
create policy "Users insert own orders" on public.orders for insert to authenticated
  with check (auth.uid() = user_id);
create policy "Staff update orders" on public.orders for update to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));
create trigger trg_orders_updated before update on public.orders for each row execute function public.set_updated_at();

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  custom_design_id uuid references public.custom_designs(id),
  item_name text not null,
  item_details jsonb,
  quantity int not null,
  unit_price numeric(12,2) not null,
  subtotal numeric(12,2) not null
);
grant select, insert on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "Users read own order items" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_staff(auth.uid()))));
create policy "Users insert own order items" on public.order_items for insert to authenticated
  with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- =========================================================
-- SUPPORT TICKETS
-- =========================================================
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status public.ticket_status not null default 'open',
  admin_reply text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert on public.support_tickets to authenticated;
grant insert on public.support_tickets to anon;
grant all on public.support_tickets to service_role;
alter table public.support_tickets enable row level security;
create policy "Anyone create ticket" on public.support_tickets for insert to anon, authenticated with check (true);
create policy "Users read own tickets" on public.support_tickets for select to authenticated
  using (auth.uid() = user_id or public.is_staff(auth.uid()));
create policy "Staff update tickets" on public.support_tickets for update to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- =========================================================
-- TESTIMONIALS + FAQ
-- =========================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  content text not null,
  rating int not null default 5,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon, authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "Public read testimonials" on public.testimonials for select using (active = true);
create policy "Staff manage testimonials" on public.testimonials for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  active boolean not null default true,
  sort_order int not null default 0
);
grant select on public.faq_items to anon, authenticated;
grant all on public.faq_items to service_role;
alter table public.faq_items enable row level security;
create policy "Public read faq" on public.faq_items for select using (active = true);
create policy "Staff manage faq" on public.faq_items for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- =========================================================
-- SEED DATA
-- =========================================================
insert into public.categories (name, slug, description) values
  ('Vòng tay','vong-tay','Bracelets thủ công'),
  ('Charm Sen','charm-sen','Lotus charms'),
  ('Dây chuyền','day-chuyen','Necklaces'),
  ('Nhẫn','nhan','Rings');

insert into public.collections (name, slug, description) values
  ('Sắc Sen Hồng','sac-sen-hong','Lotus pink heritage collection'),
  ('Ngọc Trai Sông','ngoc-trai-song','Freshwater pearls collection'),
  ('Ký Ức Bạc','ky-uc-bac','Silver memory collection'),
  ('Chế Tác Riêng','che-tac-rieng','Custom personalized collection');

insert into public.charm_categories (name, description) values
  ('Hoa Sen','Lotus motif charms'),
  ('Ngọc & Đá','Pearls and gemstones'),
  ('Chữ Cái','Letter charms'),
  ('Biểu Tượng','Symbol charms');

-- 12 products
with c as (select id, slug from public.categories), col as (select id, slug from public.collections)
insert into public.products (name, slug, description, product_story, price, stock_quantity, category_id, collection_id, material, featured, image_url)
select * from (values
  ('Vòng Tay Liên Hoa Vàng','vong-tay-lien-hoa-vang','Vòng tay bạc 925 mạ vàng với charm sen','Lấy cảm hứng từ đóa sen vươn mình giữa hồ sớm mai.', 1250000, 20, (select id from c where slug='vong-tay'), (select id from col where slug='sac-sen-hong'), 'Bạc 925 mạ vàng', true, null),
  ('Charm Sen Hồng Tráng Men','charm-sen-hong-trang-men','Charm sen hồng kỹ thuật men nóng','Sắc hồng dịu nhẹ của cánh sen Hồ Tây vào lúc bình minh.', 890000, 35, (select id from c where slug='charm-sen'), (select id from col where slug='sac-sen-hong'), 'Bạc tráng men', true, null),
  ('Vòng Tay Diệp Liên Trai','vong-tay-diep-lien-trai','Vòng tay ngọc trai tự nhiên','Mỗi viên ngọc kể một câu chuyện riêng từ lòng sông mẹ.', 1550000, 15, (select id from c where slug='vong-tay'), (select id from col where slug='ngoc-trai-song'), 'Ngọc trai nước ngọt', true, null),
  ('Vòng Tay Tên Riêng','vong-tay-ten-rieng','Vòng tay khắc tên cá nhân hóa','Mang theo tên người thương trên cổ tay mỗi ngày.', 1100000, 50, (select id from c where slug='vong-tay'), (select id from col where slug='che-tac-rieng'), 'Bạc 925', true, null),
  ('Nụ Sen Thanh Khiết','nu-sen-thanh-khiet','Charm nụ sen bạc tinh xảo','Sự khởi đầu — như một lời chúc dịu dàng.', 1200000, 25, (select id from c where slug='charm-sen'), (select id from col where slug='ky-uc-bac'), 'Bạc 925', false, null),
  ('Lá Sen Vàng Khắc Họa','la-sen-vang-khac-hoa','Charm lá sen vàng 18K khắc tay','Chi tiết khắc tay thủ công của nghệ nhân Huế.', 2500000, 8, (select id from c where slug='charm-sen'), (select id from col where slug='sac-sen-hong'), 'Vàng 18K', true, null),
  ('Đóa Sen Mãn Khai','doa-sen-man-khai','Charm sen nở rộ','Vẻ đẹp viên mãn của một hành trình.', 1850000, 12, (select id from c where slug='charm-sen'), (select id from col where slug='sac-sen-hong'), 'Bạc mạ vàng', false, null),
  ('Đài Sen Ngọc Bích','dai-sen-ngoc-bich','Charm đài sen kết ngọc bích','Ngọc bích — biểu tượng của bình an.', 3200000, 6, (select id from c where slug='charm-sen'), (select id from col where slug='ky-uc-bac'), 'Bạc 925 & ngọc bích', false, null),
  ('Dây Chuyền Cánh Sen','day-chuyen-canh-sen','Dây chuyền mảnh với mặt cánh sen','Một cánh sen rơi nhẹ trên xương đòn.', 2890000, 10, (select id from c where slug='day-chuyen'), (select id from col where slug='sac-sen-hong'), 'Vàng 18K', false, null),
  ('Nhẫn Tịnh Khôi','nhan-tinh-khoi','Nhẫn bạc khắc hoa sen','Sự thuần khiết trong từng đường nét tối giản.', 890000, 40, (select id from c where slug='nhan'), (select id from col where slug='ky-uc-bac'), 'Bạc 925', false, null),
  ('Vòng Ngọc Liên Hoa','vong-ngoc-lien-hoa','Vòng tay đá ngọc kết hoa sen','Bộ ba ngọc trai — pha lê — hoa sen.', 3450000, 5, (select id from c where slug='vong-tay'), (select id from col where slug='ngoc-trai-song'), 'Ngọc trai & pha lê', false, null),
  ('Vòng Tay Sen Nguyệt','vong-tay-sen-nguyet','Vòng tay sen ánh trăng','Ánh trăng phản chiếu trên hồ sen tĩnh.', 1450000, 18, (select id from c where slug='vong-tay'), (select id from col where slug='ky-uc-bac'), 'Bạc 925 mạ rhodium', false, null)
) as t(name, slug, description, product_story, price, stock_quantity, category_id, collection_id, material, featured, image_url);

-- Bracelet materials
insert into public.bracelet_materials (name, color, base_price) values
  ('Dây lụa cao cấp','#F0E6D7', 250000),
  ('Dây bạc 925','#D9D9D9', 650000),
  ('Dây vàng 18K','#C5A059', 1500000),
  ('Dây cotton sáp','#7A5544', 180000),
  ('Dây ngọc trai','#FAF7F2', 850000);

-- Bracelet sizes
insert into public.bracelet_sizes (size_name, wrist_cm, description) values
  ('XS', 14.0, 'Cổ tay nhỏ'),
  ('S', 15.5, 'Tiêu chuẩn nữ'),
  ('M', 17.0, 'Phổ thông'),
  ('L', 18.5, 'Cổ tay lớn'),
  ('Tùy chỉnh', 16.0, 'Đo theo yêu cầu');

-- 24 charms
with cc as (select id, name from public.charm_categories)
insert into public.charms (name, category_id, material, color, price, stock_quantity)
select * from (values
  ('Sen Hồng Mini',(select id from cc where name='Hoa Sen'),'Bạc tráng men','#E8B4B8', 180000, 80),
  ('Sen Vàng Mini',(select id from cc where name='Hoa Sen'),'Bạc mạ vàng','#C5A059', 220000, 70),
  ('Sen Bạc Mini',(select id from cc where name='Hoa Sen'),'Bạc 925','#D9D9D9', 160000, 90),
  ('Lá Sen',(select id from cc where name='Hoa Sen'),'Bạc mạ vàng','#9CAF94', 200000, 60),
  ('Đài Sen',(select id from cc where name='Hoa Sen'),'Bạc 925','#FAF7F2', 240000, 45),
  ('Nụ Sen',(select id from cc where name='Hoa Sen'),'Bạc 925','#F0E6D7', 150000, 100),
  ('Ngọc Trai Trắng',(select id from cc where name='Ngọc & Đá'),'Ngọc trai nước ngọt','#FAF7F2', 120000, 200),
  ('Ngọc Trai Hồng',(select id from cc where name='Ngọc & Đá'),'Ngọc trai hồng','#E8B4B8', 180000, 60),
  ('Đá Thạch Anh Hồng',(select id from cc where name='Ngọc & Đá'),'Thạch anh','#E8B4B8', 220000, 35),
  ('Đá Mặt Trăng',(select id from cc where name='Ngọc & Đá'),'Đá Moonstone','#E8E8F8', 320000, 20),
  ('Ngọc Bích',(select id from cc where name='Ngọc & Đá'),'Jade','#9CAF94', 380000, 18),
  ('Mã Não Trắng',(select id from cc where name='Ngọc & Đá'),'Agate','#FCF9F5', 140000, 80),
  ('Chữ A',(select id from cc where name='Chữ Cái'),'Vàng 18K','#C5A059', 350000, 50),
  ('Chữ M',(select id from cc where name='Chữ Cái'),'Vàng 18K','#C5A059', 350000, 50),
  ('Chữ L',(select id from cc where name='Chữ Cái'),'Vàng 18K','#C5A059', 350000, 50),
  ('Chữ H',(select id from cc where name='Chữ Cái'),'Bạc 925','#D9D9D9', 250000, 60),
  ('Chữ N',(select id from cc where name='Chữ Cái'),'Bạc 925','#D9D9D9', 250000, 60),
  ('Chữ T',(select id from cc where name='Chữ Cái'),'Bạc 925','#D9D9D9', 250000, 40),
  ('Trái Tim Vàng',(select id from cc where name='Biểu Tượng'),'Vàng 18K','#C5A059', 420000, 30),
  ('Ngôi Sao Mây',(select id from cc where name='Biểu Tượng'),'Bạc 925','#D9D9D9', 180000, 60),
  ('Mặt Trăng Khuyết',(select id from cc where name='Biểu Tượng'),'Bạc mạ vàng','#C5A059', 220000, 40),
  ('Chuông Gió',(select id from cc where name='Biểu Tượng'),'Bạc 925','#D9D9D9', 260000, 25),
  ('Bùa May Mắn',(select id from cc where name='Biểu Tượng'),'Bạc mạ vàng','#C5A059', 280000, 35)
) as t(name, category_id, material, color, price, stock_quantity);

-- Testimonials
insert into public.testimonials (customer_name, content, rating) values
  ('Nguyễn Phương Linh','Vòng tay được làm rất tinh xảo, mỗi chi tiết đều mang câu chuyện riêng. Tôi đã đặt làm quà cho mẹ.', 5),
  ('Trần Mỹ Anh','Studio tùy chỉnh rất dễ dùng. Cảm giác như mình đang tự tay làm trang sức vậy.', 5),
  ('Lê Hoàng Nhi','Đóng gói cực kỳ chỉn chu — hộp gỗ, thiệp viết tay, mùi hương hoa sen nhẹ nhàng.', 5),
  ('Phạm Thu Hà','Vòng charm sen tôi đeo nửa năm vẫn sáng như mới. Chất lượng đúng giá tiền.', 4),
  ('Đỗ Minh Châu','Câu chuyện thương hiệu rất Việt Nam, rất nữ tính. Yêu từ cái nhìn đầu tiên.', 5);

-- FAQ
insert into public.faq_items (question, answer, sort_order) values
  ('Sản phẩm của Pure Floral & Co. có được làm thủ công không?','Toàn bộ sản phẩm đều được chế tác thủ công bởi các nghệ nhân tại xưởng riêng của chúng tôi tại Việt Nam.', 1),
  ('Thời gian giao hàng là bao lâu?','Sản phẩm có sẵn giao trong 2–4 ngày. Sản phẩm tùy chỉnh cần 5–10 ngày để hoàn thiện.', 2),
  ('Tôi có thể đổi trả nếu không vừa ý?','Chúng tôi nhận đổi trả trong vòng 7 ngày với sản phẩm chưa qua sử dụng. Sản phẩm tùy chỉnh không áp dụng đổi trả.', 3),
  ('Làm sao để chọn size vòng tay phù hợp?','Bạn có thể đo chu vi cổ tay bằng thước dây mềm và đối chiếu với bảng size trong trang sản phẩm.', 4),
  ('Sản phẩm có bảo hành không?','Tất cả sản phẩm được bảo hành đánh bóng và sửa chữa miễn phí trong 12 tháng đầu.', 5),
  ('Tôi có thể thiết kế vòng tay riêng không?','Có. Vào mục Tùy chỉnh để chọn dây, charm, size và ghi chú cá nhân. Sản phẩm sẽ được làm riêng cho bạn.', 6),
  ('Có giao hàng quốc tế không?','Hiện tại chúng tôi giao trong nước Việt Nam. Đơn quốc tế vui lòng liên hệ qua trang Hỗ trợ.', 7),
  ('Phương thức thanh toán nào được hỗ trợ?','Chúng tôi hỗ trợ COD, chuyển khoản ngân hàng, và sẽ sớm tích hợp ví điện tử.', 8);

-- Demo coupon
insert into public.coupons (code, discount_type, discount_value, usage_limit, active) values
  ('SEN10','percent', 10, 1000, true),
  ('CHAOMUNG','amount', 100000, 500, true);
