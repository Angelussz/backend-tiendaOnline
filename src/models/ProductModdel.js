const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
    title:{
        type:String,
        require:[true,"El título es requerido"],
        unique:true,
        minLength:4,
        maxLength:20,
    },
    description:{
        type:String,
        require:[true,"La descripción es requerida"],
        minLength:4,
        maxLength:200
    },
    category:{
        type:String,
        require:[true,"La categoria es requerida"],
    }
})

const ProductModel = mongoose.model("product",ProductSchema);

module.exports = ProductModel