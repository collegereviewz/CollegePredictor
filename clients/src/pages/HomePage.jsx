const HomePage = () => {
    const courses = [
      {
        name: "B. Tech.",
        exams: 40,
        image:
          "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "MBA",
        exams: 32,
        image:
          "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Medical",
        exams: 86,
        image:
          "https://images.pexels.com/photos/5726808/pexels-photo-5726808.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "M. Tech",
        exams: 32,
        image:
          "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Design",
        exams: 10,
        image:
          "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Law",
        exams: 29,
        image:
          "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Hospitality",
        exams: 8,
        image:
          "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ];
  
    return (
      <div className="min-h-screen bg-slate-100">
        {/* Top banner */}
        <header className="bg-gradient-to-r from-emerald-700 to-blue-700 text-white">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-semibold tracking-wide">
              College Predictor 2026
            </h1>
            <p className="mt-2 text-sm text-emerald-100">
              Predict colleges based on exams you have taken.
            </p>
          </div>
        </header>
  
        {/* Main content card */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 pb-12">
          <div className="rounded-xl bg-white shadow-md border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-12">
              {/* Left stepper */}
              <aside className="col-span-12 md:col-span-3 border-r border-slate-100 bg-slate-50">
                <div className="px-6 py-8">
                  <ol className="space-y-8">
                    <li className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                          1
                        </span>
                        <span className="h-10 w-px bg-blue-500 mt-1" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-slate-900">
                          Select a Course
                        </p>
                      </div>
                    </li>
  
                    <li className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-600">
                          2
                        </span>
                        <span className="h-10 w-px bg-slate-300 mt-1" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-medium text-slate-600">
                          Select Exam
                        </p>
                      </div>
                    </li>
  
                    <li className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-600">
                          3
                        </span>
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-medium text-slate-600">
                          Enter Score
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </aside>
  
              {/* Right content */}
              <section className="col-span-12 md:col-span-9">
                <div className="px-6 py-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">
                    Select a course
                  </h2>
  
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                      <button
                        key={course.name}
                        className="group text-left rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-500/70 transition overflow-hidden"
                      >
                        <div className="h-24 overflow-hidden bg-slate-200">
                          <img
                            src={course.image}
                            alt={course.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-sm font-semibold text-slate-900">
                            {course.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {course.exams} Exams
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default HomePage;
  