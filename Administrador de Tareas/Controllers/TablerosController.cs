using Administrador_de_Tareas.Models;
using Administrador_de_Tareas.Models.ViewModels;
using Administrador_de_Tareas.Servicios;
using Microsoft.AspNetCore.Mvc;

namespace Administrador_de_Tareas.Controllers;

public class TablerosController : Controller
{
    private readonly ITableroServicio _tableroServicio;

    public TablerosController(ITableroServicio _tableroServicio)
    {
        this._tableroServicio = _tableroServicio;
    }

    public async Task<IActionResult> GetTableros()
    {
        var tableros = await _tableroServicio.ObtenerTableros();
        return Json(tableros);
    }

    // GET
    [HttpGet]
    public async Task<IActionResult> ObtenerTableroPorId(int id, string nombreTablero)
    {
        var listas = await _tableroServicio.ObtenerListasPorId(id);

        var tableroVm = new TableroViewModel
        {
            IdTablero = id,
            NombreTablero = nombreTablero,
            Listas = listas
        };

        return Json(tableroVm);
    }

    [HttpPost]
    public async Task<IActionResult> CrearTablero(string nombreTablero)
    {
        
        if (string.IsNullOrEmpty(nombreTablero))
        {
            return BadRequest("El nombre del tablero no puede estar vacío");
        }
        
        var tablero = await _tableroServicio.CrearTablero(nombreTablero);
        return Json(tablero);
    }
    
    [HttpDelete]
    public async Task<IActionResult> EliminarTablero(int id)
    {
        await _tableroServicio.EliminarTablero(id);
        return Ok();
    }
}