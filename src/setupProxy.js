const {createProxyMiddleware} = require('http-proxy-middleware');
 
module.exports = function (app) {
    app.use(
        '/live',
        createProxyMiddleware({
            target: 'https://test-interactive.gaotu100.com',
            changeOrigin: true,
            secure: true
        })
    );
};