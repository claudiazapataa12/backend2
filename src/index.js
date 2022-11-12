import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";
connectDb();

// importar rutas
import empleadoRoutes from "./routes/empleadoRoute.js"

const app = express();


app.set("Port", 4000);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extened: true }));
app.use(express.json());

app.use("/empleados", empleadoRoutes)

app.listen(app.get("Port"), () => {
  console.log("sevidor escuando por el puerto", app.get("Port"));
});

