using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Messaging;
using EMS.Domain;

namespace EMS.Application.Features.Employees;

public record ListAllEmployeesQuery(string? NameOrJobTitle, int Page, int Limit) : IQuery<PaginatedCollection<Employee>>;
