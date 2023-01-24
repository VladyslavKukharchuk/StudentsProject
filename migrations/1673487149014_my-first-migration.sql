-- Up Migration

CREATE TABLE classes
(
    id          INTEGER PRIMARY KEY,
    name        VARCHAR(50)  NOT NULL UNIQUE,
    health      INTEGER      NOT NULL,
    damage      INTEGER      NOT NULL,
    attack_type VARCHAR(50)  NOT NULL,
    ability     VARCHAR(50)  NOT NULL,
    created_at  TIMESTAMP(0) NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP(0) NOT NULL DEFAULT NOW()
);

CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL,
    email      VARCHAR(50)  NOT NULL UNIQUE,
    password   VARCHAR(100) NOT NULL,
    class_id   INTEGER      NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes (id),
    created_at TIMESTAMP(0) NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(0) NOT NULL DEFAULT NOW()
);


INSERT INTO classes (id,
                     name,
                     health,
                     damage,
                     attack_type,
                     ability)
VALUES (0,
        'Thief',
        100,
        25,
        'Archery Shot',
        'Escape');

INSERT INTO classes (id,
                     name,
                     health,
                     damage,
                     attack_type,
                     ability)
VALUES (1,
        'Mage',
        80,
        100,
        'Fireball',
        'Enchant');

INSERT INTO classes (id,
                     name,
                     health,
                     damage,
                     attack_type,
                     ability)
VALUES (2,
        'Warrior',
        200,
        50,
        'Sword Strike',
        'Defense');

-- Down Migration

DROP TABLE users;

DROP TABLE classes;

