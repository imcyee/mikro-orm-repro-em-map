# Reproduction of bug when using `em.map()` in MikroORM

This is a minimal reproduction of a bug which is happening in MikroORM
when one uses the `em.map()` method to convert a raw database result
to entities.

To run this reproduction:
 - `npm ci`
 - `docker compose up`
 - `npm start` or `npm start -- map`

Running `npm start` without arguments will load `Book` entities using
`em.find()`. Running with `map` will load `Book` entities using
a combination of `em.getConnection().execute()` and `em.map()`.

In both scenarios the `author` relation of the loaded entities is populated
using `em.populate()` and then `FLUSH` is called.

In the first scenario two `SELECT` queries will be logged to the console.
This is the expected behaviour.

In the second scenario an additional `UPDATE` query for the `author` table
will be logged. This, I believe, is a bug.
