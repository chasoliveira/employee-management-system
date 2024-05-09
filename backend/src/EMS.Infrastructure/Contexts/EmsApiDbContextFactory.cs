using EMS.Application.Abstraction;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EMS.Infrastructure.Contexts;

public class EmsApiDbContextFactory : IDesignTimeDbContextFactory<EmsApiDbContext>
{
    const string DotNetCoreStartupProject = "Ems.Api";
    public EmsApiDbContext CreateDbContext(string[] args)
    {
        IConfiguration config = GetConfiguration();
        var services = new ServiceCollection()
            .AddPersistence(config)
            .BuildServiceProvider();

        return (EmsApiDbContext)services.GetRequiredService<IDbContext>();
    }

    private static IConfigurationRoot GetConfiguration()
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "..", DotNetCoreStartupProject);
        Console.WriteLine("Using path '{0}'", path);
        return new ConfigurationBuilder()
                    .SetBasePath(path)
                    .AddJsonFile("appsettings.Migration.json")
                    .Build();
    }
}
