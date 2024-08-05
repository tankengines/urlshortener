# URL Shortener

This website is a simple URL shortener, utilizing node.js and Redis. A live example can be found on [go.thomasng.me](https://go.thomasng.me/).

# Installation

1. Clone or download the repository.
1. Edit `.env` by cloning `.env.example`, where:
	- `PORT` is the port that the website will run on
 	- `REDIS_PASSWORD` is the password to your redis server
	- `KEY_LENGTH` is the length of the key for each link (example.com/\<KEY>)
1. `npm install`
1. `npm start`

# Docker

The website can also be used in conjunction with Docker.

## With redis via Docker Compose

```
docker compose up
```

## As a standalone container

### Building the image

```
docker build . -t urlshortener
```

### Run container

```
docker run -d -p PORT:PORT urlshortener
```

# Disclaimer

This isn't 100% stable, feel free to make your own adjustments if you are hosting yourself. The live example is not to be relied upon. Not responsible for any deleted redirects.
