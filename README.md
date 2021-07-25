# Test SejutaCita Crud with Auth
SejutaCita test, crud + auth with NodeJS Nest Framework

## Installation

```bash
$ npm i
```

## Run

```bash
# dev
$ npm run start:dev

# prod
$ npm run start:prod

# docker 
$ cd deployments
$ docker compose up
```

## Sample
We create seed data sample in service init, credentials :
```bash
# admin
$ username: admin
$ password: Asd123!@#

# member
$ username: member
$ password: Asd123!@#
```

You also can create manually 
```bash
# run seed
$ npx nestjs-command create:user
```

## Guide
- Open swagger document
  [https://localhost:3001/doc](https://localhost:3001/doc)

## Diagram
![Screenshot](diagram.png)

## Tech stack
- Framework - [NestJS](https://nestjs.com/)
- Database - [MongoDB](https://www.mongodb.com/)
- Cache - [Redis](https://redis.io/)

## Stay in touch
- Author - [Muhammad Cholis Malik](https://www.linkedin.com/in/mcholismalik/)
