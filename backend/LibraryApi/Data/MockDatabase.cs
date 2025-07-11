using LibraryApi.Models;
using System;
using System.Collections.Generic;

namespace LibraryApi.Data
{
    public class MockDatabase
    {
        public List<Book> Books { get; } = new List<Book>
        {
            new Book { Id = 1,  Title = "איך לא לשבור את הבאגים", MemberId = 1,  CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 2,  Title = "מרתון קוד בלי שינה",                    MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 3,  Title = "דברי הסוד של המתכנת העצלן",             MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 4,  Title = "קוד וקרח: סיפור אהבה",                   MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 5,  Title = "טרגדיית Semaphore",                     MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 6,  Title = "המדריך לקוד הכושל",                     MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 7,  Title = "אל תבכה לוגים",                        MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 8,  Title = "לכידת Exceptions בסלסול",             MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 9,  Title = "כל החיים semicolon, ועדיין לא נגמר",    MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Book { Id = 10, Title = "404: מציאת השראה",                      MemberId = null, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };

        public List<Member> Members { get; } = new List<Member>
        {
            new Member { Id = 1,  FirstName = "יגאל",  LastName = "כהן",    Email = "yigal.cohen@example.com",    CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 2,  FirstName = "נמרוד", LastName = "לוי",    Email = "nimrod.levi@example.com"  , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 3,  FirstName = "עופרה", LastName = "ישראלי", Email = "ofra.israeli@example.com"  , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 4,  FirstName = "שלמה", LastName = "חזן",    Email = "shlomo.hazan@example.com" , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 5,  FirstName = "תמר",   LastName = "לישנסקי",Email = "tamar.lishansky@example.com" , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 6,  FirstName = "רביב",  LastName = "רגב",    Email = "raviv.regev@example.com"  , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 7,  FirstName = "הילה",  LastName = "יעקובי", Email = "hila.yakobi@example.com"   , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 8,  FirstName = "מאיה",  LastName = "ברק",    Email = "maya.barak@example.com"   , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 9,  FirstName = "ליאון", LastName = "לוי",    Email = "leon.levi@example.com"    , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Member { Id = 10, FirstName = "נועה",  LastName = "שוורץ",  Email = "noa.shwartz@example.com"  , CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
    }
}