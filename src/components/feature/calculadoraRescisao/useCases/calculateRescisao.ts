import { RescisaoInputs, RescisaoResult } from "../types";

export const calculateRescisao = ({
  salaryGross,
  startDate,
  endDate,
  reasonType,
  noticeType,
  dependentsNumber = 0,
}: RescisaoInputs): RescisaoResult => {


  console.log(salaryGross,
    startDate,
    endDate,
    reasonType,
    noticeType,
    dependentsNumber)

  return {
    salaryBalance: 0,
    proportionalThirteenthSalary: 0,
    proportionalVacation: 0,
    priorNotice: 0,
    fgtsFine: 0,
    grossTotal: 0,
    deductionsTotal: 0,
    inss: 0,
    inssPercent: 0,
    ir: 0,
    irPercent: 0,
    netTotal: 0
  } as RescisaoResult;
};
