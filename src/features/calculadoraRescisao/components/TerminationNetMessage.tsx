import { formatToBRL } from "@/utils/formatToBRL";
import { NoticeType, TerminationType } from "../enum/TerminationType";

interface TerminationMessageProps {
  terminationType: TerminationType;
  noticeType?: NoticeType;
  netTotal?: number;
}

export const TerminationNetMessage: React.FC<TerminationMessageProps> = ({ terminationType, netTotal = 0, noticeType }) => {

  return <>
    <p className="text-lg text-gray-600 px-8">
      <InitialMessage
        terminationType={terminationType}
        noticeType={noticeType} />
      <strong className="text-4xl leading-relaxed">{formatToBRL(netTotal)}</strong>.
    </p>
  </>
};

const InitialMessage: React.FC<TerminationMessageProps> = ({ terminationType, noticeType }) => {
  // Validação para combinações inválidas
  if (
    // Contrato por prazo determinado não aceita NoticeType
    (terminationType === TerminationType.END_CONTRACT_ON_TIME && noticeType !== undefined) ||
    (terminationType === TerminationType.END_CONTRACT_BEFORE_TIME && noticeType !== undefined) ||
    // Aviso prévio "não cumprido pelo empregado" em cenários inválidos
    (terminationType === TerminationType.COMMON_AGREEMENT && noticeType === NoticeType.NOT_FULFILLED_BY_EMPLOYEE) ||
    (terminationType === TerminationType.NO_JUST_CAUSE && noticeType === NoticeType.NOT_FULFILLED_BY_EMPLOYEE) ||
    // "Justa Causa" não deve ter aviso prévio
    (terminationType === TerminationType.WITH_JUST_CAUSE && noticeType !== undefined)
  ) {
    return <div>Combinação inválida de motivo e aviso prévio.</div>;
  }

  // Casos válidos para "Demissão em comum acordo" e "Sem justa causa"
  if (terminationType === TerminationType.COMMON_AGREEMENT || terminationType === TerminationType.NO_JUST_CAUSE) {
    if (noticeType === NoticeType.WORKED) {
      return <div>Valor líquido a receber até o <b>1º dia útil</b> após <b>término do contrato</b>: </div>;
    } else if (noticeType === NoticeType.COMPENSATED_BY_EMPLOYER || noticeType === NoticeType.DISMISSED) {
      return <div>Valor líquido a receber até <b>10 dias corridos</b>: </div>;
    }
  }

  // Casos válidos para "Pedido de demissão"
  else if (terminationType === TerminationType.RESIGNATION) {
    if (noticeType === NoticeType.WORKED) {
      return <div>Valor líquido a receber até o <b>1º dia útil</b> após <b>término do contrato</b>: </div>;
    } else if (
      noticeType === NoticeType.NOT_FULFILLED_BY_EMPLOYEE ||
      noticeType === NoticeType.COMPENSATED_BY_EMPLOYER ||
      noticeType === NoticeType.DISMISSED
    ) {
      return <div>Valor líquido a receber até <b>10 dias corridos</b>: </div>;
    }
  }

  // Casos válidos para "Encerramento de contrato por prazo determinado"
  else if (
    terminationType === TerminationType.END_CONTRACT_ON_TIME ||
    terminationType === TerminationType.END_CONTRACT_BEFORE_TIME
  ) {
    return <div>Valor líquido a receber até o <b>1º dia útil</b> após <b>término do contrato</b>: </div>;
  }

  // Casos válidos para "Demissão por justa causa"
  else if (terminationType === TerminationType.WITH_JUST_CAUSE) {
    return <div>Valor líquido a receber até o 1º dia útil após desligamento: </div>;
  }

  // Fallback para casos não identificados
  return <div>Tipo de rescisão ou aviso prévio não identificado.</div>;
};
