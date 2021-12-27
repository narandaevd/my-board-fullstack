const express = require('express'),
      config = require('config'),
      path =  require('path'),
      cors = require('cors'),
      fs = require('fs'),
      bodyParser = require('body-parser');

const [SERVER_HOST, SERVER_PORT] = [config.get('server.host'), config.get('server.port') || 5000],
      [CLIENT_HOST, CLIENT_PORT] = [config.get('client.host'), config.get('client.port')];

const CLIENT_URL = `http://${CLIENT_HOST}:${CLIENT_PORT}`;

const parser = bodyParser.urlencoded({extended: false});
const app = express();
const API = express.Router();

// API

const DATABASE_DIRECTORY = path.resolve(__dirname, 'database')

API.get('/user/:id/data', (req, res) => {
    const userId = 'user.json'; //!!!!!!
    const userFilename = path.resolve(DATABASE_DIRECTORY, userId);
    const userData = fs.readFileSync(userFilename);
    res.send({
        body: JSON.parse(userData.toString()),
    });
})

// app.post('/register', parser, (req, res) => {
//     // const {name, surname, email} = req.body;
//     console.log("BODY: ", JSON.stringify(req.body));
//     fs.writeFileSync('test.json', JSON.stringify(req.body));
//     res.redirect(CLIENT_URL);
// })

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

// Launch application
app.listen(SERVER_PORT, SERVER_HOST,() => {
    console.log(`Server has been started on http://${SERVER_HOST}:${SERVER_PORT}...`)
});
