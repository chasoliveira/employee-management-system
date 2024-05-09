using EMS.Application.Abstraction;
using EMS.Application.Abstraction.Messaging;
using EMS.Domain.Abstractions;
using MediatR;

namespace EMS.Application.Features.Users.SetAsAdmin;

public class SetAsAdminCommandHandler : ICommandHandler<SetAsAdminCommand, Unit>
{
    private readonly IUserRepository _userRepository;
    private readonly IDbContext _dbContext;

    public SetAsAdminCommandHandler(IUserRepository userRepository, IDbContext dbContext)
    {
        _userRepository = userRepository;
        _dbContext = dbContext;
    }

    public async Task<Result<Unit>> Handle(SetAsAdminCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken);
        if (user is null)
            return Result.Failure<Unit>("User not found!", "User.Id");
        user.SetAsAdmin();

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}