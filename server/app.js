const express = require('express');
const app = express();

const userRouter = require('./api/users/users.router');

const { login, register, protectedRoute } = require('./api/auth');

const connectMongoDB = require('./utils/connectMongoDB');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongoDB();

app.post('/api/login', login);
app.post('/api/register', register);

app.use('/api/user', protectedRoute, userRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
