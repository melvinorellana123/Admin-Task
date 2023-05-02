using Administrador_de_Tareas.Models;

namespace Administrador_de_Tareas.Interfaces;

public interface ITareaServicio
{
    Task<Tarea> CrearTarea(Tarea tarea);
    Task<IEnumerable<Tarea>> ObtenerTareas();
    Task<Tarea> ObtenerTareaPorId(int id);
    Task<int> ActualizarTarea(Tarea tarea);
    Task<int> EliminarTarea(int id);
    Task ActualizarOrdenTarea(int id, int orden);
    Task ActualizarListaTarea(int id, int idLista);
    Task ActualizarOrderYListaTarea(int id, int orden, int idLista);
    Task<IEnumerable<Tarea>> ObtenerTareasPorLista(int idLista);
}