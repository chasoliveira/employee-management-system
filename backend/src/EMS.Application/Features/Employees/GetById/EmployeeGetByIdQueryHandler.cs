using EMS.Application.Abstraction.Messaging;
using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Application.Features.Employees;

public class EmployeeGetByIdQueryHandler : IQueryHandler<EmployeeGetByIdQuery, Employee>
{
    private readonly IEmployeeRepository _repository;
    public EmployeeGetByIdQueryHandler(IEmployeeRepository repository)
    {
        _repository = repository;
    }
    public async Task<Result<Employee>> Handle(EmployeeGetByIdQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetByIdAsync(request.Id, cancellationToken);
    }
}
