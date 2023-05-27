namespace RentHouse.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Cpf { get; set; }
        public string? Cnpj { get; set; }
        public required string Phone { get; set; }
        public required string Fullname { get; set; }
    }
}
