using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ILogger<BooksController> _logger;

        public BooksController(IBookService bookService, ILogger<BooksController> logger)
        {
            _bookService = bookService;
            _logger = logger;
        }

        // GET api/books
        [HttpGet]
        public ActionResult<IEnumerable<BookWithAssignedMemberRes>> GetAll()
        {
            _logger.LogInformation("GET request for all books");
            return Ok(_bookService.GetAllWithAssignedMember());
        }

        // GET api/books/{id}
        [HttpGet("{id}")]
        public ActionResult<BookWithAssignedMemberRes> GetById(int id)
        {
            _logger.LogInformation("GET request for book with Id: {Id}", id);
            var book = _bookService.GetByIdWithAssignedMember(id);
            if (book == null)
            {
                _logger.LogWarning("Book not found with Id: {Id}", id);
                return NotFound();
            }
            return Ok(book);
        }

        // POST /api/books
        [HttpPost]
        public ActionResult<Book> Add([FromBody] AddBookRes newBook)
        {
            _logger.LogInformation("POST request to create new book: {Title}", newBook.Title);
            var book = new Book
            {
                Title = newBook.Title,
            };
            var created = _bookService.Add(book);
            _logger.LogInformation("New book created with Id: {Id}", created.Id);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // DELETE /api/books/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("DELETE request for book with Id: {Id}", id);
            try
            {
                var deleted = _bookService.Delete(id);
                if (!deleted)
                {
                    _logger.LogWarning("Attempted to delete non-existing book with Id: {Id}", id);
                    return NotFound();
                }

                _logger.LogInformation("Book deleted with Id: {Id}", id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning("Failed to delete book - {Error}", ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT api/books/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateBookReq dto)
        {
            _logger.LogInformation("PUT request to update book with Id: {Id}", id);
            var updated = _bookService.UpdateBook(id, dto);
            if (updated == null)
            {
                _logger.LogWarning("Attempted to update non-existing book with Id: {Id}", id);
                return NotFound();
            }
            _logger.LogInformation("Book updated with Id: {Id}", id);
            return Ok(updated);
        }

        [HttpPost("{id}/unassign")]
        public IActionResult UnassignBook(int id)
        {
            var book = _bookService.UnassignBook(id);
            if (book == null)
                return NotFound();
            return Ok(book); // מחזיר את הספר (אפשר גם BookWithAssignedMemberRes)
        }
    }
}
