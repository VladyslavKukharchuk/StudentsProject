import express from 'express';
import http from 'http';
import WebSocket from 'ws';


const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const PORT = 3001;

wss.on('connection', (ws: WebSocket) => {

    ws.send("Hello, this is WebSocket Server, I'm alive!");

    ws.on('message', (message: string) => {

        console.log(`received: ${message}`);

        ws.send(`Hello, you sent -> ${message}`);
    });

    
});

server.listen(PORT, () => {
    console.log(`WebSocket Server started on port ${PORT}.`);
});