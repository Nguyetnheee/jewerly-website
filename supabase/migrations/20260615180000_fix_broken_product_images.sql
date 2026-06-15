-- Fix broken product image URLs

update public.products
set image_url = null
where slug in ('dai-sen-ngoc-bich', 'day-chuyen-canh-sen', 'nhan-tinh-khoi');
