CREATE DATABASE IF NOT EXISTS sistema_db;

DROP USER 'fastapi_user'@'localhost';

CREATE USER 'fastapi_user'@'localhost' IDENTIFIED BY '3Cu5T40aaTP41Tsm';
GRANT ALL PRIVILEGES ON sistema_db.* TO 'fastapi_user'@'localhost';
FLUSH PRIVILEGES; -- Isso não é necessário, já que o comando utilizado foi GRANT.

-- Por outro lado, comandos como UPDATE, INSERT ou DELETE, FLUSH PRIVILEGES deve ser executado.
