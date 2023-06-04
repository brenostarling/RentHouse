using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentHouse.Data;
using RentHouse.Models;

namespace RentHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly RentHouseContext _context;

        public PhotosController(RentHouseContext context)
        {
            _context = context;
        }

        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photos>>> GetPhotos()
        {
            return await _context.Photos.ToListAsync();
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Photos>> GetPhoto(int id)
        {
            var photo = await _context.Photos.FindAsync(id);

            if (photo == null)
            {
                return NotFound();
            }

            return photo;
        }

        // GET: api/Photos/ByProperty/{idProperty}
        [HttpGet("ByProperty/{idProperty}")]
        public async Task<ActionResult<IEnumerable<Photos>>> GetPhotosByProperty(int idProperty)
        {
            var photos = await _context.Photos.Where(p => p.PropertyId == idProperty).ToListAsync();

            if (photos == null || photos.Count == 0)
            {
                return NotFound();
            }

            return photos;
        }

        // POST: api/Photos
        [HttpPost]
        public async Task<ActionResult<Photos>> CreatePhoto(Photos photo)
        {
            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhoto", new { id = photo.Id }, photo);
        }

        // PUT: api/Photos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePhoto(int id, Photos photo)
        {
            if (id != photo.Id)
            {
                return BadRequest();
            }

            _context.Entry(photo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var photo = await _context.Photos.FindAsync(id);
            if (photo == null)
            {
                return NotFound();
            }

            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhotoExists(int id)
        {
            return _context.Photos.Any(e => e.Id == id);
        }
    }
}
