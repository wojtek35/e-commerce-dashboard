"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { products } from "@/shared/mock/products";
import { MONTHS } from "@/shared/constants/months";
import Chart from "@/components/chart";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  calculateAverageConversionRate,
  calculateAverageRating,
  calculateTotalSales,
} from "@/shared/functions/calculate";
import ScrollToTopButton from "@/components/scroll-to-top-button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function useGetProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) || null;
}

const colors = {
  sales: "rgb(75, 192, 192)",
  conversionRate: "rgb(255, 99, 132)",
  reviewTrends: "rgb(54, 162, 235)",
};

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const product = useGetProductBySlug(slug);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!product) {
    return (
      <main className="flex h-full flex-col items-center justify-center p-24">
        <p>Product not found</p>
      </main>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Product Report: ${product.name}`, 20, 10);

    autoTable(doc, {
      startY: 20,
      head: [["Month", "Sales", "Conversion Rate", "Average Rating"]],
      body: product.reviewTrends
        .slice(0, 12)
        .map((_, index) => [
          MONTHS[index],
          product.sales[index] || 0,
          product.conversionRate[index] || 0,
          (
            product.reviewTrends.reduce((a, b) => a + b, 0) /
            product.reviewTrends.length
          ).toFixed(1),
        ]),
    });

    doc.save(`product_report_${product.name}.pdf`);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Product Performance Data",
      },
    },
  };

  const getChartData = (data: number[], label: string, color: string) => ({
    labels: MONTHS,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: `${color}33`,
      },
    ],
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-between p-4 lg:p-8 xl:p-24 relative overflow-auto max-h-full"
    >
      <div className="w-full flex items-center mb-4 space-x-6">
        <button
          onClick={() => router.back()}
          className="p-2 bg-primary-800 text-white rounded-full hover:bg-primary-700 transition"
        >
          <AiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </div>

      <div className="w-full bg-white p-6 rounded shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg">
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="font-semibold">Price:</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="font-semibold">Inventory:</p>
            <p>{product.inventory}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="font-semibold">Total Sales:</p>
            <p>${calculateTotalSales(product.sales).toFixed(2)}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="font-semibold">Average Conversion Rate:</p>
            <p>
              {calculateAverageConversionRate(product.conversionRate).toFixed(
                1
              )}
              %
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="font-semibold">Average Rating:</p>
            <p>{calculateAverageRating(product.reviewTrends).toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 grid gap-4 grid-cols-1 2xl:grid-cols-2">
        <Chart
          title="Sales Over Time"
          data={getChartData(product.sales, "Sales", colors.sales)}
          options={chartOptions}
        />

        <Chart
          title="Conversion Rate Over Time"
          data={getChartData(
            product.conversionRate,
            "Conversion Rate (%)",
            colors.conversionRate
          )}
          options={chartOptions}
        />

        <Chart
          title="Customer Reviews Trend"
          data={getChartData(
            product.reviewTrends,
            "Average Rating",
            colors.reviewTrends
          )}
          options={chartOptions}
        />
      </div>

      <div className="w-full mt-6 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Latest Comments</h2>
        <ul className="space-y-4">
          {product.comments.slice(0, 5).map((comment, index) => (
            <li key={index} className="border-b pb-4">
              <p className="font-semibold text-lg">{comment.username}</p>
              <p className="text-gray-700">{comment.commentText}</p>
              <p className="text-sm text-gray-500 mt-1">{comment.datePosted}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex my-6">
        <button
          onClick={generatePDF}
          className="p-2 bg-primary-500 text-white rounded"
        >
          Download PDF
        </button>
      </div>

      <ScrollToTopButton scrollRef={containerRef} />
    </div>
  );
}
