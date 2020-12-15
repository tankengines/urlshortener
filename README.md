# URL Shortener

This website is a simple URL shortener, utilizing node.js and Redis. A live example can be found on <https://go.itsthomas.tech>.

# Installation

1. Clone or download the repository.
2. `npm install`
3. `npm start`

# Docker

The website can also be used in conjunction with Docker.

## Build Image

```
docker build . -t urlshortener
```

## Run Container

```
docker run -d -p 4761:4761 urlshortener
```

# Disclaimer

This isn't 100% stable, feel free to make your own adjustments if you are hosting yourself. The live example is not to be relied upon. Not responsible for any deleted redirects.
