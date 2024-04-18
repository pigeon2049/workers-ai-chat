CREATE SEQUENCE IF NOT EXISTS chat_id_seq START 1;
CREATE TABLE IF NOT EXISTS chat_record (
    id BIGINT PRIMARY KEY DEFAULT NEXTVAL('chat_id_seq'),
    role VARCHAR,
    content TEXT,
    time TIMESTAMP,
    user_id BIGINT,
    c_id VARCHAR
    );
