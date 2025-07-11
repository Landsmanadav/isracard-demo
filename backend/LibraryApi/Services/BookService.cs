using LibraryApi.Data;
using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

public class BookService : IBookService
{
    private readonly MockDatabase _db;
    private readonly ILogger<BookService> _logger;

    public BookService(MockDatabase db, ILogger<BookService> logger)
    {
        _db = db;
        _logger = logger;
    }

    public IEnumerable<Book> GetAll()
    {
        return _db.Books;
    }

    public Book GetById(int id)
    {
        return _db.Books.FirstOrDefault(b => b.Id == id);
    }

    public IEnumerable<BookWithAssignedMemberRes> GetAllWithAssignedMember()
    {
        var books = _db.Books;
        var members = _db.Members;

        return books.Select(b => new BookWithAssignedMemberRes
        {
            Id = b.Id,
            Title = b.Title,
            CreatedAt = b.CreatedAt,
            UpdatedAt = b.UpdatedAt,
            AssignedMember = b.MemberId.HasValue
                ? members.Where(m => m.Id == b.MemberId.Value)
                    .Select(m => new AssignedMember { Id = m.Id, FullName = m.FirstName + " " + m.LastName })
                    .FirstOrDefault()
                : null
        });
    }

    public BookWithAssignedMemberRes GetByIdWithAssignedMember(int id)
    {
        var b = _db.Books.FirstOrDefault(x => x.Id == id);
        if (b == null) return null;

        var member = b.MemberId.HasValue
            ? _db.Members.FirstOrDefault(m => m.Id == b.MemberId.Value)
            : null;

        return new BookWithAssignedMemberRes
        {
            Id = b.Id,
            Title = b.Title,
            CreatedAt = b.CreatedAt,
            UpdatedAt = b.UpdatedAt,
            AssignedMember = member != null
                ? new AssignedMember { Id = member.Id, FullName = member.FirstName + " " + member.LastName }
                : null
        };
    }

    public Book Add(Book book)
    {
        book.Id = _db.Books.Any() ? _db.Books.Max(b => b.Id) + 1 : 1;
        book.CreatedAt = DateTime.UtcNow;
        book.UpdatedAt = DateTime.UtcNow;
        _db.Books.Add(book);
        _logger.LogInformation("Book added. Id: {Id}, Title: {Title}", book.Id, book.Title);
        return book;
    }

    public bool Delete(int id)
    {
        var book = _db.Books.FirstOrDefault(b => b.Id == id);
        if (book == null)
            return false;

        if (book.MemberId.HasValue)
            throw new InvalidOperationException("לא ניתן למחוק ספר המשויך לחבר.");

        _db.Books.Remove(book);
        _logger.LogInformation("Book deleted. Id: {Id}", id);
        return true;
    }
    public BookWithAssignedMemberRes? UpdateBook(int id, UpdateBookReq req)
    {
        var book = _db.Books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            _logger.LogWarning("UpdateBook: Book not found. Id: {Id}", id);
            return null;
        }

        _logger.LogInformation("UpdateBook: Data received - Id: {Id}, New Title: {Title}, New MemberId: {MemberId}", id, req.Title, req.MemberId);

        book.Title = req.Title ?? book.Title;
        book.MemberId = req.MemberId;
        book.UpdatedAt = DateTime.Now;

        AssignedMember? assignedMember = null;
        if (book.MemberId.HasValue)
        {
            var member = _db.Members.FirstOrDefault(m => m.Id == book.MemberId.Value);
            if (member != null)
            {
                assignedMember = new AssignedMember
                {
                    Id = member.Id,
                    FullName = $"{member.FirstName} {member.LastName}"
                };
            }
            else
            {
                _logger.LogWarning("UpdateBook: Member not found for MemberId: {MemberId}", book.MemberId);
            }
        }

        _logger.LogInformation("UpdateBook: Book updated. Id: {Id}, Title: {Title}, MemberId: {MemberId}", book.Id, book.Title, book.MemberId);

        return new BookWithAssignedMemberRes
        {
            Id = book.Id,
            Title = book.Title,
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt,
            AssignedMember = assignedMember
        };
    }



    public BookWithAssignedMemberRes? UnassignBook(int bookId)
    {
        var book = _db.Books.FirstOrDefault(b => b.Id == bookId);
        if (book == null)
            return null;

        book.MemberId = null;
        book.UpdatedAt = DateTime.Now;
        return new BookWithAssignedMemberRes
        {
            Id = book.Id,
            Title = book.Title,
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt,
            AssignedMember = null // כי ניתקת!
        };
    }

}
