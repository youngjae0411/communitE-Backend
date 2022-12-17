const express = require('express');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const routes = require('./routes');

require('dotenv').config();

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '포트로 서버가 열렸습니다.');
});

app.get('/', (req, res) => {
    res.send('hello world');
});
