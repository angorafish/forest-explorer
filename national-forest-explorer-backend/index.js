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

const app = express();
app.use(cors());
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
