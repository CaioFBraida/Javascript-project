const cartas = [
    { nome: "Arara", custo: 1, forca: 2 },
    { nome: "Gavião", custo: 1, forca: 3 },
    { nome: "Hiena", custo: 2, forca: 4 },
    { nome: "Raposa", custo: 2, forca: 5 },
    { nome: "Cascavel", custo: 3, forca: 5 },
    { nome: "Jacaré", custo: 3, forca: 6 },
    { nome: "Xipanzé", custo: 4, forca: 7 },
    { nome: "Gorila", custo: 4, forca: 7 },
    { nome: "Onça Pintada", custo: 5, forca: 8 },
    { nome: "Leão", custo: 5, forca: 9 },
    { nome: "Rinoceronte", custo: 6, forca: 10 },
    { nome: "Hipopótamo", custo: 6, forca: 11 },

]

const copiaCartasParaJogador = [...cartas];
const copiaCartasParaPc = [...cartas];

const jogador1 = { energia: 0, cartasJogador1: [] }

const computador = { energia: 0, cartasPc: [] }

let rodada = 1;

const local1 = {
    forcaJogador1: 0,
    forcaPc: 0,
    numCartasJogador1: 0,
    numCartasPc: 0
}

const local2 = {
    forcaJogador1: 0,
    forcaPc: 0,
    numCartasJogador1: 0,
    numCartasPc: 0
}

const local3 = {
    forcaJogador1: 0,
    forcaPc: 0,
    numCartasJogador1: 0,
    numCartasPc: 0
}



// implementação
const botaoInicar = document.querySelector(".botao_iniciar");
botaoInicar.addEventListener('click', iniciar);

const energias = document.querySelectorAll(".energia");
let energiaJogador = Number(energias[0].textContent);
let energiaPc = Number(energias[1].textContent);

const numCartasNaMao = document.querySelectorAll(".num_cartas");
let numCartasJogador = Number(numCartasNaMao[0].textContent);
let numCartasComputador = Number(numCartasNaMao[1].textContent);

function iniciar(evento) {
    evento.preventDefault;

    energiaJogador = 1;
    energiaPc = 1;
    energias[0].textContent = `${energiaJogador}`;
    energias[1].textContent = `${energiaPc}`;

    numCartasJogador = 4;
    numCartasComputador = 4;
    numCartasNaMao[0].textContent = `${numCartasJogador}`;
    numCartasNaMao[1].textContent = `${numCartasComputador}`;

    ///Remove botao iniciar e adiciona botao proxima rodada
    botaoInicar.remove();
    const divBotao = document.querySelector(".botoes");
    const botao = document.createElement("button");
    botao.classList.add("botao_proxima_rodada");
    botao.textContent = "PRÓXIMA RODADA";
    botao.addEventListener('click', proximaRodada);
    divBotao.appendChild(botao);

    jogador1.energia = 1;
    computador.energia = 1;

    adicionaCartasIniciaisJogador();
    adicionaCartasIniciaisPc();


}

const listaCartas = document.querySelector('.deck_jogador');

function adicionaCartasIniciaisJogador() {
    const carta1 = document.createElement('li');
    let frase = `${copiaCartasParaJogador[0].nome}, custo: ${copiaCartasParaJogador[0].custo}, força: ${copiaCartasParaJogador[0].forca}`;
    carta1.textContent = frase;
    carta1.classList.add('cartas_tela_jogador') //add classe à carta 1
    carta1.addEventListener('click', cliqueNaCartaJogador); //add click
    listaCartas.appendChild(carta1);

    const primeiraCartaRetirada = copiaCartasParaJogador.splice(0, 1);
    jogador1.cartasJogador1.push(primeiraCartaRetirada);

    for (let i = 0; i < 3; i++) {
        let num = Math.floor(Math.random() * (copiaCartasParaJogador.length))

        const novaCarta = document.createElement('li');
        let fraseNovaCarta = `${copiaCartasParaJogador[num].nome}, custo: ${copiaCartasParaJogador[num].custo}, força: ${copiaCartasParaJogador[num].forca}`;
        novaCarta.textContent = fraseNovaCarta;
        novaCarta.classList.add('cartas_tela_jogador') //add classe à nova carta
        novaCarta.addEventListener('click', cliqueNaCartaJogador) // add click
        listaCartas.appendChild(novaCarta);

        const cartaEscolhida = copiaCartasParaJogador.splice(num, 1);
        jogador1.cartasJogador1.push(cartaEscolhida);
    }

}


