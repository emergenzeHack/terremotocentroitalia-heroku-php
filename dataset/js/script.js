var finish = document.getElementById('success');
var url = document.getElementById('url');
var what;

function show(par) {
    document.getElementById('fields').style.display = 'inline';
    document.getElementById('choose').style.display = 'none';
    document.getElementById('subtitle').innerHTML = '<a href="javascript:back()">Torna Indietro</a>';
    what = par;
    switch (par) {
        case 'send':
            document.getElementById('text').setAttribute("placeholder", "Note");
            break;

        case 'ask':
            url.style.display = 'none';
            url.required = false;
            break;
    }

}

function go() {
    var data = new FormData(document.getElementById('form'));
    data.append("what", what);
    var request = new XMLHttpRequest();
    request.open('POST', 'php/script.php', true);
    request.onload = function () {
        if (request.status === 200) {
            finish.textContent = 'Dati inviati!';
        } else {
            finish.textContent = 'C\'è stato un\'errore, riprova più tardi!';
        }
    };
    request.send(data);
}

function back() {
    document.getElementById('fields').style.display = 'none';
    document.getElementById('choose').style.display = 'inline';
    url.style.display = 'inline';
    url.required = true;
    document.getElementById('text').setAttribute("placeholder", "Richiesta");
    finish.textContent = '';
}

document.getElementById('send').addEventListener('click', function () {
    show('send')
});
document.getElementById('ask').addEventListener('click', function () {
    show('ask')
});
document.getElementById('form').addEventListener('submit', go);