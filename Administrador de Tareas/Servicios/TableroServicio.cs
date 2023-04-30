using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;
using Administrador_de_Tareas.Models.ViewModels;
using Dapper;

namespace Administrador_de_Tareas.Servicios;

public class TableroServicio : ITableroServicio
{
    private readonly IDataContext _context;

    public TableroServicio(IDataContext _context)
    {
        this._context = _context;
    }

    public async Task<IEnumerable<Tablero>> ObtenerTableros()
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @"SELECT  
            [id_tablero] as IdTablero,
            [nombre] FROM Tablero";
        var tableros = await connection.QueryAsync<Tablero>(query);
        connection.Close();
        return tableros;
    }

    public async Task<int> CrearTablero(Tablero tablero)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query =
            @"INSERT INTO Tablero 
                (nombre ) 
            VALUES 
                (@nombre );
            SELECT CAST(SCOPE_IDENTITY() as int);";
        var id = await connection.QuerySingleAsync(query, tablero);
        connection.Close();
        return id;
    }

    public async Task<List<Lista>> ObtenerListasPorId(int id)
    {
        using var connection = _context.CreateConnection();
        connection.Open();
        var query = @$"SELECT 
                       l.id_lista      as IdLista,
                       l.nombre        as ListaNombre,
                       l.orden         as ListaOrden,
                       tar.id_tarea    as IdTarea,
                       tar.nombre      as TareaNombre,
                       tar.descripcion as Descripcion,
                       tar.orden       as TareaOrden
                FROM Tablero as t
                         INNER JOIN Lista as l ON l.id_tablero = t.id_tablero
                         INNER JOIN Tarea as tar ON tar.id_lista = l.id_lista
                WHERE t.id_tablero = {id};";

        var listas = await connection.QueryAsync<Lista, Tarea, Lista>(query,
            (lista, tarea) =>
            {
                lista.Tareas.Add(tarea);
                return lista;
            }
            , splitOn: "IdTarea"
        );

        var result = listas.GroupBy(p => p.IdLista).Select(g =>
        {
            var groupedList = g.First();
            groupedList.Tareas = g.Select(p => p.Tareas.Single()).ToList();
            return groupedList;
        });

        connection.Close();

        return result.ToList();
    }
}

public class TableroListaTarea
{
    public int IdTablero { get; set; }
    public string NombreTablero { get; set; }
    public int IdLista { get; set; }
    public string ListaNombre { get; set; }
    public int ListaOrden { get; set; }
    public int IdTarea { get; set; }
    public string TareaNombre { get; set; }
    public string Descripcion { get; set; }
    public int TareaOrden { get; set; }
}