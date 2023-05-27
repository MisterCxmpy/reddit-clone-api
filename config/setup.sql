DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS communities CASCADE;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(140) NOT NULL,
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(140) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  score INT DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id)
);

CREATE TABLE posts (
  post_id INT GENERATED ALWAYS AS IDENTITY,
  community VARCHAR(140) NOT NULL,
  author VARCHAR(60) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  content TEXT,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
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
    'Popular',
    '"Popular" is a dynamic and diverse community that caters to a wide range of interests and discussions, making it a go-to destination for APP Name users seeking a glimpse into the most engaging and trending topics across various domains. With its extensive user base and active community, the community serves as a hub for sharing and exploring the latest news, viral content, thought-provoking discussions, and entertaining memes.

The community''s front page showcases a curated selection of popular posts from a multitude of categories, including technology, science, current events, art, sports, gaming, music, movies, TV shows, and much more. Users can easily find content that aligns with their interests, engage in lively conversations, and discover fascinating perspectives from around the world.',
    '[''Behave like you would in real life'', ''Search for duplicates before posting'', ''Look for the original source of content'', ''Search for duplicates before posting'', ''Read the community''s rules'']',
    'https://w0.peakpx.com/wallpaper/789/352/HD-wallpaper-sugar-pop-art-graffiti-stickers-colorful.jpg',
    'awesomegamer123',
    'true'
  )