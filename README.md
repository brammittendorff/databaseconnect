# A mongodb and postgres connector

When you use an uri for mongo db and you want a quick peek to see the databases.

## Requirements

- node
- MongoClient
- pg

## Installation

For the installation please run:

```
npm install
```

## Usage

Protocols supported:

```
node index.js "mongodb+srv://user:pass@myserver.com"
node index.js "mongodb://user:pass@myserver.com"
node index.js "postgres://user:pass@myserver.com"
```
