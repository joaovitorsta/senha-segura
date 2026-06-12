const bts = document.querySelectorAll('.parametro-senha__botao');
const txtTamanho = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');

let tamanhoSenha = 12;

const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';

function gerarSenha() {
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const aleatorio = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[aleatorio];
    }
    campoSenha.value = senha;
}

bts[0].addEventListener('click', () => {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        txtTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

bts[1].addEventListener('click', () => {
    tamanhoSenha++;
    txtTamanho.textContent = tamanhoSenha;
    gerarSenha();
});

gerarSenha();
