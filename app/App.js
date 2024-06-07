import { Router } from "./Router";


export function App(){
    const root = document.getElementById('root');

    if(!root){
        console.error('erro no existe el root');
    }
    Router();
}