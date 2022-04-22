const LOSSLESS = ['webp', 'avif', 'heif'];
const OPTIMIZATION = ['jpeg'];

export default(context, inject) => {
  inject('LOSSLESS', LOSSLESS)
  inject('OPTIMIZATION', OPTIMIZATION)
}
