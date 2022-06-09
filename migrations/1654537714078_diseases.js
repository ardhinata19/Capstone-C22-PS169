/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('diseases', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        description: {
            type: 'TEXT',
            notNull: true,
        },
        imageDiseases: {
            type: 'TEXT',
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
    pgm.dropTable('diseases');
};