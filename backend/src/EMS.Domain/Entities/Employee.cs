using EMS.Domain.Abstractions;

namespace EMS.Domain;

public class Employee
{
    private Employee() { }
    private Employee(Guid id, string firstName, string lastName, string email, string jobTitle, DateOnly dateOfJoining)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        JobTitle = jobTitle;
        DateOfJoining = dateOfJoining;
    }

    public Guid Id { get; private set; }
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;

    public string JobTitle { get; set; } = string.Empty;
    public DateOnly DateOfJoining { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    public int YearsOfService => GetYearsOfService();

    public static Employee Create(string firstName, string lastName, string email, string jobTitle, DateOnly dateOfJoining)
    {
        return new Employee(Guid.NewGuid(), firstName, lastName, email, jobTitle, dateOfJoining);
    }

    public void Update(string firstName, string lastName, string email, string jobTitle, DateOnly dateOfJoining)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        JobTitle = jobTitle;
        DateOfJoining = dateOfJoining;
    }

    private int GetYearsOfService()
    {
        DateOnly currentDate = DateOnly.FromDateTime(DateTime.Today);
        int years = currentDate.Year - DateOfJoining.Year;

        // Adjust for leap years (if the current date is before the anniversary)
        if (currentDate.Month < DateOfJoining.Month || (currentDate.Month == DateOfJoining.Month && currentDate.Day < DateOfJoining.Day))
        {
            years--;
        }

        return years;
    }
}
