const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const helpers = require("../utils/helpersFunctions");
const jwt = require("jsonwebtoken");
class UserController {
  async CreateNewAdmin(email, password) {
    try {
      if (!helpers.ValidateEmail(email)) {
        throw new Error("Formato Email Invalido");
      }
      if (!helpers.ValidatePassword(password))
        throw new Error("Formato de password Incorrecto");
      const SALT = parseInt(process.env.BCRYPT_SALT);
      const hash = await bcrypt.hash(password, SALT);
      const newUser = new UserModel({
        email: email,
        password: hash,
        role: "Admin",
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }
  async CreateNewUser(email, password) {
    try {
      if (!helpers.ValidateEmail(email)) {
        throw new Error("Formato Email Invalido");
      }
      if (!helpers.ValidatePassword(password))
        throw new Error("Formato de password Incorrecto");
      const SALT = parseInt(process.env.BCRYPT_SALT);
      const hash = await bcrypt.hash(password, SALT);
      const newUser = new UserModel({
        email: email,
        password: hash,
        role: "User",
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }
  async DeleteUserById(id) {
    try {
      const deleteUser = await UserModel.findByIdAndDelete(id);
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }

  async Login(req, res) {
    try {
      const body = req.body;
      if (body.email === "" || body.email === undefined) {
        throw new Error("debe enviar un email");
      }
      if (body.password === "" || body.password === undefined) {
        throw new Error("debe enviar un password");
      }
      const user = await UserModel.findOne({ email: body.email });
      if (user === null) {
        return res
          .status(404)
          .json({ message: "Email y/o password incorrecto" });
      }
      const compare = await bcrypt.compare(body.password, user.password);
      if (!compare) {
        return res
          .status(404)
          .json({ message: "Email y/o password incorrecto" });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1D" }
      );

      return res
        .status(200)
        .json({ email: user.email, role: user.role, token: token });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
