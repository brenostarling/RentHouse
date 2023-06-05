using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RentHouse.Models;

namespace RentHouse.Data
{
    public interface IPropertiesRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync();
        Task<Property> GetPropertyAsync(int id);
        Task CreatePropertyAsync(Property property);
        Task UpdatePropertyAsync(int id, Property property);
        Task DeletePropertyAsync(int id);
    }
}
