using EMS.Application.Abstraction;
using EMS.Application.Features.Employees;
using EMS.Domain;
using Microsoft.EntityFrameworkCore;

namespace EMS.Infrastructure.Repositories;

public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
{
    public EmployeeRepository(IDbContext dbContext) : base(dbContext)
    { }

    public Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return DbSet.AnyAsync(e => e.Email == email, cancellationToken);
    }

    public async Task<(int Total, IEnumerable<Employee> Items)> GetPaginatedAsync(string? nameOrJobTitle, int page, int limit, CancellationToken cancellationToken)
    {
        var query = DbSet.Where(e => nameOrJobTitle == null ||
                                    (e.FirstName.Contains(nameOrJobTitle) ||
                                    e.LastName.Contains(nameOrJobTitle) ||
                                    e.JobTitle.Contains(nameOrJobTitle))
                                );

        var total = await query.CountAsync(cancellationToken);
        page = page <= 0 ? 1 : page;
        limit = limit < 0 ? 10 : limit;

        var items = await query
                            .OrderByDescending(e => e.DateOfJoining)
                            .Skip((page - 1) * limit)
                            .Take(limit)
                            .ToListAsync(cancellationToken);

        return (total, items);
    }
}