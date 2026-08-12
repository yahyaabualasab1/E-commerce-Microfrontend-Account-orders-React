import airFilterImage from '@assets/products/air-filter.svg';
import brakeKitImage from '@assets/products/brake-kit.svg';
import carBatteryImage from '@assets/products/car-battery.svg';
import carCareKitImage from '@assets/products/car-care-kit.svg';
import dashCamImage from '@assets/products/dash-cam.svg';
import engineOilImage from '@assets/products/engine-oil.svg';
import floorMatsImage from '@assets/products/floor-mats.svg';
import ledHeadlightsImage from '@assets/products/led-headlights.svg';
import roofRackImage from '@assets/products/roof-rack.svg';
import seatCoversImage from '@assets/products/seat-covers.svg';
import sparkPlugsImage from '@assets/products/spark-plugs.svg';
import tireInflatorImage from '@assets/products/tire-inflator.svg';
import wiperBladesImage from '@assets/products/wiper-blades.svg';

export const productImages = {
  authLogin: brakeKitImage,
  authRegister: roofRackImage,
  fallbackProduct: carCareKitImage,
  brakeKit: brakeKitImage,
  ledHeadlights: ledHeadlightsImage,
  roofRack: roofRackImage,
  floorMats: floorMatsImage,
  dashCam: dashCamImage,
  carBattery: carBatteryImage,
  engineOil: engineOilImage,
  airFilter: airFilterImage,
  tireInflator: tireInflatorImage,
  sparkPlugs: sparkPlugsImage,
  wiperBlades: wiperBladesImage,
  seatCovers: seatCoversImage,
  carCareKit: carCareKitImage,
} as const;
