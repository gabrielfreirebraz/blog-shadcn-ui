import { NoticeType, TerminationType } from "../enum/TerminationType";
import { RescisaoInputs, RescisaoResult } from "../types";

export const calculateRescisao = ({
  salaryGross,
  startDate,
  endDate,
  reasonType,
  noticeType,
  dependentsNumber = 0,
}: RescisaoInputs): RescisaoResult => {
  // Validações iniciais
  if (new Date(startDate) >= new Date(endDate)) {
    throw new Error("A data de término deve ser posterior à data de início.");
  }
  if (salaryGross <= 0) {
    throw new Error("O salário bruto deve ser maior que zero.");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Cálculos de tempo trabalhado
  const totalMonthsWorked =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const yearsWorked = Math.floor(totalMonthsWorked / 12);

  const totalDaysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  const workedDays = end.getDate();
  const dailyRate = salaryGross / totalDaysInMonth;
  const salaryBalance = workedDays * dailyRate;

  // Proporcionalidades
  const proportionalThirteenthSalary =
    (salaryGross / 12) * (totalMonthsWorked + workedDays / totalDaysInMonth);

    const proportionalVacation =
    (salaryGross / 12) * totalMonthsWorked + (workedDays / totalDaysInMonth) * (salaryGross / 12) +
    (salaryGross / 12) * (1 / 3);

  const vacationVencida = yearsWorked >= 1 ? salaryGross + salaryGross / 3 : 0;

  // Aviso Prévio
  let priorNotice = 0;
  if (noticeType === NoticeType.COMPENSATED_BY_EMPLOYER) {
    const additionalNoticeDays = Math.min(yearsWorked * 3, 90);
    const totalNoticeDays = 30 + additionalNoticeDays;
    priorNotice = (salaryGross / 30) * totalNoticeDays;
  }

  // Multa FGTS
  const fgtsSaldoBase = salaryGross * 8 / 100 * totalMonthsWorked;
  let fgtsFine = 0;
  let fgtsAvailableForWithdrawal = false;
  if (reasonType === TerminationType.NO_JUST_CAUSE) {
    fgtsFine = fgtsSaldoBase * 0.4;
    fgtsAvailableForWithdrawal = true;
  } else if (reasonType === TerminationType.COMMON_AGREEMENT) {
    fgtsFine = fgtsSaldoBase * 0.2;
    fgtsAvailableForWithdrawal = true;
  }

  // Total Bruto
  const grossTotal =
    salaryBalance +
    proportionalThirteenthSalary +
    proportionalVacation +
    vacationVencida +
    priorNotice +
    fgtsFine;

  // INSS Progressivo
  const inssBase = grossTotal - vacationVencida - priorNotice;
  let inss = 0;
  let inssReferencePercent = 0; // Percentual da última faixa aplicada
  const inssFaixas = [
    { limite: 1320.0, aliquota: 0.075 },
    { limite: 2571.29, aliquota: 0.09 },
    { limite: 3856.94, aliquota: 0.12 },
    { limite: Infinity, aliquota: 0.14 },
  ];
  let restante = inssBase;
  for (const faixa of inssFaixas) {
    const parcela = Math.min(restante, faixa.limite);
    inss += parcela * faixa.aliquota;
    inssReferencePercent = faixa.aliquota * 100; // Atualiza a última alíquota aplicada
    restante -= parcela;
    if (restante <= 0) break;
  }
  const inssPercent = (inss / inssBase) * 100; // Percentual efetivo

  // INSS do 13º salário
  const inssBase13 = proportionalThirteenthSalary;
  let inss13 = 0;
  let inss13ReferencePercent = 0;
  let restante13Inss = inssBase13;
  for (const faixa of inssFaixas) {
    const parcela = Math.min(restante13Inss, faixa.limite);
    inss13 += parcela * faixa.aliquota;
    inss13ReferencePercent = faixa.aliquota * 100; // Atualiza a última alíquota aplicada para o 13º
    restante13Inss -= parcela;
    if (restante13Inss <= 0) break;
  }
  const inss13Percent = inssBase13 > 0 ? (inss13 / inssBase13) * 100 : 0;

  // IR Progressivo
  const irFaixas = [
    { limite: 2112.0, aliquota: 0.0, deduzir: 0.0 },
    { limite: 2826.65, aliquota: 0.075, deduzir: 158.40 },
    { limite: 3751.05, aliquota: 0.15, deduzir: 370.40 },
    { limite: 4664.68, aliquota: 0.225, deduzir: 651.73 },
    { limite: Infinity, aliquota: 0.275, deduzir: 884.96 },
  ];

  const irBase = inssBase - inss - dependentsNumber * 189.59;
  let ir = 0;
  let irReferencePercent = 0; // Percentual da última faixa aplicada
  if (irBase > 0) {
    let restanteIR = irBase;
    for (const faixa of irFaixas) {
      const parcela = Math.min(restanteIR, faixa.limite);
      if (parcela > 0) {
        ir += parcela * faixa.aliquota - faixa.deduzir;
        irReferencePercent = faixa.aliquota * 100; // Atualiza a última alíquota aplicada
        restanteIR -= parcela;
        if (restanteIR <= 0) break;
      }
    }
    ir = Math.max(ir, 0); // Evita valores negativos
  }

  const irPercent = irBase > 0 ? (ir / irBase) * 100 : 0;

  // IR do 13º salário
  const irBase13 = proportionalThirteenthSalary - inss;
  let ir13 = 0;
  let ir13ReferencePercent = 0;
  let restante13 = irBase13;
  for (let i = 0; i < irFaixas.length; i++) {
    const faixa = irFaixas[i];
    const limiteAnterior = i === 0 ? 0 : irFaixas[i - 1].limite; // Define o limite anterior com base no índice
    const parcela = Math.min(restante13, faixa.limite - limiteAnterior);

    if (parcela > 0) {
      ir13 += parcela * faixa.aliquota;
      ir13ReferencePercent = faixa.aliquota * 100; // Atualiza a última alíquota aplicada para o 13º
      restante13 -= parcela;
    }

    if (restante13 <= 0) break;
  }

  ir13 = Math.max(ir13, 0); // Garante que o IR 13 não seja negativo
  const ir13Percent = irBase13 > 0 ? (ir13 / irBase13) * 100 : 0; // Percentual efetivo do IR do 13º salário

  // Logs detalhados
  console.log("Detalhamento IR do 13º salário:");
  irFaixas.forEach((faixa, i) => {
    const limiteAnterior = i === 0 ? 0 : irFaixas[i - 1].limite;
    console.log(`Faixa ${i + 1}: Limite: ${faixa.limite}, Deduzir: ${faixa.deduzir}, Alíquota: ${faixa.aliquota}`);
  });
  console.log("Base IR 13º:", irBase13, "IR 13º acumulado:", ir13);

  // Total de deduções  
  const deductionsTotal13 = inss13 + ir13;
  const deductionsTotal = inss + ir + deductionsTotal13;
  const netTotal = grossTotal - deductionsTotal;

  // Logs de validação
  console.log("Base IR Geral:", irBase);
  console.log("IR Geral:", ir, "Percentual IR:", irReferencePercent);
  console.log("Base IR 13º:", irBase13);
  console.log("Base INSS 13º:", inssBase13);
  console.log("IR 13º:", ir13);

  // Retorno dos valores finais
  return {
    salaryBalance: parseFloat(salaryBalance.toFixed(2)),
    proportionalThirteenthSalary: parseFloat(proportionalThirteenthSalary.toFixed(2)),
    proportionalVacation: parseFloat(proportionalVacation.toFixed(2)),
    priorNotice: parseFloat(priorNotice.toFixed(2)),
    fgtsFine: parseFloat(fgtsFine.toFixed(2)),
    fgtsBalance: parseFloat(fgtsSaldoBase.toFixed(2)),
    fgtsAvailableForWithdrawal,
    grossTotal: parseFloat(grossTotal.toFixed(2)),
    deductionsTotal: parseFloat(deductionsTotal.toFixed(2)),
    inss: parseFloat(inss.toFixed(2)),
    inssPercent: parseFloat(inssPercent.toFixed(2)),
    inssReferencePercent: parseFloat(inssReferencePercent.toFixed(2)),
    ir: parseFloat(ir.toFixed(2)),
    irPercent: parseFloat(irPercent.toFixed(2)),
    irReferencePercent: parseFloat(irReferencePercent.toFixed(2)),
    ir13: parseFloat(ir13.toFixed(2)),
    ir13Percent: parseFloat(ir13Percent.toFixed(2)),
    inss13Percent: parseFloat(inss13Percent.toFixed(2)),
    deductionsTotal13: parseFloat(deductionsTotal13.toFixed(2)),
    netTotal: parseFloat(netTotal.toFixed(2)),
  };
};