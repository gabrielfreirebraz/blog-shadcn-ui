interface DecimoTerceiroInputs {
    salaryGross: number; // Salário bruto do funcionário
    workMonths: number;  // Quantidade de meses trabalhados no ano
    dependentsNumber: number; // Número de dependentes
    paymentType?: string; // Tipo de pagamento: única, primeira parcela, ou segunda parcela
}