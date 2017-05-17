# Movie Battle

This project is a responsive web application that consists of front-end ReactJS code that searches for and displays information from the Open Movie Database (OMDB) API. This project originated as a code-along of the Tyler McGinnis's React Fundamentals online course. However, after completing that course, I wanted to build on my understanding of React, so I have began playing around with the code to create my own version of the application.   

## Features

### Popular movies

The first feature of this application is to display popular movies. I would like to be able to display movies currently in theaters, but my understanding of the OMDB API documentation has yet to figure out how to do that.  Instead, I offer the user the ability to search memorable movie franchises. Each movie header embeds an html link to the appropriate Internet Movie Database (IMDB) profile.

### Movie Battle

The second feature of the application is the ability to pit two movies a in a contest of IMDB ratings. The user searches for two movies by title, which the app displays, and then hits the 'Battle' button. The application then declares the movie with the higher IMDB rating the winner

## Future Development

There are areas to improve this application. First, the battle function does not account for movies with an "N/A" rating. Second, the OMDB title search function is not as precise, which is understandably in that many movies are not unique. A better way to search for the desired movie would be to return an array of movies and then let the user select the one she was looking for. Finally, I may yet build on this application by adding a back end storage.
