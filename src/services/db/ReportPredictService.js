const {nanoid} = require('nanoid');
const {Pool} = require('pg');
const InvariantException = require('../../exceptions/InvariantException');
const NotFoundException = require('../../exceptions/NotFoundException');
const {mapPredictHistoryModel} = require("../../map_model");


class ReportPredictService {
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

    async addReportPredict(
        user_id,
        disease_id,
        accuracy,
        image,
    ) {
        const id = "predict-" + nanoid(16);
        const createdAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO predictions VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, user_id, disease_id, accuracy, image, createdAt],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantException('failed to add prediction report');
        }

        return result.rows[0].id;
    }

    async getAllReportPredictById(credentialsId) {
        const query = {
            text: 'SELECT id, user_id, disease_id, accuracy, image, "createdAt" FROM predictions WHERE user_id = $1',
            values: [credentialsId],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundException('Prediction report not found');
        }
        return result.rows.map(mapPredictHistoryModel);
    }

    async deleteReportPrediction(id) {
        const query = {
            text: 'DELETE FROM predictions WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundException('Prediction report not found');
        }
        return result.rows.map(mapPredictHistoryModel);
    }
}

module.exports = ReportPredictService;