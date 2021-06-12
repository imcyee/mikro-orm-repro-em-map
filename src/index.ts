import { EntityComparator } from '@mikro-orm/core';
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

  const comparator = (orm.em.getUnitOfWork() as any).comparator;
  comparator.prepareEntity = (entity: any) => {
    const res = EntityComparator.prototype.prepareEntity.call(comparator, entity);
    console.log(`EntityComparator.prepareEntity(${entity.constructor.name} #${entity.id}):`);
    console.log(' Actual data:', entity);
    console.log(' Prepare result:', res);
    return res;
  };

  console.log('Loading books...');
  const books = process.argv[2] === 'map'
    ? await getBooksUsingMap(orm.em)
    : await getBooksUsingFind(orm.em);

  console.log('Populating authors...');
  await orm.em.populate(books, 'author');

  console.log('Calling flush()...');
  await orm.em.flush();

  await orm.close();
})();
