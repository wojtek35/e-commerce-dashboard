import ProductTable from "@/components/product-table";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <ProductTable />
    </main>
  );
}
