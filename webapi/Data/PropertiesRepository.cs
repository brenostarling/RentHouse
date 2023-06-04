using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Search.Models;
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

        public async Task<Property> GetPropertyAsync(int id)
        {
            return await _context.Properties.FindAsync(id);
        }

        public async Task<IEnumerable<Property>> SearchPropertiesAsync(SearchParameters parameters)
        {
            var query = _context.Properties.AsQueryable();

            // Aplicar mais filtros de acordo com os parâmetros recebidos

            return await query.ToListAsync();
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
