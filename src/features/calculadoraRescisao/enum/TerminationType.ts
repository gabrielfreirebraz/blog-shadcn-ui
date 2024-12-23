
export enum TerminationType {
  COMMON_AGREEMENT = "common_agreement", // Demissão de comum acordo
  NO_JUST_CAUSE = "no_just_cause", // Dispensa sem justa causa
  WITH_JUST_CAUSE = "with_just_cause", // Dispensa com justa causa
  RESIGNATION = "resignation", // Pedido de demissão
  END_CONTRACT_ON_TIME = "end_contract_on_time", // Encerramento de contrato de experiência no prazo
  END_CONTRACT_BEFORE_TIME = "end_contract_before_time" // Encerramento de contrato de experiência antes do prazo
}

export enum NoticeType {
  WORKED = "worked",
  COMPENSATED_BY_EMPLOYER = "compensated_by_employer",
  NOT_FULFILLED_BY_EMPLOYEE = "not_fulfilled_by_employee",
  DISMISSED = "dismissed"
}
