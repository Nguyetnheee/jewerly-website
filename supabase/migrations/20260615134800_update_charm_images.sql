-- Update charm images in public/images/charm/ and public/images/keychain/

update public.charms
set image_url = '/images/charm/lotus_charm.jpg'
where name in ('Sen Hồng Mini', 'Sen Vàng Mini', 'Sen Bạc Mini', 'Đài Sen', 'Nụ Sen');

update public.charms
set image_url = '/images/charm/goldlotus_charm.jpg'
where name in ('Lá Sen', 'Đá Thạch Anh Hồng');

update public.charms
set active = false
where name = 'Trái Tim Hồng';
update public.charms
set image_url = '/images/keychain/goldenlotus_keychain.jpg'
where name in ('Chữ M', 'Chữ L');

update public.charms
set image_url = '/images/keychain/goldlotus_keychain.jpg'
where name in ('Chữ A', 'Lá Sen Vàng Khắc Họa');

update public.charms
set image_url = '/images/keychain/lotus leaf_keychain.jpg'
where name in ('Lá Sen', 'Mã Não Trắng');

update public.charms
set image_url = '/images/keychain/lotusdiamond_keychain.jpg'
where name in ('Nụ Sen Thanh Khiết', 'Đài Sen Ngọc Bích', 'Ngôi Sao Mây', 'Mặt Trăng Khuyết');

update public.charms
set image_url = '/images/keychain/silverlotus_keychain.png'
where name in ('Sen Bạc Mini', 'Nhẫn Tịnh Khôi', 'Chữ H', 'Chữ N', 'Chữ T');

update public.charms
set image_url = '/images/keychain/lotus _keychain.jpg'
where name in ('Đóa Sen Mãn Khai', 'Bùa May Mắn');

update public.charms
set image_url = '/images/keychain/lotusdiamond_keychain.jpg'
where name in ('Chuông Gió');
