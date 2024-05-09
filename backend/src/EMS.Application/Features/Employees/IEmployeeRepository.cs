using EMS.Application.Abstraction;
using EMS.Domain;

namespace EMS.Application.Features.Employees;

public interface IEmployeeRepository : IBaseRepository<Employee>
{
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken);
    Task<(int Total, IEnumerable<Employee> Items)> GetPaginatedAsync(string? nameOrJobTitle, int page, int limit, CancellationToken cancellationToken);
}