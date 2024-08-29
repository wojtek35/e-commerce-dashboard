"use client";

import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/shared/mock/products";
import { debounce } from "lodash"; // Make sure to install lodash for debounce
import {
  calculateAverageConversionRate,
  calculateAverageRating,
  calculateTotalSales,
} from "@/shared/functions/calculate";

const ProductTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const router = useRouter();

  /*
   Normally we would have much more data and most likely call an API 
   when we search, so it is always better to debounce the filering to avoid many api calls
  */
  const debouncedSearch = debounce(
    (value: string) => setDebouncedSearchTerm(value),
    300,
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const handleRowClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <div className="bg-gray-50 flex flex-col w-full h-full p-6">
      <input
        type="text"
        placeholder="Search products..."
        className="mb-6 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearch}
      />

      {filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center w-full min-h-[200px] bg-white border border-gray-200 rounded-lg shadow-md">
          <p className="text-gray-700 text-lg font-semibold">
            No products found
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md ">
            <thead>
              <tr className="bg-primary-800 border-b border-gray-300 text-white">
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Avg Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Avg Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(product.slug)}
                >
                  <td className="px-6 py-4 border-b">{product.id}</td>
                  <td className="px-6 py-4 border-b font-semibold">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border-b">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-b">{product.inventory}</td>
                  <td className="px-6 py-4 border-b">
                    {calculateAverageRating(product.reviewTrends).toFixed(1)}
                  </td>
                  <td className="px-6 py-4 border-b">
                    ${calculateTotalSales(product.sales).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {calculateAverageConversionRate(
                      product.conversionRate,
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
