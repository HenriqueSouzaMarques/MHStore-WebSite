# Relatório do Projeto

### Integrantes

|        Nome               |    NUSP   |
|:-------------------------:|:---------:|
|   Henrique S. Marques     |  11815722 | 
|   Gustavo Hitomi da Silva |  11801202 |
|   Marcos P. N. Filho      |  11819063 | 

### Requisitos

O sistema deve ter 2 tipos de usuários: Clientes e Administradores.

1. Os Administradores são responsáveis pelo registro/gerenciamento de administradores, clientes e produtos/serviços fornecidos. A aplicação já vem com uma conta admin com senha admin.
2. Os clientes são usuários que acessam o sistema para comprar produtos/serviços.
3. O registro do administrador inclui, no mínimo: nome, id, telefone, e-mail.
4. Cada registro de cliente inclui, no mínimo: nome, id, endereço, telefone, e-mail.
5. Os registros de produtos/serviços incluem, no mínimo: nome, id, foto, descrição, preço, quantidade (em estoque) e quantidade vendida.
6. Sua loja pode vender produtos, serviços ou ambos (você decide).
7. Venda de produtos (ou serviços): Os produtos são selecionados, a quantidade escolhida e são incluídos em um carrinho. Os produtos são comprados usando um número de cartão de crédito (qualquer número é aceito pelo sistema). A quantidade de produtos vendidos é subtraída ao montante de estoque e adicionada ao montante dos vendidos.
8. Gestão de Produtos/Serviços: Os administradores podem criar/atualizar/ler/excluir (crud) novos produtos e serviços. Por exemplo, eles podem alterar a quantidade em estoque.
9. Para complementar os requisitos propostos pela disciplina, nosso projeto implementará cupons de desconto: assim, pretendemos que o servidor gere certa quantia de cupons de desconto (ID's) de maneira que, caso o usuário utilize um desses ID's gerados, o valor final do pagamento será decrescido por certa quantidade.
10. O sistema deve ser acessível e oferecer boa usabilidade. O sistema deve ser responsivo, o que significa que deve completar as tarefas atribuídas dentro de um tempo razoável.

### Descrição

Conforme descrito em "Requisitos", dois tipos de usuários poderão fazer uso da aplicação WEB: clientes e administradores. Sendo assim, a forma com a qual o usuário interage com as telas será diferente de acordo com o tipo de usuário. Por exemplo, ao se acessar a tela "Produtos" (falaremos dela mais a frente) como cliente, será possível navegar pelos produtos, inspecionando-os e adicionando-os no carrinho caso desejado. Por outro lado, ao acessar a tela "Produtos" como administrador, outros recursos estarão disponíveis, como a alteração de catálogo, alteração de detalhes dos produtos, e assim por diante. A Figura a seguir resume nossa aplicação e as diferentes maneiras com as quais será possível interagir com as telas:

![fluxograma](../Milestone1/Mockup/fluxograma.png)
_Figura 1: Fluxograma da aplicação._

Seguindo a ideia geral do fluxograma, as telas _Home-Page_, _Login/Signin_, _Sobre Nos_ e _Produtos_ foram projetadas através de _HTML5/CSS3_:

- [**_Home-Page_**](index.html): tela inicial da nossa aplicação. Contém uma barra de navegação interativa capaz de realizar redirecionamentos para todas as telas existentes (exceto "Administrador" e "Estoque", as quais são exclusivas para administradores), uma seção Produtos, a qual apresenta as informações gerais dos tipos de produtos oferecidos pela loja, permitindo redirecionamento às partes específicas da tela "Produtos" correspondentes a cada tipo de produto, e uma seçao Marcas, contendo informações geriais sobre as marcas oferecidas pela nossa loja. A Figura 2 mostra situação atual da página em questão:

![home-page](../Milestone1/Mockup/home.png)
_Figura 2: Home-Page da apliação._

- [**_Login/Signin_**](login.html): tela minimalista que contém o necessário para o usuário realizar a operação de login e signin na aplicação, sendo a única página, até o momento, que contém código _JavaScript_. Inicialmente, o usuário se depara com os campos necessários para o _Login_ (_email_ e senha), um botão para realizar o _Login_ e outro para cadastrar um novo usuário, conforme visto na Figura 3:

![login1](../Milestone1/Mockup/login1.png)
_Figura 3: Página de Login da aplicação._

Ao se clicar no botão "Create New Account", uma nova tela surge "acima" da tela anterior, contendo os campos necessários para o signin (nome, email, endereço, telefone, data de nascimento e senha) e um botão de submissão, conforme visto na Figura 4:

![login2](../Milestone1/Mockup/login2.png)
_Figura 4: Tela de Signin sobreposta a tela de Login._

- [**Sobre Nos**](sobre-nos.html): tela com um texto contendo o resumo da história da marca, assim como meios de contato no final.

![about_us](../Milestone1/Mockup/about_us.jpeg)
_Figura 5:tela "sobre nós"

- [**Produtos**](produtos.html): página lista produtos ordenados por tipo e seus respectivos preços. No topo há um slider que permite pular para uma sessão específica se o cliente assim desejar.

![produtos](../Milestone1/Mockup/products.jpeg)


O restante das telas necessárias para nossa aplicação, _Carrinho_, _Administrador_ e _Estoque_ foram projetadas com a ferramenta [_Figma_](https://www.figma.com/):

- [**Carrinho**](https://www.figma.com/file/cm8SJWyryxJUZSV4lrHFSc/Mockup-Cart?node-id=0%3A1&t=FaCFQwI4LvOrOX23-1): Nesta tela, o usuário é capaz de visualizar a lista de produtos previamente adicionados ao carrinho, além de alterar a quantidade de produtos, remover itens do mesmo e especificar o tamanho do produto. Dessa forma, a página também oferece o custo de cada produto ($c_i = q_i . p_i$, onde $i$ é o produto, $q_i$ é a quantidade de produtos e $p_i$ é o preço unitário do produto) e o custo total da compra ($c_t = \sum c_i$, onde $c_t$ é o custo total). Assim, o usuário pode finalizar a sua compra através do botão _Proceed Purchase_, como pode ser visto na Figura 5:

![mockup-carrinho](../Milestone1/Mockup/Figma-Cart-Before.png)
_Figura 5: Tela do carrinho da aplicação._

Clicando no botão _Proceed Purchase_, uma aba se abre (interatividade será escrita utilizando _JavaScript_) permitindo a finalização da compra, como mostrado na Figura 6:

![mockup-finaliza-comora](../Milestone1/Mockup/Figma-Cart-After.png)
_Figura 6: Aba sobreposta a tela do carrinho, para finalização da compra_

Neste momento, será possível para o usuário indicar o número do cartão de crédito a ser utilizado e se há algum cupom de desconto a ser aplicado. O endereço de entrega será aquele cadastrado pelo usuário na hora do _Sign In_

- [**Administrador**](https://www.figma.com/file/d6WGN3QafoTPK8CbOYUJjj/Painel-Adm?type=design&node-id=107-2&t=ylyrqMCiOMWfl3zn-0): Nesta tela o usuário administrador poderá adicionar novos administradores, gerenciar produtos e verificar as finanças.

  ![mockup-administrador](../Milestone1/Mockup/Figma-Adm.png)
  _Figura 7: Tela principal do administrador com os menus de acesso as funcionalidades da plataforma_

- [**Estoque**](https://www.figma.com/file/5vRyfJ9us3lTYCR29QypL3/Estoque?type=design&node-id=209-81&t=0pgWj1OKzqIM9aQ3-0): Nesta tela o usuário administrador poderá adicionar novos produtos, editar os produtos existentes e checar as quantidades e vendas de cada produto

  ![mockup-estoque](../Milestone1/Mockup/Figma-Estoque.png)
  _Figura 8: Tela do estoque_

### Comentarios Sobre o Código

- [Estilo das Telas](css): para facilitar o reuso de código, o arquivo [_style.css_](css/style.css) foi criado contendo o estilo dos elementos compartilhados, praticamente, por todas as telas da nossa aplicação, como o body, o header e o footer. Além disso, um ou mais arquivos _.css_ adicionais foram empregados para a estilização específica das telas, complementando aquela trazida pelo arquivo _style.css_. Como exemplo, a tela _Login/Signin_ conta com os arquivos [_login.css_](css/login.css) e [_signin.css_](css/signin.css) para estilização completa da página.

### Plano de Testes

Ainda não temos um plano robusto para realização de testes da aplicação WEB. Entretanto, conforme aprendido nas primeiras aulas do curso, consideramos que a ferramenta [_Insomnia_](https://insomnia.rest) pode ser bastante útil para realização de testes referentes às comunicações HTTP estabelecidas entre cliente e servidor.

### Resultado dos Testes

Por enquanto todos os testes foram feitos de forma manual na nossa aplicação, visto que os endpoints ainda não foram criados
### Como rodar?

No diretório Milestone2 usar os seguintes comandos:

`npm install`

`npm start`
### Problemas Encontrados

TODO: Criar a página admin e suas funções
### Comentarios

O código foi todo produzido utilizando o bundle disponível pelo CRA em conjunto de alguns itens da MUI, no futuro pretendemos mudar toda a UI para o estilo Material