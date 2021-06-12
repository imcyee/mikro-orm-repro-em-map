import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from './book';

@Entity()
export class Author {
  @PrimaryKey()
  readonly id: number;

  @Property({ length: 42 })
  readonly name: string;

  @OneToMany(() => Book, (book) => book.author)
  readonly books: Collection<Book> = new Collection<Book>(this);

  constructor(name: string) {
    this.name = name;
  }
}
