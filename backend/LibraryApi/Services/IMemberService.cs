using LibraryApi.Models;
using System.Collections.Generic;

namespace LibraryApi.Services
{
    public interface IMemberService
    {

        IEnumerable<Member> GetAll();
        Member GetById(int id);


        IEnumerable<MemberWithAssignedBookRes> GetAllWithAssignedBook();
        MemberWithAssignedBookRes GetByIdWithAssignedBook(int id);
        public Member Add(Member member, int? bookId = null);
        public bool Delete(int id);
        public Member Update(int id, UpdateMemberReq updateMemberReq);
    }
}