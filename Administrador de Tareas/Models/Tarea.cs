namespace Administrador_de_Tareas.Models;

public class Tarea
{
    public int IdTarea { get; set; }
    public string TareaNombre { get; set; }
    public string Descripcion { get; set; }
    public int IdLista { get; set; }
    public int TareaOrden { get; set; }
}