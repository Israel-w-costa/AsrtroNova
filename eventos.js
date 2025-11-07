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
            <div class="cardbox" id name="CardEvento">
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

        // Gravar no localStorage
        // nome nomeEvento
        // quantidade de inscritos no evento QtdInscritosEvento

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
                <label><strong>Evento: </strong></label>
                <input type="text" class="NomeEvento" disabled value='${itens.name}' id="NomeEvento"><br>
                <label><strong>Descrição: </strong></label>
                <input type="text" disabled value='${itens.desc}' id="DescEvento"><br>

                <label><strong>Data: </strong></label>
                <input type="date" disabled value='${itens.date}' id="DataEvento"><br>

                <label><strong>Hora: </strong></label>
                <input type="string" disabled value='${itens.timePeriod}' id="HoraEvento"><br>

                <label><strong>Local: </strong></label>
                <input type="text" disabled value='${itens.place}' id="LocalEvento"><br>
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