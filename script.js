const btnMenos = document.querySelector('#btn-menos');
const btnMais = document.querySelector('#btn-mais');
const txtTamanho = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const indicadorForca = document.querySelector('#indicador-forca');
const textoForca = document.querySelector('#texto-forca');

let tamanhoSenha = 12;

const bancoCaracteres = {
    'chk-maiuscula': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'chk-minuscula': 'abcdefghijklmnopqrstuvwxyz',
    'chk-numero': '0123456789',
    'chk-simbolo': '!@#$%^&*()_+~`|}{[]\:;?><,./-='
};

function gerarSenha() {
    let pool = '';
    
    checkboxes.forEach(chk => {
        if (chk.checked) {
            pool += bancoCaracteres[chk.id];
        }
    });

    if (!pool) {
        campoSenha.value = '';
        atualizarInterfaceForca(0);
        return;
    }

    let resultado = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const index = Math.floor(Math.random() * pool.length);
        resultado += pool[index];
    }

    campoSenha.value = resultado;
    avaliarForca();
}

function avaliarForca() {
    let score = 0;
    const senha = campoSenha.value;

    if (!senha) return;

    if (/[A-Z]/.test(senha)) score++;
    if (/[a-z]/.test(senha)) score++;
    if (/[0-9]/.test(senha)) score++;
    if (/[^A-Za-z0-9]/.test(senha)) score++;

    if (tamanhoSenha >= 8) score++;
    if (tamanhoSenha >= 14) score++;

    atualizarInterfaceForca(score);
}

function atualizarInterfaceForca(score) {
    if (score === 0) {
        indicadorForca.style.width = '0%';
        textoForca.textContent = 'Vazio';
        textoForca.style.color = '#555';
    } else if (score <= 2) {
        indicadorForca.style.width = '30%';
        indicadorForca.style.backgroundColor = '#FF3333';
        textoForca.textContent = 'Fraca';
        textoForca.style.color = '#FF3333';
    } else if (score <= 4) {
        indicadorForca.style.width = '65%';
        indicadorForca.style.backgroundColor = '#FFCC00';
        textoForca.textContent = 'Média';
        textoForca.style.color = '#FFCC00';
    } else {
        indicadorForca.style.width = '100%';
        indicadorForca.style.backgroundColor = '#00FF66';
        textoForca.textContent = 'Forte';
        textoForca.style.color = '#00FF66';
    }
}

btnMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        txtTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

btnMais.addEventListener('click', () => {
    if (tamanhoSenha < 32) {
        tamanhoSenha++;
        txtTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

checkboxes.forEach(chk => {
    chk.addEventListener('change', gerarSenha);
});

gerarSenha();
