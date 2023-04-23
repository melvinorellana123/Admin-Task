using System.Data;

namespace Administrador_de_Tareas.Interfaces;

public interface IDataContext
{
    IDbConnection CreateConnection();
}