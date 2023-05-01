using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Dapper;

namespace Administrador_de_Tareas.Servicios;

public class ListaServicio : IListaServicio
{
    private readonly IDataContext _context;

    public ListaServicio(IDataContext _context)
    {
        this._context = _context;
    }


    public async Task<Lista> CrearLista(Lista lista)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query =
            @"INSERT INTO Lista 
                (nombre, id_tablero) 
            VALUES 
                (@Nombre, @IdTablero); 
            SELECT CAST(SCOPE_IDENTITY() as int);";
        var idLista =
            await connection.QuerySingleAsync<int>(query,
                new { Nombre = lista.ListaNombre, IdTablero = lista.IdTablero });
        connection.Close();
        return new Lista
        {
            IdTablero = lista.IdTablero,
            ListaNombre = lista.ListaNombre,
            IdLista = idLista,
        };
    }

    public async Task<IEnumerable<Lista>> ObtenerListas()
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @"SELECT * FROM Lista";
        var listas = await connection.QueryAsync<Lista>(query);
        connection.Close();
        return listas;
    }

    public async Task<Lista> ObtenerListaPorId(int id)
    {
        using (var connection = _context.CreateConnection())
        {
            var query = @"SELECT * FROM Lista WHERE id_lista = @id";
            var lista = await connection.QuerySingleAsync<Lista>(query, new { id });

            return lista;
        }
    }

    public async Task<int> EliminarLista(int id)
    {
        using (var connection = _context.CreateConnection())
        {
            var query = @"DELETE FROM Lista WHERE id_lista = @id";
            var filasAfectadas = await connection.ExecuteAsync(query, new { id });

            return filasAfectadas;
        }
    }


    //actualizar order
    public async Task ActualizarOrdenLista(int id, int orden)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @"UPDATE Lista SET orden = @orden WHERE id = @id";
        await connection.ExecuteAsync(query, new { id, orden });
        connection.Close();
    }

    public async Task ActualizarListaNombre(int id, string nombre)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @"UPDATE Lista SET nombre = @nombre WHERE id = @id";
        await connection.ExecuteAsync(query, new { id, nombre });
        connection.Close();
    }

    public async Task<IEnumerable<Lista>> ObtenerListas(int idTablero)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @$"SELECT 
            li.id_lista AS IdLista,
            li.nombre AS ListaNombre,
            li.id_tablero AS IdTablero,
            li.orden AS ListaOrden,
            ta.id_tarea AS IdTarea,
            ta.nombre AS TareaNombre,
            ta.descripcion AS Descripcion,
            ta.id_lista AS IdLista,
            ta.orden AS TareaOrden,
            FROM Lista AS li
         INNER JOIN Tarea ta ON Lista.id = Tarea.id_lista
         WHERE id_tablero = {idTablero}";
        var listas = await connection.QueryAsync<Lista, Tarea, Lista>(query,
            (lista, tarea) =>
            {
                lista.Tareas.Add(tarea);
                return lista;
            }, splitOn: "IdTarea");

        var result = listas.GroupBy(p => p.IdLista).Select(g =>
        {
            var groupedList = g.First();
            groupedList.Tareas = g.Select(p => p.Tareas.Single()).ToList();
            return groupedList;
        });

        connection.Close();
        return result;
    }
}