import { navigateTo } from "../../../Router";
import style from './style.css'

export function CreaterFly(){
    const pagecontent = /*html*/`
        <div class="${style.register}">
            <h1 class="${style.title}">Agregar vuelo</h1>
            <div class="${style.car_form}">
                <form class="${style.form_register}">
                    
                    <div class="${style.labelandinput}">
                        <label for="inputCreateNumberFlight">Numero del vuelo</label>
                        <input type="text" id="inputCreateNumberFlight" placeholder="3205">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateOriginFlight">Lugar de origen del vuelo</label>
                        <input type="text" id="inputCreateOriginFlight" placeholder="Colombia - Medellin">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateDestinationFlight">Lugar de destino del vuelo</label>
                        <input type="text" id="inputCreateDestinationFlight" placeholder="Colombia - Medellin">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateDeparuteFlight">Fecha de partida del vuelo</label>
                        <input type="text" id="inputCreateDeparuteFlight" placeholder="2020-05-15">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateArrivalFlight">Fecha de llegada del vuelo</label>
                        <input type="text" id="inputCreateArrivalFlight" placeholder="2020-05-16">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputCreateCapacityFlight">Capasidad del avion</label>
                        <input type="text" id="inputCreateCapacityFlight" placeholder="50">
                    </div>
                    <button class="${style.enviar}" type="submit">Agregar vuelo</button>
                </form>
            </div>
        </div>
    `
    const logic = function (){ 
        const form = document.querySelector('form');
        const variableCreateNumberFlight = document.getElementById('inputCreateNumberFlight');
        const variableCreateOriginFlight = document.getElementById('inputCreateOriginFlight');
        const variableCreateDestinationFlight = document.getElementById('inputCreateDestinationFlight');
        const variableCreateDeparuteFlight = document.getElementById('inputCreateDeparuteFlight');
        const variableCreateArrivalFlight = document.getElementById('inputCreateArrivalFlight');
        const variableCreateCapacityFlight = document.getElementById('inputCreateCapacityFlight');
    
        form.addEventListener('submit', async (e) =>{
            e.preventDefault();
            if(!variableCreateNumberFlight.value || !variableCreateOriginFlight.value || !variableCreateDestinationFlight.value || !variableCreateDeparuteFlight.value || !variableCreateArrivalFlight.value || !variableCreateCapacityFlight.value){
                alert("todos los campos son obligatorias")
                return
            }

            const allflights = await fetch('http://localhost:3000/flights')
            const flightsTojson = await allflights.json();
            
            if(flightsTojson.find(flight => flight.number === variableCreateNumberFlight.value)){
                alert('ya estas registrado');
                return
            }
            
            const createrflight = await fetch('http://localhost:3000/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: variableCreateNumberFlight.value,
                    origin: variableCreateOriginFlight.value,
                    destination: variableCreateDestinationFlight.value,
                    deparute: variableCreateDeparuteFlight.value,
                    arrival: variableCreateArrivalFlight.value,
                    capacity: variableCreateCapacityFlight.value,
                })
            })

            if(!createrflight.ok){
                console.log("error en el servidor");
            }

            alert('se agrego corectamente');
            navigateTo('/dashboard')
            })
    }


    return {pagecontent, logic}
}