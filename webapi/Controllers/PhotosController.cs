using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RentHouse.Data;
using RentHouse.Models;

namespace RentHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotosRepository _photosRepository;

        public PhotosController(IPhotosRepository photosRepository)
        {
            _photosRepository = photosRepository;
        }

        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photos>>> GetPhotos()
        {
            var photos = await _photosRepository.GetPhotosAsync();
            return Ok(photos);
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Photos>> GetPhoto(int id)
        {
            var photo = await _photosRepository.GetPhotoAsync(id);

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
            var photos = await _photosRepository.GetPhotosByPropertyAsync(idProperty);

            if (photos == null || !photos.Any())
            {
                return NotFound();
            }

            return Ok(photos);
        }

        // POST: api/Photos
        [HttpPost]
        public async Task<ActionResult<Photos>> CreatePhoto(Photos photo)
        {
            await _photosRepository.CreatePhotoAsync(photo);
            return CreatedAtAction(nameof(GetPhoto), new { id = photo.Id }, photo);
        }

        // PUT: api/Photos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePhoto(int id, Photos photo)
        {
            if (id != photo.Id)
            {
                return BadRequest();
            }

            var existingPhoto = await _photosRepository.GetPhotoAsync(id);

            if (existingPhoto == null)
            {
                return NotFound();
            }

            await _photosRepository.UpdatePhotoAsync(id, photo);

            return NoContent();
        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var existingPhoto = await _photosRepository.GetPhotoAsync(id);

            if (existingPhoto == null)
            {
                return NotFound();
            }

            await _photosRepository.DeletePhotoAsync(id);

            return NoContent();
        }
    }
}
