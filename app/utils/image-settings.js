export default {
  image: {
    maxSize: 25 * 1024 * 1024, // 25MB
    allowedContentTypes: ['image/jpeg', 'image/png']
  },

  embedPhoto: {
    image: { width: 400, height: 300 }
  },

  /* resource injection marker */
}
