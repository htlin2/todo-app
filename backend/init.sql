DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'my_app_dev') THEN 
        CREATE DATABASE my_app_dev; 
    END IF; 
END $$;

\c my_app_dev;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  description text
);

INSERT INTO todos (description) VALUES ('This is todo 1'), ('This is todo 2');
