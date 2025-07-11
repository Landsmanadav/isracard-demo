namespace LibraryApi.Models
{
    public class UpdateBookReq
    {
        public string Title { get; set; }
        public bool UnassignMember { get; set; } = false; // האם להסיר שיוך מחבר
    }
}