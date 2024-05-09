using FluentValidation;

namespace EMS.Application.Features.Users.Register;

public sealed class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(c => c.Username).MinimumLength(3).MaximumLength(120);
        RuleFor(c => c.Password).NotEmpty().MinimumLength(5);
    }
}
