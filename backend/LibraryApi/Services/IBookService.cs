using LibraryApi.Models;
using System.Collections.Generic;

namespace LibraryApi.Services
{
    public interface IBookService
    {
        IEnumerable<Book> GetAll();
        Book GetById(int id);


        IEnumerable<BookWithAssignedMemberRes> GetAllWithAssignedMember();
        BookWithAssignedMemberRes GetByIdWithAssignedMember(int id);
        Book Add(Book book);
        public bool Delete(int id);
        public Book Update(int id, UpdateBookReq updateBookReq);
    }
}
