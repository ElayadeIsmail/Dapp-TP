import type { Route } from "./+types/home";
import { Home } from "../components/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index() {
  return <Home />;
}
