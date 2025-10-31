const formEvent = document.getElementById("form");
const storageEvent = JSON.parse(localStorage.getItem("event")) || [];

let eventCardValue = document.getElementById("event-card-value");

let value = storageEvent.length > 0 ? storageEvent[storageEvent.length - 1].id :0;  

window.addEventListener("load", () => {
    eventCardValue.textContent = value;
})


formEvent.addEventListener("submit", (e) => {
    e.preventDefault();

    let formEventValue = {};
    
    value++;
    formEventValue = {...formEventValue, id:value};

    const formValues  = formEvent.querySelectorAll("input, select");

    formValues.forEach(formValue => {
        formEventValue[formValue.id] = formValue.value;
    })

    storageEvent.push(formEventValue);

    localStorage.setItem("event",JSON.stringify(storageEvent));
    window.location.reload();
})


