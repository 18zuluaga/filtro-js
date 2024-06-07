import { CreaterFly } from "../pages/private/addflights";
import { EditPageFlights } from "../pages/private/edit";
import { HomePage } from "../pages/private/home";
import { LoginPage } from "../pages/public/login";
import { NotFoundPage } from "../pages/public/notfound";
import { RegisterPage } from "../pages/public/register";



export const routers = {
    
    public:[
        {path: '/register',page: RegisterPage},
        {path: '/not-found', page: NotFoundPage},
        {path: '/login', page: LoginPage},
    ],
    private:[
        {path: '/dashboard', page: HomePage},
        {path: '/add-fly', page: CreaterFly},
        {path: '/edit-flight', page: EditPageFlights}
    ]

}