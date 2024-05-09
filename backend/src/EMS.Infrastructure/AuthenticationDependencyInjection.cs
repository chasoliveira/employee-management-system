using System.Text;
using EMS.Application.Abstraction.Authentication;
using EMS.Application.Abstraction.Authetication;
using EMS.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace EMS.Infrastructure;

internal static class AuthenticationDependencyInjection
{
  public static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped<IAuthenticationService, AuthenticationService>();

    services
      .AddHttpContextAccessor()
      .AddAuthorization()
      .AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = "ems-issuer",
          ValidAudience = "ems-audience",
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtService.SECRETE))
        };
      });

    services.AddScoped<IJwtService, JwtService>();

    return services;
  }
}