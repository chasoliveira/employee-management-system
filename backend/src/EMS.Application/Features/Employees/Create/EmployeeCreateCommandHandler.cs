using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Messaging;
using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Application.Features.Employees;

public class EmployeeCreateCommandHandler : ICommandHandler<EmployeeCreateCommand, Guid>
{
    private readonly IEmployeeRepository _repository;
    private readonly IDbContext _dbContext;

    public EmployeeCreateCommandHandler(IEmployeeRepository repository, IDbContext dbContext)
    {
        _repository = repository;
        _dbContext = dbContext;
    }
    public async Task<Result<Guid>> Handle(EmployeeCreateCommand request, CancellationToken cancellationToken)
    {
        bool exists = await _repository.ExistsByEmailAsync(request.Email, cancellationToken);
        if (exists)
            return Result.Failure<Guid>("Employee with this email already exists", "Employee");

        var employee = Employee.Create(request.FirstName, request.LastName, request.Email, request.JobTitle, request.DateOfJoining);

        _repository.Add(employee);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return employee.Id;
    }
}