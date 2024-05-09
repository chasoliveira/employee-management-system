using EMS.Application.Features.Employees;
using FluentValidation;

namespace EMS.Application.Features.Users.Register;

public sealed class EmployeeCreateCommandValidator : AbstractValidator<EmployeeCreateCommand>
{
    public EmployeeCreateCommandValidator()
    {
        RuleFor(c => c.FirstName).MinimumLength(3).MaximumLength(120);
        RuleFor(c => c.LastName).NotEmpty().MinimumLength(5);
        RuleFor(c => c.JobTitle).NotEmpty().MinimumLength(5);
        RuleFor(c => c.Email).EmailAddress().MinimumLength(5);
        RuleFor(c => c.DateOfJoining).LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Today));
    }
}
