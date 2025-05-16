import { ExercisesLinks } from "app/lib/constants";
import { ChevronRight, Code } from "lucide-react";
import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-8 py-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">
          Liste des exercices
        </h3>
      </div>

      <div className="flex flex-col space-y-2">
        {ExercisesLinks.map((exercise) => (
          <Link
            to={`/exercice/${exercise.id}`}
            key={exercise.id}
            className="border-b md:last:border-b-0 md:even:border-l border-gray-100 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <div className={`p-5 flex items-center`}>
              <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-4 flex-shrink-0">
                <Code size={20} />
              </div>

              <h4 className="text-gray-800 flex-grow font-medium">
                Exercice {exercise.id} : {exercise.label}
              </h4>

              <ChevronRight
                size={20}
                className="text-gray-400 flex-shrink-0 mt-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
