import express from 'express'

const server = express()
const PORT = 3000;

server.get('/', (req, res) => {
    res.send("Hello, this is Http Server, I'm alive!");
})

server.listen(PORT, () => {
    console.log(`Http Server started on port ${PORT}`)
})