namespace Administrador_de_Tareas.Models;

public class Tablero
{
    public int IdTablero { get; set; }
    public string Nombre { get; set; }
    public List<Lista> Secciones { get; set; }
}