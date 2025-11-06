let containerEventos = document.getElementById("containerEventos");
let containerBtnInserirEvento = document.getElementById("containerBtnInserirEvento");
var eventos = 1;

var listaEventos = [];



const adm = 1;
if (adm > 0) {

    let btnInserir = `
    <div class="cadEvento" id="CardSemEventos">
    <button class="btn-cadEvento" onclick="PreencherEvento()">Inserir evento + </button>
    </div>
    `;
    containerBtnInserirEvento.innerHTML += btnInserir;

    function PreencherEvento() {
        // let elementos = document.getElementsByName("CardEvento");
        // elementos.forEach(el => el.remove())
        var cardboxEventoVazio = document.getElementById("cardboxEventoVazio");
        if (cardboxEventoVazio) {
            cardboxEventoVazio.remove()
        }



        let cardEventoVazio = `
        <div class="cardboxEvento" id="cardboxEventoVazio">
        <img src="" alt="">
        <br>
        <div class="event-infoVazio">
        <h2>Inserir Evento</h2>
        <form action="">
        <label for=""><strong>Evento: </strong></label>
        <input type="text" id="InsereNomeEvento"><br>
        
        <label for=""><strong>Data: </strong></label>
        <input type="date" id="InsereDataEvento"><br>
        
        <label for=""><strong>Hora: </strong></label>
        <input type="time" id="InsereHora"><br>
        
        <label for=""><strong>Local: </strong></label>
        <input type="text" id="InsereLocal"><br>
        
        <div class="inline">
        <label for=""><strong>Qtd. Máxima de inscritos: </strong></label>
        <input type="number" style="width: 15%;" id="InsereInscritos">
        </div>
        </form>
        </div>
        <br>
        <div class="inline">
        <button class="btn-EnviarEvento" onclick="AdicionarEvento()">Enviar</button>
        <button class="btn-CancelarEnviarEvento" onclick="CancelarEventos()">Cancelar</button>
        </div>
        </div>`;

        containerEventos.innerHTML += cardEventoVazio;
    }

    function AdicionarEvento() {

        let Nome = document.getElementById("InsereNomeEvento").value;
        let Data = document.getElementById("InsereDataEvento").value;
        let Hora = document.getElementById("InsereHora").value;
        let Local = document.getElementById("InsereLocal").value;
        let QtdInscritos = 0;
        let MaxInscritos = Number(document.getElementById("InsereInscritos").value);
        if (Nome && Data && Hora && Local && MaxInscritos) {
            var novoEvento = { Nome, Data, Hora, Local, QtdInscritos, MaxInscritos };
            listaEventos.push(novoEvento);
            eventos++;
            document.getElementById("cardboxEventoVazio").remove();
            ReloadEventos();
        }
        else {
            alert("Por favor, insira preencha todos os campos solicitados.")
        }
        console.log(listaEventos)
    }
}

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

function ReloadEventos() {
    // Remove todos os cards antigos
    const elementos = document.getElementsByName("CardEvento");
    // Usa while pq getElementsByName é uma lista "viva"
    while (elementos.length > 0) {
        elementos[0].remove();
    }

    const containerEventos = document.getElementById("containerEventos");

    // Cria um fragmento de documento (melhor performance)
    const fragment = document.createDocumentFragment();

    // Gera cada card sem reprocessar o DOM inteiro
    for (const itens of listaEventos) {
        const card = document.createElement("div");
        card.className = "cardbox";
        card.setAttribute("name", "CardEvento");

        card.innerHTML = `
            <img src="" alt="">
            <br>
            <div class="event-info">
                <label><strong>Evento: </strong></label>
                <input type="text" class="NomeEvento" disabled value='${itens.Nome}'><br>

                <label><strong>Data: </strong></label>
                <input type="date" disabled value='${itens.Data}'><br>

                <label><strong>Hora: </strong></label>
                <input type="time" disabled value='${itens.Hora}'><br>

                <label><strong>Local: </strong></label>
                <input type="text" disabled value='${itens.Local}'><br>

                <div class="inline">
                    <label><strong>Inscritos: </strong></label>
                    <input type="text" style="width: 7%;" disabled value='${itens.QtdInscritos}' class='inline'>
                    <p style="margin: 0;">/</p>
                    <input type="text" style="width: 7.5%;" disabled value='${itens.MaxInscritos}' class='inline'>
                </div>
            </div>
            <br>
            <button class="btn-inscrever" onclick="InscreverEvento()">Inscreva-se</button>
        `;

        // Adiciona o card no fragmento
        fragment.appendChild(card);
    }

    // Adiciona tudo de uma vez no container
    containerEventos.appendChild(fragment);
}
function CancelarEventos() {
    document.getElementById("cardboxEventoVazio").remove();
    ValidaEventos();
}

