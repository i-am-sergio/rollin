import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
const Courses = ({ courses }: any) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap justify-center mt-10">
      {courses.map((course: any) => (
        <div className="p-4 max-w-sm" key={course.code}>
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
            <div className="flex items-center mb-3">
              <div
                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <span>{course.semestre}</span>
              </div>
              <h2 className="text-white dark:text-white text-lg font-medium">{course.code}</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="leading-relaxed text-base text-white dark:text-gray-300">
                {course.name.substring(0, 10)}
              </p>

              <Link to={`/addlab/${course.code}`} className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center">
                {t("Courses.add")}
              </Link>
              
              <a href="/home" className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center">
                {t("Courses.download")}
              </a>
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}

export default Courses