# Express.js MVC REST API

A modular, scalable RESTful API built with Node.js and Express following the Model-View-Controller (MVC) design pattern. Developed as part of Chapter 9 of the Node.js backend tutorial path.

## 🚀 Features

- **MVC Architecture:** Separation of routing logic, business controllers, and data models.
- **Full CRUD Operations:** Support for `GET`, `POST`, `PUT`, and `DELETE` requests for employee resources.
- **Middleware Integration:** Built-in middleware for static asset serving, URL-encoded form parsing, and JSON request bodies.
- **Custom Logging & Error Handling:** Structured event logging (`date-fns`, `uuid`) and custom 404/500 routing.
- **Input Validation:** API guard clauses returning standard HTTP error status codes (e.g., `400 Bad Request`, `404 Not Found`).

## 🛠️ Tech Stack & Dependencies

- **Runtime:** Node.js (v24)
- **Framework:** Express.js
- **Dev Tooling:** Nodemon
- **Utilities:** `date-fns`, `uuid`

## 📁 Project Structure

```text
9_MVC_Rest_API/
├── config/          # Configuration files (e.g., CORS origins)
├── controllers/     # Business logic & request handlers
├── middleware/      # Custom middleware (loggers, error handlers)
├── model/           # Data models / local JSON store
├── routes/          # Express Router modules (e.g., api/employees)
├── public/          # Static assets (CSS, images)
├── views/           # HTML templates & 404 page
├── logs/            # Generated log files
└── server.js        # Express application entry point