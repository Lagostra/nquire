package nquire

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller:'lecture', action: 'index')
        "500"(view:'/error')
        "404"(view:'/notFound')
        "/lecturer"(view:"/lecturerFrontPage")
    }
}
