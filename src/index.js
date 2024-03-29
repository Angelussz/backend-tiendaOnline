const express  = require("express")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const databaseConnection = require('./databaseConnection.js')
const UserRoutes = require("./routes/UserRoutes.js")
const ProductRoutes = require("./routes/ProductRoutes.js")
require('dotenv').config();
databaseConnection()
const app = express();
// console.log(process.env)

app.set("port", process.env.PORT ||9001);
console.log("first")
app.listen(app.get("port"),()=>{
    console.log(`BACKEND PRODUCTOS LISTENING IMPORT IN PORT ${app.get('port')}`)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev")) //detalles de las peticiones en la terminal
app.use(cors()) //permite peticiones remotas


// Cargar archivos estaticos que va ser el index.html
console.log(__dirname,"DIRNAME")
app.use(express.static(path.join(__dirname,"../public")))

// Creamos rutas de prueba
// TIPOS DE PETICIONES
/**
 * GET: obtener, pedir, leer
 * PUT / PATCH: actualizar
 * POST: crear y enviar información desde el cliente al backedn o servidor
 * DELETE: borrar eliminar
 */


// req: informacion de la peticion del cliente al servidor
// res: contiene toda la información de la respuesta del servidor al cliente
// indica que continue con la siguiente función o middleware
app.get("/test", async(req,res,next) =>{
    try {
        console.log("REQUEST-->",req)
        return res.status(200).json({
            success:true,
            message:"API IS ALIVE"
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

UserRoutes("/users",app)
ProductRoutes("/products",app)