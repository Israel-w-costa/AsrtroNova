let containerEventos = document.getElementById("containerEventos");
let containerBtnInserirEvento = document.getElementById("containerBtnInserirEvento");
var eventos = 1;
const salesStorage = JSON.parse(localStorage.getItem("sales")) || [];

let numInscritos = 0;

const listaEventos = JSON.parse(localStorage.getItem("event")) || [];


var listaIngressos = [];

ReloadEventos()

const adm = 1;

function ValidaEventos() {
    if (!listaEventos.length > 0) {
        let cardSemEventos = `
            <div class="cardbox voidCard" name="CardEvento">
                        <p>Não há eventos disponíveis :(</p>
            </div>
            `;
        containerBtnInserirEvento.innerHTML += cardSemEventos;

    }
}
ValidaEventos();

function modalCompraIngresso(botao) {

    const card = botao.closest('.cardbox');

    // pega o input do nome do evento dentro desse card
    const nomeEvento = card.querySelector('#NomeEvento').value;

    console.log('Evento selecionado:', nomeEvento);
    containerEventos.innerHTML += `
     <div class="overlay" id="compraIngresso">
                    <div class="popup">
                        <label for="abrir-popup" class="fechar" id="fecharCompraIngresso" onclick="fecharCompraIngresso()">&times;</label>
                        <h2>Comprar Ingresso</h2>
                        <h2>${nomeEvento}</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" placeholder="Seu nome" required id="nomeCompraIngresso">

                            <label>E-mail:</label>
                            <input type="email" placeholder="seuemail@exemplo.com" required id="emailCompraIngresso">

                            <label>Quantidade:</label>
                            <input type="number" required id="qtdCompraIngresso">

                            <button class="botao-enviar" type="button" onclick="ComprarIngresso('${nomeEvento}')">Finalizar Compra</button>
                        </form>
                    </div>
                </div>
    `;
}

function ComprarIngresso(evento) {
    var nome = document.getElementById("nomeCompraIngresso").value;
    var email = document.getElementById("emailCompraIngresso").value;
    var quantidade = document.getElementById("qtdCompraIngresso").value;

    let MaxInscritosEvento = document.getElementById("MaxInscritosEvento").value || "";

    if (evento && nome && email && quantidade) {
        var ingresso = { evento, nome, email, quantidade };
        salesStorage.push(ingresso)
        console.log(listaIngressos);
        fecharCompraIngresso()

        MaxInscritosEvento += quantidade;

        localStorage.setItem("event", JSON.stringify(salesStorage));

        localStorage.setItem("sales", JSON.stringify(salesStorage));

    } else {
        alert("Preencha todos os campos antes de continuar!");
    }
}

function fecharCompraIngresso() {
    document.getElementById("compraIngresso").remove();
}

function ReloadEventos() {
    const elementos = document.getElementsByName("CardEvento");
    while (elementos.length > 0) {
        elementos[0].remove();
    }

    const containerEventos = document.getElementById("containerEventos");

    const fragment = document.createDocumentFragment();

    for (const itens of listaEventos) {
        const card = document.createElement("div");
        card.className = "cardbox";
        card.setAttribute("name", "CardEvento");

        card.innerHTML = `
            <img src="${itens.image}" alt="foto do evento">
            <br>
            <div class="event-info">
               <h2 class="NomeEvento" id="NomeEvento">${itens.name}</h2>
               <p class="DescEvento" id="DescEvento">${itens.desc}</p>
               <div class="event-info-info"> 
                    <svg class="event-info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    <p class="DataEvento" id="DataEvento">${itens.date}</p>
                </div>
                <div class="event-info-info">
                    <svg class="event-info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer-icon lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
                    <p class="HoraEvento" id="HoraEvento">${itens.timePeriod}</p>
                </div>
                <div class="event-info-info">
                    <svg class="event-info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    <p class="LocalEvento" id="LocalEvento">${itens.place}</p>
                </div>

            <br>
            <button class="btn-inscrever" onclick="modalCompraIngresso(this)">Inscreva-se</button>

            
        `;

        fragment.appendChild(card);
    }

    containerEventos.appendChild(fragment);
}
function CancelarEventos() {
    document.getElementById("cardboxEventoVazio").remove();
    ValidaEventos();
}