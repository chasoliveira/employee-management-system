using EMS.Application.Abstraction;
using EMS.Application.Features.Employees;
using EMS.Domain;

namespace EMS.UnitTests.Application;

public class EmployeeCreateCommandHandlerTests
{
    private readonly Mock<IDbContext> _dbContext;
    private readonly Mock<IEmployeeRepository> repository;

    private readonly EmployeeCreateCommandHandler _sut;

    public EmployeeCreateCommandHandlerTests()
    {
        _dbContext = new Mock<IDbContext>();
        repository = new Mock<IEmployeeRepository>();
        _sut = new EmployeeCreateCommandHandler(repository.Object, _dbContext.Object);
    }

    [Fact]
    public async Task Handle_ReturnsFailure_WhenEmailAlreadyExists()
    {
        // Arrange
        var command = new EmployeeCreateCommand("first", "last", "email", "Admin", DateOnly.FromDateTime(DateTime.Now));
        repository.Setup(ur => ur.ExistsByEmailAsync(command.Email, default)).ReturnsAsync(true);

        // Act
        var result = await _sut.Handle(command, default);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().NotBeNull();
        repository.Verify(ur => ur.ExistsByEmailAsync(command.Email, default), Times.Once);
        repository.Verify(ur => ur.Add(It.IsAny<Employee>()), Times.Never);
        _dbContext.Verify(ctx => ctx.SaveChangesAsync(default), Times.Never);
    }


    [Fact]
    public async Task Handle_ReturnsSuccess_WhenEmployeeCreated()
    {
        // Arrange
        var command = new EmployeeCreateCommand("first", "last", "email", "Admin", DateOnly.FromDateTime(DateTime.Now));
        repository.Setup(ur => ur.ExistsByEmailAsync(command.Email, default)).ReturnsAsync(false);

        // Act
        var result = await _sut.Handle(command, default);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().NotBeEmpty();
        repository.Verify(ur => ur.ExistsByEmailAsync(command.Email, default), Times.Once);
        repository.Verify(ur => ur.Add(It.Is<Employee>(
            e => e.FirstName == command.FirstName
                && e.Email == command.Email
        )), Times.Once);
        _dbContext.Verify(uow => uow.SaveChangesAsync(default), Times.Once);
    }
}