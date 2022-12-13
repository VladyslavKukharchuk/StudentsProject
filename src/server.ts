//Http server
import express from 'express';

const app = express();
const httpServerPort = 3000;

app.get('/', (req, res) => {
    res.sendStatus(200);
    // res.send("Hello, this is Http Server, I'm alive!");
})

app.listen(httpServerPort, () => {
    console.log(`Http Server started on port ${httpServerPort}.`)
})

//WebSocket server

import http from 'http';
import WebSocket from 'ws';

const wsServerPort = 3001;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    ws.send("Hello, this is WebSocket Server, I'm alive!");

    ws.on('message', (message: string) => {
        ws.send(`Hello, you sent -> ${message}`);
    });
  
});

server.listen(wsServerPort, () => {
    console.log(`WebSocket Server started on port ${wsServerPort}.`);
});