using EMS.Application.Abstraction.Messaging;
using EMS.Domain;

namespace EMS.Application.Features.Employees;

public record EmployeeGetByIdQuery(Guid Id) : IQuery<Employee>;
