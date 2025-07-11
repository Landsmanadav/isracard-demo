namespace LibraryApi.Models
{
    public class BookWithAssignedMemberRes
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public AssignedMember? AssignedMember { get; set; }
    }

    public class AssignedMember
    {
        public int Id { get; set; }
        public string FullName { get; set; }
    }
}