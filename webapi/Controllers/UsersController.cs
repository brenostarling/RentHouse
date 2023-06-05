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

    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _usersRepository.GetUsersAsync();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _usersRepository.GetUserAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserLoginDTO userLogin)
        {
            var user = await _usersRepository.GetUserByEmailAsync(userLogin.Email);

            if (user == null || user.Password != userLogin.Password)
            {
                return BadRequest("Usuário incorreto");
            }

            Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");
            Response.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS");
            Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");

            return user;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            await _usersRepository.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var existingUser = await _usersRepository.GetUserAsync(id);

            if (existingUser == null)
            {
                return NotFound();
            }

            await _usersRepository.UpdateUserAsync(id, user);

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = await _usersRepository.GetUserAsync(id);

            if (existingUser == null)
            {
                return NotFound();
            }

            await _usersRepository.DeleteUserAsync(id);

            return NoContent();
        }
    }
}
