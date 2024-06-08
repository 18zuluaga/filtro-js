import { navigateTo } from "../../../Router";
import style from "./style.css"

export function HomePage(){
     const pagecontent = /*html*/`
            <h2 class="${style.title}">Nuestros vuelos disponibles</h2>
        <div class="${style.conatiner}">
            <div class="${style.cards}" id="mycards">
                
            </div>
            <div class="${style.reservation}" id="reservas">
                <h2>Reservas</h2>
            </div>
        </div>
        
     `

     const logic = async function (){ 
        
        const allflights = await fetch('http://localhost:3000/flights')
        const flightsTojson = await allflights.json();

        flightsTojson.forEach(element => {
            const cards = document.getElementById("mycards")
            
            cards.innerHTML += /*html*/`
                <div class="card" id="card">
                    <h3>Numero Del Avion: ${element.number}</h3>
                    <p>Lugar de Origen: ${element.origin}</p>
                    <p>Lugar de Destino: ${element.destination}</p>
                    <p>Fecha de Partida: ${element.deparute}</p>
                    <p>Fecha de Salida: ${element.arrival}</p>
                    <p>Numero de pasajeros en el vuelo: ${element.capacity}</p>
                    <div class="btn" id="btns">

                    </div>
                    <div class="${style.cheackout}" id="cheackout">
                        <div class="${style.chek}">
                            <a href="" class="${style.cerrar}">X</a>
                            <div class="${style.izquierda}">
                                <img src="https://concepto.de/wp-content/uploads/2023/01/avion.jpg" alt="">
                            </div>
                            <div class="${style.derecha}">
                                <div class="info-text ${style.infoText}">
                                    <p id="chekNumber"></p>
                                    <p id="chekorigin"></p>
                                    <p id="chekdestination"></p>
                                    <p id="chekdeparute"></p>
                                    <p id="chekarrival"></p>
                                    <p id="chekcapacity"></p>
                                </div>
                                <a href="" class="${style.confirmarCompra}" id="confirmacion">Confirmar Compra</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            if(localStorage.getItem('idrol') == 1){
                cards.innerHTML += /*html*/`
                    <div class="${style.cardbtn}">
                        <a href="" class="btn-edit ${style.btn_action}" id="edit-flight" data-id="${element.id}">editar vuelo</a>
                        <a href="" class="btn-delete ${style.btn_action}" id="delete-flight" data-id="${element.id}">eliminar vuelo</a>
                    </div>
                `;
            }else{
                cards.innerHTML += /*html*/`
                    <a href="" class="btn-buy ${style.btn_action}" id="buy-flight" data-id="${element.id}">comprar vuelo</a>
                `;
            }
        });

        
        if(localStorage.getItem('idrol') === "1"){
            const btnsEdit = document.querySelectorAll('.btn-edit')
            const btnsDelete = document.querySelectorAll('.btn-delete')
            for(let btnEdit of btnsEdit){
                btnEdit.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateTo(`/edit-flight?flightid=${btnEdit.getAttribute('data-id')}`);
                })
            }
            for(let btnDelete of btnsDelete){
                btnDelete.addEventListener('click', (e) => {
                    e.preventDefault();
                    const flightDelete = fetch(`http://localhost:3000/flights/${btnDelete.getAttribute('data-id')}`, {
                        method: 'DELETE'
                    });
                    if(!flightDelete.ok){
                        console.log("error en el servidor");
                    }
                    alert('se elimino correctamente');
                })
            }
            const reservation = document.getElementById('reservas');
            reservation.style.display = 'none';
        }else{
            const btnsBuy = document.querySelectorAll('.btn-buy')
            for(let btnBuy of btnsBuy){
                btnBuy.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const cheackout = document.getElementById('cheackout');
                    
                    const flight = await fetch(`http://localhost:3000/flights/${btnBuy.getAttribute('data-id')}`);
                    const flightTojson = await flight.json();
                    
                    if(flightTojson.capacity === 0){
                        alert("no hay pacidad en el avion")
                        return
                    }
                    cheackout.style.display = "flex";
                    

                    
                    const chekNumber = document.getElementById('chekNumber');
                    const chekorigin = document.getElementById('chekorigin');
                    const chekdestination = document.getElementById('chekdestination');
                    const chekdeparute = document.getElementById('chekdeparute');
                    const chekarrival = document.getElementById('chekarrival');
                    const chekcapacity = document.getElementById('chekcapacity');

                    chekNumber.textContent = flightTojson.number;
                    chekorigin.textContent = flightTojson.origin;
                    chekdestination.textContent = flightTojson.destination;
                    chekdeparute.textContent = flightTojson.deparute;
                    chekarrival.textContent = flightTojson.arrival;
                    chekcapacity.textContent = flightTojson.capacity;


                    
                    const confirm = document.getElementById('confirmacion');
                    confirm.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const editflight = await fetch(`http://localhost:3000/flights/${btnBuy.getAttribute('data-id')}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                number: flightTojson.number,
                                origin: flightTojson.origin,
                                destination: flightTojson.destination,
                                deparute: flightTojson.deparute,
                                arrival: flightTojson.arrival,
                                capacity: flightTojson.capacity - 1,
                            })
                        })

                        if(!editflight.ok){
                            console.log("error en el servidor");
                            return
                        }

                        const createreservation = await fetch(`http://localhost:3000/bookings`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                flightId: btnBuy.getAttribute('data-id'),
                                userId: localStorage.getItem('id'),
                                bookingDate: new Date().toISOString(),
                            })
                        });


                        if(!createreservation.ok){
                            console.log("error en el servidor");
                            return
                        }

                        alert('comprado exitosamente');
                        navigateTo('/dashboard')
                                })
                    
                            })
                        }

            const reservation = document.getElementById('reservas');

            const reservationsfetch = await fetch(`http://localhost:3000/bookings?userId=${localStorage.getItem('id')}`)
            const reservationToJson = await reservationsfetch.json();
            console.log(reservationToJson)
            reservationToJson.forEach(async (element) => {
                const flightReservation = await fetch(`http://localhost:3000/flights/${element.flightId}`);
                const flightTojsonReservation = await flightReservation.json();
                reservation.innerHTML += /*html*/`
                    <div class="${style.reserva}">
                        <p>Numero Del Avion: ${flightTojsonReservation.number}</p>
                        <p>Lugar de Origen: ${flightTojsonReservation.origin}</p>
                        <p>Lugar de Destino: ${flightTojsonReservation.destination}</p>
                        <p>Fecha de la reserva: ${element.bookingDate}</p>
                    </div>
                        `
            })


        }

     }

     return {pagecontent, logic}
}