export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://hooked-social-api.herokuapp.com',
      changeOrigin: true,
    })
  );
};