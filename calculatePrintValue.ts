import chalk from "chalk";
import inquirer, { Question } from "inquirer";
import ora from "ora";
import chalkAnimation from "chalk-animation";

const args = process.argv.slice(2);
const mostrarCustoSemLucro = args.includes("--preco-bruto");

type Bandeira = "nenhuma" | "amarela" | "vermelha1";

interface QuestionValidated<T = any> extends Question<T> {
  validate?: (
    input: any,
    answers?: T
  ) => boolean | string | Promise<boolean | string>;
}

type Answers = {
  valorFilamento: number;
  pesoPeca: number;
  energiaConsumida: number; // kWh
  tempo: number; // horas
  bandeira: Bandeira;
  lucro?: number; // percentual, opcional se flag não passada
  teveMaoDeObra: boolean;
  custoMaoDeObra?: number;
};

function parseNumberInput(input: string): number {
  const normalized = String(input).trim().replace(",", ".");
  return parseFloat(normalized);
}

function validatePositiveNumber(input: string | number): true | string {
  const n = typeof input === "number" ? input : parseNumberInput(String(input));
  if (Number.isFinite(n) && n >= 0) return true;
  return "Digite um número válido maior ou igual a 0.";
}

function getPromptMessages(): QuestionValidated<Answers>[] {
  const messages: QuestionValidated<Answers>[] = [
    {
      name: "valorFilamento",
      type: "input",
      message: "Qual o valor do filamento (R$/kg)?",
      filter: parseNumberInput,
      validate: (value) =>
        Number(value) > 0 ? true : "Digite um valor válido.",
    },
    {
      name: "pesoPeca",
      type: "input",
      message: "Qual o peso da peça (g)?",
      filter: parseNumberInput,
      validate: (value) =>
        Number(value) > 0 ? true : "Digite um valor válido.",
    },
    {
      name: "energiaConsumida",
      type: "input",
      message: "Qual o total de energia consumida na impressão (kWh)?",
      filter: parseNumberInput,
      validate: validatePositiveNumber,
    },
    {
      name: "tempo",
      type: "input",
      message: "Quanto tempo levou a impressão (h)?",
      filter: parseNumberInput,
      validate: (value) =>
        Number(value) > 0 ? true : "O tempo deve ser maior que zero.",
    },
    {
      name: "bandeira",
      type: "list",
      message: "Qual a bandeira tarifária atual?",
      choices: [
        { name: "Nenhuma", value: "nenhuma" },
        { name: chalk.yellow("Amarela (+R$ 1,50 / 100kWh)"), value: "amarela" },
        {
          name: chalk.red("Vermelha Nível 1 (+R$ 4,00 / 100kWh)"),
          value: "vermelha1",
        },
      ],
    },
    {
      name: "teveMaoDeObra",
      type: "confirm",
      message: "Teve mão de obra (parafusar, pintar, etc)?",
      default: false,
    },
    {
      name: "custoMaoDeObra",
      type: "input",
      message: "Qual o custo da mão de obra (R$)?",
      filter: parseNumberInput,
      validate: validatePositiveNumber,
      when: (answers) => answers.teveMaoDeObra,
    },
  ];

  if (mostrarCustoSemLucro) {
    messages.push({
      name: "lucro",
      type: "input",
      message: "Qual a margem de lucro desejada (%)?",
      default: "80",
      filter: parseNumberInput,
      validate: validatePositiveNumber,
    });
  }

  return messages;
}

async function main() {
  const animation = chalkAnimation.karaoke(
    "💡 Calculadora de Custo e Preço de Impressão 3D iniciando..."
  );

  const spinnerInit = ora({ spinner: "dots12" }).start();

  await new Promise((resolve) => setTimeout(resolve, 4000));

  animation.stop();
  spinnerInit.succeed("Script iniciado!");

  const respostas = await inquirer.prompt<Answers>(getPromptMessages() as any);

  const {
    valorFilamento,
    pesoPeca,
    energiaConsumida,
    tempo,
    bandeira,
    lucro = 80,
    teveMaoDeObra,
    custoMaoDeObra = 0,
  } = respostas;

  const spinner = ora("Calculando o preço...").start();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const potenciaMedia = (energiaConsumida * 1000) / tempo;

  const tarifaKwh = 0.725;
  let adicionalBandeira = 0;
  if (bandeira === "amarela") adicionalBandeira = 1.5 / 100;
  if (bandeira === "vermelha1") adicionalBandeira = 4 / 100;

  const custoFilamento = (pesoPeca / 1000) * valorFilamento;
  const custoEnergia = energiaConsumida * (tarifaKwh + adicionalBandeira);

  const custoFinalSemLucro = custoFilamento + custoEnergia + custoMaoDeObra;
  const precoVenda = custoFinalSemLucro * (1 + lucro / 100);

  spinner.succeed("Cálculo finalizado!");

  console.log(chalk.blue.bold("\n📊 Resultado:"));
  console.log(
    chalk.cyan(
      `⚡ Potência média (fixa, calculada): ${potenciaMedia.toFixed(2)} W`
    )
  );
  console.log(
    chalk.green(`📦 Custo do filamento: R$ ${custoFilamento.toFixed(2)}`)
  );
  console.log(
    `${chalk.yellow(`⚡ Consumo`)} : ${energiaConsumida.toFixed(3)} kWh`
  );
  console.log(
    chalk.green(
      `⚡ Custo de energia: R$ ${custoEnergia.toFixed(
        2
      )} (tarifa base: R$${tarifaKwh.toFixed(3)} + bandeira)`
    )
  );
  if (teveMaoDeObra)
    console.log(
      chalk.yellow(`🛠️ Custo da mão de obra: R$ ${custoMaoDeObra.toFixed(2)}`)
    );

  if (mostrarCustoSemLucro) {
    console.log(
      chalk.green(
        `💰 Custo final sem lucro: R$ ${custoFinalSemLucro.toFixed(2)}`
      )
    );
  }

  console.log(
    chalk.magenta.bold(
      mostrarCustoSemLucro
        ? `🏷️ Preço sugerido (lucro ${lucro}%): R$ ${precoVenda.toFixed(2)}\n`
        : `🏷️ Preço sugerido: R$ ${precoVenda.toFixed(2)}\n`
    )
  );
}

main().catch((err) => {
  console.error(chalk.red("Erro:"), err);
  process.exit(1);
});
