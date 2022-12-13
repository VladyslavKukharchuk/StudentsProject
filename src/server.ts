//Http server
import express from 'express';

const app = express();
const httpServerPort = 3000;

// HTTP
// логин(получаем email и пароль, находим юзера, проверяем и возвращаем jwt токен)

app.post('/users/login', (req, res) => {
    res.sendStatus(200);
});


// регистрация(передаем ник, email, пароль, дубль пароля, id выбранного класса)

app.post('/users/new', (req, res) => {
    res.sendStatus(200);
});


// обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)

app.patch('/users/:userid', (req, res) => {
    res.sendStatus(200);
});


// получение списка классов.

app.get('/classes', (req, res) => {
    res.sendStatus(200);
});

// forgot password или подтверждение email не требуется.


app.listen(httpServerPort, () => {
    console.log(`Http Server started on port ${httpServerPort}.`)
})

//WebSocket server

import http from 'http';
import WebSocket from 'ws';

const wsServerPort = 3001;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(wsServerPort, () => {
    console.log(`WebSocket Server started on port ${wsServerPort}.`);
});

// WS

wss.on('connection', (ws: WebSocket) => {

    // получать и различать события(удар, применение способности, сообщение, возрождение)
    // удар, применение способности и возрождение должны передаваться с id целевого юзера.

    // {
    //     "event": "message",
    //     "id": "1"
    // }

    ws.on('message', (message: string) => {

        let data = (JSON.parse(message));

        switch (data.event) {
            case "attack":
                ws.send(`attack ${data.id}`);
                break;
            case "ability":
                ws.send(`ability ${data.id}`);
                break;
            case "relive":
                ws.send(`relive ${data.id}`);
                break;
            case "message":
                ws.send("message");
                break;
        }

        ws.send(`Hello, you sent -> ${message}`);
    });
});