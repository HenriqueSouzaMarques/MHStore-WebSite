# MHStore WebSite

### Colaboradores

|        Nome               |    NUSP   |
|:-------------------------:|:---------:|
|   Henrique S. Marques     |  11815722 | 
|   Gustavo Hitomi da Silva |  11801202 |
|   Marcos P. N. Filho      |  11819063 | 

### Características

O sistema tem 2 tipos de usuários: Clientes e Administradores.

1. Os Administradores são responsáveis pelo registro/gerenciamento de administradores, clientes e produtos/serviços fornecidos. A aplicação já vem com uma conta admin padrão (admin@admin.com 1234).
2. Os clientes são usuários que acessam o sistema para comprar produtos/serviços.
3. A loja vende produtos streatwear.
4. Venda de produtos: os produtos são selecionados, a quantidade escolhida e são incluídos em um carrinho. Os produtos são comprados usando um número de cartão de crédito (qualquer número é aceito pelo sistema). A quantidade de produtos vendidos é subtraída ao montante de estoque e adicionada ao montante dos vendidos.
8. Gestão de Produtos/Serviços: Os administradores podem criar/atualizar/ler/excluir (crud) novos produtos. Por exemplo, eles podem alterar a quantidade em estoque.
9. Para complementar os requisitos propostos pela disciplina, nosso projeto implementará cupons de desconto: assim, pretendemos que o servidor gere certa quantia de cupons de desconto (ID's) de maneira que, caso o usuário utilize um desses ID's gerados, o valor final do pagamento será decrescido por certa quantidade.

### Como rodar?
Para rodar a aplicação:

1. Clone o repositório:
   `git clone https://github.com/HenriqueSouzaMarques/MHStore-WebSite.git`
2. Mova-se para o diretório do projeto:
   `cd MHStore-WebSite`
3. Instale as dependências com node.js:
   `npm install`
4. Rode a aplicação:
   `npm start`
   
Após tal procedimento, uma aba do browser de preferência deve ser aberta rodando a aplicação.
