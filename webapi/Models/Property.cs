namespace RentHouse.Models
{
    public class Property
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string? Type { get; set; }
        public int TotalArea { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarGarage { get; set; }
        public bool Pets { get; set; }
        public bool Rent { get; set; }
        public bool Furniture { get; set; }
        public decimal Price { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string? Complement { get; set; }
        public string? Description { get; set; }

        public User? User { get; set; }
        public List<Photos>? Photos { get; set; }
    }
}
