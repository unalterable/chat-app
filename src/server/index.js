require('babel-register')({
  presets: ['es2015', 'react'],
});

require('./server.js')().catch(console.error)
