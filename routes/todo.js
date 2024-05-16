import express from "express";
import mongoose from "mongoose";
import Joi from 'joi';

import Todo from "../schemas/todo.schemas.js";

console.log("<===Applyed todoRouter===>");

const Router=express.Router();

Router.get("/",(req,res)=>{
    res
    .json({message:"여기는 할일을 표시합니다."});
});

//할일 게시 API====================================

Router.post("/todos",async (req,res)=> {      //할일 게시
    //클라이언트로 부터 req.body 데이터를 가져온다.
    const {task}=req.body;


    if (!task) {
        console.log("클라이언트가 task를 미입력");
        return res
        .json({Error_message:"해야할 일을 입력하지 않았어요!"})
        .status(400);
    }


    const Maxorder=await Todo.findOne().sort('-order').exec();   //내림차순으로 정렬해서 가장 큰 값의 오브젝트(객체)를 가져옴

    const order=Maxorder ? Maxorder.order+1:1;      //객체이기에 객체.order

    const newTodo=new Todo({task,order}); //모델은 클래스와 비슷하게 인스턴스화 가능
    await newTodo.save()//데이터베이스에 저장하는 방식, newTodo를 저장한다.


    return res
        .status(201)
        .json(task);
});

//할일 조회 API================================
Router.get("/todos",async (req,res,next)=> {       
    
    const task_list= await Todo.find().sort('-order').exec();

    return res
    .json(task_list)
    .status(200);
});

//할일 업데이트 API================================
//할일 순서 변경, 내용 변경, 완료/해제

Router.patch('/todos/:todoid',async(req,res,next)=>{  //경로 변수가 사용됨  //next는 미들웨어로 전달해주기 위한 인수
    //순서 변경 API
    const {todoid}=req.params;      //현재 바꿀려는 타겟은 경로변수에서 찾는다.    current_Todo
    const {order,done,task}=req.body;         //바꿔질 대상은 req.body 즉, json에서 찾는다. targetTodo

    //현재 내가 지정한 ID parms로 가져올 수 있다.
    const current_Todo=await Todo.findById(todoid).exec();  

    //유효성 검사
    if (!current_Todo){
        return res
            .status(404)
            .json({Errormessage:"존재하지 않는 해야할 일입니다."});
    }

    //내용 변경
    if (task) {
        current_Todo.task=task;
        await current_Todo.save();
        return res
        .status(201)
        .json({message:"내용이 변경되었습니다!"});
    }
    


    if (order) {
        const targetTodo= await Todo.findOne({order:order}).exec(); //객체분해 할당하지 않은 버전
        if (targetTodo) {
            targetTodo.order =current_Todo.order;
            await targetTodo.save();
            current_Todo.order=order;
        };
    }
    if(done !==undefined) {
        current_Todo.done_check=done ? new Date:null;
    }

    await current_Todo.save();

    return res
    .status(200)
    .json({});
});

Router.delete('/todos/:todoid',async(req,res,next)=>{
    const {todoid}=req.body;

    const todo= await Todo.findById(todoid).exec();
    if (!todo) {
        return res
        .status(404)
        .json({Errormessage:"존재하지 않는 해야할 일"});
    };

    await Todo.deleteOne({_id:todoid});
    return res.status(200).json({message:"성공적으로 삭제되었습니다!"});
});









//할일 삭제 API================================
Router.delete('/todos/:todoid',async(req,res)=>{  //경로 변수가 사용됨

});



//할일 생각 API================================
Router.get('/todo/loading',async(req,res) => {
    let timer=1;
    const interval= setInterval(() => {
        timer++;
        console.log("할일들 생각중...");
        if(timer===10) {
            console.log("생각 종료!");
            clearInterval(interval);
        };
    }, 2000);
        

    res
    .json({message:"여기는 할일들의 목록입니다."});
});

Router.get('/todo/about', (req,res) => {
    res.
    json({message:"여기는 할일들의 설명입니다."});
});

export default Router;