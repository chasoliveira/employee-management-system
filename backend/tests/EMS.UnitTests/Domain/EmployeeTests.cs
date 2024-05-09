using EMS.Domain;

namespace EMS.UnitTests.Domain;

public class EmployeeTests
{
    [Fact]
    public void Create_Employee_Success()
    {
        // Arrange && Act
        var employee = Employee.Create("first", "last", "email", "Software Engineering", DateOnly.FromDateTime(DateTime.Now));

        // Assert
        employee.Should().NotBeNull();
        employee.FirstName.Should().Be("first");
        employee.LastName.Should().Be("last");
        employee.Email.Should().Be("email");
        employee.JobTitle.Should().Be("Software Engineering");
        employee.DateOfJoining.Should().Be(DateOnly.FromDateTime(DateTime.Now));
        employee.YearsOfService.Should().Be(0);
    }

    [Fact]
    public void Create_Employee_Success_WithYearsOfService()
    {
        // Arrange
        var dateOfJoining = DateOnly.FromDateTime(DateTime.Now.AddYears(-5));

        // Act
        var employee = Employee.Create("first", "last", "email", "Software Engineering", dateOfJoining);

        // Assert
        employee.Should().NotBeNull();
        employee.FirstName.Should().Be("first");
        employee.LastName.Should().Be("last");
        employee.Email.Should().Be("email");
        employee.JobTitle.Should().Be("Software Engineering");
        employee.DateOfJoining.Should().Be(dateOfJoining);
        employee.YearsOfService.Should().Be(5);
    }
}