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


    public async Task<int> CrearLista(Lista lista)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query =
            @"INSERT INTO Lista 
                (nombre, id_tablero, orden) 
            VALUES 
                (@nombre, @id_tablero, @orden); 
            SELECT CAST(SCOPE_IDENTITY() as int);";
        var idLista = await connection.QuerySingleAsync<int>(query, lista);
        connection.Close();
        return idLista;
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

    public async Task<int> EliminarLista(int id)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @"DELETE FROM Lista WHERE id = @id";
        var filasAfectadas = await connection.ExecuteAsync(query, new { id });
        connection.Close();
        return filasAfectadas;
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
        var query = @"SELECT * FROM Lista WHERE id_tablero = @idTablero";
        var listas = await connection.QueryAsync<Lista>(query, new { idTablero });
        connection.Close();
        return listas;
    }
}