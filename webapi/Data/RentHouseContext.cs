using Microsoft.EntityFrameworkCore;
using RentHouse.Models;

namespace RentHouse.Data
{
    public class RentHouseContext : DbContext
    {
        public RentHouseContext(DbContextOptions<RentHouseContext> options) : base(options)
        {
        }

        public DbSet<Property> Properties { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Photos> Photos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.Property(u => u.Password).IsRequired().HasMaxLength(255);
                entity.Property(u => u.Cpf).IsRequired().HasMaxLength(14);
                entity.Property(u => u.Cnpj).HasMaxLength(18);
                entity.Property(u => u.Phone).IsRequired().HasMaxLength(20);
                entity.Property(u => u.Fullname).IsRequired().HasMaxLength(255);
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.ToTable("properties");

                entity.Property(p => p.Name).IsRequired().HasMaxLength(255);
                entity.Property(p => p.Type).HasMaxLength(255);
                entity.Property(p => p.TotalArea).HasColumnName("totalarea");
                entity.Property(p => p.Bedrooms).HasColumnName("bedrooms");
                entity.Property(p => p.Bathrooms).HasColumnName("bathrooms");
                entity.Property(p => p.CarGarage).HasColumnName("cargarage");
                entity.Property(p => p.Pets).HasColumnName("pets");
                entity.Property(p => p.Rent).HasColumnName("rent").HasDefaultValue(false);
                entity.Property(p => p.Furniture).HasColumnName("furniture").HasDefaultValue(false);
                entity.Property(p => p.Price).HasColumnType("decimal(10,2)");
                entity.Property(p => p.Street).IsRequired().HasMaxLength(255);
                entity.Property(p => p.Number).IsRequired().HasMaxLength(20);
                entity.Property(p => p.Neighborhood).IsRequired().HasMaxLength(255);
                entity.Property(p => p.City).IsRequired().HasMaxLength(255);
                entity.Property(p => p.State).IsRequired().HasMaxLength(255);
                entity.Property(p => p.ZipCode).IsRequired().HasMaxLength(10);
                entity.Property(p => p.Complement).HasMaxLength(255);
                entity.Property(p => p.Description).HasColumnType("text");

                entity.HasOne<User>(p => p.User)
                    .WithMany()
                    .HasForeignKey(p => p.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Photos>(entity =>
            {
                entity.ToTable("photos");

                entity.Property(ph => ph.Thumbnail).HasColumnName("thumbnail").IsRequired();
                entity.Property(ph => ph.Path).IsRequired().HasColumnType("text");
                entity.Property(ph => ph.Caption).HasMaxLength(255);

                entity.HasOne<Property>(ph => ph.Property)
                    .WithMany(p => p.Photos)
                    .HasForeignKey(ph => ph.PropertyId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(ph => new { ph.PropertyId, ph.Thumbnail }).IsUnique();
            });
        }
    }
}
