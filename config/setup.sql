DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS communities CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(140) NOT NULL,
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(140) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  score INT DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  votes JSON DEFAULT('[]'),
  joined_communities JSON DEFAULT('[]'),
  PRIMARY KEY (user_id)
);

CREATE TABLE posts (
  post_id INT GENERATED ALWAYS AS IDENTITY,
  community VARCHAR(140) NOT NULL,
  author VARCHAR(60) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  content TEXT,
  votes INT DEFAULT 0,
  comments INT DEFAULT 0,
  user_id INT,
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE communities (
  community_id INT GENERATED ALWAYS AS IDENTITY,
  community_name VARCHAR(140) NOT NULL UNIQUE,
  community_summary TEXT NOT NULL,
  community_rules TEXT NOT NULL,
  community_image TEXT NOT NULL,
  community_leader VARCHAR(60) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (community_id)
);

INSERT INTO
  communities(
    community_name,
    community_summary,
    community_rules,
    community_image,
    community_leader,
    is_default
  )
VALUES
  (
    'popular',
    'The best posts on APP NAME for you, pulled from the most active communities on APP NAME. Check here to see the most shared, upvoted, and commented content on the internet.',
    '[''Behave like you would in real life'', ''Search for duplicates before posting'', ''Look for the original source of content'', ''Search for duplicates before posting'', ''Read the community''s rules'']',
    'https://e1.pxfuel.com/desktop-wallpaper/910/175/desktop-wallpaper-marvelous-funky-retro-for-backgrounds-in-animal-retro.jpg',
    'awesomegamer123',
    'true'
  )