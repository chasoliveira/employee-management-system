using System.Reflection;
using EMS.Application;
using EMS.Infrastructure;

namespace EMS.Api;
public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddApplication()
            .AddInfrastructure(configuration);
        return services;
    }

    /// <summary>
    /// This is a default run for the application, it will be used when the root endpoint is requested
    /// </summary>
    /// <param name="app">The IApplicationBuilder instance</param>
    public static void MapDefaultRun(this IApplicationBuilder app)
    {
        app.MapWhen(context => context.Request.Path == "/", app => app.Run(context =>
        {
            var assemblyName = Assembly.GetExecutingAssembly().GetName().Name;
            return context.Response.WriteAsync($"{assemblyName} is up and running!");
        }));
    }
}