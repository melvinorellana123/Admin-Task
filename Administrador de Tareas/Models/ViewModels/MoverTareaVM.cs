namespace Administrador_de_Tareas.Models.ViewModels;

public class MoverTareaVM
{
    public bool ParaUltimaPosicion { get; set; }
    public Tarea TareaFrom { get; set; }
    public Tarea TareaTo { get; set; }
}