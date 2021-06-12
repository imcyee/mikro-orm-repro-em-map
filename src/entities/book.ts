import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Author } from './author';

@Entity()
export class Book {
  @PrimaryKey()
  readonly id: number;

  @ManyToOne(() => Author, { inversedBy: (author) => author.books })
  readonly author: Author;

  @Property({ length: 42 })
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
