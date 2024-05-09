using EMS.Application.Abstraction;
using EMS.Domain;
using EMS.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace EMS.UnitTests.Infrastructure;

public abstract class BaseRepositoryTests<T> where T : class
{
    protected readonly Guid UserId = Guid.NewGuid();
    protected readonly IDbContext _dbContext;

    protected IBaseRepository<T> _repository;

    protected BaseRepositoryTests()
    {
        var dbOptioInMemory = new DbContextOptionsBuilder<EmsApiDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w => w.Ignore(InMemoryEventId.TransactionIgnoredWarning))
            .Options;

        _dbContext = new EmsApiDbContext(dbOptioInMemory);
        _dbContext.GetDbSet<User>().Add(User.Create("user_email", "123456", true));
        _dbContext.SaveChangesAsync(new CancellationToken()).Wait();
        _repository = CreateRepository();
    }

    protected abstract IBaseRepository<T> CreateRepository();
    protected abstract T CreateEntity();

    [Fact]
    public async Task Add_ShouldReturnSuccess()
    {
        // Arrange
        var cancellationToken = new CancellationToken();
        var entity = CreateEntity();

        // Act
        _repository.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var propertyInfo = entity.GetType().GetProperty("Id");
        var id = propertyInfo?.GetValue(entity, null);

        var entityFromDb = await _dbContext.GetDbSet<T>().FindAsync(id, cancellationToken);

        // Assert
        entityFromDb.Should().NotBeNull();
        entityFromDb.Should().BeEquivalentTo(entity);
    }

    [Fact]
    public async Task Delete_ShouldReturnSuccess()
    {
        // Arrange
        var cancellationToken = new CancellationToken();
        var entity = CreateEntity();
        _repository.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Act
        _repository.Delete(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var propertyInfo = entity.GetType().GetProperty("Id");
        var id = propertyInfo?.GetValue(entity, null);

        var entityFromDb = await _dbContext.GetDbSet<T>().FindAsync(id, cancellationToken);

        // Assert
        entityFromDb.Should().BeNull();
    }

    [Fact]
    public async Task Update_ShouldReturnSuccess()
    {
        // Arrange
        var cancellationToken = new CancellationToken();
        var entity = CreateEntity();
        _repository.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Act
        UpdateValues(entity);
        _repository.Update(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var propertyInfo = entity.GetType().GetProperty("Id");
        var id = propertyInfo?.GetValue(entity, null);

        var entityFromDb = await _dbContext.GetDbSet<T>().FindAsync(id);

        // Assert
        entityFromDb.Should().NotBeNull();
        AssertUpdate(entityFromDb!);
    }

    protected abstract void UpdateValues(T entity);
    protected abstract void AssertUpdate(T entity);


    [Fact]
    public async Task ExistsByIdAsync_ShouldReturnTrue()
    {
        // Arrange
        var cancellationToken = new CancellationToken();
        var entity = CreateEntity();
        _dbContext.GetDbSet<T>().Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Act
        var propertyInfo = entity.GetType().GetProperty("Id");
        var id = propertyInfo?.GetValue(entity, null);
        Guid guid = Guid.Parse(id?.ToString() ?? string.Empty);

        var result = await _repository.GetByIdAsync(guid, cancellationToken);

        // Assert
        result.Should().NotBeNull();
    }
}
