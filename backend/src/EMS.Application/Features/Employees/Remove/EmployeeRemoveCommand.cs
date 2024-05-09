using EMS.Application.Abstraction.Messaging;
using MediatR;

namespace EMS.Application.Features.Employees;

public record EmployeeRemoveCommand(Guid Id) : ICommand<Unit>;

