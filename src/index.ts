import { EntityComparator } from '@mikro-orm/core';
import { Author } from './entities';
import { createConnection } from './orm';
 
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
 
  const author = await orm.em.map(Author, {
    id: 1,
    name: 'Pete',
    books: [
      { id: 1, name: 'Life of Pete' },
      { id: 2, name: 'Life of Pete 2' },
      { id: 3, name: 'Life of Pete 3' },
    ]
  })
  console.log('author', author);

  console.log('Calling flush()...');
  await orm.em.flush(); 
  await orm.close();
})();
