import { somaHorasExtras, calculaDescontos } from "../index.js";

describe("Testes para folha de pagamento", () => {
    it("Deve retornar a soma das horas extras", () => {
        const esperado = 2500;
        const resultado = somaHorasExtras(2000, 500);
        expect(resultado).toBe(esperado);
    });

    it("Deve retornar o valor do salário com os descontos", () => {
        const esperado = 2200;
        const resultado = calculaDescontos(2500, 300);
        expect(resultado).toBe(esperado);
    });
});