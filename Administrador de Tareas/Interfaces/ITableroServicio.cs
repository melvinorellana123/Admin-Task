using Administrador_de_Tareas.Models;

namespace Administrador_de_Tareas.Servicios;

public interface ITableroServicio
{
    Task<IEnumerable<Tablero>> ObtenerTableros();
    Task<List<Lista>> ObtenerListasPorId(int id);
    Task<Tablero> CrearTablero(string tableroNombre);
    Task EliminarTablero(int id);
    Task EditarTablero(Tablero tablero);
}