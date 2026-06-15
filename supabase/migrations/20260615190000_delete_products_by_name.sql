-- Xóa các sản phẩm theo tên (không có hình ảnh)

delete from public.products
where name in (
  'Charm Sen Hồng Tráng Men',
  'Nụ Sen Thanh Khiết',
  'Lá Sen Vàng Khắc Họa',
  'Đóa Sen Mãn Khai'
);