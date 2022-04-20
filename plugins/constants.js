const LOSSLESS = ['webp', 'avif', 'heif'];
const OPTIMIZATION = ['jpeg', 'webp', 'avif'];

export default(context, inject) => {
  inject('LOSSLESS', LOSSLESS)
  inject('OPTIMIZATION', OPTIMIZATION)
}
