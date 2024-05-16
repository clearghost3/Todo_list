import express from 'express';
import connect from "./schemas/index.js";
import todoRouter from './routes/todo.js';


const PORT=3000;
const app=express();

connect();

//req.body에 접근해 body의 데이터로 사용하기 위함
app.use(express.json());                            //백엔드의 방법
app.use(express.urlencoded({extended:true}));       //프론트엔드의 방법

app.use("/api",[todoRouter]);

//static미들웨어, 즉 express.static() 을 사용해 프론트엔드의 정적 파일을 변환해 가져옵니다.
app.use(express.static('./assets'));

//.exec()는 비동기를 동기적으로 만들어준다.


app.listen(PORT,() => {
    console.log("Server opend from",PORT);
});