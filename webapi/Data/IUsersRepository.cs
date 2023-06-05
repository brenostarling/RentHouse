using System.Collections.Generic;
using System.Threading.Tasks;
using RentHouse.Models;

namespace RentHouse.Data
{
    public interface IUsersRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserAsync(int id);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(int id, User user);
        Task DeleteUserAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
    }
}
