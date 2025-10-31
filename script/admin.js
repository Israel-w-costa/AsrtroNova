const formEvent = document.getElementById("form");
const storageEvent = JSON.parse(localStorage.getItem("event")) || [];

formEvent.addEventListener("submit", (e) => {
    e.preventDefault();

    const formEventValue = {};
    
    const formValues  = formEvent.querySelectorAll("input, select");

    formValues.forEach(formValue => {
        formEventValue[formValue.id] = formValue.value;
    })

    storageEvent.push(formEventValue);

    localStorage.setItem("event",JSON.stringify(storageEvent));
})
