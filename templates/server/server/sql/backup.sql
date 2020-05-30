CREATE TABLE "users" (
  "id" INTEGER NOT NULL PRIMARY KEY,
  "username" TEXT NOT NULL,
  "groups" TEXT NOT NULL DEFAULT 1,
  "roles" TEXT NOT NULL DEFAULT 1,
  "avatar" TEXT,
  "email" TEXT,
  "mobile" TEXT,
  "password" TEXT NOT NULL,
  "createTime" integer NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastLoginTime" integer NOT NULL DEFAULT 0
);
CREATE INDEX i_users_email ON users ("email");
CREATE INDEX i_users_mobile ON users ("mobile");
