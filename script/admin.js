const formEvent = document.getElementById("form");
const storageEvent = JSON.parse(localStorage.getItem("event")) || [];

let eventCardValue = document.getElementById("event-card-value");

let value = storageEvent.length > 0 ? storageEvent[storageEvent.length - 1].id : 0;

window.addEventListener("load", () => {
    eventCardValue.textContent = value;
})


formEvent.addEventListener("submit", (e) => {
    e.preventDefault();

    let formEventValue = {};

    value++;
    formEventValue = { ...formEventValue, id: value };

    const formValues = formEvent.querySelectorAll("input, select");

    formValues.forEach(formValue => {
        formEventValue[formValue.id] = formValue.value;
    })

    storageEvent.push(formEventValue);

    localStorage.setItem("event", JSON.stringify(storageEvent));
    window.location.reload();
})

const tablebtn = document.querySelectorAll("section.table > div > button");
const table_events = document.querySelector("div.table_events");
const table_sale = document.querySelector("div.table_sale");
const table_visit = document.querySelector("div.table_visit");

tablebtn.forEach(table => {
    table.addEventListener("click", (t)=>{
        // console.log(t.target)
        const tableSelect = t.target;
        
        if (tableSelect.textContent !== "Eventos") {
            
            table_events.style = "display:none";

            if(tableSelect.textContent == "Vendas") {
                table_sale.style = "display:block";
                table_visit.style = "display:none";
            }
            else {
                 table_visit.style = "display:block"
                 table_sale.style = "display:none";
            }
        }

        if(tableSelect.textContent === "Eventos") {
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
        storageEvent.forEach( (array ,index) => {
        
         const table_row = document.createElement("tr");
         
         let tdName = document.createElement("td");
         tdName.textContent = array.name;
         
         let tdDate = document.createElement("td");
         tdDate.textContent = array.date;   

         let tdCategory = document.createElement("td");
         tdCategory.textContent = array.desc;

         let tdParticipant = document.createElement("td");
         tdParticipant.textContent = array.eventParticipants;

        let tdPbtn = document.createElement("td");
        var deletebtn = document.createElement("button");
        deletebtn.classList.add("deletebtn");
        deletebtn.textContent = "Excluir";
        
        tdPbtn.append(deletebtn);

         table_row.append(tdName,tdDate,tdCategory,tdParticipant, tdPbtn);

         tbody.appendChild(table_row);

         deletebtn.addEventListener("click", deleteEvent => {
            const trDeleteEvent = deleteEvent.target.parentElement;
            const thDeleteEvent = trDeleteEvent.parentElement;

            if (thDeleteEvent.children[0].textContent == storageEvent[index].name && 
                thDeleteEvent.children[1].textContent == storageEvent[index].date) {
                
                storageEvent.splice(index,1);

                localStorage.removeItem("event",JSON.stringify(storageEvent));

            } 

            thDeleteEvent.remove();

            
})   


        })
    }
})

























