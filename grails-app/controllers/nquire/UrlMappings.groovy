package nquire

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "/student"(view:"/student/studentPage")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
