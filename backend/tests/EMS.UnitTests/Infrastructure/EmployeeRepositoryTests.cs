using EMS.Application.Abstraction;
using EMS.Application.Features.Employees;
using EMS.Domain;
using EMS.Infrastructure.Repositories;

namespace EMS.UnitTests.Infrastructure;

public class EmployeeRepositoryTests : BaseRepositoryTests<Employee>
{
    protected override IBaseRepository<Employee> CreateRepository()
    {
        return new EmployeeRepository(_dbContext);
    }
    protected override Employee CreateEntity()
    {
        return Employee.Create("first", "last", "email", "Software Engineering", DateOnly.FromDateTime(DateTime.Now));
    }
    protected override void UpdateValues(Employee entity)
    {
        entity.Update("first01", "last01", "email@email.com", "Software Engineering II", DateOnly.FromDateTime(DateTime.Now.AddDays(1)));
    }
    protected override void AssertUpdate(Employee entity)
    {
        entity.FirstName.Should().Be("first01");
        entity.LastName.Should().Be("last01");
        entity.Email.Should().Be("email@email.com");
        entity.JobTitle.Should().Be("Software Engineering II");
        entity.DateOfJoining.Should().Be(DateOnly.FromDateTime(DateTime.Now.AddDays(1)));
    }

    [Fact]
    public async Task ExistsByEmailAsync_Success()
    {
        // Arrange
        var cancellationToken = new CancellationToken();
        var entity = CreateEntity();
        _repository.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Act
        var result = await ((IEmployeeRepository)_repository).ExistsByEmailAsync(entity.Email, cancellationToken);

        // Assert
        result.Should().BeTrue();
    }


}
