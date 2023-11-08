<img alt="LSR Cloud" width="40%" src="https://lucianoromao.com.br/lsr.png">

# Estudo sobre Sistemas Monolíticos

## Visão Geral 🔎
Neste código espero mostrar a minha visão de sistemas monolíticos com base nos ensinamentos do curso Full Cycle, onde eu gostaria de mostrar com uma aplicação correta de arquitetura e engenharia de Software poderá tornar a utilização de um sistema monolítico sustentável e atraente.

<img alt="Contexto projeto" width="60%" src="https://lucianoromao.com.br/FC_monolitico/contexto_projeto.PNG">

Neste código será utilizado conceitos de clean architecture, entretato esse código será focado em desenvolver módulos em sistemas moníliticos e fazer com que eles se comuniquem de forma menos desacoplada possível e nada mais.

## O que é um sistema monolítico?
 * Um sistema "tudo em um"
 * Uma unica únidade de Deploy
 * Um sistema "tradicional"

## Reflexões sobre sistemas monolíticos 🛣
Uma visão equivocada que muitos tentem a ter é que sistemas monolíticos são coisas do passado, sistemas que tem problemas para escalar, que dificultam o crescimento do négoicio. Entretanto se deixarmos de lado as influencias atuais sobre o que é melhor e olharmos mais detalhamente para esse tipo de sistemas poderemos ver seus benefícios.

Utilizar um sistema monolítico é ideal para novos projetos onde ainda não há uma clareza nas regras de negocio onde novas regras podem surgir ou regras existentes podem mudar frequentemente, com isso também ée necessário pensar em evitar complexidades no processo de deploy e nisso sistemas monolíticos nos ajuda. Podemos ver sistemas monolíticos como a "base", ou seja, vir primeiro no desenvolvimento de um softweare e naturalmente ocorrer uma evolução no software o qual justifique uma mudança de arquitetura para outro tipo de sistema.

## Abordagem
Será desenvolvimento um sistema utilizando um sistema monolítico modular utilizando conceitos de DDD a fim de deixar o código com alta coeção e baixo acomplamento. 

Para dimiuir ao máximo o acomplamento entre os contextos do sistema, irei fazer com que os contextos se comuniquem entre sí através de "fachadas"

<img alt="Fachadas" width="60%" src="https://lucianoromao.com.br/FC_monolitico/comunicacao.PNG">

Também irá ser utilizado uma camada de API geral, o qual será cross para todos os contextos do projeto, dessa forma será possível controlar de forma explicíta o acesso de usuários externos aos contextos do sistema.

<img alt="Camada controller API" width="60%" src="https://lucianoromao.com.br/FC_monolitico/api.PNG">


## Conclusões 📣
TBD.
