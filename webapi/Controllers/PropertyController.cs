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
    public class PropertyController : ControllerBase
    {
        private readonly RentHouseContext _context;

        public PropertyController(RentHouseContext context)
        {
            _context = context;
        }

        // GET: api/Property
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            var properties = await _context.Properties.ToListAsync();

            if (properties == null)
            {
                return NotFound();
            }

            return properties;
        }

        // GET: api/Property/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);

            if (property == null)
            {
                return NotFound();
            }

            return property;
        }

        // GET: api/Property/Search
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Property>>> SearchProperties(
            int? id_user,
            string type,
            decimal? minPrice,
            decimal? maxPrice,
            string zipcode,
            string street,
            string neighborhood,
            string city,
            string state,
            int? bedrooms,
            int? bathrooms,
            int? cargarage,
            bool? furniture,
            bool? pets,
            bool? rent)
        {
            // Consulta inicial para obter todas as propriedades
            IQueryable<Property> query = _context.Properties.AsQueryable();

            // Aplicar filtros opcionais
            if (id_user.HasValue)
            {
                query = query.Where(p => p.UserId == id_user.Value);
            }

            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(p => p.Type == type);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            if (!string.IsNullOrEmpty(zipcode))
            {
                query = query.Where(p => p.ZipCode == zipcode);
            }

            if (!string.IsNullOrEmpty(street))
            {
                query = query.Where(p => p.Street == street);
            }

            if (!string.IsNullOrEmpty(neighborhood))
            {
                query = query.Where(p => p.Neighborhood == neighborhood);
            }

            if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(p => p.City == city);
            }

            if (!string.IsNullOrEmpty(state))
            {
                query = query.Where(p => p.State == state);
            }

            if (bedrooms.HasValue)
            {
                query = query.Where(p => p.Bedrooms == bedrooms.Value);
            }

            if (bathrooms.HasValue)
            {
                query = query.Where(p => p.Bathrooms == bathrooms.Value);
            }

            if (cargarage.HasValue)
            {
                query = query.Where(p => p.CarGarage == cargarage.Value);
            }

            if (furniture.HasValue)
            {
                query = query.Where(p => p.Furniture == furniture.Value);
            }

            if (pets.HasValue)
            {
                query = query.Where(p => p.Pets == pets.Value);
            }

            if (rent.HasValue)
            {
                query = query.Where(p => p.Rent == rent.Value);
            }

            var properties = await query.ToListAsync();

            if (properties == null || properties.Count == 0)
            {
                return NotFound();
            }

            return properties;
        }

        // POST: api/Property
        [HttpPost]
        public async Task<ActionResult<Property>> CreateProperty(Property property)
        {
            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProperty", new { id = property.Id }, property);
        }

        // PUT: api/Property/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(int id, Property property)
        {
            if (id != property.Id)
            {
                return BadRequest();
            }

            _context.Entry(property).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyExists(id))
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

        // DELETE: api/Property/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PropertyExists(int id)
        {
            return _context.Properties.Any(e => e.Id == id);
        }
    }
}