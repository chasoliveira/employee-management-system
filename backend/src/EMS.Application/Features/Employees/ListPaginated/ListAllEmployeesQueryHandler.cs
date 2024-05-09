using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Messaging;
using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Application.Features.Employees;

public class ListAllEmployeesQueryHandler : IQueryHandler<ListAllEmployeesQuery, PaginatedCollection<Employee>>{
    private readonly IEmployeeRepository _repository;

    public ListAllEmployeesQueryHandler(IEmployeeRepository repository)
    {
        _repository = repository;
    }
    public async Task<Result<PaginatedCollection<Employee>>> Handle(ListAllEmployeesQuery request, CancellationToken cancellationToken)
    {
        (int Total, IEnumerable<Employee> Items) =
            await _repository.GetPaginatedAsync(
                                request.NameOrJobTitle,
                                request.Page,
                                request.Limit,
                                cancellationToken);
                                
        return new PaginatedCollection<Employee>(request.Page, request.Limit, Total, Items);
    }
}