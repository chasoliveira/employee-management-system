using EMS.Application.Abstraction.Messaging;
using EMS.Application.Features.Users.Login;

namespace EMS.Api.Features.Users;

public sealed record LogInUserRequest(string Username, string Password) : ICommand<LogInUserCommand>
{
    public LogInUserCommand ToCommand() => new(Username, Password);
};
