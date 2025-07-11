<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# isracard-demo

# Backend – LibraryApi

A simple REST API for a library management system, built with **.NET 6**.
Implements members and books management, including assignment logic.
Data is managed in-memory via a mock database (no persistent storage).

---

## Features

- Manage books and members (CRUD)
- Assign/unassign books to members (one-to-one)
- Prevents deleting an assigned book
- Prevents assigning a book that's already assigned
- Returns additional info (assigned member/book) in API responses
- All API responses and errors are clean and informative
- Logs important actions (add, update, delete, assign) with `ILogger`

---

## Tech Stack

- .NET 6 (ASP.NET Core Web API)
- In-memory mock database (`MockDatabase`)
- Dependency Injection for services
- Controllers + Services structure
- No external DB (easy to run and test)

---

## Project Structure

```
/backend/LibraryApi
│
├── Controllers/
│   ├── BooksController.cs
│   └── MembersController.cs
│
├── Models/
│   ├── Book.cs
│   ├── Member.cs
│   ├── BookWithAssignedMemberRes.cs
│   ├── MemberWithAssignedBookRes.cs
│   ├── AddBookReq.cs / AddMemberReq.cs
│   ├── UpdateBookReq.cs / UpdateMemberReq.cs
│   └── AssignedBook.cs / AssignedMember.cs
│
├── Services/
│   ├── IBookService.cs
│   ├── IMemberService.cs
│   ├── BookService.cs
│   └── MemberService.cs
│
├── Data/
│   └── MockDatabase.cs
│
└── Program.cs
```

---

## How to Run

1. **Navigate to backend project:**

   ```bash
   cd backend/LibraryApi
   ```

2. **Restore and Run:**

   ```bash
   dotnet restore
   dotnet run
   ```

3. **API will be available at:**

   ```
   https://localhost:7079/swagger/index.html
   ```

   (Swagger UI included for testing)

---

## Main Endpoints

### Books

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | /api/books      | Get all books                  |
| GET    | /api/books/{id} | Get book by ID                 |
| POST   | /api/books      | Add new book                   |
| PUT    | /api/books/{id} | Update book (title / unassign) |
| DELETE | /api/books/{id} | Delete book (if not assigned)  |

### Members

| Method | Endpoint          | Description                               |
| ------ | ----------------- | ----------------------------------------- |
| GET    | /api/members      | Get all members                           |
| GET    | /api/members/{id} | Get member by ID                          |
| POST   | /api/members      | Add new member (optionally assign book)   |
| PUT    | /api/members/{id} | Update member info / assign/unassign book |
| DELETE | /api/members/{id} | Delete member (unassigns book if needed)  |

---

## Notes

- **All logic is in-memory** — data resets when restarting the API.
- **Assignment rules:**

  - A book can only be assigned to one member at a time.
  - Deleting an assigned book is not allowed.
  - Deleting a member will unassign any assigned book.

---

## Logging

All changes (add, update, delete, assign/unassign) are logged using `ILogger` in both services and controllers.

---

## Contact

For questions or feedback, open an issue or contact the repo owner.

---
>>>>>>> 5e3d858031e451c80b25edf9f4c997f480c42272
