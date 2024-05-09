using EMS.Application.Abstraction.Messaging;
using EMS.Application.Features.Users.Login;

namespace EMS.Application.Features.Users.Register;

public sealed record RegisterUserCommand : ICommand<AccessTokenResponse>
{
    public RegisterUserCommand(
        string username,
        string password
    )
    {
        Username = username;
        Password = password;
    }
    public string Username { get; private set; }
    public string Password { get; private set; }
}
