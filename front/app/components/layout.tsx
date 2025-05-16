import Header from "./header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
