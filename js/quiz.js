let perguntasFeitas = []

        const perguntas = [
            //pergunta 0
            {pergunta: "Qual símbolo é usado para comentários em JavaScript?",

            respostas: ["//", "/*", "===", "nenhuma"],

            correta: "r0"
        },
    //pergunta 1
        {
            pergunta: "Qual é o uso da função isNaN em JavaScript?",

            respostas: ["O valor passado não é um número", "Valor nulo", "Verdadeiro ou falso", "Valor é real"],

            correta: "r0"
        },
        {
            pergunta: "Qual é mais rápido JavaScript ou ASP?",

            respostas: ["Os dois são iguais", "Javascript por rodar do lado cliente", "ASP por rodar do lado cliente", "Nenhum, ambos são lentos por rodarem do lado servidor"],

            correta: "r1"
        },
        {
            pergunta: "Qual diferença entre React.JS e React Native?",

            respostas: ["Ambos servem para criar páginas web", "React.js é framework mobile", "React.JS é framework para aplicações web e o Native é um framework mobile", "Nenhuma das opções acima"],

            correta: "r2"
        },
        {
            pergunta: "O que significa JSX?",

            respostas: ["Gerar elementos DOM, usando sintaxe html", "Função para gerar uma div", "Abreviação de JavaScript HTML", "Todas opções acima"],

            correta: "r0"
        },
        {
            pergunta: "Selecione a opções que são banco de dados relacionais",

            respostas: ["PostgreSQL, MongoDB", "MongoDB, NoSQL", "NoSQL, SQLite3", "PostgreSQL, SQLite3"],

            correta: "r3"
        },
        {
            pergunta: "Qual limite máximo de pessoas no time SCRUM?",

            respostas: ["20", "15", "6", "12"],

            correta: "r3"
        },
        {
            pergunta: "SCRUM é um método",

            respostas: ["Facilita o desenvolvimento de projetos da equipe em curto prazo, usando metodologia ágil", "Estilo cascata, tendo um longo tempo de desenvolvimento", "Metodologia ágil, com equipes reduzidas de até 10 pessoas", "Nenhuma da opções acima"],

            correta: "r0"
        },
        {
            pergunta: "O Android utiliza como base o sistema operacional Linux, no qual cada processo é encapsulado em sua própria máquina virtual o isolado dos demais. Por meio dessas e de outras características, o Android implementa um princípio relacionado à segurança do aplicativo. Indique qual opção representa esse princípio",

            respostas: ["Privilégio total", "Liberar memória", "Privilégio mínimo", "ID único do aplicativo"],

            correta: "r2"
        },
        {
            pergunta: "O componente de aplicativo do Android que fornece uma tela com a qual os usuários podem interagir para fazer algo, como discar um número no telefone, enviar um e-mail ou ver um mapa é​​​",

            respostas: ["Broadcast receiver", "Content provider", "Activity", "Intent"],

            correta: "r2"
        }, 
    ]
    var qtdPerguntas = perguntas.length - 1;
    gerarPergunta(qtdPerguntas);


    function gerarPergunta(maxPerguntas){
        let aleatorio = (Math.random()* maxPerguntas).toFixed()
        aleatorio = Number(aleatorio);
        if(!perguntasFeitas.includes(aleatorio)){
            
            perguntasFeitas.push(aleatorio)
            
            var p_selecionada = perguntas[aleatorio].pergunta;
            
            $("#pergunta").html(p_selecionada);
            $("#pergunta").attr("data-indice", aleatorio)
            
            for(i =0; i<10; i++){
                $("#r" + i).html(perguntas[aleatorio].respostas[i])
            }
            
            var pai = $("#respostas")
            var botoes = pai.children()
            
            for(i = 1; i < botoes.length; i++){
                
                pai.append(botoes.eq(Math.floor(Math.random()* botoes.length)))
            }
        } else {
            console.log("A pergunta já foi feita, sorteie novamente.")
            
            if(perguntasFeitas.length < qtdPerguntas + 1) {
                return gerarPergunta(maxPerguntas);
            } else {
                console.log("Acabaram as perguntas")
                $("#quiz").addClass("oculto")
                $("#mensagem").html("Você venceu! Acertou todas perguntas.")
                $("#status").removeClass("oculto")
            }
        }
    }
    
    $(".resposta").click(function(){
        $(".resposta").each(function(){
            if($("#quiz").attr("data-status") !== "travado"){
                resetaBotoes();
            }
        })
        $(this).addClass("selecionada")
    })
    
    $("#confirmar").click(function(){
        var indice = $("#pergunta").attr("data-indice");var respCerta = perguntas[indice].correta;
        
        $(".resposta").each(function () {
            if($(this).hasClass("selecionada")){
                
                var respostaEscolhida = $(this).attr("id")
                if(respCerta == respostaEscolhida){
                    console.log("Acertou Criatura!")
                    proximaPergunta();
                
                } else {
                    $("#quiz").attr("data-status", "travado")
                    $("#" + respCerta).addClass("correta")

                    $("#" + respostaEscolhida).removeClass("selecionada")

                    $("#" + respostaEscolhida).addClass("errada")

                    setTimeout(function(){
                        proximaPergunta();
                    },2000);
                    
                }
            }
        })
    })
    
    function newGame(){
        function resultado(){
        let respostas = respCerta.length
        if(respostas.checked){
            alert("você acertou: " + respostas)
        }
    }
        perguntasFeitas = []
        resetaBotoes()
        gerarPergunta(qtdPerguntas)
        $("#quiz").removeClass("oculto")
        $("#status").addClass("oculto")

    }

    function proximaPergunta(){
        resetaBotoes();
        gerarPergunta(qtdPerguntas);
    }

    function resetaBotoes(){
        $(".resposta").each(function(){
            if($(this).hasClass("selecionada")){
                $(this).removeClass("selecionada")
            } 
            else if($(this).hasClass("correta")){
                $(this).removeClass("correta")
            } 
            else if($(this).hasClass("errada")){
                $(this).removeClass("errada")
            } 
        })
    }

    function gameOver(){
        $("#quiz").addClass("oculto")
        $("#mensagem").html("Game Over")
        $("#status").removeClass("oculto")
    }

    $("#proxima").click(function(){
        proximaPergunta();
    })
