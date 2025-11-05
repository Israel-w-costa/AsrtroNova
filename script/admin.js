const form = document.getElementById("form");
const storageEvent = JSON.parse(localStorage.getItem("event")) || [];
const storageVisit = JSON.parse(localStorage.getItem("visit")) || [];

const tablebtn = document.querySelectorAll("section.table > div > button");
const table_events = document.querySelector("div.table_events");
const table_sale = document.querySelector("div.table_sale");
const table_visit = document.querySelector("div.table_visit");

let eventCardValue = document.getElementById("event-card-value");
let valueEvent = storageEvent.length > 0 ? storageEvent.length : 0;
console.log(storageEvent.length)

window.addEventListener("load", () => {
    eventCardValue.textContent = valueEvent;
})


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formEvent = {};

    valueEvent++;

    const formValues = form.querySelectorAll("input, select");

    formValues.forEach(formValue => {
        formEvent[formValue.id] = formValue.value;
    })

    storageEvent.push(formEvent);

    localStorage.setItem("event", JSON.stringify(storageEvent));
    window.location.reload();
})


tablebtn.forEach(table => {
    table.addEventListener("click", (t) => {

        const tableSelect = t.target;

        if (tableSelect.textContent !== "Eventos") {

            table_events.style = "display:none";

            if (tableSelect.textContent == "Vendas") {
                table_sale.style = "display:block";
                table_visit.style = "display:none";
            }
            else {
                table_visit.style = "display:block"
                table_sale.style = "display:none";
            }
        }

        if (tableSelect.textContent === "Eventos") {
            table_sale.style = "display:none";
            table_visit.style = "display:none";
            table_events.style = "display:block";
        }
    })
}
)

const tbody = document.querySelector("tbody");;

window.addEventListener("load", () => {

    if (storageEvent.length > 0) {
    storageEvent.forEach((array, index) => {

        const table_row = document.createElement("tr");

        let tdNameEvent = document.createElement("td");
        tdNameEvent.textContent = array.name;

        let tdDateEvent = document.createElement("td");
        tdDateEvent.textContent = array.date;

        let tdCategoryEvent = document.createElement("td");
        tdCategoryEvent.textContent = array.desc;

        let tdParticipantEvent = document.createElement("td");
        tdParticipantEvent.textContent = array.eventParticipants;

        let tdPbtnEvent = document.createElement("td");
        let deletebtn = document.createElement("button");
        deletebtn.classList.add("deletebtn");
        deletebtn.textContent = "Excluir";

        tdPbtnEvent.append(deletebtn);

        table_row.append(tdNameEvent, tdDateEvent, tdCategoryEvent, tdParticipantEvent, tdPbtnEvent);

        tbody.appendChild(table_row);

        deletebtn.addEventListener("click", deleteEvent => {
            const trDeleteEvent = deleteEvent.target.parentElement;
            const thDeleteEvent = trDeleteEvent.parentElement;

            if (
                thDeleteEvent.children[0].textContent == storageEvent[index].name &&
                thDeleteEvent.children[1].textContent == storageEvent[index].date
            ) {
                storageEvent.splice(index, 1);
                localStorage.setItem("event", JSON.stringify(storageEvent));
            }
            
            console.log(valueEvent)
            thDeleteEvent.remove();
            console.log(valueEvent)
            valueEvent--;
            setTimeout(() => {
            eventCardValue.textContent = valueEvent;
            window.location.reload();}, 1000);
        });
    });
}

if (storageVisit.length > 0) {
    storageVisit.forEach((array, index) => {

        const table_row = document.createElement("tr");

        let tdNameVisit = document.createElement("td");
        tdNameVisit.textContent = array.name;

        let tdDateVisit = document.createElement("td");
        tdDateVisit.textContent = array.date;

        let tdCategoryVisit = document.createElement("td");
        tdCategoryVisit.textContent = array.desc;

        let tdParticipantVisit = document.createElement("td");
        tdParticipantVisit.textContent = array.eventParticipants;

        let tdPbtnVisit = document.createElement("td");
        let deletebtn = document.createElement("button");
        deletebtn.classList.add("deletebtn");
        deletebtn.textContent = "Excluir";

        tdPbtnVisit.append(deletebtn);

        table_row.append(tdNameVisit, tdDateVisit, tdCategoryVisit, tdParticipantVisit, tdPbtnVisit);

        tbody.appendChild(table_row);

        deletebtn.addEventListener("click", deleteEvent => {
            const trDeleteVisit = deleteEvent.target.parentElement;
            const thDeleteVisit = trDeleteVisit.parentElement;

            if (
                thDeleteVisit.children[0].textContent == storageVisit[index].name &&
                thDeleteVisit.children[1].textContent == storageVisit[index].date
            ) {
                storageVisit.splice(index, 1);
                localStorage.setItem("event", JSON.stringify(storageVisit));
            }

            thDeleteVisit.remove();
        });
    });
} 


        })




























