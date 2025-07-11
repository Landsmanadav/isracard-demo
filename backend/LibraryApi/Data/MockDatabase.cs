using LibraryApi.Models;
using System;
using System.Collections.Generic;

namespace LibraryApi.Data
{
    public class MockDatabase
    {
        public List<Book> Books { get; } = new List<Book>
        {
            new Book { Id = 1,  Title = "How Not to Break Bugs",          MemberId = 1,  CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 2,  Title = "Code Marathon: No Sleep",        MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 3,  Title = "Secrets of the Lazy Developer",  MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 4,  Title = "Code & Ice: A Love Story",       MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 5,  Title = "The Semaphore Tragedy",          MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 6,  Title = "The Failing Code Handbook",      MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 7,  Title = "Don't Cry Logs",                 MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 8,  Title = "Catching Exceptions with Style", MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 9,  Title = "Life in Semicolons",             MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 10, Title = "404: Finding Inspiration",       MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };

        public List<Member> Members { get; } = new List<Member>
        {
            new Member { Id = 1,  FirstName = "Michael",   LastName = "Cohen",    Email = "michael.cohen@example.com",    CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 2,  FirstName = "Nimrod",    LastName = "Levi",     Email = "nimrod.levi@example.com",      CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 3,  FirstName = "Ofra",      LastName = "Israeli",  Email = "ofra.israeli@example.com",     CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 4,  FirstName = "Solomon",   LastName = "Hazan",    Email = "solomon.hazan@example.com",    CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 5,  FirstName = "Tamar",     LastName = "Lishansky",Email = "tamar.lishansky@example.com",  CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 6,  FirstName = "Raviv",     LastName = "Regev",    Email = "raviv.regev@example.com",      CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 7,  FirstName = "Hila",      LastName = "Yakobi",   Email = "hila.yakobi@example.com",      CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 8,  FirstName = "Maya",      LastName = "Barak",    Email = "maya.barak@example.com",       CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 9,  FirstName = "Leon",      LastName = "Levi",     Email = "leon.levi@example.com",        CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 10, FirstName = "Noa",       LastName = "Schwartz", Email = "noa.schwartz@example.com",     CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
    }
}
