using FluentValidation;

namespace EMS.Application.Features.Users.Login;

public sealed class LogInUserCommandValidator : AbstractValidator<LogInUserCommand>
{
    public LogInUserCommandValidator()
    {
        RuleFor(c => c.Username).MinimumLength(3);
        RuleFor(c => c.Password).NotEmpty();
    }
}
