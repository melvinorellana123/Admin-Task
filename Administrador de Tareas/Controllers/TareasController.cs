using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
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
}