import jsPDF from "jspdf";

function drawCard(pdf, imgData, x, y, w, h, rotate = false) {

    // borda
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);

    // linha pontilhada
    pdf.setLineDashPattern([2, 2], 0);
    pdf.rect(x, y, w, h);

    // reset linha
    pdf.setLineDashPattern([], 0);

    const qrSize = w * 0.55;

    const qrX = x + (w / 2) - (qrSize / 2);
    const qrY = y + 25;

    // titulo
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);

    if (!rotate) {
        pdf.text("FAÇA SEU PEDIDO", x + w / 2, y + 10, {
            align: "center"
        });

        pdf.text("DE ORAÇÃO", x + w / 2, y + 18, {
            align: "center"
        });
    }

    // QR
    pdf.addImage(
        imgData,
        "PNG",
        qrX,
        qrY,
        qrSize,
        qrSize
    );

    // texto inferior
    pdf.setFontSize(10);

    pdf.text(
        "Capelania",
        x + w / 2,
        y + h - 10,
        { align: "center" }
    );
}

export async function generateQrPDF(option) {

    const pdf = new jsPDF("p", "mm", "a4");

    const qrCanvas = document.querySelector("canvas");

    const imgData = qrCanvas.toDataURL("image/png");

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

    layouts[option].forEach((card) => {
        drawCard(
            pdf,
            imgData,
            card.x,
            card.y,
            card.w,
            card.h
        );
    });

    pdf.save("re-pray-qrcode.pdf");
}