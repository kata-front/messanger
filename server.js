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

        if (parsedUrl.pathname?.startsWith('/socket.io/')) {
            return;
        }
        handle(req, res, parsedUrl);
    });

    const io = new Server(server, {
        cors: '*',
    });

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('join', (roomId) => {
            socket.join(roomId);
            console.log('joined room', roomId);
        });

        socket.on('chat-message', (data) => {
            const { chatId, text } = data;
            console.log('message received', data);
            const message = {
                id: Date.now().toString(),
                text,
                userId: socket.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            io.to(chatId).emit('chat-message', message);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })


    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
})