using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Authentication;
using EMS.Application.Abstraction.Authetication;
using EMS.Application.Features.Users;
using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Infrastructure.Authentication;

internal sealed class AuthenticationService : IAuthenticationService
{
  private readonly IDbContext _dbContext;
  private readonly IUserRepository _userRepository;
  private readonly IJwtService _jwtService;

  public AuthenticationService(IDbContext dbContext, IUserRepository userRepository, IJwtService jwtService)
  {
    _dbContext = dbContext;
    _userRepository = userRepository;
    _jwtService = jwtService;
  }

  public async Task<Result<string>> LoginAsync(string username, string password, CancellationToken cancellationToken)
  {
    User? user = await _userRepository.GetByUsernameAndPasswordAsync(username, password, cancellationToken);
    if (user is null)
      return Result.Failure<string>("User not found!", "User.Login");

    return _jwtService.GenerateToken(user);
  }

  public async Task<Result<string>> RegisterAsync(User user, CancellationToken cancellationToken = default)
  {
    _userRepository.Add(user);
    await _dbContext.SaveChangesAsync(cancellationToken);

    var token = _jwtService.GenerateToken(user);
    return token;
  }
}
