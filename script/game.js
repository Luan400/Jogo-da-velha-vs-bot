const quadrados = document.querySelectorAll('.square')
let fimDeJogo = false

const JOGADOR_X = '❌'
const JOGADOR_O = '⭕'
const COMBINACOES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

document.addEventListener('click', (event) => {
    if (event.target.matches('.square')) {
        jogar(event.target.id, JOGADOR_X);
        setTimeout(() => bot(), 500)
    }
})

function bot() {
    const posicoesDisponiveis = [];
    for (index in quadrados) {
        if (!isNaN(index)) {
            if (!quadrados[index].classList.contains('❌') &&
                !quadrados[index].classList.contains('⭕')

            ) {
                posicoesDisponiveis.push(index);
            }
        }
    }
    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDisponiveis.length
    );
    if (!fimDeJogo) {
        jogar(posicoesDisponiveis[posicaoAleatoria], JOGADOR_O)
    }
}

function jogar(id, turno) {
    const quadrado = document.getElementById(id);
    quadrado.textContent = turno;
    quadrado.classList.add(turno);
    checarVencedor(turno);
}

function checarVencedor(turno) {
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => {
            return quadrados[index].classList.contains(turno);
        })
    });
    if (vencedor) {
        encerrarJogo(turno)
    } else if (checarEmpate()) {
        encerrarJogo()

    }

}

function checarEmpate() {
    let x = 0;
    let o = 0;

    for (index in quadrados) {
        if (!isNaN(index)) {
            if (quadrados[index].classList.contains(JOGADOR_X)) {
                x++
            }
            if (quadrados[index].classList.contains(JOGADOR_O)) {
                o++
            }
        }
        return x + o === 9 ? true : false

    }
}

function encerrarJogo(vencedor = null) {
    fimDeJogo = true;
    const telaEscura = document.getElementById('tela-escura');
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    let message = null;

    telaEscura.style.display = "block";
    telaEscura.appendChild(h2)
    telaEscura.appendChild(h3)

    if (vencedor) {
        h2.innerHTML = `O player <span> ${vencedor} </span> venceu`;

    } else {
        checarEmpate()
        h2.innerHTML = 'Deu velha'
    }
    let contador = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando jogo em ${contador--}`;
    }, 1000)


    setTimeout(() => location.reload(), 4000)

}