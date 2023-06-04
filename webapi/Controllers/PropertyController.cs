using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RentHouse.Data;
using RentHouse.Models;

namespace RentHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertiesRepository _propertiesRepository;

        public PropertyController(IPropertiesRepository propertiesRepository)
        {
            _propertiesRepository = propertiesRepository;
        }

        // GET: api/Property
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            var properties = await _propertiesRepository.GetPropertiesAsync();

            if (properties == null)
            {
                return NotFound();
            }

            return properties.ToList();
        }

        // GET: api/Property/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var property = await _propertiesRepository.GetPropertyAsync(id);

            if (property == null)
            {
                return NotFound();
            }

            return property;
        }

        // POST: api/Property
        [HttpPost]
        public async Task<ActionResult<Property>> CreateProperty(Property property)
        {
            await _propertiesRepository.CreatePropertyAsync(property);
            return CreatedAtAction(nameof(GetProperty), new { id = property.Id }, property);
        }

        // PUT: api/Property/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(int id, Property property)
        {
            if (id != property.Id)
            {
                return BadRequest();
            }

            var existingProperty = await _propertiesRepository.GetPropertyAsync(id);

            if (existingProperty == null)
            {
                return NotFound();
            }

            await _propertiesRepository.UpdatePropertyAsync(id, property);

            return NoContent();
        }

        // DELETE: api/Property/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var existingProperty = await _propertiesRepository.GetPropertyAsync(id);

            if (existingProperty == null)
            {
                return NotFound();
            }

            await _propertiesRepository.DeletePropertyAsync(id);

            return NoContent();
        }
    }
}
