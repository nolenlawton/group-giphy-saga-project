CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR(250) NOT NULL,
	"cat_id" INT REFERENCES "category"
);

INSERT INTO "favorites" ("url")
VALUES ('url1'), ('url2'), ('url3'), ('url4'), ('url5');

--CREATE TABLE "category_favorites" (
--	"id" SERIAL PRIMARY KEY,
--	"cat_id" INT,
--	"favorites_id" INT
--);
