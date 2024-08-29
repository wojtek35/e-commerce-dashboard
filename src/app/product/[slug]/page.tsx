"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
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
import PDFDownloadButton from "@/components/pdf-download-button";
import Comments from "@/components/comments";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function imation a query that we would use to get product by slug
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

      <Comments comments={product.comments}/>

      <PDFDownloadButton product={product}/>

      <ScrollToTopButton scrollRef={containerRef} />
    </div>
  );
}



