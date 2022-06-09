const {nanoid} = require('nanoid');
const {Pool} = require('pg');
const InvariantException = require('../../exceptions/InvariantException');
const NotFoundException = require('../../exceptions/NotFoundException');
const {mapDiseaseModel} = require('../../map_model');

class EyeDiseasesService {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this._pool = new Pool({
                "host": process.env.PGHOST,
                "database": process.env.PGDATABASE,
                "port": "5432",
                "user": process.env.PGUSER,
                "password": process.env.PGPASSWORD
            });
        } else {
            this._pool = new Pool();
        }
    }

    async addEyeDisease({title, description, imageDiseases}) {
        const id = "eyeDisease-" + nanoid(16);
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO diseases VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, title, description, imageDiseases, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantException('Disease failed to add');
        }

        return result.rows[0].id;
    }

    async getAllEyeDiseases() {
        const result = await this._pool.query('SELECT id, "title", "description", "imageDiseases", "createdAt", "updatedAt" FROM diseases');
        return result.rows.map(mapDiseaseModel);
    }

    async getEyeDiseaseById(id) {
        const result = await this._pool.query('SELECT * FROM diseases WHERE id = $1', [id]);

        if (!result.rows.length) {
            throw new NotFoundException('Disease not found');
        }

        return result.rows.map(mapDiseaseModel)[0];
    }

    async updateEyeDiseaseById(id, {title, description, imageDiseases}) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE diseases SET title = $1, "description" = $2, "imageDiseases" = $3, "updatedAt" = $4 WHERE id = $5 RETURNING id',
            values: [title, description, imageDiseases, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantException('Disease failed to update');
        }
    }

    async deleteEyeDiseaseById(id) {
        const query = {
            text: 'DELETE FROM diseases WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantException('Disease failed to delete');
        }
    }
}

module.exports = EyeDiseasesService;