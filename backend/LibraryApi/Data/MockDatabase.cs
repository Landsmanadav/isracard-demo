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
               new Member { Id = 1,  FirstName = "Marco",       LastName = "Rossi",      Email = "marco.rossi@example.com",       CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 2,  FirstName = "Luca",        LastName = "Bianchi",    Email = "luca.bianchi@example.com",      CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 3,  FirstName = "Francesco",   LastName = "Costa",      Email = "francesco.costa@example.com",   CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 4,  FirstName = "Alessandro",  LastName = "Greco",      Email = "alessandro.greco@example.com",  CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 5,  FirstName = "Sofia",       LastName = "Romano",     Email = "sofia.romano@example.com",      CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 6,  FirstName = "Giulia",      LastName = "Conti",      Email = "giulia.conti@example.com",      CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 7,  FirstName = "Matteo",      LastName = "Ferrari",    Email = "matteo.ferrari@example.com",    CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 8,  FirstName = "Elena",       LastName = "Ricci",      Email = "elena.ricci@example.com",       CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 9,  FirstName = "Andrea",      LastName = "Moretti",    Email = "andrea.moretti@example.com",    CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
               new Member { Id = 10, FirstName = "Martina",     LastName = "Galli",      Email = "martina.galli@example.com",     CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            };

    }
}
