import { EntityManager } from '@mikro-orm/postgresql';
import { Book } from './entities';
import { createConnection } from './orm';

async function getBooksUsingFind(em: EntityManager): Promise<Book[]> {
  return em.find(Book, {});
}

async function getBooksUsingMap(em: EntityManager): Promise<Book[]> {
  const result = await em.getConnection().execute('SELECT * FROM "book"');
  return result.map((data) => em.map(Book, data));
}

(async () => {
  const orm = await createConnection();

  const books = process.argv[2] === 'map'
    ? await getBooksUsingMap(orm.em)
    : await getBooksUsingFind(orm.em);

  await orm.em.populate(books, 'author');
  await orm.em.flush();

  await orm.close();
})();
