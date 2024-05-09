using EMS.Application.Abstraction.Messaging;
using MediatR;

namespace EMS.Application.Features.Users.SetAsAdmin;

public record SetAsAdminCommand(Guid UserId) : ICommand<Unit>;
