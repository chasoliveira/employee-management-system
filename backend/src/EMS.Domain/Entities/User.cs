namespace EMS.Domain;

public class User
{
    private User() { }

    private User(Guid id, string username, string password, bool isAdmin)
    {
        Id = id;
        Username = username;
        Password = password;
        IsAdmin = isAdmin;
    }

    public Guid Id { get; private set; }
    public string Username { get; private set; } = string.Empty;
    public string Password { get; private set; } = string.Empty;
    public bool IsAdmin { get; private set; }

    public static User Create(string username, string password, bool isAdmin)
    {
        return new User(Guid.NewGuid(), username, password, isAdmin);
    }

    public void SetAsAdmin()
    {
        IsAdmin = true;
    }

    public void SetIdentityId(string identityId)
    {
        Password = identityId;
    }
}