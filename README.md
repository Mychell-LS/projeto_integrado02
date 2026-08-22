<h1>🌡️ Sobre o projeto </h1>

Este projeto foi desenvolvido com o objetivo de criar um sistema capaz de simular, monitorar e classificar a dilatação térmica de um componente a partir da temperatura medida por um microcontrolador. A proposta integra eletrônica embarcada, comunicação entre aplicações, desenvolvimento de servidor e Inteligência Artificial em uma única solução.

A aquisição da temperatura é realizada por um STM32F103C8, utilizando um trimpot como elemento de simulação do sensor de temperatura. O valor obtido pelo microcontrolador é enviado para uma aplicação desenvolvida em C#, responsável pela comunicação entre o sistema embarcado e o servidor.

A aplicação em C# encaminha os dados para um servidor desenvolvido em Express.js, que funciona como a camada responsável pelo recebimento e processamento das informações. A partir da temperatura recebida, o sistema realiza o cálculo da dilatação térmica e encaminha o resultado para o modelo de Inteligência Artificial, responsável por classificar a condição da dilatação.

Dessa forma, o projeto une hardware, software, comunicação e aprendizado de máquina para construir um fluxo completo de aquisição e análise de dados.

You Tube - Link da apresentação :https://youtu.be/bF4n5rNAHLs?si=q8L6nimEf9Hz-59T
