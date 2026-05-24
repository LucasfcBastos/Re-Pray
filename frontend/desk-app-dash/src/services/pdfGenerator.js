// ===== IMPORTAÇÃO =====

// ===== Importação Padrão
import jsPDF from "jspdf";

// ===== FUNÇÕES =====

// ===== Função de Desenho
function drawCard(pdf, imgData, x, y, w, h, rotate) {

    // ===== Borda
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);

    // ===== Linha Pontilhada
    pdf.setLineDashPattern([2, 2], 0);
    pdf.rect(x, y, w, h);
    pdf.setLineDashPattern([], 0);

    // ===== Variaveis de Titulo
    const textSize = h * 0.10;
    const titleX = x + (w / 2);
    const titleYA = y + textSize + (h * 0.10);
    const titleYB = y + textSize + (h * 0.15);

    // ===== Variaveis de QR Code
    const qrSize = w * 0.60;
    const qrX = x + (w / 2) - (qrSize / 2);
    const qrY = y + (h / 2) - (qrSize / 2);

    // ===== Variaveis de Texto
    const labelX = x + (w / 2);
    const labelY = (y + h) - ( textSize + (h * 0.10));

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(textSize);

    // ===== Validação de Rotação
    if (rotate === true) {

        // ===== Criação do Titulo
        pdf.text("FAÇA SEU PEDIDO", titleX, titleYA, {
            align: "center"
        });
        pdf.text("DE ORAÇÃO", titleX, titleYB, {
            align: "center"
        });

    }

    // ===== Criação do QR code
    pdf.addImage( imgData, "PNG", qrX, qrY, qrSize, qrSize );

    // ===== Validação de Rotação
    if (rotate === true) {

        // ===== Criação do Texto
        pdf.text( "Capelania", labelX, labelY, {
            align: "center"
        });

    }

}

// ===== Função de Geração
export async function generateQrPDF(option) {

    // ===== Inicializando o PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const qrCanvas = document.querySelector("canvas");
    const imgData = qrCanvas.toDataURL("image/png");

    // ===== Mapa de Layouts
    const layouts = {
        1: [
            { x: 0, y: 0, w: 210, h: 297 }
        ],
        2: [
            { x: 0, y: 0, w: 210, h: 148.5 },
            { x: 0, y: 148.5, w: 210, h: 148.5 }
        ],
        4: [
            { x: 0, y: 0, w: 105, h: 148.5 },
            { x: 105, y: 0, w: 105, h: 148.5 },
            { x: 0, y: 148.5, w: 105, h: 148.5 },
            { x: 105, y: 148.5, w: 105, h: 148.5 }
        ],
        8: [
            { x: 0, y: 0, w: 105, h: 74.25 },
            { x: 105, y: 0, w: 105, h: 74.25 },
            { x: 0, y: 74.25, w: 105, h: 74.25 },
            { x: 105, y: 74.25, w: 105, h: 74.25 },
            { x: 0, y: 148.5, w: 105, h: 74.25 },
            { x: 105, y: 148.5, w: 105, h: 74.25 },
            { x: 0, y: 222.75, w: 105, h: 74.25 },
            { x: 105, y: 222.75, w: 105, h: 74.25 }
        ]
    };

    // ===== O Loop para Desenhar
    layouts[option].forEach((card) => {
        if (option === 2 || option === 8) {
            drawCard( pdf, imgData, card.x, card.y, card.w, card.h, false );
        } else {
            drawCard( pdf, imgData, card.x, card.y, card.w, card.h, true );
        }
    });

    // ===== Salvando o Arquivo
    pdf.save("re-pray-qrcode.pdf");
}