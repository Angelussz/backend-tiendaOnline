const ProductModel = require("../models/ProductModdel");
const { ValidateTitle, ValidateDescription, ValidateCategory } = require("../utils/helpersFunctions");
class ProductController {
  async Create(title, description, category) {
    try {
      if(!ValidateTitle(title) || !ValidateDescription(description) || !ValidateCategory(category)){
        throw new Error("Error en alguno de los campos")
      }
      const product = new ProductModel({
        title,
        description,
        category,
      });
      await product.save();
    } catch (error) {
      throw error;
    }
  }
  async GetAllProducts(filtro,busqueda){
    try {
      let finalResponse = [];
      let query = {

      }
      if(filtro !== undefined){
        query["category"] = filtro;
      };
      if(busqueda !== undefined){
        query["title"] ={$regex:busqueda,$options:"i"}
      }
      console.log("###QUERY-->",JSON.stringify(query))
      // if(filtro === undefined){
      //   finalResponse = await ProductModel.find(); 
      // }
      // else{
      //   finalResponse = await ProductModel.find({
      //     category:filtro
      //   }); 
      // }
      finalResponse = await ProductModel.find(query)
      // const products = await ProductModel.find();
      return finalResponse
    } catch (error) {
      throw error;
    }
  }
  async GetById(id){
    try {
      const product = await ProductModel.findById(id);
      return product
    } catch (error) {
      throw error
    }
  }
  async UpdateProducto(product){
    await ProductModel.findByIdAndUpdate(product._id,product)
  }
}

module.exports = ProductController;
