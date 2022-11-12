import { response } from "../helpers/Response.js";
import { empleadoModel } from "../models/empleadosModel.js";

const empleadoCtrl = {};

// listar a todos los empleados

empleadoCtrl.listar = async (req, res) => {
  try {
    // const empleados = await empleadoModel.find();
    // response(res, 200, true, empleados, "lista de empleados");

    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;
    const options = {
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1,
    };

    const empleados = await empleadoModel.paginate({},options);
    response(res, 200, true, empleados, "lista de empleados");
  } catch (error) {
    response(res, 500, false, "", error.mesagge);
  }
};

// listar empleados por el id
empleadoCtrl.listById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.findById(id);
    if (!empleado) {
      return response(res, 404, false, "", "registro no encontrado");
    }
    response(res, 200, true, empleado, "empleado encontrado");
  } catch (error) {
    response(res, 500, false, "", error.mesagge);
  }
};

// guardar empleado
empleadoCtrl.guardar = async (req, res) => {
  try {
    const { correo } = req.body;
    const empleado = await empleadoModel.findOne({ correo });
    if (empleado) {
      return response(
        res,
        400,
        false,
        "",
        `el correo ${correo}ya exixte en otro registro`
      );
    }
    const newEmpleado = await empleadoModel.create(req.body);
    //  const newEmpleado = new empleadoModel({
    //   nombres,
    //   apellidos,
    //   edad,
    //   correo,
    //   salario,
    //   cargo,
    // });

    // await newEmpleado.save();
    response(res, 201, true, newEmpleado, "empleado creado ");
  } catch (error) {
    response(res, 500, false, "", error.mesagge);
  }
};

// actualizar
empleadoCtrl.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { correo } = req.body;
    // await empleadoModel.findByIdAndUpdate(id, req.body);
    const empleado = await empleadoModel.findById(id);
    if (!empleado) {
      return response(res, 404, false, "", "registro no encontrado");
    }

    if (empleado.correo !== correo) {
      const empleadoCorreo = await empleadoModel.findOne({ correo });
      if (empleadoCorreo) {
        return response(
          res,
          400,
          false,
          "",
          `el correo ${correo}ya existe en otro registro`
        );
      }
    }

    await empleado.updateOne(req.body);

    response(res, 200, true, "", "registro actulizado");
  } catch (error) {
    response(res, 500, false, "", error.mesagge);
  }
};

// eliminar empleado
empleadoCtrl.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.findById(id);
    if (!empleado) {
      return response(res, 404, false, "", "registro no encontrado");
    }
    await empleado.deleteOne();

    response(res, 200, true, empleado, "empleado eliminado");
  } catch (error) {
    response(res, 500, false, "", error.mesagge);
  }
};
export default empleadoCtrl;
