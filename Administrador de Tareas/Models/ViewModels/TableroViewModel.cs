namespace Administrador_de_Tareas.Models.ViewModels;

public class TableroViewModel
{
    public int IdTablero { get; set; }
    public string NombreTablero { get; set; }
    public IList<Lista> Listas { get; set; }
}

 