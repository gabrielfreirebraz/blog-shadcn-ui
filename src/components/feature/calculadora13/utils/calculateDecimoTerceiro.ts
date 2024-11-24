export const calculateDecimoTerceiro = ({
  salaryGross,
  workMonths,
  dependentsNumber = 0,
}: DecimoTerceiroInputs): DecimoTerceiroResult => {
  if (workMonths < 1 || workMonths > 12) {
    throw new Error("A quantidade de meses trabalhados deve estar entre 1 e 12.");
  }

  // Salário bruto proporcional ao número de meses trabalhados
  const proportionalSalary = (salaryGross / 12) * workMonths;

  // Primeira parcela: 50% do bruto proporcional (sem descontos)
  const primeiraParcela = proportionalSalary / 2;

  // Cálculo do INSS sobre o bruto proporcional
  let inss = 0;
  let inssReferencePercent = 0; // Percentual efetivo do INSS
  const inssFaixas = [
    { limite: 1320.0, aliquota: 0.075 }, // 7,5%
    { limite: 2571.29, aliquota: 0.09 }, // 9%
    { limite: 3856.94, aliquota: 0.12 }, // 12%
    { limite: Infinity, aliquota: 0.14 }, // 14%
  ];

  let salarioRestante = proportionalSalary;
  for (const faixa of inssFaixas) {
    if (salarioRestante > 0) {
      const faixaAplicavel = Math.min(faixa.limite, salarioRestante);
      inss += faixaAplicavel * faixa.aliquota;
      inssReferencePercent = faixa.aliquota * 100;
      salarioRestante -= faixaAplicavel;
    }
  }

  // Dedução por dependentes no cálculo do IRRF
  const perDependents = dependentsNumber * 189.59;

  // Base de cálculo para o IRRF (após INSS e dependentes)
  const baseIR = proportionalSalary - inss - perDependents;

  // Cálculo do IRRF corrigido
  let ir = 0;  
  let irReferencePercent = 0;
  let salarioRestanteIR = baseIR;

  const irFaixas = [
    { limite: 2112.0, aliquota: 0, deducao: 0 }, // Isento
    { limite: 2826.65, aliquota: 0.075, deducao: 158.4 }, // 7,5%
    { limite: 3751.05, aliquota: 0.15, deducao: 370.4 }, // 15%
    { limite: 4664.68, aliquota: 0.225, deducao: 651.73 }, // 22,5%
    { limite: Infinity, aliquota: 0.275, deducao: 884.96 }, // 27,5%
  ];

  for (const faixa of irFaixas) {
    if (salarioRestanteIR > 0) {
      const faixaAplicavel = Math.min(salarioRestanteIR, faixa.limite);
      ir += faixaAplicavel * faixa.aliquota - faixa.deducao;
      irReferencePercent = faixa.aliquota * 100;
      salarioRestanteIR -= faixaAplicavel;
    }
  }

  ir = Math.max(ir, 0); // evita ser negativo

  // Total de descontos aplicados na segunda parcela
  const descontosTotais = inss + ir;

  // Segunda parcela: 50% do bruto proporcional com descontos aplicados
  const segundaParcela = primeiraParcela - descontosTotais;

  const totalLiquido = primeiraParcela + segundaParcela;

  // Retorno dos valores
  return {
    primeiraParcela: parseFloat(primeiraParcela.toFixed(2)),
    segundaParcela: parseFloat(segundaParcela.toFixed(2)),
    totalBruto: parseFloat(proportionalSalary.toFixed(2)),
    totalLiquido: parseFloat(totalLiquido.toFixed(2)),
    descontosTotais: parseFloat(descontosTotais.toFixed(2)),
    inss: parseFloat(inss.toFixed(2)),
    inssPercent: parseFloat(inssReferencePercent.toFixed(2)),
    ir: parseFloat(ir.toFixed(2)),
    irPercent: parseFloat(irReferencePercent.toFixed(2)),
  };
};
