const {nanoid} = require('nanoid');
const {Pool} = require('pg');
const InvariantException = require('../../exceptions/InvariantException');
const NotFoundException = require('../../exceptions/NotFoundException');
// const {mapDiseaseModel} = require('../../map_model');

class ArticlesService {
    constructor() {
        this._pool = new Pool();
    }

    async addArticle({title, article_url}) {
        const id = "article-" + nanoid(16);
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO articles VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, title, article_url, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantException('Article failed to add');
        }

        return result.rows[0].id;
    }

    async getAllArticles() {
        const result = await this._pool.query('SELECT id, title, article_url, "createdAt", "updatedAt" FROM articles');
        return result.rows;
    }

    async getArticleById(id) {
        const result = await this._pool.query('SELECT * FROM articles WHERE id = $1', [id]);

        if (!result.rows.length) {
            throw new NotFoundException('Article not found');
        }

        return result.rows[0];
    }

    async updateArticleById(id, {title, article_url}) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE articles SET title = $1, article_url = $2, "updatedAt" = $3 WHERE id = $4 RETURNING id',
            values: [title, article_url, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantException('Article failed to update');
        }
    }

    async deleteArticleById(id) {
        const query = {
            text: 'DELETE FROM articles WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantException('Article failed to delete');
        }
    }
}

module.exports = ArticlesService;