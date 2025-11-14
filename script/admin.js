const form = document.getElementById("form");

const eventsStorage = JSON.parse(localStorage.getItem("event")) || [];
const visitsStorage = JSON.parse(localStorage.getItem("dadosAgendamento")) || [];

const tableButtons = document.querySelectorAll("section.table > div > button");
const eventsTable = document.querySelector("div.table_events");
const salesTable = document.querySelector("div.table_sale");
const visitsTable = document.querySelector("div.table_visit");

const tableBodyEvent = document.querySelector("tbody#table_body_event");
const tableBodyVisit = document.querySelector("tbody#table_body_visit");

let eventCounter = document.getElementById("event-card-value");
let eventCount = eventsStorage.length > 0 ? eventsStorage.length : 0;

let visitCounter = document.getElementById("visit-card-value");
let visitCount = visitsStorage.length > 0 ? visitsStorage.length : 0;

console.log(visitCount)



function createTable(tbody ,valor1,valor2,valor3,valor4) {
     const tableRow = document.createElement("tr");

            let tdName = document.createElement("td");
            tdName.textContent = valor1;

            let tdDate = document.createElement("td");
            tdDate.textContent = valor2;

            let tdCategory = document.createElement("td");
            tdCategory.textContent = valor3;

            let tdParticipants = document.createElement("td");
            tdParticipants.textContent = valor4;

            let tdActions = document.createElement("td");
            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deletebtn");
            deleteBtn.textContent = "Excluir";

            tdActions.append(deleteBtn);
            tableRow.append(tdName, tdDate, tdCategory, tdParticipants, tdActions);
            tbody.appendChild(tableRow);
            return deleteBtn;

}

function deleteTablebtn (deleteBtn , storage, storageKey, index) {

      deleteBtn.addEventListener("click", (e) => {
                const td = e.target.parentElement;
                const row = td.parentElement;
                console.log(e.target.parentElement)

                if (
                    row.children[0].textContent === storage[index].name ||
                    row.children[0].textContent === storage[index].nome
                ) {
                    storage.splice(index, 1);

                    localStorage.setItem(storageKey, JSON.stringify(storage));

                    if(storageKey === "event") {
                        eventCount--;
                        eventCounter.textContent = eventCount;}
                    if (storageKey === "dadosAgendamento") {
                         visitCount--;
                        visitCounter.textContent = visitCount;
                    }    
                    }
 
                row.remove();
            });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let newEventData = {};
    eventCount++;

    const formInputs = form.querySelectorAll("input, select");

    formInputs.forEach((input) => {
        newEventData[input.id] = input.value;
    });

    eventsStorage.push(newEventData);
    localStorage.setItem("event", JSON.stringify(eventsStorage));
    window.location.reload();
});

window.addEventListener("load", () => {
    eventCounter.textContent = eventCount;
    visitCounter.textContent = visitCount;
});


tableButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.target;

        if (clickedButton.textContent !== "Eventos") {
            eventsTable.style.display = "none";

            if (clickedButton.textContent === "Vendas") {
                salesTable.style.display = "block";
                visitsTable.style.display = "none";
            } else {
                visitsTable.style.display = "block";
                salesTable.style.display = "none";
            }
        } else {
            salesTable.style.display = "none";
            visitsTable.style.display = "none";
            eventsTable.style.display = "block";
        }
    });
});


window.addEventListener("load", () => {
    if (eventsStorage.length > 0) {visitsStorage
        eventsStorage.forEach((eventData, index) => {

            const deletebtn = createTable(tableBodyEvent,eventData.name,eventData.date, eventData.desc, eventData.eventParticipants);
            deleteTablebtn(deletebtn, eventsStorage,"event", index);

        });
    }

    if (visitsStorage.length > 0) {
        visitsStorage.forEach((visitData, index) => {
          const deletebtn = createTable(tableBodyVisit,visitData.nome,visitData.email, visitData.telefone, visitData.date);
          deleteTablebtn(deletebtn, visitsStorage ,"dadosAgendamento" , index);
        
        });

    }
});





























