# projeto---BuzzQuizz

# Descrição

Seu primeiro projetão será a implementação de um sistema de Quiz em HTML, CSS e JavaScript! Nesse sistema, você será responsável por desenvolver tanto a experiência do Quiz em si, quanto a área administrativa que permite criar quizzes!

# Requisitos


- Geral
    - [ ]  Todas as telas devem ser implementadas em um único arquivo HTML. Se preferir, por organização pode dividir seu JavaScript/CSS em múltiplos arquivos
    - [ ]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, etc), somente JavaScript puro (exceção: biblioteca **axios**)
    - [ ]  Para manipular o HTML, sugerimos utilizar o pattern de Render Function
    - [ ]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub
    - [ ]  Para isso, comece criando um repositório público na sua conta do GitHub, inicializando com um primeiro commit contendo somente o [README.md](http://readme.md)
    - [ ]  **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu. Caso queira dividir um requisito em vários commits, não há problema. Mas evite colocar mais de um requisito no mesmo commit
    - [ ]  Utilize tags semânticas onde aplicável
    
    
- Layout
    - [ ]  Aplicar layout para desktop, seguindo imagens fornecidas
    - [ ]  Aplicar layout para mobile, seguindo imagens fornecidas
    - [ ]  Fonte usada deve ser a **Roboto** nas fontes sem serifa e **Merriweather** para as fontes serifadas
    
    
- Tela de Login
    - [ ]  Campos devem usar input `type="email"` e `type="password"`
    - [ ]  Ao clicar em entrar, caso algum dos campos esteja vazio, deverá aparecer um alert solicitando o preenchimento dos campos
    - [ ]  Ao clicar em entrar, caso os campos estejam preenchidos, deverá ser enviado um request `post` para o servidor, seguindo documentação
    - [ ]  Caso o servidor retorne uma falha (status 401), deverá ser lançado um alert para o usuário de email/senha incorretos
    - [ ]  Caso o servidor retorne sucesso (status 200 ou 201), a tela deve sumir e a próxima tela (da listagem de quizzes) deve ser exibida
    - [ ]  Em caso de sucesso, o servidor retornará na resposta também um código identificador do usuário que você deve **guardar** para usar nos próximos requests pro servidor
    - [ ]  Ao clicar em entrar, o botão deve ser desabilitado até o servidor responder, evitando que o usuário clique no botão várias vezes
    
    
- Lista de Quizzes
    - [ ]  Ao entrar na tela, deve ser carregado do servidor a lista de quizzes do usuário que foi autenticado
    - [ ]  Para isso, no request enviado ao servidor deve ser adicionado um **header** de nome `User-Token`, contendo o valor retornado pelo servidor no request de autenticação (que você guardou nos requisitos anteriores)

        Dica: pesquise por "add header axios" 

    - [ ]  Ao clicar em "Novo Quiz" essa tela deve sumir, dando lugar à próxima tela, de criação de quiz
    
    
- Criação de Quiz
    - [ ]  Um quiz tem 3 tipos de informação: seu título, suas perguntas e seus níveis
    - [ ]  Uma pergunta é composta por: um enunciado, 1 resposta correta e 3 respostas erradas. Cada resposta tem também uma URL para uma imagem que vai ser usada no quiz.
    - [ ]  Um nível é um possível resultado do quiz, e é composto por: uma % de início e de final que corresponde àquele nível, um título, uma descrição e uma URL para a imagem que será exibida ao final
    - [ ]  O usuário poderá adicionar quantas perguntas e níveis quanto desejar
    - [ ]  Ao publicar um quiz, o mesmo deverá ser enviado para o servidor. O request deve seguir a mesma regra de enviar um header com o token do usuário
    - [ ]  Ao publicar um quiz, o usuário deve voltar pra tela de lista de quizzes
    
    
- Validação de Formulário
    - [ ]  Antes de enviar pro servidor, usando JavaScript, garanta que o primeiro caractere do título do quiz e das perguntas/respostas esteja em maíusculo (ex: converta "título" para "Título")

        Dica: pesquise pelas funções `charAt`, `toUpperCase`/`toLowerCase`, `slice`/`substring`

    - [ ]  Antes de enviar pro servidor, usando JavaScript, remova possíveis espaços em branco que o usuário deixou no início/final dos inputs

        Dica: pesquise pela função `trim`

    - [ ]  Valide que só existe 1 interrogação na pergunta e está ao final da mesma. Caso contrário, deve aparecer um alert solicitando que o usuário corrija os dados.

        Dica: pesquise pelas funções `indexOf` / `lastIndexOf`
        
        
- Interface do Quiz
    - [ ]  Cada pergunta do quiz deve ser exibida a cada vez
    - [ ]  As respostas de cada pergunta devem ser exibidas organizadas aleatoriamente
    - [ ]  Ao clicar em uma resposta, as respostas erradas devem ganhar fundo vermelho. A correta deve ganhar fundo verde.
    - [ ]  Após 2 segundos de respondida, deve-se avançar para a próxima pergunta
    
    
- Fim do Quiz
    - [ ]  Ao final, deve ser exibida a quantidade de acertos no quiz
    - [ ]  O score deve ser arredondado de forma a não ter casas decimais

        Dica: pesquise pelas funções `Math.ceil`, `Math.floor`, `Math.round` (e utilize a que você preferir)

    - [ ]  Para exibir o título/descrição/imagem do nível alcançado, você deve calcular em qual nível o usuário ficou baseado na quantidade de acertos e nos níveis configurados no quiz
    
    
    # Bônus (opcional)

- Apagar quiz
    - [ ]  Adicione um botão em cada quiz (na tela de listagem de quizzes) permitindo que o usuário apague um quiz existente

        Dica: pesquise por "axios delete"
        
        
- Alterar quiz
    - [ ]  Adicione um botão em cada quiz (na tela de listagem de quizzes) permitindo que o usuário edite um quiz existente

        Dica: pesquise por "axios put"
        
        
- Feature extra no quiz
    - [ ]  Invente uma funcionalidade extra no seu sistema de quiz. Por exemplo: e se desse pro usuário escolher as cores temáticas de cada quiz e alterar a cor de fundo e das fontes da página? Você é livre pra criar sua própria funcionalidade
    
    
- Spinners
    - [ ]  Adicione spinners (loading) no seu projeto para as comunicações com o servidor ficarem mais interativas
    
    
- Animações
    - [ ]  Ao passar de uma pergunta pra outra na interface do quiz, faça uma animação de fade-in/fade-out em vez de trocar imediatamente
