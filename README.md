# Word-Game
Word game project with Node.js 

# OverView
A Web application that plays a word-guessing game. 

## Two Types of User: Admin, User
  - User can create a game and guess by choosing a single alphabetic letter.
  - Admin can create/create users' info and status and add/change the game rule and front type.
  
## Technology
  1.  Client-end built with a single html file, JQuery, css
  2.  Used CSRF_Token to increase web security
  3.  A node-based web Restful api based on express framework
  4.  Implemented database based on mongoDB and modeled application data based on mongoose

## how to apply
origin end point localhost:3000/
  1.  initial users
    "/wordgame/api/v3/user"
  2.  initial metadata
    "/wordgame/api/v3/initialmeta"
  3.  initial wordlist
    "/wordgame/api/v3/words"
  4.  start web app
    /wordgame
