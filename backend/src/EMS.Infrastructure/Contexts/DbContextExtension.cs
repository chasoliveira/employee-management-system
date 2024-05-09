using System.Diagnostics.CodeAnalysis;
using EMS.Application.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace EMS.Infrastructure.Contexts;

[ExcludeFromCodeCoverage]
public static class DbContextExtension
{
    public static DbSet<TEntity> GetDbSet<TEntity>(this IDbContext dbContext)
        where TEntity : class
    {
        var dfqXApiDbContext = (EmsApiDbContext)dbContext;
        return dfqXApiDbContext.Set<TEntity>();
    }
}