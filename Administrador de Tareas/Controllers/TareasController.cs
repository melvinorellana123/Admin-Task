using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Administrador_de_Tareas.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Administrador_de_Tareas.Controllers;

public class TareasController : Controller
{
    private readonly ITareaServicio _tareaServicio;

    public TareasController(ITareaServicio tareaServicio)
    {
        _tareaServicio = tareaServicio;
    }

    [HttpPost]
    public async Task<IActionResult> CrearTarea([FromBody] Tarea tarea)
    {
        var id = await _tareaServicio.CrearTarea(tarea);
        return Json(id);
    }

    [HttpPost]
    public async Task<IActionResult> EditarTarea([FromBody] Tarea tarea)
    {
        try
        {
            var id = await _tareaServicio.ActualizarTarea(tarea);
            return Json(id);
        }
        catch (Exception _)
        {
            return NotFound("La tarea no existe");
        }
    }

    public async Task<IActionResult> EliminarTarea(int idTarea)
    {
        try
        {
            var id = await _tareaServicio.EliminarTarea(idTarea);
            return Json(id);
        }
        catch (Exception _)
        {
            return NotFound("La tarea no existe");
        }
    }

    [HttpPost]
    public async Task MoverTarea([FromBody] MoverTareaVM moverTareaDto)
    {
        try
        {
            await _tareaServicio.MoverTareaASeccion(moverTareaDto);
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}