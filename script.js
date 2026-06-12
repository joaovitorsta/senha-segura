const bts = document.querySelectorAll('.parametro-senha__botao');
const txtTamanho = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const indicadorForca = document.querySelector('#indicador-forca');
const textoForca = document.querySelector('#texto-forca');

let tamanhoSenha = 12;

const geradores = {
    maiuscula: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minuscula: 'abcdefghijklmnopqrstuvwxyz',
    numero: '0123456789',
    simbolo: '!@#$%^&*()_+~`|}{[]\:;?><,./-='
};

function gerarSenha() {
    let caracteresPossiveis = '';
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            caracteresPossiveis += geradores[checkbox.name];
        }
    });

    if (caracteresPossiveis === '') {
        campoSenha.value = '';
        atualizarForca(0);
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const aleatorio = Math.floor(Math.random() * caracteresPossiveis.length);
        senha += caracteresPossiveis[aleatorio];
    }
    campoSenha.value = senha;
    calcularForca();
}

function calcularForca() {
    let pontos = 0;
    const temMaiuscula = /[A-Z]/.test(campoSenha.value);
    const temMinuscula = /[a-z]/.test(campoSenha.value);
    const temNumero = /[0-9]/.test(campoSenha.value);
    const temSimbolo = /[^A-Za-z0-9]/.test(campoSenha.value);

    if (temMaiuscula) pontos++;
    if (temMinuscula) pontos++;
    if (temNumero) pontos++;
    if (temSimbolo) pontos++;

    if (tamanhoSenha > 12) pontos++;
    if (tamanhoSenha > 16) pontos++;

    atualizarForca(pontos);
}

function atualizarForca(pontos) {
    if (pontos <= 2) {
        indicadorForca.style.width = '33%';
        indicadorForca.style.backgroundColor = '#ff4d4d';
        textoForca.textContent = 'Fraca';
    } else if (pontos <= 4) {
        indicadorForca.style.width = '66%';
        indicadorForca.style.backgroundColor = '#ffd11a';
        textoForca.textContent = 'Média';
    } else {
        indicadorForca.style.width = '100%';
        indicadorForca.style.backgroundColor = '#00ff00';
        textoForca.textContent = 'Forte';
    }
}

bts[0].addEventListener('click', () => {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        txtTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

bts[1].addEventListener('click', () => {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        txtTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', gerarSenha);
});

gerarSenha();
