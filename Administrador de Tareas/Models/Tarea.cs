namespace Administrador_de_Tareas.Models;

public class Tarea
{
    public int IdTarea { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public string Estado { get; set; }
    public int IdSeccion { get; set; }
    public int Orden { get; set; }
}