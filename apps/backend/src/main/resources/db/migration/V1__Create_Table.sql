CREATE TABLE my_schema.users
(
    id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE my_schema.events
(
    id         BIGSERIAL PRIMARY KEY,
    user_id  VARCHAR(255)             NOT NULL,
    activity   TEXT                     NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
