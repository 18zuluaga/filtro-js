import { navigateTo } from "../../../Router";
import style from './style.css'

export  function RegisterPage(){
    const root = document.getElementById('root');

    root.innerHTML = /*html*/`
        <div class="${style.register}">
            <h1 class="${style.title}">Bienvenido Fly Flast</h1>
            <div class="${style.car_form}">
                <a href="" class="${style.linklogin}" id="LinkLogin">Ya tengo una cuenta</a>
                <form class="${style.form_register}">
                    
                    <div class="${style.labelandinput}">
                        <label for="inputCreateNameUser">Nombre</label>
                        <input type="text" id="inputCreateNameUser" placeholder="jhon carl">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateEmailUser"" >Correo Electronico</label>
                        <input type="email" id="inputCreateEmailUser" placeholder="jhoncarl@gmail.com">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateBirthdateUser" >Fecha De Nacimiento</label>
                        <input type="text" id="inputCreateBirthdateUser" placeholder="2024-06-30">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreatePasswordUser" >Contraseña</label>
                        <input type="password" id="inputCreatePasswordUser" placeholder="password">
                    </div>

                    <button class="${style.enviar}" type="submit">Crear Cuenta</button>
                </form>
                
            </div>
        </div>
    `;

    const formCreateUser = root.querySelector('form');
    const variableCreateNameUser = document.getElementById('inputCreateNameUser');
    const variableCreateEmailUser = document.getElementById('inputCreateEmailUser');
    const variableCreateBirthdateUser = document.getElementById('inputCreateBirthdateUser');
    const variableCreatePasswordUser = document.getElementById('inputCreatePasswordUser');
    const LinkLogin = document.getElementById('LinkLogin');

    LinkLogin.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/login')
    })

    formCreateUser.addEventListener('submit', async (e) => {
        e.preventDefault();

        if(!variableCreateNameUser.value || !variableCreateEmailUser.value || !variableCreateBirthdateUser.value || !variableCreatePasswordUser.value){
            alert('Todos los campos son obligatorios');
            return
        }      

        const allusers = await fetch('http://localhost:3000/users')
        const usersTojson = await allusers.json();
        
        if(usersTojson.find(user => user.email === variableCreateEmailUser.value)){
            alert('ya estas registrado');
            return
        }
        
        const createrUser = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: variableCreateNameUser.value,
                email: variableCreateEmailUser.value,
                birthdate: variableCreateBirthdateUser.value,
                password:  variableCreatePasswordUser.value,
                roleId : "2"
            })
        })

        if(!createrUser.ok){
            console.log("error en el servidor");
        }

        alert('Gracias por registrate');
        navigateTo('/login')
    })
}