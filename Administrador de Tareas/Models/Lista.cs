namespace Administrador_de_Tareas.Models;

public class Lista
{
    public int IdSeccion { get; set; }
    public string Nombre { get; set; }
    public int IdTablero { get; set; }
    public int Orden { get; set; }
    public List<Tarea> Tareas { get; set; }
}