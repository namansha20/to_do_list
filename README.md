# To-Do List Application

A full-stack task management web application built with **Node.js**, **Express**, **MongoDB** (Mongoose), and **EJS** templating.

---

## Features

- ✅ Create tasks with a title, description, category, and optional due date
- 📋 View all tasks in a clean list (newest first)
- ✏️ Edit task details (title, description, category, due date)
- ✔️ Mark tasks as completed (with guard against double-completing)
- 🗑️ Delete tasks with confirmation
- 🔒 Server-side validation (empty title rejected with a clear error message)
- ⚠️ Meaningful error pages for 404 and unexpected failures

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) running locally (default: `mongodb://localhost:27017/todolist`) **or** a MongoDB Atlas connection string

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/namansha20/to_do_list.git
cd to_do_list
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todolist
```

### 4. Start the server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Development mode** (auto-restart on file changes, Node.js ≥ 18.11):
> ```bash
> npm run dev
> ```

---

## Usage

| Action | How |
|--------|-----|
| View all tasks | Visit `/tasks` (home redirects here) |
| Create a task | Click **+ New Task**, fill the form, submit |
| Edit a task | Click **Edit** on any task |
| Complete a task | Click **✓ Complete** (only available on pending tasks) |
| Delete a task | Click **Delete** and confirm the prompt |

---

## Project Structure

```
to_do_list/
├── app.js                  # Entry point – Express setup & MongoDB connection
├── package.json
├── .env.example            # Environment variable template
├── models/
│   └── task.js             # Mongoose Task schema/model
├── routes/
│   └── tasks.js            # Express router for all /tasks routes
├── controllers/
│   └── taskController.js   # Route handler logic (CRUD + complete)
├── middleware/
│   └── validation.js       # express-validator rules + error collector
├── views/                  # EJS templates
│   ├── index.ejs           # Task list page
│   ├── form.ejs            # Shared create/edit form
│   └── error.ejs           # Error page
└── public/
    └── css/
        └── style.css       # Application styles
```

### Key Design Decisions

- **MVC pattern** – Models, Controllers, Routes, and Views are separated for maintainability.
- **method-override** – HTML forms only support GET/POST; this middleware lets us send PUT, PATCH, and DELETE from the browser by appending `?_method=VERB`.
- **express-validator** – Provides clean, declarative server-side validation. Errors are passed back into the form view with the original input preserved.
- **Mongoose schema validation** – Acts as a second layer of validation at the database level.
- **Guard on complete** – The `complete` controller action checks the current `completed` state before saving and returns a 400 error if the task is already done.
- **EJS** – Chosen for its simplicity; no build step required, works natively with Express.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the HTTP server listens on |
| `MONGODB_URI` | `mongodb://localhost:27017/todolist` | MongoDB connection string |
