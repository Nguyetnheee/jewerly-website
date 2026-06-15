-- Update bracelet product images in public/images/bracelet/

update public.products
set image_url = '/images/bracelet/goldlotus_bracelet.jpg'
where slug = 'vong-tay-lien-hoa-vang';

update public.products
set image_url = '/images/bracelet/pearllotus_bracelet.jpg'
where slug = 'vong-tay-diep-lien-trai';

update public.products
set image_url = '/images/bracelet/simplelotus_bracelet.jpg'
where slug = 'vong-tay-ten-rieng';

update public.products
set image_url = '/images/bracelet/diamondlotus_bracelet.jpg'
where slug = 'vong-ngoc-lien-hoa';

update public.products
set image_url = '/images/bracelet/tuliplotus_bracelet.jpg'
where slug = 'vong-tay-sen-nguyet';
