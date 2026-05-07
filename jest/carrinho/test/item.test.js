import Item from "../item.js";

describe("Testes para classe Item", () => {
    let item;

    beforeEach(() => {
        item = new Item("Laranja", 3.5, 10);
    });

    it("Deve ter três campos: nome, valor e quantidade", () => {
        expect(item.nome).toBe("Laranja");
        expect(item.valor).toBe(3.5);
        expect(item.quantidade).toBe(10);
    });

    it("Deve calcular o valor total do item a partir da quantidade e do valor", () => {
        const valorTotal = item.pegaValorTotalItem();
        expect(valorTotal).toBeCloseTo(35);
    });
});