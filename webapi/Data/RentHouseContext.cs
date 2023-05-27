using Microsoft.EntityFrameworkCore;
using RentHouse.Models;

namespace RentHouse.Data
{
    public class RentHouseContext : DbContext
    {
        public RentHouseContext(DbContextOptions<RentHouseContext> options) : base(options)
        {
        }

        public DbSet<Property> Properties { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.Property(u => u.Password).IsRequired().HasMaxLength(255);
                entity.Property(u => u.Cpf).IsRequired().HasMaxLength(14);
                entity.Property(u => u.Cnpj).HasMaxLength(18);
                entity.Property(u => u.Phone).IsRequired().HasMaxLength(20);
                entity.Property(u => u.Fullname).IsRequired().HasMaxLength(255);
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.Property(p => p.Name).IsRequired().HasMaxLength(255);
                entity.Property(p => p.Type).HasMaxLength(255);
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

        }
    }
}
