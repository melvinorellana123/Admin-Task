using System.ComponentModel.DataAnnotations;

namespace Administrador_de_Tareas.Models;

public class Lista
{
    public int IdLista { get; set; }
    [Required(ErrorMessage = "Debe ingresar un nombre para la lista")]
    public string ListaNombre { get; set; }
    public int IdTablero { get; set; }
    public int ListaOrden { get; set; }
    public List<Tarea> Tareas { get; set; } = new List<Tarea>();
}