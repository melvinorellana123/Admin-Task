using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Administrador_de_Tareas.Models.ViewModels;
using Dapper;

namespace Administrador_de_Tareas.Servicios;

public class TareaServicio : ITareaServicio
{
    private readonly IDataContext _dataContext;

    public TareaServicio(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Tarea> CrearTarea(Tarea tarea)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        //select last Tarea inserted
        var query =
            @"INSERT INTO Tarea 
                (nombre, descripcion, id_lista ) 
            VALUES 
                (@TareaNombre, @descripcion, @idLista );
            SELECT 
                id_tarea as IdTarea,
                nombre as TareaNombre,
                descripcion as Descripcion,
                id_lista as IdLista,
                orden as TareaOrden
            FROM Tarea WHERE id_tarea =  SCOPE_IDENTITY()  ;         
";

        var tareaCreada = await connection.QuerySingleAsync<Tarea>(query, tarea);
        connection.Close();
        return tareaCreada;
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

    public async Task MoverTareaASeccion(MoverTareaVM moverTareaDto)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();

        var query = @"
        UPDATE Tarea SET 
                id_lista = @IdListaTo, 
                orden = @TareaToOrden
            WHERE id_tarea = @TareaFromId;
        
";

        await connection.ExecuteAsync(query, new
        {
            TareToId = moverTareaDto.TareaTo.IdTarea,
            TareaToOrden = moverTareaDto.TareaTo.TareaOrden,
            TareaFromId = moverTareaDto.TareaFrom.IdTarea,
            TareaFromOrden = moverTareaDto.TareaFrom.TareaOrden,
            IdListaTo = moverTareaDto.TareaTo.IdLista,
            IdListaFrom = moverTareaDto.TareaFrom.IdLista
        });
        connection.Close();
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
                nombre = @TareaNombre, 
                descripcion = @Descripcion, 
                id_lista = @IdLista, 
                orden = @TareaOrden
            WHERE id_tarea = @IdTarea";

        var idTask = await connection.ExecuteAsync(query, tarea);
        connection.Close();
        return idTask;
    }

    public async Task<int> EliminarTarea(int id)
    {
        using var connection = _dataContext.CreateConnection();
        connection.Open();
        var query = @"DELETE FROM Tarea WHERE id_tarea = @id";
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