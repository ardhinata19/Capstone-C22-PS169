/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('articles', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        article_url: {
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
    pgm.dropTable('articles');
};