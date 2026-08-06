import sunglassesImage from '@assets/products/accessories-sunglasses.jpg';
import handbagImage from '@assets/products/handbag.jpg';
import hoodieImage from '@assets/products/hoodie.jpg';
import leatherToteImage from '@assets/products/leather-tote.jpg';
import midiDressImage from '@assets/products/midi-dress.jpg';
import reviewDetailImage from '@assets/products/review-detail.jpg';
import silkShirtImage from '@assets/products/silk-shirt.jpg';
import sneakersImage from '@assets/products/sneakers.jpg';
import sportswearImage from '@assets/products/sportswear.jpg';
import suedeLoafersImage from '@assets/products/suede-loafers.jpg';
import trenchCoatImage from '@assets/products/trench-coat.jpg';
import utilityJacketImage from '@assets/products/utility-jacket.jpg';
import watchImage from '@assets/products/watch.jpg';

export const fashionImages = {
  authLogin: trenchCoatImage,
  authRegister: midiDressImage,
  fallbackProduct: silkShirtImage,
  trench: trenchCoatImage,
  tote: leatherToteImage,
  dress: midiDressImage,
  loafers: suedeLoafersImage,
  silkShirt: silkShirtImage,
  sneaker: sneakersImage,
  watch: watchImage,
  hoodie: hoodieImage,
  handbag: handbagImage,
  jacket: utilityJacketImage,
  runningSet: sportswearImage,
  sunglasses: sunglassesImage,
  reviewDetail: reviewDetailImage,
} as const;
