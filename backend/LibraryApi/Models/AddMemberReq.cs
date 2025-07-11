namespace LibraryApi.Models
{
    public class AddMemberReq
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int? BookId
        {
            get; set;
        }
    }
}