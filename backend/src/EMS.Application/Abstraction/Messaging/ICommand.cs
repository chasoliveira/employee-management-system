using EMS.Domain.Abstractions;
using MediatR;

namespace EMS.Application.Abstraction.Messaging;

public interface IBaseCommand { }
public interface ICommand : IRequest<Result>, IBaseCommand
{
}

public interface ICommand<TResponse> : IRequest<Result<TResponse>>, IBaseCommand
{
}
