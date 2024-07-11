require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const forestRoutes = require('./routes/forest');
const feedRouter = require('./routes/feed');
const itineraryRouter = require('./routes/itineraries');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const reviewRouter = require('./routes/review');
const authenticateToken = require('./middleware/auth');
const commentRouter = require('./routes/comment');
const trailRouter = require('./routes/trail');
const campsiteRouter = require('./routes/campsite');
const errorHandler = require('./middleware/errorHandler');
const { error } = require('console');

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

app.use('/api/forests', forestRoutes);
app.use('/api/feed', feedRouter);
app.use('/api/itineraries', itineraryRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/comments', authenticateToken, commentRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/trails', trailRouter);
app.use('/api/campsites', campsiteRouter);
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
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();

module.exports = { app, sequelize };
