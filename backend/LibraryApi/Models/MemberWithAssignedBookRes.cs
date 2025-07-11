namespace LibraryApi.Models
{
    public class MemberWithAssignedBookRes
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public AssignedBook? AssignedBook { get; set; }
    }

    public class AssignedBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}