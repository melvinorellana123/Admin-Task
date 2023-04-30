using System.Diagnostics;
using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Administrador_de_Tareas.Servicios;
using Microsoft.AspNetCore.Mvc;

namespace Administrador_de_Tareas.Controllers;

public class HomeController : Controller
{
    public HomeController()
    {
    }


    public IActionResult Index()
    {
        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}