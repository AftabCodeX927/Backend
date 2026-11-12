# Complete Guide: All HTTP Methods in API Dropdown (GET to Custom)

## 1. Quick Summary Table (All 10 Options)

| Method | Category | Main Work | Express.js Syntax |
| :--- | :--- | :--- | :--- |
| **`GET`** | Core CRUD | Fetch/read data from the server | `app.get()` |
| **`POST`** | Core CRUD | Send/create new data on the server | `app.post()` |
| **`PUT`** | Core CRUD | Completely replace an existing record | `app.put()` |
| **`PATCH`** | Core CRUD | Update only specific fields of a record | `app.patch()` |
| **`DELETE`** | Core CRUD | Permanently delete data from the server | `app.delete()` |
| **`HEAD`** | Diagnostic | Fetch only response headers (without body) | `app.head()` |
| **`OPTIONS`** | CORS / Info | Check which HTTP methods are allowed on a URL | `app.options()` |
| **`CONNECT`** | Network | Establish a secure HTTPS tunnel via a proxy | `app.connect()` |
| **`TRACE`** | Debugging | Echo back the exact request path for testing | `app.trace()` |
| **`CUSTOM`** | Non-Standard | Define your own custom HTTP method name | `app.all()` + check `req.method` |

---

## 2. Top 5 Daily-Use Methods (Core CRUD)

### 1. `GET` (Read Data)
* **Work:** Used to request and read data from the server. Koi request body send nahi hoti.
* **Example:** Loading a YouTube video list or viewing a user profile.
* **Express Code:**
  ```javascript
  app.get('/users', (req, res) => res.send('All Users List'));
  ```

### 2. `POST` (Create Data)
* **Work:** Used to send new data to the server and save it in the database.
* **Example:** Submitting a signup form, logging in, or placing a new order.
* **Express Code:**
  ```javascript
  app.post('/users', (req, res) => res.send('New User Created'));
  ```

### 3. `PUT` (Full Replace)
* **Work:** Overwrites an existing record **100%**. Agar aap koi field miss kar doge, it gets wiped or set to null.
* **Example:** Replacing an entire user profile with a completely new object.
* **Express Code:**
  ```javascript
  app.put('/users/:id', (req, res) => res.send('Full User Profile Replaced'));
  ```

### 4. `PATCH` (Partial Update)
* **Work:** Modifies **only one or two specific fields** while keeping the rest of the record untouched.
* **Example:** Updating just your password, phone number, or profile picture.
* **Express Code:**
  ```javascript
  app.patch('/users/:id', (req, res) => res.send('Only Password Updated'));
  ```

### 5. `DELETE` (Remove Data)
* **Work:** Permanently removes a specific resource from the server or database.
* **Example:** Deleting an Instagram post or removing an item from your cart.
* **Express Code:**
  ```javascript
  app.delete('/users/:id', (req, res) => res.send('User Deleted'));
  ```

---

## 3. Advanced & System Methods (HEAD, OPTIONS, CONNECT, TRACE)

### 6. `HEAD` (Headers Only)
* **Work:** Works exactly like `GET`, except the server **does not return the response body** (no HTML/JSON/File)—sirf status code (`200 OK`) and headers (`Content-Length`, `Content-Type`) aate hain.
* **Real-Life Example:** Checking if a 2GB movie link is alive and checking its file size before starting the actual download.
* **Express Code:**
  ```javascript
  app.head('/file-check', (req, res) => {
    res.set('X-File-Size', '2GB');
    res.status(200).end();
  });
  ```

### 7. `OPTIONS` (Pre-Flight / Permission Check)
* **Work:** Asks the server which HTTP methods (`GET`, `POST`, `DELETE`) and headers are allowed on a specific endpoint.
* **Real-Life Example:** When your React frontend (`localhost:5173`) calls your Express backend (`localhost:3000`), the browser automatically fires an **`OPTIONS` (CORS pre-flight)** request first to verify permission.
* **Express Code:**
  ```javascript
  app.options('/users', (req, res) => {
    res.set('Allow', 'GET, POST, PATCH, DELETE');
    res.sendStatus(204);
  });
  ```

### 8. `CONNECT` (Two-Way Tunnel)
* **Work:** Starts an encrypted two-way TCP/HTTPS tunnel between the client and server (mainly used by VPNs and proxy servers). Normal Express APIs mein hum isko manually code nahi karte.

### 9. `TRACE` (Loopback Debugging)
* **Work:** Echoes back the exact request received by the server so developers can see if any proxy or firewall modified the headers along the way. Usually disabled on production servers for security reasons.

---

## 4. What is `CUSTOM` (The 10th Option)?
The **`Custom`** option at the bottom of the dropdown lets you **type your own HTTP method name** that isn't in the standard list:

* **Why does it exist?**
  1. Specialized protocols use extra methods—like **WebDAV** (`PROPFIND`, `MKCOL`, `COPY`, `LOCK`) or **CDN caching servers** (`PURGE` to clear cached pages).
  2. If your backend uses a custom action like `PURGE` or `SYNC`, you can select `Custom` in your API client and type it manually.

* **How to handle a `CUSTOM` method in Express.js:**
  ```javascript
  // Catch any custom method like 'PURGE' using app.all()
  app.all('/cache', (req, res) => {
    if (req.method === 'PURGE') {
      return res.send('Server Cache Cleared via Custom PURGE Method!');
    }
    res.status(405).send(`Method ${req.method} Not Allowed`);
  });
  ```