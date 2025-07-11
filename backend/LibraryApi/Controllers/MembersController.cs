using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly ILogger<MembersController> _logger;

        public MembersController(IMemberService memberService, ILogger<MembersController> logger)
        {
            _memberService = memberService;
            _logger = logger;
        }

        // GET api/members
        [HttpGet]
        public ActionResult<IEnumerable<MemberWithAssignedBookRes>> GetAll()
        {
            _logger.LogInformation("GET request for all members");
            return Ok(_memberService.GetAllWithAssignedBook());
        }

        // GET api/members/{id}
        [HttpGet("{id}")]
        public ActionResult<MemberWithAssignedBookRes> GetById(int id)
        {
            _logger.LogInformation("GET request for member with Id: {Id}", id);
            var member = _memberService.GetByIdWithAssignedBook(id);
            if (member == null)
            {
                _logger.LogWarning("Member not found with Id: {Id}", id);
                return NotFound();
            }
            return Ok(member);
        }

        // POST /api/members
        [HttpPost]
        public ActionResult<Member> Add([FromBody] AddMemberReq newMember)
        {
            _logger.LogInformation("POST request to create new member: {FirstName} {LastName}", newMember.FirstName, newMember.LastName);
            var member = new Member
            {
                FirstName = newMember.FirstName,
                LastName = newMember.LastName,
                Email = newMember.Email
            };

            try
            {
                var created = _memberService.Add(member, newMember.BookId);
                _logger.LogInformation("New member created with Id: {Id}", created.Id);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning("Failed to add member - {Error}", ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // DELETE api/members/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("DELETE request for member with Id: {Id}", id);
            var deleted = _memberService.Delete(id);
            if (!deleted)
            {
                _logger.LogWarning("Attempted to delete non-existing member with Id: {Id}", id);
                return NotFound();
            }
            _logger.LogInformation("Member deleted with Id: {Id}", id);
            return NoContent();
        }

        // PUT api/members/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateMemberReq dto)
        {
            _logger.LogInformation("PUT request to update member with Id: {Id}", id);
            try
            {
                var updated = _memberService.Update(id, dto);
                if (updated == null)
                {
                    _logger.LogWarning("Attempted to update non-existing member with Id: {Id}", id);
                    return NotFound();
                }
                _logger.LogInformation("Member updated with Id: {Id}", id);
                return Ok(updated);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning("Failed to update member - {Error}", ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
