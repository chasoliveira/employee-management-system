using EMS.Application.Features.Users.Register;

namespace EMS.Api.Features.Users;

public sealed record RegisterUserRequest(
    string Username,
    string Password)
{
    public RegisterUserCommand ToCommand() => new(Username, Password);
}
