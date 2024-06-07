import { navigateTo } from "../../../Router";
import style from "./style.css"

export function EditPageFlights (){
    const pagecontent = /*html*/` 
        <div class="${style.register}">
            <h1 class="${style.title}">Editar el vuelo</h1>
            <div class="${style.car_form}">
                <form class="${style.form_register}">
                    
                    <div class="${style.labelandinput}">
                        <label for="inputEditNumberFlight">Numero del vuelo</label>
                        <input type="text" id="inputEditNumberFlight" placeholder="3205">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputEditOriginFlight">Lugar de origen del vuelo</label>
                        <input type="text" id="inputEditOriginFlight" placeholder="Colombia - Medellin">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputEditDestinationFlight">Lugar de destino del vuelo</label>
                        <input type="text" id="inputEditDestinationFlight" placeholder="Estados unidos - NewYork">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputEditDeparuteFlight">Fecha de partida del vuelo</label>
                        <input type="text" id="inputEditDeparuteFlight" placeholder="2020-05-15">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputEditArrivalFlight">Fecha de llegada del vuelo</label>
                        <input type="text" id="inputEditArrivalFlight" placeholder="2020-05-16">
                    </div>
                    <div class="${style.labelandinput}">
                        <label for="inputEditCapacityFlight">Capasidad del avion</label>
                        <input type="text" id="inputEditCapacityFlight" placeholder="50">
                    </div>
                    <button class="${style.enviar}" type="submit">Editar vuelo</button>
                </form>
            </div>
        </div>
    `;

    const logic = async function (){ 
        const searchparams = window.location.search;
        const paramsTrasformed = new URLSearchParams(searchparams);
        const id = paramsTrasformed.get('flightid');

        const flight = await fetch(`http://localhost:3000/flights/${id}`);
        const flightTojson = await flight.json();

        const form = document.querySelector('form');
        const variableEditNumberFlight = document.getElementById('inputEditNumberFlight');
        const variableEditOriginFlight = document.getElementById('inputEditOriginFlight');
        const variableEditDestinationFlight = document.getElementById('inputEditDestinationFlight');
        const variableEditDeparuteFlight = document.getElementById('inputEditDeparuteFlight');
        const variableEditArrivalFlight = document.getElementById('inputEditArrivalFlight');
        const variableEditCapacityFlight = document.getElementById('inputEditCapacityFlight');

        variableEditNumberFlight.value = flightTojson.number;
        variableEditOriginFlight.value = flightTojson.origin;
        variableEditDestinationFlight.value = flightTojson.destination;
        variableEditArrivalFlight.value = flightTojson.arrival;
        variableEditDeparuteFlight.value = flightTojson.deparute;
        variableEditCapacityFlight.value = flightTojson.capacity;


        form.addEventListener('submit', async (e) =>{
            e.preventDefault()
            if(!variableEditNumberFlight.value ||!variableEditOriginFlight.value ||!variableEditDestinationFlight.value ||!variableEditDeparuteFlight.value ||!variableEditArrivalFlight.value ||!variableEditCapacityFlight.value){
                alert("todos los campos son obligatorias")
                return
            }

            const editflight = await fetch(`http://localhost:3000/flights/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: variableEditNumberFlight.value,
                    origin: variableEditOriginFlight.value,
                    destination: variableEditDestinationFlight.value,
                    deparute: variableEditDeparuteFlight.value,
                    arrival: variableEditArrivalFlight.value,
                    capacity: variableEditCapacityFlight.value,
                })
            })

            if(!editflight.ok){
                console.log("error en el servidor");
                return
            }

            alert('se actualizo correctamente');
            navigateTo('/dashboard')
        })
    }

    return {pagecontent, logic}
}
