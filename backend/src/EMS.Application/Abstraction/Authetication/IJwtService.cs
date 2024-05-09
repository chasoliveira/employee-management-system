using EMS.Domain;
using EMS.Domain.Abstractions;

namespace EMS.Application.Abstraction.Authetication;

public interface IJwtService
{
    Result<string> GenerateToken(User user);
}
