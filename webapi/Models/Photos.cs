namespace RentHouse.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public bool Thumbnail { get; set; }
        public required string Path { get; set; }
        public string? Caption { get; set; }

        public required Property Property { get; set; }
    }
}
