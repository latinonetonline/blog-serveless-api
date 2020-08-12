const articleSlugs = require('../db/articles.js')

class ArticleService {

    getArticles(page, recPerPage, search) {
        let totalRecords = 0,
            records = [],
            displayRecords = [],
            totalPages = 0;

        if (search && search.length > 0) {

            records = articleSlugs.filter(value => value.includes(search.toLowerCase().replace(/ /g, '+')));
        }
        else {
            records = articleSlugs;
        }

        totalRecords = records.length;
        totalPages = Math.ceil(totalRecords / recPerPage)

        const displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
        const endRec = (displayRecordsIndex) + recPerPage;
        displayRecords = records.slice(displayRecordsIndex, endRec);

        return {
            totalPages: totalPages,
            currentPage: page,
            slugs: displayRecords
        }
    }

    getLength() {
        return {
            length: articleSlugs.length
        }
    }

    getBySlug(slug) {
        var result = articleSlugs[articleSlugs.indexOf(slug.toLowerCase())];
        return {
            exist: result ? true : false,
            slug: result
        }
    }
}

module.exports = ArticleService