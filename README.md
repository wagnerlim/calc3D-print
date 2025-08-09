# Calculadora de Custo e Preço de Impressão 3D

💡 Uma ferramenta simples em Node.js para calcular o custo e preço de venda de uma peça impressa em 3D, considerando filamento, energia elétrica, mão de obra e margem de lucro.

---

## Funcionalidades

- Recebe inputs via terminal usando `inquirer`
- Calcula custo do filamento baseado no peso e preço por kg
- Calcula custo de energia considerando tarifa base e bandeira tarifária (Nenhuma, Amarela, Vermelha)
- Inclui custo de mão de obra opcional
- Permite configurar margem de lucro
- Exibe resultados com saída colorida usando `chalk`
- Animações de início e spinner de carregamento usando `chalk-animation` e `ora`
- Suporta flag `--preco-bruto` para mostrar custo final sem lucro

---

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - para perguntas interativas no terminal
- [Chalk](https://github.com/chalk/chalk) - para cores no terminal
- [Chalk-animation](https://github.com/bokub/chalk-animation) - para animações no terminal
- [Ora](https://github.com/sindresorhus/ora) - para spinner no terminal

---

## Como usar

### Pré-requisitos

- Node.js >= 18
- Yarn ou npm

### Instalação

```bash
git clone git@github.com:wagnerlim/calc3D-print.git
cd calc3D-print
npm install
# ou
yarn install
Rodando o script
bash
Copiar
Editar
npx ts-node src/calculatePrintValue.ts
Para mostrar o custo sem lucro (flag opcional):

bash
Copiar
Editar
npx ts-node src/calculatePrintValue.ts --preco-bruto
Exemplo de execução
scss
Copiar
Editar
💡 Calculadora de Custo e Preço de Impressão 3D iniciando...
? Qual o valor do filamento (R$/kg)? 120
? Qual o peso da peça (g)? 50
? Qual o total de energia consumida na impressão (kWh)? 0.3
? Quanto tempo levou a impressão (h)? 4
? Qual a bandeira tarifária atual? Nenhuma
? Teve mão de obra (parafusar, pintar, etc)? No
🏷️ Preço sugerido: R$ 8.67
Contribuição
Contribuições são bem-vindas! Abra issues ou envie pull requests para melhorias, correções ou novas funcionalidades.

Licença
MIT License © Wagner Lima

css
Copiar
Editar

Se quiser, posso te ajudar a adicionar mais detalhes ou instruções!







