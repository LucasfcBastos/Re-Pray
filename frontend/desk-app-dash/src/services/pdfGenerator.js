import jsPDF from "jspdf";

function drawCard(pdf, imgData, x, y, w, h, rotate) {

    // borda
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);

    // linha pontilhada
    pdf.setLineDashPattern([2, 2], 0);
    pdf.rect(x, y, w, h);

    // reset linha
    pdf.setLineDashPattern([], 0);

    const textSize = h * 0.10;

    const titleX = x + (w / 2);
    const titleYA = y + textSize + (h * 0.10);
    const titleYB = y + textSize + (h * 0.15);

    const qrSize = w * 0.60;

    const qrX = x + (w / 2) - (qrSize / 2);
    const qrY = y + (h / 2) - (qrSize / 2);

    const labelX = x + (w / 2);
    const labelY = (y + h) - ( textSize + (h * 0.10));

    // titulo
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(textSize);

    if (rotate === true) {
        pdf.text("FAÇA SEU PEDIDO", titleX, titleYA, {
            align: "center"
        });

        pdf.text("DE ORAÇÃO", titleX, titleYB, {
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

    if (rotate === true) {
        pdf.text(
            "Capelania",
            labelX,
            labelY,
            { align: "center" }
        );
    }

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
        if (option === 2 && option === 8) {
            drawCard(
                pdf,
                imgData,
                card.x,
                card.y,
                card.w,
                card.h,
                false
            );
        } else {
            drawCard(
                pdf,
                imgData,
                card.x,
                card.y,
                card.w,
                card.h,
                true
            );
        }
    });

    pdf.save("re-pray-qrcode.pdf");
}