const express = require('express'),
      config = require('config'),
      path =  require('path'),
      mongoose = require('mongoose'),
      cors = require('cors');

const app = express();
const [SERVER_HOST, SERVER_PORT] = [config.get('server.host'), config.get('server.port') || 5000],
      [CLIENT_HOST, CLIENT_PORT] = [config.get('client.host'), config.get('client.port')];
const CLIENT_URL = `http://${CLIENT_HOST}:${CLIENT_PORT}`;

// API route
const API = require('./routes/api.route.js');

// Middlewares
app.use(express.json({extended: true}));
/// Making connect with static files
app.use(express.static(path.resolve(__dirname, 'client', 'public')));

/// Turn off CORS policy
app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
}));
/// Connecting API with application
app.use('/api', API);

const start = async () => {

    // Connecting DB with server
    const url = 'mongodb+srv://Damir:qwe123@cluster0.3hgr4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    await mongoose.connect(url);

    // Starting server
    app.listen(SERVER_PORT, SERVER_HOST, () => {
        console.log(`Server has been started on http://${SERVER_HOST}:${SERVER_PORT}...`)
    });
}

// Launch app
start();
