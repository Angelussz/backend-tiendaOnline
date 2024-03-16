// SOLO FUNCIONA PARA TYPESCRIPT

const {Length, IsNotEmpty, IsString, validate} = require("class-validator")

class ProductValidator{
    @IsString()
    @Length(4,10)
    @IsNotEmpty()
    title;

    @IsString()
    @Length(4,200)
    @IsNotEmpty()
    description;

    @IsString()
    @IsNotEmpty()
    category;
}

async function ValidateInputs(arg){
    const errors = await validate(arg)
    if(errors.length > 0){
        console.log(errors)
    }
}

module.exports = {ProductValidator,ValidateInputs}