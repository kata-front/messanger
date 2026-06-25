const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server, {
        cors: {origin: '*'}
    });

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            socket.to(roomId).emit('user-connected');
        })

        socket.on('signal', ({ to, data}) => {
            console.log('signal received', {to, data});
            socket.to(to).emit('signal', {from: socket.id, data})
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
})