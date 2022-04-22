const LOSSLESS = ['webp', 'avif', 'heif'];
const OPTIMIZATION = ['jpeg'];
const MAXIMUM_NUMBER_OF_IMAGES = 100;
const MAXIMUM_NUMBER_OF_SUBMIT = 1000;

export default(context, inject) => {
  inject('LOSSLESS', LOSSLESS)
  inject('OPTIMIZATION', OPTIMIZATION)
  inject('MAXIMUM_NUMBER_OF_IMAGES', MAXIMUM_NUMBER_OF_IMAGES)
  inject('MAXIMUM_NUMBER_OF_SUBMIT', MAXIMUM_NUMBER_OF_SUBMIT)
}
