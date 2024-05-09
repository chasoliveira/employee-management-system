using EMS.Api;
using EMS.Api.Extensions;
using EMS.Api.Features.Employees;
using EMS.Api.Features.Users;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

const string APIVersion = "/api/v1";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddEmsSwagger();
builder.Services.AddProblemDetails();

builder.Host.UseSerilog((context, configuration) =>
   configuration.ReadFrom.Configuration(context.Configuration));

builder.Services.AddPresentation(builder.Configuration);
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.UseErrorHandling();

app.MapUsersApi(APIVersion);
app.MapEmployees(APIVersion);
app.MapDefaultRun();

app.Run();
