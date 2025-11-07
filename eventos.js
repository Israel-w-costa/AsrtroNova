let containerEventos = document.getElementById("containerEventos");
let containerBtnInserirEvento = document.getElementById("containerBtnInserirEvento");
var eventos = 1;

var listaEventos = [
    {
        Nome: 'EVENTO 1',
        Data: '23/03/2006',
        Hora: '00:00',
        Local: 'observatório',
        QtdInscritos: 2,
        MaxInscritos: 50
    },
    {
        Nome: 'EVENTO 2',
        Data: '23/03/2006',
        Hora: '00:00',
        Local: 'observatório',
        QtdInscritos: 2,
        MaxInscritos: 50
    },
    {
        Nome: 'EVENTO 3',
        Data: '23/03/2006',
        Hora: '00:00',
        Local: 'observatório',
        QtdInscritos: 2,
        MaxInscritos: 50
    }
    ,
    {
        Nome: 'EVENTO 4',
        Data: '23/03/2006',
        Hora: '00:00',
        Local: 'observatório',
        QtdInscritos: 2,
        MaxInscritos: 50
    }
];
var listaIngressos = [];

ReloadEventos()

const adm = 1;
// if (adm > 0) {

//     let btnInserir = `
//     <div class="cadEvento" id="CardSemEventos">
//     <button class="btn-cadEvento" onclick="PreencherEvento()">Inserir evento + </button>
//     </div>
//     `;
//     containerBtnInserirEvento.innerHTML += btnInserir;

//     function PreencherEvento() {
//         // let elementos = document.getElementsByName("CardEvento");
//         // elementos.forEach(el => el.remove())
//         var cardboxEventoVazio = document.getElementById("cardboxEventoVazio");
//         if (cardboxEventoVazio) {
//             cardboxEventoVazio.remove()
//         }



//         let cardEventoVazio = `
//         <div class="cardboxEvento" id="cardboxEventoVazio">
//         <img src="" alt="">
//         <br>
//         <div class="event-infoVazio">
//         <h2>Inserir Evento</h2>
//         <form action="">
//         <label for=""><strong>Evento: </strong></label>
//         <input type="text" id="InsereNomeEvento"><br>
        
//         <label for=""><strong>Data: </strong></label>
//         <input type="date" id="InsereDataEvento"><br>
        
//         <label for=""><strong>Hora: </strong></label>
//         <input type="time" id="InsereHora"><br>
        
//         <label for=""><strong>Local: </strong></label>
//         <input type="text" id="InsereLocal"><br>
        
//         <div class="inline">
//         <label for=""><strong>Qtd. Máxima de inscritos: </strong></label>
//         <input type="number" style="width: 15%;" id="InsereInscritos">
//         </div>
//         </form>
//         </div>
//         <br>
//         <div class="inline">
//         <button class="btn-EnviarEvento" onclick="AdicionarEvento()">Enviar</button>
//         <button class="btn-CancelarEnviarEvento" onclick="CancelarEventos()">Cancelar</button>
//         </div>
//         </div>`;

//         containerEventos.innerHTML += cardEventoVazio;
//     }

//     function AdicionarEvento() {

//         let Nome = document.getElementById("InsereNomeEvento").value;
//         let Data = document.getElementById("InsereDataEvento").value;
//         let Hora = document.getElementById("InsereHora").value;
//         let Local = document.getElementById("InsereLocal").value;
//         let QtdInscritos = 0;
//         let MaxInscritos = Number(document.getElementById("InsereInscritos").value);
//         if (Nome && Data && Hora && Local && MaxInscritos) {
//             var novoEvento = { Nome, Data, Hora, Local, QtdInscritos, MaxInscritos };
//             listaEventos.push(novoEvento);
//             eventos++;
//             document.getElementById("cardboxEventoVazio").remove();
//             ReloadEventos();
//         }
//         else {
//             alert("Por favor, insira preencha todos os campos solicitados.")
//         }
//         console.log(listaEventos)
//     }
// }

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
    const QtdInscritosEvento = Number(card.querySelector('#QtdInscritosEvento').value);

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

    if (evento && nome && email && quantidade) {
        var ingresso = { evento, nome, email, quantidade };
        listaIngressos.push(ingresso);
        console.log(listaIngressos);
        fecharCompraIngresso()
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
            <img src="" alt="">
            <br>
            <div class="event-info">
                <label><strong>Evento: </strong></label>
                <input type="text" class="NomeEvento" disabled value='${itens.Nome}' id="NomeEvento"><br>

                <label><strong>Data: </strong></label>
                <input type="date" disabled value='${itens.Data}' id="DataEvento"><br>

                <label><strong>Hora: </strong></label>
                <input type="time" disabled value='${itens.Hora}' id="HoraEvento"><br>

                <label><strong>Local: </strong></label>
                <input type="text" disabled value='${itens.Local}' id="LocalEvento"><br>

                <div class="inline">
                    <label><strong>Inscritos: </strong></label>
                    <input type="text" style="width: 7%;" disabled value='${itens.QtdInscritos}' class='inline' id="QtdInscritosEvento">
                    <p style="margin: 0;">/</p>
                    <input type="text" style="width: 7.5%;" disabled value='${itens.MaxInscritos}' class='inline' id="MaxInscritosEvento">
                </div>
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