import { useState } from "react";

const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const HomePage = () => {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GEN");
  const [domicile, setDomicile] = useState("");

  const courses = [
    {
      name: "B. Tech.",
      examsCount: 3,
      image:
        "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "btech",
    },
    {
      name: "MBA",
      examsCount: 4,
      image:
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "mba",
    },
    {
      name: "Medical",
      examsCount: 2,
      image:
        "https://images.pexels.com/photos/5726808/pexels-photo-5726808.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "medical",
    },
    {
      name: "M. Tech",
      examsCount: 2,
      image:
        "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "mtech",
    },
    {
      name: "Design",
      examsCount: 3,
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "design",
    },
    {
      name: "Law",
      examsCount: 3,
      image:
        "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "law",
    },
    {
      name: "Hospitality",
      examsCount: 2,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      key: "hospitality",
    },
  ];

  const examsByCourse = {
    btech: [
      { name: "JEE Main", code: "JEE_MAIN", description: "National-level engineering entrance (NTA)" },
      { name: "JEE Advanced", code: "JEE_ADV", description: "Entrance for IITs (via JEE Main shortlist)" },
      { name: "WBJEE / State CET", code: "STATE_ENGG", description: "Example state-level engineering entrance" },
    ],
    mba: [
      { name: "CAT", code: "CAT", description: "Common Admission Test for IIMs and top B-schools" },
      { name: "XAT", code: "XAT", description: "Xavier Aptitude Test for XLRI and others" },
      { name: "MAT", code: "MAT", description: "Management Aptitude Test accepted by many institutes" },
      { name: "CMAT", code: "CMAT", description: "Common Management Admission Test (AICTE)" },
    ],
    medical: [
      { name: "NEET UG", code: "NEET_UG", description: "Single national exam for MBBS/BDS and more" },
      { name: "INI CET (PG)", code: "INI_CET", description: "Entrance for AIIMS and central institutes (PG)" },
    ],
    mtech: [
      { name: "GATE", code: "GATE", description: "Graduate Aptitude Test in Engineering" },
      { name: "Institute / State PG CET", code: "PG_CET", description: "Example PG engineering entrance" },
    ],
    design: [
      { name: "NID DAT", code: "NID_DAT", description: "National Institute of Design entrance" },
      { name: "UCEED / CEED", code: "CEED", description: "IIT design entrance exams" },
      { name: "NIFT Entrance", code: "NIFT", description: "Fashion & design entrance exam" },
    ],
    law: [
      { name: "CLAT", code: "CLAT", description: "Common Law Admission Test for NLUs" },
      { name: "AILET", code: "AILET", description: "All India Law Entrance Test (NLU Delhi)" },
      { name: "SLAT / SET (Law)", code: "SLAT", description: "Symbiosis Law Aptitude Test" },
    ],
    hospitality: [
      { name: "NCHMCT JEE", code: "NCHM_JEE", description: "National Council for Hotel Management JEE" },
      { name: "IIHM eCHAT", code: "ECHAT", description: "IIHM electronic common hospitality aptitude test" },
    ],
  };

  const currentCourse = courses.find((c) => c.key === selectedCourse);
  const currentExams = selectedCourse ? examsByCourse[selectedCourse] || [] : [];

  const handleCourseClick = (course) => {
    setSelectedCourse(course.key);
    setSelectedExam(null);
    setStep(2);
  };

  const handleExamClick = (exam) => {
    setSelectedExam(exam.code);
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Submitted:\nCourse: ${selectedCourse}\nExam: ${selectedExam}\nRank: ${rank}\nCategory: ${category}\nDomicile: ${domicile}`
    );
  };

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
                <ol className="space-y-8 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                          step === 1
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-700 border border-slate-300"
                        }`}
                      >
                        1
                      </span>
                      <span className="h-10 w-px bg-slate-300 mt-1" />
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-slate-900">
                        Select a Course
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                          step === 2 || step === 3
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-700 border border-slate-300"
                        }`}
                      >
                        2
                      </span>
                      <span className="h-10 w-px bg-slate-300 mt-1" />
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-slate-900">Select Exam</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                          step === 3
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-700 border border-slate-300"
                        }`}
                      >
                        3
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-slate-900">Enter Score</p>
                    </div>
                  </li>
                </ol>
              </div>
            </aside>

            {/* Right content */}
            <section className="col-span-12 md:col-span-9">
              <div className="px-6 py-8">
                {step === 1 && (
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">
                    Select a course
                  </h2>
                )}
                {step === 2 && (
                  <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    Select entrance exam
                  </h2>
                )}
                {step === 3 && (
                  <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    Enter your details
                  </h2>
                )}

                {/* STEP 1: Courses */}
                {step === 1 && (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                      <button
                        key={course.key}
                        type="button"
                        onClick={() => handleCourseClick(course)}
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
                            {course.examsCount} Exams
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* STEP 2: Exams for selected course */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 mb-2">
                      Course selected:{" "}
                      <span className="font-semibold text-slate-900">
                        {currentCourse?.name || "—"}
                      </span>
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {currentExams.map((exam) => (
                        <button
                          key={exam.code}
                          type="button"
                          onClick={() => handleExamClick(exam)}
                          className="text-left rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-500/70 transition px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-slate-900">
                            {exam.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {exam.description}
                          </p>
                        </button>
                      ))}
                      {currentExams.length === 0 && (
                        <p className="text-xs text-slate-500">
                          Exam data for this course is coming soon.
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mt-4 text-xs text-blue-600 hover:underline"
                    >
                      ← Back to courses
                    </button>
                  </div>
                )}

                {/* STEP 3: Form */}
                {step === 3 && (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-2 max-w-md space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Course
                        </label>
                        <div className="text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
                          {currentCourse?.name || "—"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Exam
                        </label>
                        <div className="text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
                          {currentExams.find((e) => e.code === selectedExam)
                            ?.name || "—"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        All India Rank
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        placeholder="Enter your rank in this exam"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="GEN">General (GEN)</option>
                        <option value="GEN-EWS">General – EWS</option>
                        <option value="OBC-NCL">OBC – NCL</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="PWD">PwD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Domicile state
                      </label>
                      <select
                        value={domicile}
                        onChange={(e) => setDomicile(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select your state</option>
                        {INDIA_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 transition"
                      >
                        Predict colleges
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-slate-500 hover:text-slate-700"
                      >
                        ← Back to exams
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
