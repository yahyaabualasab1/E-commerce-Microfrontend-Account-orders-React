import airFilterImage from '@assets/products/air-filter.jpg';
import brakeKitImage from '@assets/products/brake-kit.jpg';
import carBatteryImage from '@assets/products/car-battery.jpg';
import carCareKitImage from '@assets/products/car-care-kit.jpg';
import dashCamImage from '@assets/products/dash-cam.jpg';
import engineOilImage from '@assets/products/engine-oil.jpg';
import floorMatsImage from '@assets/products/floor-mats.jpg';
import ledHeadlightsImage from '@assets/products/led-headlights.jpg';
import roofRackImage from '@assets/products/roof-rack.jpg';
import seatCoversImage from '@assets/products/seat-covers.jpg';
import sparkPlugsImage from '@assets/products/spark-plugs.jpg';
import tireInflatorImage from '@assets/products/tire-inflator.jpg';
import wiperBladesImage from '@assets/products/wiper-blades.jpg';

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
