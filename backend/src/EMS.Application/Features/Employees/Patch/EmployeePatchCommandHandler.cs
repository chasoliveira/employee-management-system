using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Messaging;
using EMS.Domain.Abstractions;
using MediatR;

namespace EMS.Application.Features.Employees;

public class EmployeePatchCommandHandler : ICommandHandler<EmployeePatchCommand, Unit>
{
    private readonly IEmployeeRepository _repository;
    private readonly IDbContext _dbContext;

    public EmployeePatchCommandHandler(IEmployeeRepository repository, IDbContext dbContext)
    {
        _repository = repository;
        _dbContext = dbContext;
    }
    public async Task<Result<Unit>> Handle(EmployeePatchCommand request, CancellationToken cancellationToken)
    {
        var employee = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (employee is null)
            return Result.Failure<Unit>("Employee not found!", "Employee");

        request.Patch.ApplyTo(employee, new PatchIgnoreCaseAdapter());
        _repository.Update(employee);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
