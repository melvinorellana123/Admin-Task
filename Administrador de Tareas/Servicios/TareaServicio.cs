using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Dapper;

namespace Administrador_de_Tareas.Servicios;

public class TareaServicio : ITareaServicio
{
    private readonly IDataContext _dataContext;

    public TareaServicio(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<int> CrearTarea(Tarea tarea)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query =
            @"INSERT INTO Tarea 
                (nombre, descripcion, id_lista, orden) 
            VALUES 
                (@nombre, @descripcion, @idLista, @orden);
            SELECT CAST(SCOPE_IDENTITY() as int);";

        var idTask = await connection.QuerySingleAsync<int>(query, tarea);
        connection.Close();
        return idTask;
    }

    public async Task<IEnumerable<Tarea>> ObtenerTareas()
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"SELECT * FROM Tarea";
        var tareas = await connection.QueryAsync<Tarea>(query);
        connection.Close();
        return tareas;
    }
    
    public async Task<IEnumerable<Tarea>> ObtenerTareasPorLista(int idLista)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"SELECT * FROM Tarea WHERE id_lista = @idLista";
        var tareas = await connection.QueryAsync<Tarea>(query, new { idLista });
        connection.Close();
        return tareas;
    }

    public async Task<Tarea> ObtenerTareaPorId(int id)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"SELECT * FROM Tarea WHERE id = @id";
        var tarea = await connection.QuerySingleAsync<Tarea>(query, new { id });
        connection.Close();
        return tarea;
    }

    public async Task<int> ActualizarTarea(Tarea tarea)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query =
            @"UPDATE Tarea SET 
                nombre = @nombre, 
                descripcion = @descripcion, 
                id_lista = @idLista, 
                orden = @orden
            WHERE id = @id";

        var idTask = await connection.ExecuteAsync(query, tarea);
        connection.Close();
        return idTask;
    }

    public async Task<int> EliminarTarea(int id)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"DELETE FROM Tarea WHERE id = @id";
        var idTask = await connection.ExecuteAsync(query, new { id });
        connection.Close();
        return idTask;
    }

    public async Task ActualizarOrdenTarea(int id, int orden)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"UPDATE Tarea SET orden = @orden WHERE id = @id";
        await connection.ExecuteAsync(query, new { id, orden });
        connection.Close();
    }

    public async Task ActualizarListaTarea(int id, int idLista)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"UPDATE Tarea SET id_lista = @idLista WHERE id = @id";
        await connection.ExecuteAsync(query, new { id, idLista });
        connection.Close();
    }

    public async Task ActualizarOrderYListaTarea(int id, int orden, int idLista)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"UPDATE Tarea SET orden = @orden, id_lista = @idLista WHERE id = @id";
        await connection.ExecuteAsync(query, new { id, orden, idLista });
        connection.Close();
    }
}