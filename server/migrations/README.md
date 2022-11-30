# Migrations

## Commands

### migrate up

> yarn migrate:local up
>
> yarn migrate:dev up
>
> yarn migrate:ci up

Populate env you need to run the migration on `database.json`, by default it uses `dev`

### migrate down

> yarn migrate:local down

### create migration

> yarn migrate:[ENV] create "migrations name..."

This command would create a migration js file under `/migrations` with timestamp. Enjoy building your migrations on the created file.

### reset all migrations

> yarn migrate:[ENV] reset

### More commands

[migrate command docs](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/)

## API

[Migrations API](https://db-migrate.readthedocs.io/en/latest/API/NoSQL/)
