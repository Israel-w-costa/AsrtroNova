let containerEventos = document.getElementById("containerEventos");
const adm = 1;
var eventos = 1;

var listaEventos = [];



if (adm > 0) {

    let btnInserir = `
    <div class="cadEvento" id="CardSemEventos">
    <button class="btn-cadEvento" onclick="PreencherEvento()">Inserir evento + </button>
    </div>
    `;
    containerEventos.innerHTML += btnInserir;

    function PreencherEvento() {
        let elementos = document.getElementsByName("CardEvento");
        elementos.forEach(el => el.remove())
        let cardEventoVazio = `
            <div class="cardbox" id="CardTeste" name="CardEvento">
                <img src="" alt="">
                <br>
                <div class="event-info">
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
                    <button class="btn-CancelarEnviarEvento" onclick="AdicionarEvento()">Cancelar</button>
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
        var novoEvento = { Nome, Data, Hora, Local, QtdInscritos, MaxInscritos };
        listaEventos.push(novoEvento);
        eventos++;
        ReloadEventos();
        console.log(listaEventos)
    }
}

if (eventos > 0) {

    function InscreverEvento() {
        alert("InscreverEvento");
    }
}
else {
    let cardSemEventos = `
    <div class="cardbox" id name="CardEvento">
                <p>Não há eventos disponíveis :(</p>
    </div>
            `;
    containerEventos.innerHTML += cardSemEventos;
}
function ReloadEventos() {
    let elementos = document.getElementsByName("CardEvento");
    elementos.forEach(el => el.remove());

    for (const itens of listaEventos) {
        let card = `<div class="cardbox">
                <img src="" alt="">
                <br>
                <div class="event-info">
                    <label for=""><strong>Evento: </strong></label>
                    <input type="text" id="NomeEvento" disabled value='${itens.Nome}'><br>

                    <label for=""><strong>Data: </strong></label>
                    <input type="date" id="" disabled value='${itens.Data}'><br>

                    <label for=""><strong>Hora: </strong></label>
                    <input type="time" disabled value='${itens.Hora}'><br>

                    <label for=""><strong>Local: </strong></label>
                    <input type="text" disabled value='${itens.Local}'><br>

                    <div class="inscritos">
                        <label for=""><strong>Inscritos: </strong></label>
                        <input type="number" style="width: 10%;" disabled value='${itens.QtdInscritos}'>
                        <p>/</p>
                        <input type="number" style="width: 10%;" disabled value='${itens.MaxInscritos}'>
                    </div>
                </div>
                <br>
                <button class="btn-inscrever" onclick="InscreverEvento()">Inscreva-se</button>
            </div>`;

        containerEventos.innerHTML += card;
    }

}
