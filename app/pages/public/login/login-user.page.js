import { navigateTo } from "../../../Router";
import style from "./style.css";

export function LoginPage(){
    const root = document.getElementById('root');

    root.innerHTML = /*html*/`
        <div class="${style.register}">
            <h1 class="${style.title}">Bienvenido Fly Flast</h1>
            <div class="${style.car_form}">
                <form class="${style.form_register}">
                    
                    <div class="${style.labelandinput}">
                        <label for="inputLoginEmailUser" >Correo Electronico</label>
                        <input type="email" id="inputLoginEmailUser" placeholder="jhoncarl@gmail.com">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputLoginPasswordUser" >Contraseña</label>
                        <input type="password" id="inputLoginPasswordUser" placeholder="password">
                    </div>
                    <button class="${style.enviar}" type="submit">Ingresar</button>
                </form>
                <a href="" class="${style.linklogin}" id="LinkRegister">Crear cuenta</a>
            </div>
        </div>
    `;


    const LinkRegister = document.getElementById('LinkRegister');
    LinkRegister.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/register')
    })
    const formLoginUser = root.querySelector('form');
    const variableEmailUser = document.getElementById('inputLoginEmailUser');
    const variablePasswordUser = document.getElementById('inputLoginPasswordUser');

    formLoginUser.addEventListener('submit', async (e) => {
        e.preventDefault();

        if(!variableEmailUser.value || !variablePasswordUser.value){
            alert('Todos los campos son obligatorios');
            return
        }

        const allusers = await fetch('http://localhost:3000/users')
        const usersTojson = await allusers.json();
        const user = usersTojson.find(user => user.email === variableEmailUser.value)

        if(! user.password ===  variablePasswordUser.value){
            alert('no estas registrado');
            return
        }
        localStorage.setItem('token', Math.random() * 500 )
        localStorage.setItem('idrol', user.roleId)
        localStorage.setItem('id', user.id)
        navigateTo('/dashboard')
    })

}