function adicionaCartasIniciaisPc() {

    const primeiraCartaRetirada = copiaCartasParaPc.splice(1, 1);
    computador.cartasPc.push(primeiraCartaRetirada);

    for (let i = 0; i < 3; i++) {
        let num = Math.floor(Math.random() * (copiaCartasParaPc.length))

        const cartaEscolhida = copiaCartasParaPc.splice(num, 1);
        computador.cartasPc.push(cartaEscolhida);
    }
}

var cartaASerEnviada = {};
function cliqueNaCartaJogador(evento) {
    const cartasJogadorNaTela = document.querySelectorAll(".cartas_tela_jogador"); //declarando
    evento.preventDefault;

    if (this.classList.contains('ativa')) {//se está clicada
        this.classList.remove('ativa');
    } else {
        for (let i = 0; i < cartasJogadorNaTela.length; i++) {//impede selecionar mais de 1 carta
            cartasJogadorNaTela[i].classList.remove('ativa');
        }
        this.classList.add('ativa');
    }
    for (let i = 0; i < cartasJogadorNaTela.length; i++) {
        if (cartasJogadorNaTela[i].classList.contains('ativa')) {
            cartaASerEnviada = jogador1.cartasJogador1[i]; //guarda a carta à ser enviada
        }
    }

}

const locais = document.querySelectorAll(".locais > div");//pega locais do html
for (let i = 0; i < locais.length; i++) {
    locais[i].addEventListener('click', cliqueNoLocal);
}

function cliqueNoLocal(evento) {
    evento.preventDefault;
    verificaNumCartasNoLocal();
    let identificadorLocal = 0;
    if (this.classList.contains('locais__arenas_1')) {
        var localJogador1NaTela = document.querySelector('.local1_cartas_jogador');//guarda local para carta
        var forcaTotalJogadorLocal = document.querySelector('.forca_total_jogador1_local1');//guarda local para força
        identificadorLocal = 1;
    }
    if (this.classList.contains('locais__arenas_2')) {
        var localJogador1NaTela = document.querySelector('.local2_cartas_jogador');// " "
        var forcaTotalJogadorLocal = document.querySelector('.forca_total_jogador1_local2'); //  " "
        identificadorLocal = 2;
    }
    if (this.classList.contains('locais__arenas_3')) {
        var localJogador1NaTela = document.querySelector('.local3_cartas_jogador');// " "
        var forcaTotalJogadorLocal = document.querySelector('.forca_total_jogador1_local3');//  " "
        identificadorLocal = 3;
    }

    if (jogador1.energia >= cartaASerEnviada[0].custo) { //mandando a carta pro local
        const novoPersonagemNoLocal = document.createElement('li');
        let fraseNovaCarta = `${cartaASerEnviada[0].nome}, custo: ${cartaASerEnviada[0].custo}, força: ${cartaASerEnviada[0].forca}.`;
        novoPersonagemNoLocal.textContent = fraseNovaCarta;
        novoPersonagemNoLocal.classList.add('cartas_local_jogador');

        localJogador1NaTela.appendChild(novoPersonagemNoLocal);

        //retirando o custo da carta da energia do jogador
        jogador1.energia = jogador1.energia - cartaASerEnviada[0].custo;
        energiaJogador = jogador1.energia;

        //retirando carta enviada da lista e da tela 
        const listaDeCartasJogadorNaTela = document.querySelectorAll('.deck_jogador > li');

        for (let i = 0; i < listaDeCartasJogadorNaTela.length; i++) {//rodando o deck
            if (listaDeCartasJogadorNaTela[i].classList.contains('ativa')) {
                listaDeCartasJogadorNaTela[i].remove(); //remove da tela
                jogador1.cartasJogador1.splice(i, 1);   //remove por baixo dos panos
            }
        }

        //atualizando na tela energia e numero de cartas
        energias[0].textContent = `${energiaJogador}`;

        numCartasJogador = numCartasJogador - 1;
        numCartasNaMao[0].textContent = `${numCartasJogador}`;

        if (identificadorLocal === 1) { //atualiza força e num cartas do jogador no local
            local1.forcaJogador1 += cartaASerEnviada[0].forca; //atualiza interno
            forcaTotalJogadorLocal.textContent = local1.forcaJogador1; //atualiza externo
            local1.numCartasJogador1++;
        } else if (identificadorLocal === 2) {
            local2.forcaJogador1 += cartaASerEnviada[0].forca; //
            forcaTotalJogadorLocal.textContent = local2.forcaJogador1; // 
            local2.numCartasJogador1++;
        } else {
            local3.forcaJogador1 += cartaASerEnviada[0].forca; //
            forcaTotalJogadorLocal.textContent = local3.forcaJogador1; //
            local3.numCartasJogador1++;
        }
    }
}

