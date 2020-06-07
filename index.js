const Router = require('./router')
const ArticleController = require("./controllers/articleController")

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const r = new Router()
    const controller = new ArticleController()
    // Replace with the approriate paths and handlers
    r.get('.*/articles', request => controller.getArticles(request))
    r.get('.*/countArticles', request => controller.getlength(request))

    const resp = await r.route(request)
    return resp
}
