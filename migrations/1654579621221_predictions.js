/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('predictions', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        disease_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        accuracy: {
            type: 'NUMERIC',
            notNull: true,
        },
        image: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        createdAt: {
            type: 'TEXT',
            notNull: true,
        },
    });

    pgm.addConstraint('predictions', 'userId_fk', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('predictions', 'diseaseId_fk', 'FOREIGN KEY (disease_Id) REFERENCES diseases(id) ON DELETE RESTRICT');

};

exports.down = pgm => {
    pgm.dropTable('predictions');
};
