const ArticleService = require("../services/articleService")

class ArticleController {
    constructor(){
        this.service = new ArticleService();
    }

    getArticles(request){
        console.log("Start getArticles");

        const url = new URL(request.url);
        let page = 1;
        let recPerPage = this.service.getLength().length;
        let search;

        if(url.searchParams.has("page") && url.searchParams.has("recPerPage")){
            page = parseInt(url.searchParams.get("page"));
            recPerPage = parseInt(url.searchParams.get("recPerPage"));
        }

        if(url.searchParams.has("search")){
            search = url.searchParams.get("search");
        }
        
        const articles = this.service.getArticles(page, recPerPage, search);

        console.log("Result", articles);
        
        const init = {
            headers: { 'content-type': 'application/json' },
        }
        const body = JSON.stringify(articles)
        return new Response(body, init)
    }

    getlength(request){
        console.log("Start getlength");

        const length = this.service.getLength();

        console.log("Result", length);

        const init = {
            headers: { 'content-type': 'application/json' },
        }
        const body = JSON.stringify(length)
        return new Response(body, init)
    }
}

module.exports = ArticleController