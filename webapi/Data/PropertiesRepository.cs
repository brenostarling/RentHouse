using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RentHouse.Models;

namespace RentHouse.Data
{
    public class PropertiesRepository : IPropertiesRepository
    {
        private readonly RentHouseContext _context;

        public PropertiesRepository(RentHouseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync()
        {
            return await _context.Properties.ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesByUserIdAsync(int userId)
        {
            return await _context.Properties
                .Include(p => p.Photos)
                .Include(p => p.User)
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetFilteredPropertiesAsync(
            string? types,
            decimal? maxprice,
            decimal? minprice,
            int? bedrooms,
            int? bathrooms,
            int? carParks,
            bool? furniture,
            bool? pets,
            string? zipcode,
            string? street,
            string? neighborhood,
            string? city,
            string? state,
            bool? rent
            )
        {
            var query = _context.Properties
                .Include(p => p.Photos)
                .Include(p => p.User);

            if (!string.IsNullOrEmpty(types))
            {
                var propertyTypes = types.Split(',');
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => propertyTypes.Contains(p.Type));
            }

            if (maxprice.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Price <= maxprice.Value);
            }

            if (minprice.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Price >= minprice.Value);
            }

            if (bedrooms.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Bedrooms == bedrooms.Value);
            }

            if (bathrooms.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Bathrooms == bathrooms.Value);
            }

            if (carParks.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.CarGarage == carParks.Value);
            }

            if (furniture.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Furniture == furniture.Value);
            }

            if (pets.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Pets == pets.Value);
            }

            if (!string.IsNullOrEmpty(zipcode))
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.ZipCode == zipcode);
            }

            if (!string.IsNullOrEmpty(street))
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Street == street);
            }

            if (!string.IsNullOrEmpty(neighborhood))
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Neighborhood == neighborhood);
            }

            if (!string.IsNullOrEmpty(city))
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.City == city);
            }

            if (!string.IsNullOrEmpty(state))
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.State == state);
            }

            if (rent.HasValue)
            {
                query = (Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Property, User?>)query.Where(p => p.Rent == rent.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Property> GetPropertyAsync(int id)
        {
            return await _context.Properties.FindAsync(id);
        }

        public async Task CreatePropertyAsync(Property property)
        {
            _context.Properties.Add(property);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePropertyAsync(int id, Property property)
        {
            if (id != property.Id)
            {
                throw new ArgumentException("Invalid property ID");
            }

            _context.Entry(property).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePropertyAsync(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property != null)
            {
                _context.Properties.Remove(property);
                await _context.SaveChangesAsync();
            }
        }
    }
}
