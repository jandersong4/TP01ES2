# RPG_de_mesa
O sistema em questão foi desenvolvido como uma aplicação para jogos de RPG, oferecendo funcionalidades de rolagem de dados em um ambiente de jogos. Essa aplicação foi construída utilizando um conjunto de tecnologias modernas para fornecer uma experiência dinâmica e interativa aos usuários. A estrutura do sistema é composta por quatro entidades principais: Partida(Matchs), Rodadas, Jogadas (Plays) e Usuários (user).

## Componentes do Sistema:

Entidades:

Partida: Representa o ambiente global do jogo, incluindo informações sobre o cenário, configurações e a coleção de rodadas realizadas pelos jogadores.

Rodadas: São subdivisões da Partida, dividindo a experiência do jogo em sessões individuais. Cada rodada pode conter uma ou mais "Plays" que consistem nas rolagens de dados e ações executadas pelos usuários.

Plays (Jogadas): Correspondem às ações executadas durante as rodadas. Isso inclui as rolagens de dados e quaisquer interações dos jogadores durante a jogada.

Usuários: Representam os jogadores que acessam o sistema. Eles têm a capacidade de interagir com as rodadas, realizar jogadas e participar das partidas.

Tecnologias Utilizadas:

JavaScript: Linguagem de programação principal usada para a lógica e interações no lado do cliente e do servidor.
Node.js: Plataforma que permite a execução de JavaScript no servidor.
Sequelize: ORM (Object-Relational Mapping) para interagir com o banco de dados, fornecendo uma abstração para trabalhar com a base de dados.
Express: Framework web para Node.js utilizado para configurar rotas, middlewares, e manipular requisições HTTP.
SQLite: Banco de dados escolhido para armazenar os dados da aplicação. É um banco de dados leve e altamente eficiente para sistemas de menor escala.

Funcionalidades e Objetivos
O principal objetivo do sistema é fornecer uma plataforma interativa para jogadores de RPG realizarem suas ações durante as partidas, mantendo registros das rodadas, jogadas e interações dos usuários. Tudo isso é implementado com a ideia de um CRUD.

As funcionalidades principais incluem:

Registro de informações sobre partidas.
Divisão de partidas em rodadas para manter a progressão do jogo.
Registro das ações dos jogadores durante as rodadas, incluindo rolagens de dados.
Controle de usuários e gerenciamento de suas interações no sistema.
O sistema foi projetado e implementado para oferecer uma experiência agradável e dinâmica para os usuários durante suas sessões de jogo.

Conclusão
O sistema, construído com tecnologias modernas, visa atender aos requisitos dos jogadores de RPG, facilitando as interações durante as partidas. A documentação fornecida oferece um panorama sobre as funcionalidades, estrutura e tecnologias utilizadas para criar essa plataforma.

## COMMITS:
EXTRACT METHOD:: https://github.com/jandersong4/TP01ES2/commit/df2ba76ffb4afdd82683eddb39d8dc7b6bb10834
Observamos que no arquivo do controlador (controller), algumas das rotas estavam incorporando uma lógica de filtro. Essa lógica de filtro era notavelmente semelhante toda vez que era aplicada. Como solução, optamos por isolar essa lógica em uma função de middleware. Essa abordagem tornou o código mais reutilizável, simplificando-o e contribuindo para uma melhor organização do projeto.


EXTRAÇÃO DE VARIÁVEIS: https://github.com/jandersong4/TP01ES2/commit/26dab4922906535cd7f9a538a426437384bd3249
Havia um require chamando uma função Router()  toda vez que uma rota era criada. Isso tornava o código poluido,repetitivo e em minha opinião mais dificil de entender. Foi então criada uma variável router que recebe essa função Router() do express e essa é chamada quando necessário.


RENAME: https://github.com/jandersong4/TP01ES2/commit/4a590510cf7d5a0056e9b901ee32a7e78930c159
Como estavamos acompanhando um codigo de referência para a construção
desse novo codigo acabamos mantendo alguns nomes da estrutura do autor
anterior. Haviam diversas pastas e objetos com o nome Product , no
entanto isso nao fazia sentido para nosso sistema já que estamos
implementando um sistema para a rolagem de dados de jogos de
tabuleiro. Dessa forma , como products estava representando as partidas
mudamos o nome de todas as pastas e objetos para "Match", que seria o
mais apropriado nessa situação.
