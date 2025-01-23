import DataManager from "../models/managerDados.js";
const dataManager = new DataManager();


export const targetChalenge = async (req, res) => {

    //#region  Exercicio1
    try {
        let i = 13;
        let soma = 0;
        let k = 0;

        while (k < i) {
            k = k + 1;
            soma = soma + k;
        }
        //#endregion 

        //#region  Exercicio 3
        const getData = await dataManager.readDadosFromFile();

        const dataValue = getData.map(({ valor }) => valor);

        let highestValue = Math.max(...dataValue);

        const positiveValues = dataValue.filter((number) => number > 0);

        let lowValue = Math.min(...positiveValues);

        const total = dataValue.reduce((total, number) => total + number, 0);

        let average = total / positiveValues.length;

        let aboveAverage = dataValue.filter((number) => number > average);

        const normalizeNumbers = Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        highestValue = normalizeNumbers.format(highestValue);
        lowValue = normalizeNumbers.format(lowValue);
        average = normalizeNumbers.format(average)
        aboveAverage = aboveAverage.map((number) =>
            normalizeNumbers.format(number),
        );
        const result = {
            highestValue,
            lowValue,
            average,
            aboveAverage,
        };
        //#endregion

        //#region  Exercicio 4

        const fatData = await dataManager.readFatFromFile();
        console.log("Dados lidos:", fatData);
        let totalFaturamento = Object.values(fatData).reduce((acc, value) => acc + value, 0);


        let percentages = {};
        Object.entries(fatData).forEach(([state, value]) => {
            percentages[state] = ((value / totalFaturamento) * 100).toFixed(2);
        });

        //#endregion
        console.log("Percentual de faturamento por estado:", percentages);
        res.render("dados", { title: "Desafio Target", result, soma, percentages });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao consultar dados" });
    }
};