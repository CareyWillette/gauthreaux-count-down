function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/gauthreaux-count-down'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/gauthreaux-count-down/'}),
);

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log('%c you\'re listening on port: ', 'background: #fae552; color: #323232;', PORT);