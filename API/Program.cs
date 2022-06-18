using API._Repositories;
using API._Services.Interfaces;
using API._Services.Services;
using API.Data;
using API.Helpers.AutoMapper;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSqlServer<DemoContext>(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddCors();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IMapper>(sp => new Mapper(AutoMapperConfig.RegisterMappings()));
builder.Services.AddSingleton(AutoMapperConfig.RegisterMappings());

// Add scoped services to the container.
builder.Services.AddScoped<IRepositoryAccessor, RepositoryAccessor>();
builder.Services.AddScoped<IMarathonFormService, MarathonFormService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
