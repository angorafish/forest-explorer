require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const forestRoutes = require('./routes/forest');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const reviewRouter = require('./routes/review');
const authenticateToken = require('./middleware/auth');
const commentRouter = require('./routes/comment');
const trailRouter = require('./routes/trail');
const campsiteRouter = require('./routes/campsite');
const settingsRouter = require('./routes/settings');
const notificationRouter = require('./routes/notification');
const likeRouter = require('./routes/like');
const errorHandler = require('./middleware/errorHandler');
const fs = require('fs');
const upload = require('./middleware/upload');
const http = require('http');
const socketIo = require('socket.io');
const photoRouter = require('./routes/photo');
const searchRouter = require('./routes/search');
const detailsRouter = require('./routes/details');
const savedLocationsRouter = require('./routes/savedLocations');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(uploadDir));

app.use('/api/forests', forestRoutes);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/comments', authenticateToken, commentRouter);
app.use('/api/trails', trailRouter);
app.use('/api/campsites', campsiteRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/notifications', authenticateToken, notificationRouter);
app.use('/api/likes', likeRouter);
app.use('/api/photos', photoRouter);
app.use('/api/search', searchRouter);
app.use('/api/details', detailsRouter);
app.use('/api/savedLocations', savedLocationsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
        await sequelize.sync({ force: false });
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const startServer = async () => {
    try {
        await syncDatabase();
        if (process.env.NODE_ENV !== 'test') {
            server.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
    });
});

module.exports = { app, sequelize, io };