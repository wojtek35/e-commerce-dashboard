import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "../context/sidebar-context";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard",
  description: "Product dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SidebarProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-x-auto">
              <Navbar />
              <main className="flex-1 bg-white rounded-lg shadow-lg m-4 lg:m-8 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
