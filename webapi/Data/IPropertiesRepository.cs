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
        Task<IEnumerable<Property>> GetPropertiesByUserIdAsync(int userId);
        Task<IEnumerable<Property>> GetFilteredPropertiesAsync(
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
            bool? rent);
    }
}
