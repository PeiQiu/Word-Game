# Word-Game
Word game project with Node.js 

# OverView
A Web application that plays a word-guessing game. 

## Two Types of User: Admin, User
  - User can create a game and guess by choosing a single alphabetic letter.
  - Admin can create/create users' info and status and add/change the game rule and front type.
  
## Technology
```
  > Client-end built with a single html file, JQuery, css
  > Used CSRF_Token to increase web security
  > A node-based web Restful api based on express framework
  > Implemented database based on mongoDB and modeled application data based on mongoose
```

## how to apply
```
origin end point localhost:3000/
  > initial users:
    "/wordgame/api/v3/user"
  > initial metadata:
    "/wordgame/api/v3/initialmeta"
  > initial wordlist:
    "/wordgame/api/v3/words"
  > start web app:
    "/wordgame"
```
