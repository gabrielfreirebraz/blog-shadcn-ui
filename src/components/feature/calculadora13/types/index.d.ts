interface DecimoTerceiroInputs {
  salaryGross: number; // Salário bruto do funcionário
  workMonths: number; // Quantidade de meses trabalhados no ano
  dependentsNumber: number; // Número de dependentes
  reasonType?: string; // Tipo de pagamento: única, primeira parcela, ou segunda parcela
  noticePeriod?: string;
}

interface DecimoTerceiroResult {
  primeiraParcela: number;
  segundaParcela: number;
  totalBruto: number;
  totalLiquido: number;
  descontosTotais: number;
  inss: number;
  inssPercent: number;
  ir: number;
  irPercent: number;
}
