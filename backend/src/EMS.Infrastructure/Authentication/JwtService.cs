using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EMS.Application.Abstraction.Authetication;
using EMS.Domain;
using EMS.Domain.Abstractions;
using Microsoft.IdentityModel.Tokens;

namespace EMS.Infrastructure.Authentication;

public class JwtService: IJwtService
{
    public const string SECRETE = "78ecc1b3-ff9a-4b56-aaa2-65fa98618d4c";
    private readonly JwtSecurityTokenHandler _tokenHandler;
    public JwtService()
    {
        _tokenHandler = new JwtSecurityTokenHandler();
    }

    public Result<string> GenerateToken(User user)
    {
        var key = Encoding.ASCII.GetBytes(SECRETE);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin": "User"),
                new Claim("aud", "ems-audience"),
                new Claim("iss", "ems-issuer")
            ]),
            Expires = DateTime.UtcNow.AddMinutes(30),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);
        return _tokenHandler.WriteToken(token);
    }
}

