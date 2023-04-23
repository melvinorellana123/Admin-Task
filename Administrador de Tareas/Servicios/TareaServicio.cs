using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Models;

namespace Administrador_de_Tareas.Servicios;

public class TareaServicio
{
    private readonly IDataContext _dataContext;

    public TareaServicio(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async void  CrearTarea(Tarea tarea)
    {
        // CREATE TABLE Tarea (
        //     id_tarea INT PRIMARY KEY,
        //     nombre VARCHAR(50) NOT NULL,
        //     descripcion VARCHAR(255) NOT NULL,
        //     id_seccion INT NOT NULL,
        //     orden INT NOT NULL,
        //     FOREIGN KEY (id_seccion) REFERENCES Seccion(id_seccion)
        // );

        using var connection = _dataContext.CreateConnection();

        var query =
            @"INSERT INTO Tarea 
                (id_tarea, nombre, descripcion, id_seccion, orden) 
            VALUES 
                (@id_tarea, @nombre, @descripcion, @id_seccion, @orden)";
        
        
    }
}