-- Up Migration

CREATE TABLE classes
(
    id          INTEGER PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE,
    health      INTEGER     NOT NULL,
    damage      INTEGER     NOT NULL,
    attack_type VARCHAR(50) NOT NULL,
    ability     VARCHAR(50) NOT NULL,
    created_at  DATE        NOT NULL,
    updated_at  DATE        NOT NULL
);

CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL,
    email      VARCHAR(50)  NOT NULL UNIQUE,
    password   VARCHAR(100) NOT NULL,
    class_id   INTEGER      NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes (id),
    created_at DATE         NOT NULL,
    updated_at DATE         NOT NULL
);

CREATE TABLE tokens
(
    user_id      INTEGER      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    refreshToken VARCHAR(250) NOT NULL UNIQUE
);

INSERT INTO classes (id,
                     name,
                     health,
                     damage,
                     attack_type,
                     ability,
                     created_at,
                     updated_at)
VALUES (0,
        'Thief',
        100,
        25,
        'Archery Shot',
        'Run Away',
        NOW(),
        NOW());

INSERT INTO classes (id,
                     name,
                     health,
                     damage,
                     attack_type,
                     ability,
                     created_at,
                     updated_at)
VALUES (1,
        'Mage',
        80,
        100,
        'Fireball',
        'Bewitch',
        NOW(),
        NOW());

INSERT INTO classes (id,
                     name,
                     health,
                     damage,
                     attack_type,
                     ability,
                     created_at,
                     updated_at)
VALUES (2,
        'Warrior',
        200,
        50,
        'Sword Strike',
        'Defense',
        NOW(),
        NOW());

-- Down Migration

DROP TABLE tokens;

DROP TABLE users;

DROP TABLE classes;
