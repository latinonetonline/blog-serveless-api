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
        
        return articles;
    }

    getlength(request){
        console.log("Start getlength");

        const length = this.service.getLength();

        console.log("Result", length);

        return length;
    }

    getBySlug(request){
        console.log("Start getBySlug");

        let slug;

        const url = new URL(request.url);
        if(url.searchParams.has("slug")){
            slug = url.searchParams.get("slug");
        }

        const article = this.service.getBySlug(decodeURIComponent(slug));

        console.log("Result", article);

        return article;
    }
}

module.exports = ArticleController