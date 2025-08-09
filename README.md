Calculadora de Custo e Preço de Impressão 3D
💡 Calculadora de custo e preço para impressão 3D via CLI — simples, interativa e bonita!

Descrição
Este projeto é um script CLI em TypeScript que calcula o custo e o preço sugerido para suas peças impressas em 3D.

Ele considera:

Valor do filamento (R$/kg)

Peso da peça (gramas)

Consumo de energia (kWh)

Tempo de impressão (horas)

Bandeira tarifária de energia (nenhuma, amarela, vermelha nível 1)

Custo de mão de obra (opcional)

Margem de lucro desejada (%)

O script é interativo, usando prompts no terminal e apresenta resultados coloridos, com animações e spinners para melhorar a experiência do usuário.

Funcionalidades
Entrada via prompt para todos os parâmetros necessários

Validação de valores numéricos

Cálculo automático de potência média (W)

Ajuste do custo de energia conforme bandeira tarifária

Inclusão opcional de custo de mão de obra

Opção de exibir custo final bruto (sem lucro) via flag --preco-bruto

Feedback visual com animações (chalk-animation) e spinner (ora)

Código modular e escrito em TypeScript

Como usar
Requisitos
Node.js (versão 16 ou superior recomendada)

npm ou yarn

Instalação
Clone este repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/calculadora-impressao3d.git
cd calculadora-impressao3d
Instale as dependências:

bash
Copiar
Editar
npm install
# ou
yarn install
Rodando o script
Execute diretamente com ts-node (requer ts-node instalado globalmente ou no projeto):

bash
Copiar
Editar
npx ts-node src/index.ts [--preco-bruto]
A flag --preco-bruto faz com que o custo final sem lucro também seja exibido.

Siga os prompts para informar os valores.

Exemplo
bash
Copiar
Editar
$ npx ts-node src/index.ts --preco-bruto

💡 Calculadora de Custo e Preço de Impressão 3D iniciando...
Script iniciado!

? Qual o valor do filamento (R$/kg)? 120
? Qual o peso da peça (g)? 50
? Qual o total de energia consumida na impressão (kWh)? 0.15
? Quanto tempo levou a impressão (h)? 2
? Qual a bandeira tarifária atual? Nenhuma
? Teve mão de obra (parafusar, pintar, etc)? No
? Qual a margem de lucro desejada (%)? 80

Calculando o preço...
Cálculo finalizado!

📊 Resultado:
⚡ Potência média (fixa, calculada): 75.00 W
📦 Custo do filamento: R$ 6.00
⚡ Consumo : 0.150 kWh
⚡ Custo de energia: R$ 0.11 (tarifa base: R$0.725 + bandeira)
💰 Custo final sem lucro: R$ 6.11
🏷️ Preço sugerido (lucro 80%): R$ 10.99
Tecnologias utilizadas
TypeScript

Inquirer — para prompts interativos

Chalk — para cores no terminal

Chalk Animation — animações de texto

Ora — spinner de carregamento

Contribuições
Contribuições são bem-vindas! Abra issues e pull requests para sugerir melhorias ou corrigir bugs.

Licença
Este projeto está sob a licença MIT — veja o arquivo LICENSE para detalhes.








Perguntar ao ChatGPT
