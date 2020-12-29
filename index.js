const express = require('express');
const userRouter = require('./router/userRouter');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});