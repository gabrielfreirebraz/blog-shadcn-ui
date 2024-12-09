interface RescisaoInputs {
  salaryGross: number; // Salário bruto do funcionário
  startDate: number; //
  endDate: number; //
  dependentsNumber: number; // Número de dependentes
  paymentType?: string; // Tipo de pagamento: única, primeira parcela, ou segunda parcela
}

interface RescisaoResult {
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
