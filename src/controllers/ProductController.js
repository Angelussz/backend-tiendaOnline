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
  async GetAllProducts(){
    try {
      const products = await ProductModel.find();
      return products
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductController;
