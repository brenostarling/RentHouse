using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RentHouse.Models;

namespace RentHouse.Data
{
    public class PhotosRepository : IPhotosRepository
    {
        private readonly RentHouseContext _context;

        public PhotosRepository(RentHouseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Photos>> GetPhotosAsync()
        {
            return await _context.Photos.ToListAsync();
        }

        public async Task<Photos> GetPhotoAsync(int id)
        {
            return await _context.Photos.FindAsync(id);
        }

        public async Task<IEnumerable<Photos>> GetPhotosByPropertyAsync(int idProperty)
        {
            return await _context.Photos.Where(p => p.PropertyId == idProperty).ToListAsync();
        }

        public async Task CreatePhotoAsync(Photos photo)
        {
            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePhotoAsync(int id, Photos photo)
        {
            if (id != photo.Id)
            {
                throw new ArgumentException("Invalid photo ID");
            }

            _context.Entry(photo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePhotoAsync(int id)
        {
            var photo = await _context.Photos.FindAsync(id);
            if (photo != null)
            {
                _context.Photos.Remove(photo);
                await _context.SaveChangesAsync();
            }
        }
    }
}
