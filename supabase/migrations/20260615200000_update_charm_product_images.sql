-- Cập nhật hình ảnh cho sản phẩm trong danh mục Charm Sen từ folder public/images/charm/

UPDATE public.products
SET image_url = '/images/charm/lotus_charm.jpg'
WHERE name IN ('Charm Sen Hồng Tráng Men', 'Nụ Sen Thanh Khiết', 'Đóa Sen Mãn Khai', 'Đài Sen Ngọc Bích');

UPDATE public.products
SET image_url = '/images/charm/goldlotus_charm.jpg'
WHERE name = 'Lá Sen Vàng Khắc Họa';
