create database todo;
create table todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);