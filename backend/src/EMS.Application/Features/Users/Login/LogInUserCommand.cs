using EMS.Application.Abstraction.Messaging;

namespace EMS.Application.Features.Users.Login;
public sealed record LogInUserCommand(string Username, string Password) : ICommand<AccessTokenResponse>;
