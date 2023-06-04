using System.Collections.Generic;
using System.Threading.Tasks;
using RentHouse.Models;

namespace RentHouse.Data
{
    public interface IPhotosRepository
    {
        Task<IEnumerable<Photos>> GetPhotosAsync();
        Task<Photos> GetPhotoAsync(int id);
        Task<IEnumerable<Photos>> GetPhotosByPropertyAsync(int idProperty);
        Task CreatePhotoAsync(Photos photo);
        Task UpdatePhotoAsync(int id, Photos photo);
        Task DeletePhotoAsync(int id);
    }
}
