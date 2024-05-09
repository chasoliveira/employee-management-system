using EMS.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EMS.Infrastructure.Contexts.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id).ValueGeneratedOnAdd();
        builder.Property(u => u.Username).HasMaxLength(120).IsRequired();
        builder.Property(u => u.Password).IsRequired();

        builder.HasIndex(u => u.Username).IsUnique();

        builder.HasData(
            User.Create("admin", "admin@123", isAdmin: true)
        );
    }
}
