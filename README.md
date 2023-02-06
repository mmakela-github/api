# api
Coding test

## Instructions

#### Prerequites
Install Docker for your system


### Installation

- Clone project to your local machine with command:
```
git clone https://github.com/mmakela-github/api.git
```

- Create <code>.env</code> file with variable <code>PORT</code>
```
PORT=3000
```

- Build the Docker image first time:
```
docker-compose up --build
```
This command will launch the application on <code>http://localhost:3000/</code> (port 3000 is used by default)

### Running project on your machine

Launch project in Docker:
```
docker-compose up
```

### Running tests

Run test with command:
```
docker compose run api npm run test
```