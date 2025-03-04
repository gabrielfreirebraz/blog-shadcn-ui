import { TerminationType } from "@/features/calculadoraRescisao/enum/TerminationType";

export interface RescisaoInputs {
  salaryGross: number; // Salário bruto do funcionário
  startDate: string; //
  endDate: string; //
  dependentsNumber: number; // Número de dependentes
  reasonType?: TerminationType; // Motivo da dispensa
  noticeType?: string; // Tipo de dispensa
}

export interface RescisaoResult {
  salaryBalance: number; // Saldo de Salário
  proportionalThirteenthSalary: number; // 13º Salário Proporcional
  proportionalVacation: number; // Férias Proporcionais + 1/3
  priorNotice: number; // Aviso Prévio
  fgtsFine: number; // Multa de 40% FGTS
  grossTotal: number; // Total Bruto
  deductionsTotal: number; // Descontos
  inss: number;
  inssPercent: number;
  ir: number;
  irPercent: number;
  netTotal: number; // Total Líquido
  inssReferencePercent?: number; // Percentual da última faixa aplicada do INSS (opcional)
  irReferencePercent?: number; // Percentual da última faixa aplicada do IRRF (opcional)
  fgtsAvailableForWithdrawal: boolean; 
  fgtsBalance: number; 
  ir13: number;
  ir13Percent: number;
  inss13Percent: number;
  deductionsTotal13: number;
};