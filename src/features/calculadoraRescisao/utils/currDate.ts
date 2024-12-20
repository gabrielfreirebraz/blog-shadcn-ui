export const showCurrentDate = (): string => {
  const dataAtual = new Date();

  // Formatando a data
  const dia = dataAtual.getDate().toString().padStart(2, '0'); // Dia com 2 dígitos
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Mês com 2 dígitos (0-indexado, por isso +1)
  const ano = dataAtual.getFullYear(); // Ano completo

  // Retornando a data no formato "DD/MM/YYYY"
  return `${ano}-${mes}-${dia}`;
};