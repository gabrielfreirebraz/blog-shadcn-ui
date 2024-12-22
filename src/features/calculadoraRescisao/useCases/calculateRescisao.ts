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
  
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalMonthsWorked =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const yearsWorked = Math.floor(totalMonthsWorked / 12);

  const totalDaysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  const workedDays = end.getDate();
  const dailyRate = salaryGross / totalDaysInMonth;
  const salaryBalance = workedDays * dailyRate;

  const proportionalThirteenthSalary =
    (salaryGross / 12) * (totalMonthsWorked + workedDays / totalDaysInMonth);

  const proportionalVacation =
    (salaryGross / 12) * (totalMonthsWorked + workedDays / totalDaysInMonth);
  const vacationBonus = proportionalVacation / 3;
  const vacationVencida = yearsWorked >= 1 ? salaryGross + salaryGross / 3 : 0;

  let priorNotice = 0;
  if (noticeType === NoticeType.COMPENSATED_BY_EMPLOYER) {
    const additionalNoticeDays = Math.min(yearsWorked * 3, 90);
    const totalNoticeDays = 30 + additionalNoticeDays;
    priorNotice = (salaryGross / 30) * totalNoticeDays;
  }

  const fgtsSaldoBase = salaryGross * 8 / 100 * totalMonthsWorked;
  let fgtsFine = 0;
  if (reasonType === TerminationType.NO_JUST_CAUSE) {
    fgtsFine = fgtsSaldoBase * 0.4;
  } else if (reasonType === TerminationType.COMMON_AGREEMENT) {
    fgtsFine = fgtsSaldoBase * 0.2;
  }

  const grossTotal =
    salaryBalance +
    proportionalThirteenthSalary +
    proportionalVacation +
    vacationBonus +
    vacationVencida +
    priorNotice +
    fgtsFine;

  // INSS Progressivo
  const inssBase = grossTotal - vacationVencida - vacationBonus - priorNotice;
  let inss = 0;
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
    restante -= parcela;
    if (restante <= 0) break;
  }
  const inssPercent = (inss / inssBase) * 100;

  // IR Progressivo
  const irBase = inssBase - inss - dependentsNumber * 189.59;
  let ir = 0;
  const irFaixas = [
    { limite: 2112.0, aliquota: 0.0, deduzir: 0.0 },
    { limite: 2826.65, aliquota: 0.075, deduzir: 158.40 },
    { limite: 3751.05, aliquota: 0.15, deduzir: 370.40 },
    { limite: 4664.68, aliquota: 0.225, deduzir: 651.73 },
    { limite: Infinity, aliquota: 0.275, deduzir: 884.96 },
  ];
  for (const faixa of irFaixas) {
    if (irBase > faixa.limite) {
      ir = irBase * faixa.aliquota - faixa.deduzir;
    }
  }

  const irPercent = (ir / irBase) * 100;

  const deductionsTotal = inss + ir;
  const netTotal = grossTotal - deductionsTotal;


  // Retorno dos resultados
  return {
    salaryBalance: parseFloat(salaryBalance.toFixed(2)),
    proportionalThirteenthSalary,
    proportionalVacation,
    priorNotice,
    fgtsFine,
    grossTotal,
    deductionsTotal,
    inss,
    inssPercent: parseFloat(inssPercent.toFixed(2)),
    ir,
    irPercent: parseFloat(irPercent.toFixed(2)),
    netTotal,
    vacationBonus,
    vacationVencida,
  } as RescisaoResult;
};
