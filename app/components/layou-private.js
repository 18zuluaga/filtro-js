import { navigateTo } from "../Router";
import style from './style.css'

export function DashboardLayout(pagecontent, logic){
    const root = document.getElementById('root');

    root.innerHTML = /*html*/`
            <nav class="${style.nav}" id="nav">
                <a href="" id="linkHome">Vuelos actuales</a>
            </nav>
            <div class="dashboard-layout__content">
                ${pagecontent}
            </div>
    `

    const nav = document.getElementById('nav');
    if(localStorage.getItem('idrol') == 1){
        nav.innerHTML += /*html*/`
            <a href=""  id="linkAddFly">Agregar vuelo</a>
        `
        const linkAddFly = document.getElementById('linkAddFly');

        linkAddFly.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('/add-fly')
        })

        const linkhome = document.getElementById('linkHome');
        linkhome.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target, "hola");
            navigateTo('/dashboard')
        })
    }
    logic();
}