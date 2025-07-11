
namespace LibraryApi.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        // מזהה החבר המשויך, או null אם אין שיוך
        public int? MemberId { get; set; }
    }

}