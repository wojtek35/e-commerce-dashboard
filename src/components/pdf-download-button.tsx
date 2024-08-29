"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { MONTHS } from "@/shared/constants/months";
import { FC } from "react";

interface IPDFDownloadButtonProps {
  product: {
    name: string;
    reviewTrends: number[];
    sales: number[];
    conversionRate: number[];
  };
}

/**
 * PDFDownloadButton Component
 *
 * Renders a button that generates and downloads a PDF report of the product data when clicked.
 *
 * @param {object} product - The product object containing data used to generate the PDF report.
 */
const PDFDownloadButton: FC<IPDFDownloadButtonProps> = ({ product }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Product Report: ${product.name}`, 20, 10);

    autoTable(doc, {
      startY: 20,
      head: [["Month", "Sales", "Conversion Rate", "Rating"]],
      body: product.reviewTrends
        .slice(0, 12)
        .map((_, index) => [
          MONTHS[index],
          product.sales[index] || 0,
          product.conversionRate[index] || 0,
          product.reviewTrends[index] || 0,
        ]),
    });

    doc.save(`product_report_${product.name}.pdf`);
  };

  return (
    <div className="flex my-6">
      <button
        onClick={generatePDF}
        className="p-2 bg-primary-500 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default PDFDownloadButton;
