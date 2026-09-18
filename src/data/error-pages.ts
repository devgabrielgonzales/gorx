export const ERROR_CODES = [404, 500, 503] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

type ErrorCopy = {
  eyebrow: string;
  title: string;
  description: string;
  hint: string;
  home: string;
  retry?: string;
};

export const ERROR_PAGES: Record<ErrorCode, ErrorCopy> = {
  404: {
    eyebrow: "Rota inexistente",
    title: "Página não encontrada",
    description:
      "Esse endereço não existe por aqui. Volta ao início e segue de lá.",
    hint: "ERR / 404 / NOT FOUND",
    home: "Voltar ao início",
  },
  500: {
    eyebrow: "Falha interna",
    title: "Algo quebrou no servidor",
    description:
      "Erro inesperado. Tenta de novo — se persistir, volta daqui a pouco.",
    hint: "ERR / 500 / SERVER",
    home: "Voltar ao início",
    retry: "Tentar novamente",
  },
  503: {
    eyebrow: "Fora do ar",
    title: "Serviço indisponível",
    description: "Manutenção ou sobrecarga. O site volta em instantes.",
    hint: "ERR / 503 / UNAVAILABLE",
    home: "Voltar ao início",
    retry: "Tentar novamente",
  },
};
