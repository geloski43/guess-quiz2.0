module.exports = {
  resolve: {
    fallback: { stream: require.resolve('stream-browserify') },
    fallback: { http: require.resolve('stream-http') },
    fallback: { https: require.resolve('https-browserify') },
    fallback: { url: require.resolve('url/') },
    fallback: { buffer: require.resolve('buffer/') },
  },
};
