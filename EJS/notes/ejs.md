# EJS (Embedded JavaScript)

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. It works on the server side (typically with Node.js and Express.js) to render dynamic views before sending the final HTML to the client's browser.

---

## 1. Installation & Express Setup

First, install `express` and `ejs` in your project directory:

```bash
npm install express ejs
```

Configure Express to use EJS as its default view engine in your main server file (`index.js` or `app.js`):

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory for EJS template files (default is './views')
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (from HTML forms) and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    // Renders 'views/index.ejs' and passes data object to it
    res.render('index', { 
        username: 'Aftab', 
        role: 'Backend Developer' 
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## 2. Core EJS Tags Reference

EJS uses specific angle-bracket tags to control how JavaScript is executed or output into the HTML template:

* `<%= value %>` : **Escaped Output.** Evaluates the JavaScript expression and outputs the result into the template. It escapes HTML characters (e.g., `<` becomes `&lt;`), protecting your app from XSS (Cross-Site Scripting) attacks. Use this 99% of the time for displaying variables.
* `<%- value %>` : **Unescaped Raw Output.** Outputs the exact raw value without escaping HTML tags. Used for rendering raw HTML strings or including partials.
* `<% code %>` : **Scriptlet Tag (Control Flow).** Used for pure JavaScript logic like `if-else` statements, `for` loops, or variable declarations. Produces no direct output in the HTML.
* `<%# comment %>` : **Comment Tag.** Server-side comment. It is neither executed nor rendered in the final HTML source sent to the browser.
* `<%%` : Outputs a literal `<%` string on the page.

---

## 3. Passing & Outputting Data

**Backend (`app.js`):**
```javascript
app.get('/profile', (req, res) => {
    const user = {
        name: 'Aftab Ansari',
        techStack: ['Node.js', 'Express.js', 'JavaScript', 'Java'],
        isLoggedIn: true,
        bioHtml: '<strong>Full-Stack Developer</strong>'
    };
    res.render('profile', { user });
});
```

**Frontend (`views/profile.ejs`):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Profile</title>
</head>
<body>
    <!-- Escaped output (Safe) -->
    <h1>Welcome, <%= user.name %></h1>

    <!-- Unescaped output (Renders the <strong> tag) -->
    <p>Bio: <%- user.bioHtml %></p>

    <!-- Server-side comment (Invisible in browser inspect element) -->
    <%# This is a hidden EJS comment %>
</body>
</html>
```

---

## 4. Conditional Statements (`if / else`)

Every line of JavaScript control flow must be wrapped in `<% %>`, while the HTML inside the blocks remains normal.

```html
<% if (user.isLoggedIn) { %>
    <div class="status-badge online">
        <p>Status: Active</p>
        <a href="/logout">Logout</a>
    </div>
<% } else { %>
    <div class="status-badge offline">
        <p>Please log in to access your dashboard.</p>
        <a href="/login">Login</a>
    </div>
<% } %>
```

---

## 5. Loops (`forEach` & `for`)

Use standard JavaScript array methods like `forEach` or regular `for` loops to iterate over arrays passed from the backend.

```html
<h3>Tech Stack:</h3>
<ul>
    <% user.techStack.forEach((tech, index) => { %>
        <li><%= index + 1 %>. <%= tech %></li>
    <% }) %>
</ul>
```

---

## 6. Partials (Reusable Components)

To keep your code DRY (Don't Repeat Yourself), break common UI components like navbars, headers, and footers into separate files inside a `views/partials/` directory.

**Folder Structure:**
```text
views/
├── partials/
│   ├── header.ejs
│   └── footer.ejs
└── index.ejs
```

**Include Syntax (`views/index.ejs`):**
Use the `<%- include('relative/path') %>` syntax. You can also pass an object of variables specifically to that partial.

```html
<%- include('partials/header', { pageTitle: 'Home Page' }) %>

<main>
    <h1>Dashboard Content</h1>
    <p>This is the main body of the page.</p>
</main>

<%- include('partials/footer') %>
```

---

## 7. Handling Form Submissions (POST Requests)

**Frontend Form (`views/contact.ejs`):**
```html
<form action="/submit-form" method="POST">
    <input type="text" name="projectTitle" placeholder="Project Name" required>
    <button type="submit">Create</button>
</form>
```

**Backend Route (`app.js`):**
```javascript
app.post('/submit-form', (req, res) => {
    const { projectTitle } = req.body;
    // Process data or save to DB, then redirect or render
    res.render('success', { title: projectTitle });
});
```

---

## 8. Pro Developer Tips

### Safely Checking for Undefined Variables (`locals`)
If you try to render `<%= message %>` when `message` was not passed in `res.render()`, EJS will throw a `ReferenceError: message is not defined`. All variables passed to `res.render()` are stored inside the `locals` object. Check `locals` to prevent crashes:

```html
<% if (locals.errorMessage) { %>
    <p class="error"><%= errorMessage %></p>
<% } %>
```

### Passing Backend Data to Client-Side `<script>` Tags
If you need to use an Express backend array or object inside your frontend browser JavaScript (`<script>`), serialize it using `JSON.stringify()` with the unescaped tag `<%- %>`:

```html
<script>
    const serverData = <%- JSON.stringify(user) %>;
    console.log("Loaded user in browser console:", serverData);
</script>
```