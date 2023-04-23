using System.Data;
using System.Data.SqlClient;
using Administrador_de_Tareas.Interfaces;

namespace Administrador_de_Tareas.Data;

public class DataContext : IDataContext
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public DataContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("ConnectionStrings");
    }

    public IDbConnection CreateConnection()
        => new SqlConnection(_connectionString);
}