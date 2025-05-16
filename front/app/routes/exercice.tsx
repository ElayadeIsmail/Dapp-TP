import { ExercisesLinks } from "app/lib/constants";
import {
  Ex1,
  Ex2,
  Ex3,
  Ex4,
  Ex5,
  Ex6,
  Ex7,
  Ex8,
} from "../components/exercices";
import type { Route } from "./+types/exercice";
import { useMemo } from "react";
import { Link } from "react-router";
import { Home } from "lucide-react";

export async function loader({ params }: Route.LoaderArgs) {
  const text =
    ExercisesLinks.find((ex) => ex.id.toString() === params.id)?.label || "";
  return { title: `Exercice ${params.id}: ${text}` };
}

const ExercicePage = ({
  params,
  loaderData: { title },
}: Route.ComponentProps) => {
  const renderedExercice = useMemo(() => {
    switch (params.id) {
      case "1":
        return <Ex1 />;
      case "2":
        return <Ex2 />;
      case "3":
        return <Ex3 />;
      case "4":
        return <Ex4 />;
      case "5":
        return <Ex5 />;
      case "6":
        return <Ex6 />;
      case "7":
        return <Ex7 />;
      case "8":
        return <Ex8 />;
      default:
        return <h1>Exercie {params.id} Not Found</h1>;
    }
  }, []);

  return (
    <>
      <Link
        to="/"
        className="flex text-indigo-800 w-fit font-bold mb-4 underline items-center py-3 -mt-8 "
      >
        <Home size={18} className="mr-2" strokeWidth={2} />
        <span>Sommaire</span>
      </Link>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="flex flex-col space-y-2 px-5 py-2">
          {renderedExercice}
        </div>
      </div>
    </>
  );
};

export default ExercicePage;
