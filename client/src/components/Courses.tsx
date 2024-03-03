import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Courses = ({ courses }: any) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap justify-center mt-10">
      {courses.map((course: any) => (
        <div className="p-4 max-w-sm" key={course.code}>
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-lime-500 text-white flex-shrink-0">
                <span>{course.semestre}</span>
              </div>
              <h2 className="text-white dark:text-white text-lg font-medium">
                {course.code}
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="max-w-1 min-h-32 text-white dark:text-gray-300">
                {course.name}
              </p>

              <Link
                to={`/addlab/${course.code}/${course.name}/${course.startime}`}
                className="mt-3 text-black border-2 border-transparent bg-lime-400 rounded-md hover:text-lime-300 inline-flex hover:bg-transparent hover:border-lime-400 text-center duration-300 ease-in-out hover:translate-y-1"
              >
                {t("Courses.add")}
              </Link>

              <a
                href="/home"
                className="mt-3 text-black dark:text-white hover:text-lime-400 duration-300 inline-flex items-center underline"
              >
                {t("Courses.download")}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
