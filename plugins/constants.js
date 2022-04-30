const LOSSLESS = ['webp', 'avif', 'heif'];
const OPTIMIZATION = ['jpeg'];
const SUPPORT_FORMAT = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/heif',
  'image/tiff',
  'image/bmp'
];
const MAXIMUM_NUMBER_OF_IMAGES = 100;
const MAXIMUM_NUMBER_OF_SUBMIT = 1000;

export default(context, inject) => {
  inject('LOSSLESS', LOSSLESS)
  inject('OPTIMIZATION', OPTIMIZATION)
  inject('SUPPORT_FORMAT', SUPPORT_FORMAT)
  inject('MAXIMUM_NUMBER_OF_IMAGES', MAXIMUM_NUMBER_OF_IMAGES)
  inject('MAXIMUM_NUMBER_OF_SUBMIT', MAXIMUM_NUMBER_OF_SUBMIT)
}
