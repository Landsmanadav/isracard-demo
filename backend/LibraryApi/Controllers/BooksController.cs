using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMemberService _memberService;

        public BooksController(IBookService bookService, IMemberService memberService)
        {
            _bookService   = bookService;
            _memberService = memberService;
        }

        // GET api/books?includeMember=true
        [HttpGet]
        public ActionResult<IEnumerable<object>> GetAll([FromQuery] bool includeMember = false)
        {
            var books = _bookService.GetAll();
            if (!includeMember)
                return Ok(books);

            // הדגמה: לכל ספר נחזיר גם את המידע על Member (אם היית מקשר MemberId)
            var dto = new List<object>();
            foreach (var b in books)
            {
                var member = _memberService.GetById(b.Id); // או b.MemberId
                dto.Add(new { Book = b, Member = member });
            }
            return Ok(dto);
        }

        // GET api/books/{id}
        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var book = _bookService.GetById(id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        // POST api/books
        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book b)
        {
            var created = _bookService.Create(b);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        // PUT api/books/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Book b)
        {
            b.Id = id;
            var updated = _bookService.Update(b);
            if (updated == null) return NotFound();
            return NoContent();
        }

        // DELETE api/books/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _bookService.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
