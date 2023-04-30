using Administrador_de_Tareas.Models;

namespace Administrador_de_Tareas.Interfaces;

public interface IListaServicio
{
    Task<int> CrearLista(Lista lista);
    Task<IEnumerable<Lista>> ObtenerListas();
    Task<int> EliminarLista(int id);
    Task ActualizarOrdenLista(int id, int orden);
    Task ActualizarListaNombre(int id, string nombre);
    Task<IEnumerable<Lista>> ObtenerListas(int idTablero);
}