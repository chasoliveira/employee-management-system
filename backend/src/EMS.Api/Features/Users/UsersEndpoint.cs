using EMS.Api.Extensions;
using EMS.Application.Features.Users.Login;
using EMS.Application.Features.Users.SetAsAdmin;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Features.Users;

internal static class UsersEndpoint
{
    public static IEndpointRouteBuilder MapUsersApi(this IEndpointRouteBuilder app, string apiVersion)
    {
        var group = app.MapGroup($"{apiVersion}/users");
        group
            .MapPost("/register", RegisterAsync)
            .WithName("RegisterUser")
            .WithDescription("Register a new user and returns a Json Web Token (JWT)")
            .WithSummary("Register a new user returning a JTW")
            .AllowAnonymous();

        group
            .MapPost("/{id}/set-as-admin", SetUserAsAdminAsync)
            .WithName("SetUserAsAdmin")
            .WithDescription("Give the user admin rights and returns a Json Web Token (JWT)")
            .WithSummary("Set user as admin")
            .RequireAuthorization("Admin");

        group
            .MapPost("/login", AuthenticateAsync)
            .WithName("AuthenticateUser")
            .WithDescription("If the user and password are allowed then it returns a Json Web Token (JWT)")
            .WithSummary("Return a JTW")
            .AllowAnonymous();

        group
            .WithTags("JWT Autentication")
            .WithOpenApi()
            .RequireAuthorization();

        return app;
    }
    private static async Task<Results<Ok<AccessTokenResponse>, ValidationProblem>> RegisterAsync(
        [FromServices] IMediator mediator,
        [FromBody] RegisterUserRequest request,
        CancellationToken cancellationToken = default
    )
    {
        var result = await mediator.Send(request.ToCommand(), cancellationToken);
        if (result.IsFailure)
            return TypedResults.ValidationProblem(result.ToProblem());

        return TypedResults.Ok(result.Data);
    }

    public static async Task<Results<Ok<AccessTokenResponse>, ValidationProblem>> AuthenticateAsync(
        [FromServices] IMediator mediator,
        [FromBody] LogInUserRequest request,
        CancellationToken cancellationToken = default
    )
    {
        var result = await mediator.Send(request.ToCommand(), cancellationToken);
        return result.IsFailure ?
            TypedResults.ValidationProblem(result.ToProblem()) :
            TypedResults.Ok(result.Data);
    }

    private static async Task<Results<NoContent, ValidationProblem>> SetUserAsAdminAsync(
        [FromServices] IMediator mediator,
        [FromRoute] Guid id,
        CancellationToken cancellationToken = default
    )
    {
        var result = await mediator.Send(new SetAsAdminCommand(id), cancellationToken);
        if (result.IsFailure)
            return TypedResults.ValidationProblem(result.ToProblem());

        return TypedResults.NoContent();
    }
}