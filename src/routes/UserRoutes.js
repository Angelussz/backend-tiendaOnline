const UserController = require("../controllers/UserController");
const Auth = require("../utils/AuthMiddlewares");
const UserRoutes = (base, app) => {
  const controller = new UserController();
  app.post(`${base}/create-admin`, async (req, res, next) => {
    try {
      const { email, password} = req.body;
      const response = await controller.CreateNewAdmin(email, password);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error al crear un nuevo usuario -->", error);
      // next(error);
      return res
        .status(500)
        .json({ mesage: "Ocurrio un error al intentar crear usuario" });
    }
  });
  app.post(`${base}`,Auth.isAuth,Auth.isAdmin, async (req, res, next) => {
    try {
      const { email, password} = req.body;
      const response = await controller.CreateNewUser(email, password);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error al crear un nuevo usuario -->", error);
      // next(error);
      return res
        .status(500)
        .json({ mesage: "Ocurrio un error al intentar crear usuario" });
    }
  });
  app.delete(`${base}/delete/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const response = await controller.DeleteUserById(id);
      console.log("USUARIO ELIMINADO--->", JSON.stringify(response));
      return res.status(200).json({ nessage: "Exito al eliminar el usuario" });
    } catch (error) {
      console.error("Error al eliminar un usuario-->", error);
      return res
        .status(500)
        .json({ message: "Ocurrio un error al intentar eliminar un usuario" });
    }
  });

  app.post(`${base}/login`,async(req,res,next)=>{
    try {
      const response = await controller.Login(req,res)
      return response
    } catch (error) {
      next(error)
    }
  })
};
module.exports = UserRoutes;
