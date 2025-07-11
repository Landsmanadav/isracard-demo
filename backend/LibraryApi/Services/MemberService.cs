using LibraryApi.Data;
using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

public class MemberService : IMemberService
{
    private readonly MockDatabase _db;
    private readonly ILogger<MemberService> _logger;

    public MemberService(MockDatabase db, ILogger<MemberService> logger)
    {
        _db = db;
        _logger = logger;
    }

    public IEnumerable<Member> GetAll()
    {
        return _db.Members;
    }

    public Member GetById(int id)
    {
        return _db.Members.FirstOrDefault(m => m.Id == id);
    }

    public IEnumerable<MemberWithAssignedBookRes> GetAllWithAssignedBook()
    {
        var members = _db.Members;
        var books = _db.Books;

        return members.Select(m => new MemberWithAssignedBookRes
        {
            Id = m.Id,
            FirstName = m.FirstName,
            LastName = m.LastName,
            Email = m.Email,
            CreatedAt = m.CreatedAt,
            UpdatedAt = m.UpdatedAt,
            AssignedBook = books.Where(b => b.MemberId == m.Id)
                .Select(b => new AssignedBook { Id = b.Id, Title = b.Title })
                .FirstOrDefault()
        });
    }

    public MemberWithAssignedBookRes GetByIdWithAssignedBook(int id)
    {
        var m = _db.Members.FirstOrDefault(x => x.Id == id);
        if (m == null) return null;

        var book = _db.Books.FirstOrDefault(b => b.MemberId == m.Id);

        return new MemberWithAssignedBookRes
        {
            Id = m.Id,
            FirstName = m.FirstName,
            LastName = m.LastName,
            Email = m.Email,
            CreatedAt = m.CreatedAt,
            UpdatedAt = m.UpdatedAt,
            AssignedBook = book != null
                ? new AssignedBook { Id = book.Id, Title = book.Title }
                : null
        };
    }

    public Member Add(Member member, int? bookId = null)
    {
        if (bookId.HasValue)
        {
            var book = _db.Books.FirstOrDefault(b => b.Id == bookId.Value);
            if (book == null)
                throw new InvalidOperationException("Book does not exist.");
            if (book.MemberId.HasValue)
                throw new InvalidOperationException("Book is already assigned to another member.");
        }

        member.Id = _db.Members.Any() ? _db.Members.Max(m => m.Id) + 1 : 1;
        member.CreatedAt = DateTime.UtcNow;
        member.UpdatedAt = DateTime.UtcNow;
        _db.Members.Add(member);
        _logger.LogInformation("Member added. Id: {Id}, Email: {Email}", member.Id, member.Email);

        if (bookId.HasValue)
        {
            var book = _db.Books.First(b => b.Id == bookId.Value);
            book.MemberId = member.Id;
            book.UpdatedAt = DateTime.UtcNow;
            _logger.LogInformation("Book assigned to member. BookId: {BookId}, MemberId: {MemberId}", book.Id, member.Id);
        }

        return member;
    }

    public bool Delete(int id)
    {
        var member = _db.Members.FirstOrDefault(m => m.Id == id);
        if (member == null)
            return false;

        _db.Members.Remove(member);

        foreach (var book in _db.Books.Where(b => b.MemberId == id))
        {
            book.MemberId = null;
            book.UpdatedAt = DateTime.UtcNow;
            _logger.LogInformation("Book unassigned from deleted member. BookId: {BookId}", book.Id);
        }

        _logger.LogInformation("Member deleted. Id: {Id}", id);
        return true;
    }

    public Member Update(int id, UpdateMemberReq updateMemberReq)
    {
        var member = _db.Members.FirstOrDefault(m => m.Id == id);
        if (member == null)
            return null;

        member.FirstName = updateMemberReq.FirstName;
        member.LastName = updateMemberReq.LastName;
        member.Email = updateMemberReq.Email;
        member.UpdatedAt = DateTime.UtcNow;

        var oldBook = _db.Books.FirstOrDefault(b => b.MemberId == id);
        if (oldBook != null && (updateMemberReq.BookId == null || oldBook.Id != updateMemberReq.BookId.Value))
        {
            oldBook.MemberId = null;
            oldBook.UpdatedAt = DateTime.UtcNow;
            _logger.LogInformation("Book unassigned from member. BookId: {BookId}, MemberId: {MemberId}", oldBook.Id, id);
        }

        if (updateMemberReq.BookId.HasValue)
        {
            var newBook = _db.Books.FirstOrDefault(b => b.Id == updateMemberReq.BookId.Value);
            if (newBook == null)
                throw new InvalidOperationException("Book does not exist.");

            if (newBook.MemberId.HasValue && newBook.MemberId.Value != id)
                throw new InvalidOperationException("Book is already assigned to another member.");

            newBook.MemberId = id;
            newBook.UpdatedAt = DateTime.UtcNow;
            _logger.LogInformation("Book assigned to member. BookId: {BookId}, MemberId: {MemberId}", newBook.Id, id);
        }

        _logger.LogInformation("Member updated. Id: {Id}, Email: {Email}", member.Id, member.Email);
        return member;
    }
}
