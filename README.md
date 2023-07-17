# Javascript-project
Projeto javascript - esse projeto tem como propósito recriar para web de forma simplificada aplicativo de jogo chamando "Marvel Snap".
O foco do projeto é a lógica de programação por trás da construção do jogo.

Regras para construção do jogo:

- Uma partida é disputada entre o jogador e o computador.
- Cada partida consiste em exatamente 6 rodadas, terminando imediatamente após a resolução da 6ª rodada.
- O objetivo do jogo é controlar a maioria dos 3 locais disponíveis.
- O jogador controla um local se a soma das forças dos seus personagens no local for maior do que a soma dos personagens do oponente também no local.
- Cada jogador começa com um baralho contendo as mesmas 12 cartas de personagens. Cada carta possui um nome, um custo em energia e uma força.
- No início da partida, os jogadores sacam aleatoriamente 4 cartas para suas mãos.
- No início de cada rodada, cada jogador recebe:
  1 nova carta sacada aleatoriamente e adicionada à mão;
  Um total de energia igual à rodada atual (de 1 a 6).
- O jogador pode gastar energia para colocar as cartas da mão em um local válido.
- O jogador não pode colocar uma carta se não tiver energia suficiente para baixá-la.
- O jogador não pode colocar mais de 4 cartas em um local.
- A energia não utilizada é perdida ao final da rodada.
- O vencedor será aquele que, ao final da partida, controlar a maioria dos 3 locais em disputa.
- Em caso de empate no número de locais controlados, o desempate será dado pela diferença da soma de forças total de cada jogador. Se o empate persistir, o computador vence.
