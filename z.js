import Joi from "joi";


const schema=Joi.object({
    name:Joi.string().required().min(5).max(50),
});

const user={
    name:"has",
};


try {
    const validation = await schema.validateAsync(user);
}
catch(err) {
    console.log(err.message);
}
