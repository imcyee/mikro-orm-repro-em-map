CREATE TABLE "author" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(42) NOT NULL
);

CREATE TABLE "book" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "author_id" INT NOT NULL,
    "name" VARCHAR(42) NOT NULL,
    FOREIGN KEY ("author_id") REFERENCES "author" ("id") ON DELETE CASCADE
);

INSERT INTO "author" ("name") VALUES ('Pete');
INSERT INTO "book" ("author_id", "name") VALUES (1, 'Life of Pete');
