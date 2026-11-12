# Express.js Explained & VS Code Setup

## 1. What is Express.js?
**Express.js** is a fast, minimal web framework built on top of **Node.js**.

In pure Node.js (`http` module), writing routes, handling JSON data, and managing errors takes a lot of repetitive boilerplate code. Express wraps all that messy logic into clean, readable functions like `app.get()` and `app.post()`.

* **Real-Life Example:** If **Node.js** is raw bricks, cement, and steel, then **Express.js** is a ready-made house frame—you don't build every wall from scratch; you just move in and start setting up rooms (routes).

---

## 2. Pure Node.js vs. Express.js

| Feature | Pure Node.js (`http`) | Express.js |
| :--- | :--- | :--- |
| **Routing (`/` vs `/about`)** | Manual `if-else` checks on `req.url` | Clean methods: `app.get()`, `app.post()` |
| **Sending JSON / HTML** | Manual headers (`res.writeHead`) | Built-in: `res.json()`, `res.send()` |
| **Middleware Support** | Hard to manage manually | Built-in (`app.use()`) for auth, logs, etc. |
| **Code Length** | Verbose and repetitive | Short, clean, and scalable |

---

## 3. Step-by-Step Setup in VS Code

### Step 1: Initialize Project
1. Create a folder named `express-app` and open it in **VS Code**.
2. Open the terminal (`Ctrl + ~`) and run:
   ```bash
   npm init -y
   npm install express