import { useEffect } from "react";
import { getLabsByCourse } from "../actions/MatriculateActions";
import { useDispatch, useSelector } from "react-redux";

const Enroll = ({ code }: { code: any }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (code) {
      dispatch<any>(getLabsByCourse(code));
    }
  }, []);

  const labs = useSelector((state: any) => state.matriculateReducer.labData)

  const handleClick = (groupValue: string) => {
   console.log("Selected group:", groupValue);
  }

  return (
    <div className="">
        <h2 className="text-xl font-bold text-center py-4">Enrolls Ready for (course)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:gap-8 p-4 md:p-10 mt-2">
          {
            labs.map((lab: any) => (
              <button key={lab._id} onClick={() => handleClick(lab.group)}
              className="flex flex-col p-6 space-y-6 transition-all duration-500 bg-lime-300 border border-indigo-100 rounded-lg shadow hover:shadow-2xl hover:bg-slate-100 hover:cursor-pointer lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6">
                <div
                  className="flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner lg:h-20 lg:w-20">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                            </path>
                          </svg>
                </div>
                <div className="flex-1">
                  <h5 className="mb-2 text-xl font-bold lg:text-2xl">Grupo {lab.group}</h5>
                  <p className="mb-2 text-gray-600">Teacher: {lab.teacher}</p>
                  <p className="mb-2 text-gray-600">Schedule: {lab.schedule}</p>
                  <p className="mb-2 text-gray-600">Schedule: {lab.quantity}</p>
                </div>
              </button>
            ))
          }
        </div>
      </div>
  )
}

export default Enroll