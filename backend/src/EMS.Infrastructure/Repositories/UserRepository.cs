using EMS.Application.Abstraction;
using EMS.Application.Features.Users;
using EMS.Domain;
using Microsoft.EntityFrameworkCore;

namespace EMS.Infrastructure.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(IDbContext dbContext) : base(dbContext)
    { }

    public Task<bool> ExistsByUsernameAsync(string username, CancellationToken cancellationToken)
    {
        return DbSet.AnyAsync(u => u.Username == username, cancellationToken);
    }

    public Task<User?> GetByUsernameAndPasswordAsync(string username, string password, CancellationToken cancellationToken)
    {
        return DbSet
                .Where(u => u.Username == username && u.Password == password)
                .FirstOrDefaultAsync(cancellationToken);
    }
}
