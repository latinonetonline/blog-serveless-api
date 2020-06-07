const ArticleService = require("../services/articleService")

class ArticleController {
    constructor(){
        this.service = new ArticleService();
    }

    getArticles(request){
        const url = new URL(request.url);
        let page = 0;
        let recPerPage = 0;
        let search;
        if(url.searchParams.has("page")){
            page = parseInt(url.searchParams.get("page"));
        }

        if(url.searchParams.has("recPerPage")){
            recPerPage = parseInt(url.searchParams.get("recPerPage"));
        }

        if(url.searchParams.has("search")){
            search = url.searchParams.get("search");
        }

        const articles = this.service.getArticles(page, recPerPage, search);

        const init = {
            headers: { 'content-type': 'application/json' },
        }
        const body = JSON.stringify(articles)
        return new Response(body, init)
    }

    getlength(request){
        const length = this.service.getLength();

        const init = {
            headers: { 'content-type': 'application/json' },
        }
        const body = JSON.stringify(length)
        return new Response(body, init)
    }
}

module.exports = ArticleController