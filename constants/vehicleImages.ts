// Official Authentic KIA Vehicle Assets Mapping
// Owner: Nasriddinova Dilfuza

export const KIA_LOCAL_IMAGES: Record<string, any> = {
  'kia-k5': require('../assets/vehicles/k5.jpg'),
  'kia-sportage': require('../assets/vehicles/sportage.jpg'),
  'kia-sorento': require('../assets/vehicles/sorento.jpg'),
  'kia-sonet': require('../assets/vehicles/sonet.jpg'),
  'kia-seltos': require('../assets/vehicles/seltos.jpg'),
  'kia-carnival': require('../assets/vehicles/carnival.jpg'),
  'kia-k9': require('../assets/vehicles/k9.jpg'),
  'kia-ev6': require('../assets/vehicles/ev6.jpg'),
  'kia-k3': require('../assets/vehicles/k3.jpg'),
  'kia-k8': require('../assets/vehicles/k8.jpg'),
};

export function getVehicleImage(vehicle?: { id?: string; mainImage?: string; name?: string }): any {
  if (!vehicle) {
    return KIA_LOCAL_IMAGES['kia-k5'];
  }

  // If a custom uploaded data URI (base64) or valid web URL is provided and not a placeholder
  if (
    vehicle.mainImage &&
    typeof vehicle.mainImage === 'string' &&
    (vehicle.mainImage.startsWith('data:image/') || vehicle.mainImage.startsWith('http')) &&
    !vehicle.mainImage.includes('unsplash.com/photo-1542282088') // avoid old audi placeholder
  ) {
    return { uri: vehicle.mainImage };
  }

  const id = (vehicle.id || '').toLowerCase();
  const name = (vehicle.name || '').toLowerCase();

  if (id.includes('k5') || name.includes('k5')) return KIA_LOCAL_IMAGES['kia-k5'];
  if (id.includes('sportage') || name.includes('sportage')) return KIA_LOCAL_IMAGES['kia-sportage'];
  if (id.includes('sorento') || name.includes('sorento')) return KIA_LOCAL_IMAGES['kia-sorento'];
  if (id.includes('sonet') || name.includes('sonet')) return KIA_LOCAL_IMAGES['kia-sonet'];
  if (id.includes('seltos') || name.includes('seltos')) return KIA_LOCAL_IMAGES['kia-seltos'];
  if (id.includes('carnival') || name.includes('carnival')) return KIA_LOCAL_IMAGES['kia-carnival'];
  if (id.includes('k9') || name.includes('k9')) return KIA_LOCAL_IMAGES['kia-k9'];
  if (id.includes('ev6') || name.includes('ev6')) return KIA_LOCAL_IMAGES['kia-ev6'];
  if (id.includes('k3') || name.includes('k3')) return KIA_LOCAL_IMAGES['kia-k3'];
  if (id.includes('k8') || name.includes('k8')) return KIA_LOCAL_IMAGES['kia-k8'];

  return KIA_LOCAL_IMAGES['kia-k5'];
}

