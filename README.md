# Demo: Token-Based Auth

## Installation

Client: install packages, and run server

- `cd client`
- `npm i`
- `npm start`

Server: Install packages

- `cd server`
- `npm i`
- `npm start`

Server: create database
- `mysql -u root -p`
- `CREATE DATABASE jwt_auth`

Server: run migrations
- Ensure knexfile.js credentials are correct
- `npx knex migrate:latest`

Server: Start server
- `npm start`

## Additional Resources

- [Planning Phase Notes](/.TOKEN-AUTH.md)