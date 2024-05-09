using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Authentication;
using EMS.Application.Abstraction.Authetication;
using EMS.Application.Abstraction.Messaging;
using EMS.Application.Features.Users.Login;
using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Application.Features.Users.Register;

public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand, AccessTokenResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IAuthenticationService _authenticationService;

    public RegisterUserCommandHandler(
          IUserRepository userRepository,
          IAuthenticationService authenticationService)
    {
        _userRepository = userRepository;
        _authenticationService = authenticationService;
    }

    public async Task<Result<AccessTokenResponse>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        bool existsWitUsername = await _userRepository.ExistsByUsernameAsync(request.Username, cancellationToken);
        if (existsWitUsername)
            return Result.Failure<AccessTokenResponse>("Username already exists!", "User");

        var user = User.Create(request.Username, request.Password, false);
        var result = await _authenticationService.RegisterAsync(user, cancellationToken);
        if (result.IsFailure)
            return Result.Failure<AccessTokenResponse>(result.Error!);

        return new AccessTokenResponse(result.Data);
    }
}