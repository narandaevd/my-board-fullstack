const express = require('express'),
      path =  require('path'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      favicon = require('express-favicon');

const app = express();

const SERVER_PORT = process.env.PORT || 5000;

// API route
const API = require('./routes/api.route.js');

// Middlewares
app.use(express.json({extended: true}));
/// Making connect with static files
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
/// Turn off CORS policy
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
}));
/// Connecting API with application
app.use('/api', API);
// Installing favicon
app.use(favicon(path.resolve(__dirname, 'client', 'public', 'img', 'favicon.png')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

const start = async () => {
    // Connecting DB with server
    const url = require('./key').key;
    await mongoose.connect(url);
    // Starting server
    app.listen(SERVER_PORT, () => {
        console.log(`Server has been started on port: ${SERVER_PORT}...`)
    });
}

// Launch app
start();
