import mongoose from "mongoose";

const todo=new mongoose.Schema({
    task: {
        type:String,
        required:true,
    },
    order: {
        type:Number,
        required:true,
    },
    done_check: {
        type:Date,
        required:false,
    },
});

//프론트 엔드 서빙을 위한 코드로 중요하지 않음
todo.virtual('todoId').get(function () {
    return this._id.toHexString();
  });
  todo.set('toJSON', {
    virtuals: true,
  });
  



export default mongoose.model('Todo',todo);
