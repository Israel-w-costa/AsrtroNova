let dadosAgendamento = JSON.parse(localStorage.getItem('dadosAgendamento')) || [];

document.getElementById('formularioAgendamento').addEventListener('submit', e => {
    e.preventDefault();
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    let date = document.getElementById('date').value;
    let hour = document.querySelector('#hour').value;
    let number = Number(document.getElementById('number').value);

    console.log(hour)
    const agendamento = {
        nome,
        email,
        telefone,
        date,
        hour,
        number
    };

    dadosAgendamento.push(agendamento);

    localStorage.setItem('dadosAgendamento', JSON.stringify(dadosAgendamento));
});
