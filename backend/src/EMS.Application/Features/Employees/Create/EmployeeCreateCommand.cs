using EMS.Application.Abstraction.Messaging;

namespace EMS.Application.Features.Employees;

public record EmployeeCreateCommand(
    string FirstName,
    string LastName,
    string Email,
    string JobTitle,
    DateOnly DateOfJoining) : ICommand<Guid>;
