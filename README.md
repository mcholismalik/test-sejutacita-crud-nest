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

# kubernetes
$ cd deployments
$ kompose -f docker-compose.yml
$ kubectl apply -f api-service.yaml,mongodb-service.yaml,redis-service.yaml,api-deployment.yaml,sejutacita_net-networkpolicy.yaml,mongodb-deployment.yaml,sejutacita-mongodb-persistentvolumeclaim.yaml,redis-deployment.yaml,sejutacita-redis-persistentvolumeclaim.yaml,sejutacita-redis-conf-persistentvolumeclaim.yaml
```

## Documentation
This service consists of some route :
- POST /auth/sign-up
- POST /auth/sign-in
- GET /user
- GET /user/:id
- POST /user
- PUT /user/:id
- DELETE /user/:id

More detail you can open swagger :
- [https://localhost:3001/doc](https://localhost:3001/doc)

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

## Diagram
![Screenshot](diagram.png)

## Tech stack
- Framework - [NestJS](https://nestjs.com/)
- Database - [MongoDB](https://www.mongodb.com/)
- Cache - [Redis](https://redis.io/)
- Deployment - [Docker](https://www.docker.com/), [Kompose](https://kompose.io/), [Minikube](https://minikube.sigs.k8s.io/docs/start/)

## Stay in touch
- Author - [Muhammad Cholis Malik](https://www.linkedin.com/in/mcholismalik/)
