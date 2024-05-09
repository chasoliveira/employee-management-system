namespace EMS.Application.Abstraction;

public interface IDbContext{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}