const express = require('express');
const ConnectToMongo = require("./Db/db");
const cors = require("cors");
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const server = http.createServer(app);
ConnectToMongo();
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:7000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/vi", require("./router/User"));
app.use("/ap2/v2", require("./router/Product"))
app.use("/ap3/v3", require("./router/Payment"))
app.use("/ap4/v4", require("./router/fovroute"))
app.use("/ap5/v5", require("./router/comment"))
app.use("/ap6/v6", require("./router/Likes"))
app.use("/ap7/v7", require("./router/Subscribe"));

// http://localhost:5000/ap8/v8/send-email
app.use("/ap8/v8", require("./Nodemailer/mailer"))


server.listen(port, () => {
    console.log(`Store app listening on port ${port}`);
});
