using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Microsoft.AspNetCore.Mvc;

namespace Administrador_de_Tareas.Controllers;

public class ListasController : Controller
{
    private readonly IListaServicio _listaServicio;

    public ListasController(IListaServicio listaServicio)
    {
        _listaServicio = listaServicio;
    }


    [HttpPost]
    public async Task<IActionResult> CrearLista([FromBody] Lista nombre)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        var listaCreada = await _listaServicio.CrearLista(nombre);
        return Json(listaCreada);
    }

    [HttpGet]
    public async Task<JsonResult> ObtenerListasPorTablero(int id)
    {
        var listas = await _listaServicio.ObtenerListas(id);

        return Json(listas);
    }

    [HttpDelete]
    public async Task<IActionResult> EliminarLista(int id)
    {
        try
        {
            await _listaServicio.ObtenerListaPorId(id);

            await _listaServicio.EliminarLista(id);
            return Ok();
        }
        catch (Exception e)
        {
            return NotFound("No se encontro la lista");
        }
    }
    
    [HttpPost]
    public async Task<Lista> EditarLista([FromBody] Lista lista)
    {
        var listaEditada = await _listaServicio.EditarLista(lista);
        return listaEditada;
    }
}