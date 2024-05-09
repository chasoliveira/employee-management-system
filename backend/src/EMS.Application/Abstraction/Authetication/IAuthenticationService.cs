using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Application.Abstraction.Authentication;

public interface IAuthenticationService
{
  Task<Result<string>> LoginAsync(string username, string password, CancellationToken cancellationToken);
  Task<Result<string>> RegisterAsync(User user, CancellationToken cancellationToken = default);
}
