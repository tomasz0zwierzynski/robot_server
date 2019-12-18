CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "firstname" varchar,
  "lastname" varchar,
  "created_at" timestamp
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "role" varchar
);

CREATE TABLE "configuration" (
  "id" SERIAL PRIMARY KEY,
  "key" varchar,
  "value" varchar
);

CREATE TABLE "user_roles" (
  "user_id" int,
  "role_id" int
);

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");