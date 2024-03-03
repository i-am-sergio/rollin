function Labs({ user }: { user: any }) {
  
  const { courses } = user;

  return (
    <div className="grid gap-8 md:grid-cols-3 lg:gap-12 p-4 md:p-10 mt-2">
      
      { user.role === "user" &&
        courses.map((course : any) => (
          <a key={course} href="/home"
          className="flex flex-col p-6 space-y-6 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6">
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
              <h5 className="mb-3 text-xl font-bold lg:text-2xl">{course}</h5>
              {/* <p className="mb-6 text-lg text-gray-600">Find out what plan is right for you</p> */}
              <span className="flex items-baseline text-lg font-bold text-blue-900">
                Matriculate
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </div>
          </a>
        ))
      }

    </div>
  )
}

export default Labs
