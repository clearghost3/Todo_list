import mongoose from "mongoose";

const connection= () => {
    mongoose
    .connect('mongodb+srv://clearghost:sightdrop5238@express-mongo.kiustf6.mongodb.net/?retryWrites=true&w=majority&appName=Express-mongo',
    {
        dbName:"todo_list"
    },
    ).catch((err)=>{
        console.log("몽고DB에 연결실패 reason:",err);
    }).then(()=>{
        console.log("몽고DB에 연결 성공");
    });
};
mongoose.connection.on('error',(err)=>{
    console.log('mongoDB연결 에러',err);
});

export default connection;