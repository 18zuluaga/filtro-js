import { DashboardLayout } from "./components/layou-private";
import { routers } from "./helpers/routes"

export function navigateTo(path){
    window.history.pushState({}, "" , window.location.origin + path);
    Router();
}

function verficacionRouterPrivate(path){
    if (!localStorage.getItem("token")){
        alert("debes de iniciar seccion")
        navigateTo('/login')
        return
    }    
    if (localStorage.getItem("idrol") == "2" && path !== "/dashboard"){
        navigateTo('/dashboard')
        return
    }
    const privateRoute = routers.private.find( (route) => route.path === path)
    const { pagecontent, logic} = privateRoute.page();
    DashboardLayout(pagecontent,logic)
}

export function Router(){
    const path = window.location.pathname

    if( path == "/login" || path == "/register"){
        if (localStorage.getItem("token")){
            alert("ya tienes una seccion iniciada")
            return navigateTo('/dashboard')
        } 
    }

    const publicRoute = routers.public.find( (route) => route.path === path )
    const privateRoute = routers.private.find( (route) => route.path === path)

    if(publicRoute){
        publicRoute.page()
    }else if(privateRoute){
        verficacionRouterPrivate(path)
    }else{
        navigateTo('/not-found')
    }
}