function proximaRodada() {
    jogadaComputador(); //pc joga

    const botao = document.querySelector('.botao_proxima_rodada');
    if (rodada == 5) {
        let frase = "TERMINAR JOGO";
        botao.textContent = frase;
    }

    if (rodada != 6) {
        //atualiza as energias
        rodada++;
        energiaJogador = rodada;
        energiaPc = rodada;
        energias[0].textContent = `${energiaJogador}`;
        energias[1].textContent = `${energiaPc}`;

        jogador1.energia = rodada;
        computador.energia = rodada;

        adicionaCartaDeckJogador();
        adicionaCartaDeckPc();
    } else {
        botao.remove();
        terminaJogo();
    }

}

function jogadaComputador() {
    let cartaASerEnviadaPc = {};

    const arrayCartasCustoRodada = []
    for (let i = 0; i < computador.cartasPc.length; i++) {
        if (computador.cartasPc[i][0].custo == rodada) {
            arrayCartasCustoRodada.push(computador.cartasPc[i][0]);

            //retirando a carta do deck do pc
            computador.cartasPc.splice(i, 1);
        }
    }

    cartaASerEnviadaPc = arrayCartasCustoRodada[0];

    if (local1.forcaJogador1 > local1.forcaPc && local1.numCartasPc < 4) {
        var localcomputadorNaTela = document.querySelector('.local1_cartas_pc');
        var forcaTotalPcLocal = document.querySelector('.forca_total_pc_local1');
        identificadorLocal = 1;
    }
    else if (local2.forcaJogador1 > local2.forcaPc && local2.numCartasPc < 4) {
        var localcomputadorNaTela = document.querySelector('.local2_cartas_pc');
        var forcaTotalPcLocal = document.querySelector('.forca_total_pc_local2');
        identificadorLocal = 2;
    }
    else if (local3.numCartasPc < 4) {
        var localcomputadorNaTela = document.querySelector('.local3_cartas_pc');
        var forcaTotalPcLocal = document.querySelector('.forca_total_pc_local3');
        identificadorLocal = 3;
    }
    else if (local1.numCartasPc < 4) { //Esse caso é pq dava erro se o jogador jogasse só uma vez no ultimo local (seria um modo de contornar o erro e fazer o pc jogar no local 1)
        var localcomputadorNaTela = document.querySelector('.local1_cartas_pc');
        var forcaTotalPcLocal = document.querySelector('.forca_total_pc_local1');
        identificadorLocal = 1;
    }

    const novoPersonagemNoLocal = document.createElement('li');
    let fraseNovaCarta = `${cartaASerEnviadaPc.nome}, custo: ${cartaASerEnviadaPc.custo}, força: ${cartaASerEnviadaPc.forca}`;
    novoPersonagemNoLocal.textContent = fraseNovaCarta;
    novoPersonagemNoLocal.classList.add('cartas_local_pc');

    localcomputadorNaTela.appendChild(novoPersonagemNoLocal); //// aqui tem um erro de logica

    // adicionar a força ao objeto local
    if (identificadorLocal == 1) {
        local1.forcaPc = local1.forcaPc + cartaASerEnviadaPc.forca;
        forcaTotalPcLocal.textContent = local1.forcaPc;
        local1.numCartasPc++;
    } else if (identificadorLocal == 2) {
        local2.forcaPc = local2.forcaPc + cartaASerEnviadaPc.forca;
        forcaTotalPcLocal.textContent = local2.forcaPc;
        local2.numCartasPc++;
    } else {
        local3.forcaPc = local3.forcaPc + cartaASerEnviadaPc.forca;
        forcaTotalPcLocal.textContent = local3.forcaPc;
        local3.numCartasPc++;
    }

}

