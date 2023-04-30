using Administrador_de_Tareas.Data;
using Administrador_de_Tareas.Interfaces;
using Administrador_de_Tareas.Servicios;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IDataContext, DataContext>();

builder.Services.AddTransient<ITableroServicio, TableroServicio>();
builder.Services.AddTransient<IListaServicio, ListaServicio>();
builder.Services.AddTransient<ITareaServicio, TareaServicio>();

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();