namespace RentHouse.Models
{
    public class Property
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public int TotalArea { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarGarage { get; set; }
        public bool Pets { get; set; }
        public bool Rent { get; set; }
        public bool Furniture { get; set; }
        public decimal Price { get; set; }
        public required string Street { get; set; }
        public required string Number { get; set; }
        public required string Neighborhood { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public required string ZipCode { get; set; }
        public string? Complement { get; set; }
        public string? Description { get; set; }

        public required User User { get; set; }
    }
}
