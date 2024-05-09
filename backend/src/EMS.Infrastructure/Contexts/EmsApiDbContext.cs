using EMS.Application.Abstraction;
using EMS.Domain;
using Microsoft.EntityFrameworkCore;

namespace EMS.Infrastructure.Contexts;

public class EmsApiDbContext : DbContext, IDbContext
{
    public EmsApiDbContext(DbContextOptions<EmsApiDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(EmsApiDbContext).Assembly);
    }
    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
}
