# Reproduction of bug when using `em.map()` in MikroORM

This is a minimal reproduction of a bug which is happening in MikroORM
when one uses the `em.map()` method to convert a raw database result
to entities.

To run this reproduction:
 - `npm ci`
 - `docker compose up`
 - `npm start` or `npm start -- map`

Running `npm start` without arguments will load entities using `em.find()`.
Running with `map` will load entities using a combination of
`em.getConnection().execute()` and `em.map()`.

In the first scenario two `SELECT` queries will be logged to the console.
This is the expected behaviour.

In the second scenario an additional `UPDATE` query for the `author` table
will be logged. This, I believe, is a bug.
