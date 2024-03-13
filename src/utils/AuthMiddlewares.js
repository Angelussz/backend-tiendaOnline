const jwt = require("jsonwebtoken")

function isAuth(req,res,next){
    const auth = req.get("Authorization");
    if(!auth){
        return res.status(401).json({message:"No autorizado"})
    }
    try {
        const token = auth.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodeToken
        next()
    } catch (error) {
        // next(new Error("Token vencido"))
        return res.status(401).json({message:"Token invalido y/o vencido"})
    }
}

function isAdmin(req,res,next){
    try {
        if(req.user.role!=="Admin"){
            return res.status(403).json({message:"Acceso denegado"})
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {isAuth,isAdmin}