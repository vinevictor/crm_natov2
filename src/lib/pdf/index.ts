import { PDFDocument, rgb } from "pdf-lib";

export async function createForm() {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([550, 750]);

  const form = pdfDoc.getForm();
  const protocolo = 20241007120958;
  const DateAtual = new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  const DataConstrutora = {
    nome: "AR Interface certificador",
    telefone: "(16) 33252-4134",
    email: "atendimento@arinterfacecertificador.com.br",
    site: "https://arinterfacecertificador.com.br",
    cnpj: "14.000.930/0001-50",
    end: "R. Américo Brasiliense, 284 - 3° Andar Sala 32 - Centro, Ribeirão Preto - SP, 14015-050"
  };
  const DataArInterface = {
    nome: "AR Interface certificador",
    telefone: "(16) 33252-4134",
    email: "atendimento@arinterfacecertificador.com.br",
    site: "https://arinterfacecertificador.com.br",
    cnpj: "14.000.930/0001-50",
    end: "R. Américo Brasiliense, 284 - 3° Andar Sala 32 - Centro, Ribeirão Preto - SP, 14015-050"
  };

  const Produto = "BirdI500";

  const DescricaoTxt =
    'certificados emitidos pelo "AR Interface certificador" no período de 01/01/2022 a 31/12/2022, com o valor total de R$ 0,00 cada certificado, com validade de 1 ano.';

  const QTD = 5000;

  function quebrarStringPorEspacos(
    string: string | any[],
    limiteEspacos: number
  ) {
    let resultado = "";
    let espacosContador = 0;

    for (let i = 0; i < string.length; i++) {
      resultado += string[i];

      if (string[i] === " ") {
        espacosContador++;
      }

      if (espacosContador === limiteEspacos) {
        resultado += "\n"; // Adiciona uma quebra de linha após 7 espaços
        espacosContador = 0;
      }
    }

    return resultado;
  }

  page.drawText("AR Interface certificador", { x: 50, y: 700, size: 10 });

  page.drawText(`Relatorio de Emissão #${protocolo}`, {
    x: 50,
    y: 675,
    size: 15
  });

  page.drawText(`Data: ${DateAtual}`, { x: 50, y: 665, size: 11 });

  page.drawLine({
    start: { x: 50, y: 650 },
    end: { x: 500, y: 650 },
    thickness: 0.5
  });

  page.drawText(
    `${DataArInterface.nome}\n` +
      `${DataArInterface.telefone}\n` +
      `${DataArInterface.email}\n` +
      `${DataArInterface.site}\n` +
      `${DataArInterface.cnpj}\n` +
      `${DataArInterface.end.split(",").join("\n")}`,
    { x: 50, y: 625, size: 7, lineHeight: 9, opacity: 0.75 }
  );

  page.drawText(
    `${DataConstrutora.nome}\n` +
      `${DataConstrutora.telefone}\n` +
      `${DataConstrutora.email}\n` +
      `${DataConstrutora.site}\n` +
      `${DataConstrutora.cnpj}\n` +
      `${DataConstrutora.end.split(",").join("\n")}`,
    { x: 350, y: 625, size: 7, lineHeight: 9, opacity: 0.75 }
  );

  page.drawLine({
    start: { x: 50, y: 540 },
    end: { x: 500, y: 540 },
    thickness: 0.5
  });

  page.drawText(`Produto`, { x: 55, y: 510, size: 12 });
  page.drawRectangle({
    x: 50,
    y: 508,
    width: 100,
    height: 12,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5
  });

  page.drawText(`Descrição`, { x: 160, y: 510, size: 12 });
  page.drawRectangle({
    x: 150,
    y: 508,
    width: 270,
    height: 12,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5
  });

  page.drawText(`Qtd`, { x: 430, y: 510, size: 12 });
  page.drawRectangle({
    x: 420,
    y: 508,
    width: 50,
    height: 12,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5
  });

  // body table
  page.drawText(`${Produto}`, { x: 55, y: 495, size: 9, opacity: 0.75 });
  page.drawRectangle({
    x: 50,
    y: 358,
    width: 100,
    height: 150,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5
  });

  page.drawText(`${quebrarStringPorEspacos(DescricaoTxt, 7)}`, {
    x: 160,
    y: 495,
    size: 9,
    opacity: 0.75,
    lineHeight: 11
  });
  page.drawRectangle({
    x: 150,
    y: 358,
    width: 270,
    height: 150,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5
  });

  page.drawText(`${QTD}`, { x: 428, y: 495, size: 9, opacity: 0.75 });
  page.drawRectangle({
    x: 420,
    y: 358,
    width: 50,
    height: 150,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5
  });

  page.drawText(`Valor total`, { x: 365, y: 300, size: 9, opacity: 0.75 });
  page.drawText(`${QTD}`, { x: 430, y: 300, size: 9, opacity: 0.75 });


  // Salva o documento como bytes
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}