function adicionaCartaDeckJogador() {
    let verifica = 0; // verifica se tem carta daquele custo
    for (let i = 0; i < copiaCartasParaJogador.length; i++) {
        if (copiaCartasParaJogador[i].custo == rodada) {
            const novaCarta = document.createElement('li');
            let fraseNovaCarta = `${copiaCartasParaJogador[i].nome}, custo: ${copiaCartasParaJogador[i].custo}, força: ${copiaCartasParaJogador[i].forca}`;
            novaCarta.textContent = fraseNovaCarta;
            novaCarta.classList.add('cartas_tela_jogador') //add classe à nova carta
            novaCarta.addEventListener('click', cliqueNaCartaJogador) // add click
            listaCartas.appendChild(novaCarta);

            //retirando carta do vetor copia
            const cartaRetirada = copiaCartasParaJogador.splice(i, 1);
            jogador1.cartasJogador1.push(cartaRetirada);
            verifica = 1;
            break;
        }
    }
    //tratamento de erro se ja saiu as 2 cartas com custos iguais no inicio
    if (verifica === 0) {
        let num = Math.floor(Math.random() * (copiaCartasParaJogador.length));

        const novaCarta = document.createElement('li');
        let fraseNovaCarta = `${copiaCartasParaJogador[num].nome}, custo: ${copiaCartasParaJogador[num].custo}, força: ${copiaCartasParaJogador[num].forca}`;
        novaCarta.textContent = fraseNovaCarta;
        novaCarta.classList.add('cartas_tela_jogador') //add classe à nova carta
        novaCarta.addEventListener('click', cliqueNaCartaJogador) // add click
        listaCartas.appendChild(novaCarta);

        const cartaRetirada = copiaCartasParaJogador.splice(num, 1);
        jogador1.cartasJogador1.push(cartaRetirada);
    }
    numCartasJogador = jogador1.cartasJogador1.length;
    numCartasNaMao[0].textContent = `${numCartasJogador}`;
}

function adicionaCartaDeckPc() {
    for (let i = 0; i < copiaCartasParaPc.length; i++) {
        if (copiaCartasParaPc[i].custo === rodada) {
            //retirando carta do vetor copia
            const cartaRetirada = copiaCartasParaPc.splice(i, 1);
            computador.cartasPc.push(cartaRetirada);
            break;
        }
    }
    if (computador.cartasPc.length < 4) {
        let num = Math.floor(Math.random() * (copiaCartasParaPc.length));

        const cartaRetirada = copiaCartasParaPc.splice(num, 1);
        computador.cartasPc.push(cartaRetirada);
    }
}

function terminaJogo() {
    let locaisPcGanhou = 0;
    let locaisJogadorGanhou = 0;

    if (local1.forcaJogador1 > local1.forcaPc) {
        locaisJogadorGanhou++;
    } else if (local1.forcaJogador1 < local1.forcaPc) {
        locaisPcGanhou++;
    }

    if (local2.forcaJogador1 > local2.forcaPc) {
        locaisJogadorGanhou++;
    } else if (local2.forcaJogador1 < local2.forcaPc) {
        locaisPcGanhou++;
    }

    if (local3.forcaJogador1 > local3.forcaPc) {
        locaisJogadorGanhou++;
    } else if (local3.forcaJogador1 < local3.forcaPc) {
        locaisPcGanhou++;
    }

    if (locaisPcGanhou > locaisJogadorGanhou) {
        pcGanhou();
    } else if (locaisPcGanhou < locaisJogadorGanhou) {
        jogadorGanhou();
    } else { //tratamento do caso de empate
        const forcaTotalJogador = local1.forcaJogador1 + local2.forcaJogador1 + local3.forcaJogador1;
        const forcaTotalPc = local1.forcaPc + local2.forcaPc + local3.forcaPc;

        if (forcaTotalPc >= forcaTotalJogador) {
            pcGanhou();
        } else {
            jogadorGanhou();
        }
    }

    const divBotao = document.querySelector('.botoes');
    const botaoRecarregar = document.createElement('button');
    botaoRecarregar.classList.add('botao_recarregar');
    botaoRecarregar.textContent = 'JOGAR NOVAMENTE';
    botaoRecarregar.addEventListener('click', function () {
        location.reload();
    });

    divBotao.appendChild(botaoRecarregar);
}

const fraseFinal = document.querySelector('.final_jogo');

function jogadorGanhou() {
    fraseFinal.classList.add('frase_termina_jogo');
    let frase = 'Parabéns, você ganhou o jogo!!!';
    fraseFinal.textContent = frase;
}

function pcGanhou() {
    fraseFinal.classList.add('frase_termina_jogo');
    let frase = 'Computador ganhou o jogo, tente outra vez.';
    fraseFinal.textContent = frase;
}

function verificaNumCartasNoLocal() {
    if (local1.numCartasJogador1 >= 3) {
        locais[0].removeEventListener('click', cliqueNoLocal);
    }
    if (local2.numCartasJogador1 >= 3) {
        locais[1].removeEventListener('click', cliqueNoLocal);
    }
    if (local3.numCartasJogador1 >= 3) {
        locais[2].removeEventListener('click', cliqueNoLocal);
    }
}