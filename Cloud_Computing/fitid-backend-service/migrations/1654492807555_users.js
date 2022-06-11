/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        firstName: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        lastName: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        email: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        imageProfile: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        createdAt: {
            type: 'TEXT',
            notNull: true,
        },
        updatedAt: {
            type: 'TEXT',
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('users');
};