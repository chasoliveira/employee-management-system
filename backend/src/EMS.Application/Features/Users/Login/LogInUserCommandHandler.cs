
using EMS.Application.Abstraction.Authentication;
using EMS.Application.Abstraction.Messaging;
using EMS.Domain.Abstractions;

namespace EMS.Application.Features.Users.Login;

internal sealed class LogInUserCommandHandler : ICommandHandler<LogInUserCommand, AccessTokenResponse>
{
    private readonly IAuthenticationService _authService;

    public LogInUserCommandHandler(IAuthenticationService authService)
    {
        _authService = authService;
    }

    public async Task<Result<AccessTokenResponse>> Handle(
        LogInUserCommand request,
        CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(
            request.Username,
            request.Password,
            cancellationToken);

        return result.IsFailure
            ? Result.Failure<AccessTokenResponse>(result.Error!)
            : (Result<AccessTokenResponse>)new AccessTokenResponse(result.Data);
    }
}