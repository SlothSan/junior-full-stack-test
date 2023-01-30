<p align="center">
  <a href="http://nuom.co.uk/" target="blank"><img src="https://assets-global.website-files.com/60893c95d5c9871201e719d5/60894c461d15a242648ac3ab_logo-black.svg" width="320" alt="Nuom 
Logo" /></a>
</p>

# Nuom's Junior Fullstack Test

If you are reading this, it's probably because you are thinking of joining our engineering team
at [nuom](https://nuom.co.uk). With this test, we will assess:

* Your capacity to write Backend code
* Your capacity to write Frontend code
* Your capacity to create an API using best practices
* Your capacity to write clean code
* Your capacity to communicate your decisions

For this test you are free to use the language and framework which is the most comfortable to you for both the
Frontend and Backend.

However, we are providing the skeleton of the project using [ExpressJS](https://expressjs.com/) for the backend
and [ReactJS](https://reactjs.org/) for the Frontend.

You are free to use the database of your choice, we recommend [MongoDB Atlas](https://www.mongodb.com/atlas/database) to
makes
things simpler.

You can choose the way you prefer to connect to the database, the skeleton project
use [Mongoose](https://mongoosejs.com/),
but you can use any of [TypeORM](https://github.com/typeorm/typeorm), [Sequelize](https://sequelize.org/),
[Prisma](https://github.com/prisma/prisma), etc... Or write queries directly.

While you are free to remove the skeletons code for the Frontend and the backend. It is recommended that you have a
look at it and run them first as they provide a starting example for this assessment.

## Structure

The Project consist of 2 folders:

* __backend__: The backend server, it is an Express project, but you can replace this folder for any other backend you
  want.
* __frontend__: The frontend user interface, it is a React project, but you can replace this folder for any other
  frontend framework you want (Vue, Angular, Svelte, Lit, etc...)

## Context

You will be building a system to rate dogs based on the [DogCard CEO API](https://dog.ceo/dog-api/documentation/).

- Users need to be able to browse all the breeds available on the DogCard CEO API
- Able to view random dogs, either overall or by breeds from DogCard CEO API
- Can add dogs to my favorite list
- Can add a rating to the dog
- Can see the overall rating of the dog

## Exercises:

- You will find a list of tasks for the Backend in [backend/README.md](backend/README.md)
- You will find a list of tasks for the Frontend in [frontend/README.md](frontend/README.md)

## How to submit:

* Create a Fork of this repository. It is recommended to keep it private.
* Clone this repository to you local machine
* Create a new branch for your submission
* Do you work on that branch
* Once you are done, submit a PR with your work
* Send a link to your repository by email to Loic
