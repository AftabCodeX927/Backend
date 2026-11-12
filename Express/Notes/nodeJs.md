# Node.js Explained — Step-by-Step Guide

## 1. What is Node.js?
Earlier, **JavaScript** could only run inside a web browser (Chrome, Edge, Firefox) to handle button clicks, animations, and UI changes. Outside the browser, it couldn't run on your computer.

**Node.js** is a runtime environment that takes JavaScript out of the browser and lets it run directly on your **computer (VS Code / Terminal)** and servers.

* **Real-Life Example:** Think of JavaScript as a **car engine** and Chrome browser as the **car**. Earlier, that engine only ran inside the car. Node.js pulled that engine out and put it into a **generator**—now you can power the whole house (backend servers, databases, files) with it.

---

## 2. Browser JS vs. Node.js

| Feature | Browser JavaScript | Node.js |
| :--- | :--- | :--- |
| **Where it runs** | Chrome, Firefox, Edge | Your Laptop, VS Code, Servers |
| **Main Job** | Frontend (UI, buttons, colors) | Backend (Servers, APIs, Databases) |
| **File Access** | Blocked (security restriction) | Full access (read, write, delete files) |
| **Global Object** | `window` | `global` |

---

## 3. What Can You Build With Node.js?
* **Backend Servers:** Handle incoming user requests (like `app.get()`).
* **Database Integration:** Connect and exchange data with MongoDB, MySQL, or PostgreSQL.
* **File System Operations:** Create, read, update, and delete files on your system.
* **REST APIs:** Supply data to websites and mobile apps.

---

## 4. Quick VS Code Check (Verify Node.js)

1. Open any folder in **VS Code**.
2. Create a file named `check.js` and paste this code:
   ```javascript
   console.log("Node.js is running outside the browser!");
   console.log("5 + 5 =", 5 + 5);