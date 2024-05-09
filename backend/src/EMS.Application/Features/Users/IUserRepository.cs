using EMS.Application.Abstraction;
using EMS.Domain;

namespace EMS.Application.Features.Users;

public interface IUserRepository : IBaseRepository<User>
{
    Task<bool> ExistsByUsernameAsync(string username, CancellationToken cancellationToken);
    Task<User?> GetByUsernameAndPasswordAsync(string username, string password, CancellationToken cancellationToken);
}