using EMS.Application.Abstraction.Messaging;
using EMS.Application.Features.Employees;

namespace EMS.Api.Features.Employees;

public sealed record EmployeeCreateRequest(
    string FirstName,
    string LastName,
    string Email,
    string JobTitle,
    DateOnly DateOfJoining
) : ICommand<EmployeeCreateCommand>
{
    public EmployeeCreateCommand ToCommand()
    {
        return new(FirstName, LastName, Email, JobTitle, DateOfJoining);
    }
}
