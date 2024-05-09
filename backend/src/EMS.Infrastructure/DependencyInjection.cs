using EMS.Application.Abstraction;
using EMS.Application.Features.Employees;
using EMS.Application.Features.Users;
using EMS.Infrastructure.Contexts;
using EMS.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EMS.Infrastructure;

public static class DependencyInjection
{
  public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IEmployeeRepository, EmployeeRepository>();
    
    services
      .AddPersistence(configuration)
      .AddAuthentication(configuration);

    return services;
  }

  internal static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
  {
    var connectionString = configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrWhiteSpace(connectionString))
      throw new InvalidOperationException("Connection string is missing");

    services.AddDbContext<IDbContext, EmsApiDbContext>(options =>
    {
      options.UseSqlServer(connectionString, b => b.MigrationsAssembly(typeof(EmsApiDbContext).Assembly.FullName));
    });

    return services;
  }
}