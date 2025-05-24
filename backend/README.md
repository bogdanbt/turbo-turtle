🐢 Typing Text API
This is a simple API that helps save and get texts for a typing speed game.

What is this?
This API is used to:

    -Save new texts that players will type
    -Get texts by ID
    -Get texts randomly
    -Delete texts

---

Add a New Text
Method: POST
URL: https://turbo-turtle.onrender.com/api/text
Send this in the body:
{
"content": "for (let i = 0; i < 5; i++) { console.log(i); }",
"language": "javascript",
"difficulty": "beginner",
"recommended_time": 60,
"title": "JS For Loop"
}

You get this back:
{
"id": 1
}

---

Get Text by ID
Method: GET

URL: /api/text/:id (https://turbo-turtle.onrender.com/api/text/683047c672a8b98b54d4edc6)
Example: GET https://turbo-turtle.onrender.com/api/text/1 — gets the text with ID 1

Response:
{
"id": 1,
"content": "for (let i = 0; i < 5; i++) { console.log(i); }",
"language": "javascript",
"difficulty": "beginner",
"recommended_time": 60,
"title": "JS For Loop"
}

---

Get Random Text
Method: GET
URL: https://turbo-turtle.onrender.com/api/text/random?language=...&difficulty=...

Example: GET https://turbo-turtle.onrender.com/api/text/random?language=javascript&difficulty=beginner
Response:
{
"id": 1,
"content": "for (let i = 0; i < 5; i++) { console.log(i); }",
"language": "javascript",
"difficulty": "beginner",
"recommended_time": 60,
"title": "JS For Loop"
}

---

Delete Text by ID
Method: DELETE
URL: https://turbo-turtle.onrender.com/api/text/:id

This removes a text forever from the database.
Example: DELETE /api/text/1

Response:
{
"success": true
}

---

Register a New User
Method: POST
URL: https://turbo-turtle.onrender.com/api/auth/register

Body:
{
"username": "testuser",
"email": "test@example.com",
"password": "123456"
}

Response:
{
"id": 1,
"message": "User registered"
}

---

Login

Method: POST
URL: https://turbo-turtle.onrender.com/api/auth/login

Body:
{
"email": "test@example.com",
"password": "123456"
}
Response:
{
"token": "your_jwt_token_here"
}

---

Get Current User Profile
Method: GET
URL: https://turbo-turtle.onrender.com/api/auth/me

Header:
Authorization: Bearer your_token_here
Response:
{
"id": 1,
"username": "testuser",
"email": "test@example.com"
}
