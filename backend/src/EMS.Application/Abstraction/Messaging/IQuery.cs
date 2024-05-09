using EMS.Domain.Abstractions;
using MediatR;

namespace EMS.Application.Abstraction.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> 
{
}
