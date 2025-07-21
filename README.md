# EGGON-demo – Full-Stack Library Management Demo

A full-stack demo application for a library management system, consisting of a **.NET 6** Web API backend and a **React** frontend (built with Vite). The project supports managing books and members with assignment logic, and includes a simple web UI for interacting with the API.

---

## Frontend – React App

A single-page application (SPA) built with **React** (using Vite as the build tool) for a user-friendly interface to the Library API. It allows users to view and manipulate books and members data through the browser.

### Hero Section

On first load you’ll see a full‑screen Hero with:

├─ A brief intro to the portfolio and CRUD demo  
├─ A “Slide to enter” control that unlocks the app  
├─ Interactive background that reacts to cursor movement  
├─ Color‑adaptive cursor and animations  
└─ Toggle buttons (in the header) to show/hide cursor & background

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
- **Motion.js (Framer Motion)** – Animations and gesture-driven interactions.
- **SCSS** – Modular styling with Sass (each component/page has its own SCSS file plus global variables).
- **Context API + Hooks** – Global state with `useReducer`, `useCallback`, and `useMemo` for optimized data handling.

---

## Project Structure (Frontend)

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── AddItemModal.jsx
│   │   ├── EditBookModal.jsx
│   │   ├── EditMemberModal.jsx
│   │   ├── Header.jsx
│   │   ├── LibraryTable.jsx
│   │   ├── LibraryTable.scss
│   │   ├── RowActions.jsx
│   │   └── RowActions.scss
│   ├── context/
│   │   └── LibraryContext.jsx
│   ├── hero/
│   │   ├── components/
│   │   │   ├── Intro/
│   │   │   │   ├── Intro.jsx
│   │   │   │   ├── Intro.scss
│   │   │   │   ├── ScrollIntro.jsx
│   │   │   │   ├── ScrollIntro.scss
│   │   │   │   ├── SlideToEnter.jsx
│   │   │   │   └── SlideToEnter.scss
│   │   │   └── Shared/
│   │   │       ├── CursorFollower.jsx
│   │   │       ├── CursorFollower.scss
│   │   │       ├── CursorFollowerOld.jsx
│   │   │       ├── CursorFollowerOld.scss
│   │   │       ├── SeaweedCanvasBg.jsx
│   │   │       └── SeaweedCanvasBg.scss
│   │   ├── customHooks/
│   │   │   ├── useCanvasCursor.js
│   │   │   └── useTypingEffect.js
│   │   ├── layout/
│   │   │   └── Layout.jsx
│   │   ├── styles/
│   │   │   ├── global.scss
│   │   │   ├── _animations.scss
│   │   │   └── _variables.scss
│   │   └── utils/
│   │       └── Helper.jsx
│   ├── pages/
│   │   ├── BooksPage.jsx
│   │   ├── BooksPage.scss
│   │   ├── MembersPage.jsx
│   │   ├── MembersPage.scss
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   └── libraryService.js
│   └── styles/
│       ├── main.scss
│       └── _variables.scss
├── .env.development
├── .env.production
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

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

---

## Project Structure (Backend)

```
backend/LibraryApi/
├── Controllers/
│   ├── BooksController.cs
│   └── MembersController.cs
├── Models/
│   ├── Book.cs
│   ├── Member.cs
│   ├── AddBookReq.cs
│   ├── UpdateBookReq.cs
│   └── DTOs…
├── Services/
│   ├── BookService.cs
│   └── MemberService.cs
├── Data/
│   └── MockDatabase.cs
└── Program.cs
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

> **Tip:** From the `frontend` folder you can also run:
>
> ```bash
> npm run start:all
> ```
>
> to launch both backend and frontend concurrently.

---

## Additional Notes

- **In-Memory Data:** Data is held in memory. Restarting the API resets data.
- **UI Restrictions:** The UI aligns with backend rules (e.g., cannot delete an assigned book until unassigned).
- **Extensibility:** The context-based state and generic modal components make it easy to add new entities or features.
