# isracard-demo – Full-Stack Library Management Demo

A full-stack demo application for a library management system, consisting of a **.NET 6** Web API backend and a **React** frontend (built with Vite). The project supports managing books and members with assignment logic, and includes a simple web UI for interacting with the API.

---

## Backend – LibraryApi

A RESTful API built with **ASP.NET Core (.NET 6)** for managing library data (books and members). It uses an in-memory data store (no external database) for simplicity. Key backend features include:

- **Manage Books & Members** – Create, read, update, delete (CRUD) operations for books and members.
- **Assignment Logic** – Endpoints to assign/unassign a book to a member with business rules (cannot assign an already assigned book, prevent deleting an assigned book, etc.).
- **Unassign Endpoint** – `POST /api/books/{id}/unassign` to unassign a book from its member.
- **Informative Responses** – API returns clear JSON responses. If an operation isn’t allowed (e.g., deleting an assigned book), it responds with an error message.
- **Logging** – All create/update/delete and assign/unassign actions are logged via `ILogger` for traceability.

### Tech Stack (Backend)

- **.NET 6** – ASP.NET Core Web API project (C#).
- **In-Memory Database** – Uses a singleton `MockDatabase` service to hold data in memory, so the API is easy to run without setup (data resets on restart).
- **Dependency Injection** – Services for books and members (`BookService`, `MemberService`) are injected into controllers.
- **Swagger UI** – Included for API testing and documentation (available at `/swagger` when running in development).

### Project Structure (Backend)

```
/backend/LibraryApi
├── Controllers/
│   ├── BooksController.cs      -- API endpoints for books
│   └── MembersController.cs    -- API endpoints for members
├── Models/
│   ├── Book.cs                 -- Book entity (Id, Title, CreatedAt, etc.)
│   ├── Member.cs               -- Member entity (Id, FirstName, LastName, Email, etc.)
│   ├── BookWithAssignedMemberRes.cs   -- DTO for book with its assigned member info
│   ├── MemberWithAssignedBookRes.cs   -- DTO for member with their assigned book info
│   ├── AddBookReq.cs / AddMemberReq.cs         -- DTOs for create requests
│   ├── UpdateBookReq.cs / UpdateMemberReq.cs   -- DTOs for update requests
│   └── AssignedBook.cs / AssignedMember.cs     -- Helper models for assignment relations
├── Services/
│   ├── IBookService.cs / BookService.cs       -- Business logic for books (incl. add, assign, delete)
│   └── IMemberService.cs / MemberService.cs   -- Business logic for members (incl. add, assign, delete)
├── Data/
│   └── MockDatabase.cs         -- In-memory data lists for books and members
└── Program.cs                  -- App configuration (services, middleware, CORS)
```

### API Endpoints

**Books:**

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| GET    | `/api/books`               | Get all books in the library              |
| GET    | `/api/books/{id}`          | Get a specific book by ID                 |
| POST   | `/api/books`               | Add a new book                            |
| PUT    | `/api/books/{id}`          | Update a book’s title or its assignment   |
| POST   | `/api/books/{id}/unassign` | Unassign the book from its current member |
| DELETE | `/api/books/{id}`          | Delete a book (only if not assigned)      |

**Members:**

| Method | Endpoint            | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| GET    | `/api/members`      | Get all members                              |
| GET    | `/api/members/{id}` | Get a specific member by ID                  |
| POST   | `/api/members`      | Add a new member (can assign a book)         |
| PUT    | `/api/members/{id}` | Update member info or assign/unassign a book |
| DELETE | `/api/members/{id}` | Delete a member (unassigns their book)       |

**Assignment Rules:** The backend enforces that a book can only be assigned to one member at a time. Deleting an assigned book is blocked (must unassign first), and deleting a member will automatically unassign their book.

---

## Frontend – React App

A single-page application (SPA) built with **React** (using Vite as the build tool) for a user-friendly interface to the Library API. It allows users to view and manipulate books and members data through the browser.

### Frontend Features

- **Books Management UI:** View the list of books with details, add new books, edit book details (assign/unassign), and delete books (only if unassigned).
- **Members Management UI:** View the list of members, add new members (with optional book assignment), edit member info (assign/unassign a book), and delete members.
- **Assignment from Either Side:** Assign/unassign books via the Books page or the Members page for consistency.
- **Navigation & Pages:** Top navigation bar with links to Home, Books, and Members pages.
- **Loading & Error Handling:** Disables buttons during API calls and captures errors for future UI handling.

### Tech Stack (Frontend)

- **React 18+** with modern Hooks (functional components).
- **Vite** – Module bundler and dev server for fast development.
- **Material-UI (MUI)** – UI component library for polished design (`Dialog`, `TextField`, `Button`).
- **SCSS** – Modular styling with Sass (each component/page has its own SCSS file plus global variables).
- **Context API + Hooks** – Global state with `useReducer`, `useCallback`, and `useMemo` for optimized data handling.

### Project Structure (Frontend)

```
/frontend/
├── package.json              -- Frontend dependencies & scripts
├── vite.config.js            -- Vite configuration
└── src/
    ├── pages/
    │   ├── BooksPage.jsx
    │   ├── MembersPage.jsx
    │   ├── HomePage.jsx
    │   └── NotFoundPage.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── LibraryTable.jsx
    │   ├── RowActions.jsx
    │   ├── AddItemModal.jsx
    │   ├── EditBookModal.jsx
    │   └── EditMemberModal.jsx
    ├── context/
    │   └── LibraryContext.jsx
    ├── services/
    │   └── libraryService.js
    ├── styles/
    ├── App.jsx
    └── main.jsx
```

---

## How to Run (Development Setup)

Ensure you have **.NET 6 SDK** and **Node.js (npm)** installed.

1. **Start Backend (API):**

   ```bash
   cd backend/LibraryApi
   dotnet run
   ```

   Runs the API at [https://localhost:7079](https://localhost:7079). Access Swagger UI at [https://localhost:7079/swagger](https://localhost:7079/swagger).

2. **Start Frontend (UI):**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Runs the React app at [http://localhost:5173](http://localhost:5173) (calls API at [https://localhost:7079](https://localhost:7079) via CORS).

> **Optional:** From the `frontend` folder, run `npm run start:all` to start both backend and frontend concurrently.

3. **Use the App:** Navigate to [http://localhost:5173](http://localhost:5173). Use the top menu to switch between Books and Members. Add, edit, assign, unassign, and delete items as needed.

---

## Additional Notes

- **In-Memory Data:** Data is held in memory. Restarting the API resets data.
- **UI Restrictions:** The UI aligns with backend rules (e.g., cannot delete an assigned book until unassigned).
- **Future Extensions:** The context-based state and generic modal components make it easy to add new entities or features.
