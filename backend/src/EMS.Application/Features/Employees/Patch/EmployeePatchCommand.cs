using EMS.Application.Abstraction.Messaging;
using EMS.Domain;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace EMS.Application.Features.Employees;

public record EmployeePatchCommand(Guid Id, JsonPatchDocument<Employee> Patch) : ICommand<Unit>;
