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
$ docker compose up
```

## Sample
We also can make seed data sample for this service, please run this command first

```bash
# run seed
$ npx nestjs-command create:user
```

Here the credentials to login
```bash
# admin
$ username: admin
$ password: Asd123!@#

# member
$ username: member
$ password: Asd123!@#
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
