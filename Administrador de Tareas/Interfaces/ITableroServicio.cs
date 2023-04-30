using Administrador_de_Tareas.Models;
using Administrador_de_Tareas.Models.ViewModels;

namespace Administrador_de_Tareas.Servicios;

public interface ITableroServicio
{
    Task<int> CrearTablero(Tablero tablero);
    Task<IEnumerable<Tablero>> ObtenerTableros();
    Task<List<Lista>> ObtenerListasPorId(int id);
}