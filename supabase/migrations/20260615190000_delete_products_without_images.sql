-- Xóa các sản phẩm không có hình ảnh (không hiển thị được trên trang /products)

delete from public.products
where image_url is null;
