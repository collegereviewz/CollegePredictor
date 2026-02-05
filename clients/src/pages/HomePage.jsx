import { useState } from "react";
import { predictColleges } from "../api/predict";

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
  const [counselling, setCounselling] = useState("JOSAA");


  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GEN");
  const [domicile, setDomicile] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // 🔹 FILTER STATES
  const [filterChance, setFilterChance] = useState(["Safe", "Moderate"]);
  const [filterQuota, setFilterQuota] = useState(["AI", "HS"]);
  const [filterBranch, setFilterBranch] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [showResults, setShowResults] = useState(false);



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

  // 🔹 Extract city/location from institute name
  const extractLocation = (institute = "") => {
    const parts = institute.split(",");
    return parts.length > 1 ? parts[parts.length - 1].trim() : institute.trim();
  };


  const handleCourseClick = (course) => {
    setSelectedCourse(course.key);
    setSelectedExam(null);
    setStep(2);
  };

  const handleExamClick = (exam) => {
    setSelectedExam(exam.code);
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        rank: Number(rank),
        exam: selectedExam,
        category:
          category === "GEN"
            ? "OPEN"
            : category === "GEN-EWS"
              ? "EWS"
              : category,
        gender: "Gender-Neutral", // you can extend later
        domicile,
        counselling: "JOSAA", // later toggle CSAB
        rounds: counselling === "CSAB" ? [1, 2, 3] : [1, 2, 3, 4, 5, 6],
      };
      console.log(payload);

      const data = await predictColleges(payload);
      setResults(data);
      setShowResults(true);   // 👈 THIS HIDES THE FORM


      console.log("Prediction results:", data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch predictions");
    } finally {
      setLoading(false);
    }
  };
  const groupedResults = Object.values(
    results.reduce((acc, row) => {
      const key = `${row.institute}__${row.academicProgram}__${row.quota}`;

      if (!acc[key]) {
        acc[key] = {
          ...row,
          rounds: [row.round],
          openingRank: row.openingRank,
          closingRank: row.closingRank,
        };
      } else {
        acc[key].rounds.push(row.round);
        acc[key].openingRank = Math.min(acc[key].openingRank, row.openingRank);
        acc[key].closingRank = Math.max(acc[key].closingRank, row.closingRank);
      }

      return acc;
    }, {})


  );
  // const finalResults = groupedResults.map(row => {
  //   let chance = "Dream";

  //   if (rank <= row.closingRank * 0.7) chance = "Safe";
  //   else if (rank <= row.closingRank) chance = "Moderate";

  //   return {
  //     ...row,
  //     chance
  //   };
  // });
  const finalResults = groupedResults
    .map(row => {
      let chance = "Dream";

      if (rank <= row.closingRank * 0.7) chance = "Safe";
      else if (rank <= row.closingRank) chance = "Moderate";

      return { ...row, chance };
    })
    // 🔹 FILTERING
    .filter(row => {
      if (!filterChance.includes(row.chance)) return false;
      if (filterQuota.length && !filterQuota.includes(row.quota)) return false;
      if (filterBranch.length > 0 && !filterBranch.includes(row.academicProgram)) return false;
      const rowLocation = extractLocation(row.institute);

      if (
        filterLocation.length > 0 &&
        !filterLocation.includes(rowLocation)
      ) return false;


      return true;
    })
    // 🔹 SORT: SAFE → MODERATE → DREAM
    .sort((a, b) => {
      const order = { Safe: 1, Moderate: 2, Dream: 3 };
      return order[a.chance] - order[b.chance];
    });

  const branchOptions = Array.from(
    new Set(results.map(r => r.academicProgram))
  ).sort();

  const locationOptions = Array.from(
    new Set(results.map(r => extractLocation(r.institute)))
  ).sort();


  const handleBackToExams = () => {
    setShowResults(false);   // hide results
    setResults([]);          // optional but clean
    setStep(2);              // go back to exam selection
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
            {/* <aside className="col-span-12 md:col-span-3 border-r border-slate-100 bg-slate-50">
              <div className="px-6 py-8">
                <ol className="space-y-8 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step === 1
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
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step === 2 || step === 3
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
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step === 3
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
            </aside> */}

            {/* Left stepper + Filters */}
            <aside className="col-span-12 md:col-span-3 border-r border-slate-100 bg-slate-50">
              <div className="px-6 py-8">

                {/* Stepper (unchanged) */}
                <ol className="space-y-8 text-sm font-semibold text-slate-900">
                  Tailor your choices
                </ol>

                {/* 🔽 ADD THIS BELOW STEPPER */}
                {showResults && (
                  <div className="mt-10 border-t pt-6">
                    {/* <h4 className="text-sm font-semibold text-slate-900 mb-4">
                      Filters
                    </h4> */}

                    {/* 👇 PUT YOUR FILTER CODE HERE */}
                    <div className="space-y-6 text-sm">

                      {/* Chance Filter */}
                      <div>
                        <p className="font-semibold text-slate-800 mb-2">Chance</p>
                        {["Safe", "Moderate"].map(c => (
                          <label key={c} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filterChance.includes(c)}
                              onChange={() =>
                                setFilterChance(prev =>
                                  prev.includes(c)
                                    ? prev.filter(x => x !== c)
                                    : [...prev, c]
                                )
                              }
                            />
                            {c}
                          </label>
                        ))}
                      </div>

                      {/* Quota Filter */}
                      <div>
                        <p className="font-semibold text-slate-800 mb-2">Quota</p>
                        {["HS", "AI"].map(q => (
                          <label key={q} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filterQuota.includes(q)}
                              onChange={() =>
                                setFilterQuota(prev =>
                                  prev.includes(q)
                                    ? prev.filter(x => x !== q)
                                    : [...prev, q]
                                )
                              }
                            />
                            {q}
                          </label>
                        ))}
                      </div>

                      {/* Branch Filter */}
                      <div>
                        <p className="font-semibold text-slate-800 mb-2">Branch</p>

                        <div className="max-h-44 overflow-y-auto rounded-md border border-blue-200 bg-white px-2 py-2 space-y-1">

                          {/* ALL option */}
                          <label className="flex items-center gap-2 text-xs font-semibold text-blue-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filterBranch.length === 0}
                              onChange={() => setFilterBranch([])}
                            />
                            All
                          </label>

                          {/* Branch options */}
                          {branchOptions.map(branch => (
                            <label
                              key={branch}
                              className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filterBranch.includes(branch)}
                                onChange={() =>
                                  setFilterBranch(prev =>
                                    prev.includes(branch)
                                      ? prev.filter(b => b !== branch)
                                      : [...prev, branch]
                                  )
                                }
                              />
                              <span className="leading-snug break-words">
                                {branch}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>


                      {/* Location Filter */}
                      <div>
                        <p className="font-semibold text-slate-800 mb-2">Location</p>

                        <div className="max-h-44 overflow-y-auto rounded-md border border-blue-200 bg-white px-2 py-2 space-y-1">

                          {/* ALL option */}
                          <label className="flex items-center gap-2 text-xs font-semibold text-blue-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filterLocation.length === 0}
                              onChange={() => setFilterLocation([])}
                            />
                            All
                          </label>

                          {/* Location options */}
                          {locationOptions.map(loc => (
                            <label
                              key={loc}
                              className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filterLocation.includes(loc)}
                                onChange={() =>
                                  setFilterLocation(prev =>
                                    prev.includes(loc)
                                      ? prev.filter(l => l !== loc)
                                      : [...prev, loc]
                                  )
                                }
                              />
                              <span className="leading-snug">
                                {loc}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>


                    </div>
                  </div>
                )}

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
                {step === 3 && !showResults && (
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
                {/* {results.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Predicted Colleges ({groupedResults.length})
                    </h3>

                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="min-w-full text-sm">
                        <thead className="bg-slate-100 text-slate-700">
                          <tr>
                            <th className="px-3 py-2 text-left">Institute</th>
                            <th className="px-3 py-2 text-left">Branch</th>
                            <th className="px-3 py-2 text-center">Quota</th>
                            <th className="px-3 py-2 text-center">Round</th>
                            <th className="px-3 py-2 text-center">OR</th>
                            <th className="px-3 py-2 text-center">CR</th>
                            <th className="px-3 py-2 text-center">Chance</th>
                          </tr>
                        </thead>

                        <tbody>
                        {finalResults.map((row, idx) => (
                            <tr
                              key={idx}
                              className="border-t border-slate-200 hover:bg-slate-50"
                            >
                              <td className="px-3 py-2 font-medium text-slate-900">
                                {row.institute}
                              </td>

                              <td className="px-3 py-2 text-slate-700">
                                {row.academicProgram}
                              </td>

                              <td className="px-3 py-2 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.quota === "HS"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                    }`}
                                >
                                  {row.quota}
                                </span>
                              </td>

                              <td className="px-3 py-2 text-center">
                                {Math.min(...row.rounds)}–{Math.max(...row.rounds)}
                              </td>

                              <td className="px-3 py-2 text-center">
                                {row.openingRank}
                              </td>

                              <td className="px-3 py-2 text-center">
                                {row.closingRank}
                              </td>

                              <td className="px-3 py-2 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${row.chance === "Safe"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : row.chance === "Moderate"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-rose-100 text-rose-700"
                                    }`}
                                >
                                  {row.chance}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )} */}
                {showResults && (
                  <>
                    {/* 🔙 BACK TO EXAMS BUTTON */}
                    <button
                      onClick={handleBackToExams}
                      className="mb-6 text-sm text-blue-600 hover:underline flex items-center"
                    >
                      ← Back to exams
                    </button>

                    {finalResults.length === 0 ? (
                      <div className="text-center py-20 text-slate-500">
                        <p className="text-lg font-semibold">No results found</p>
                        <p className="text-sm mt-2">
                          Try changing filters, quota, or rank.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {finalResults.map((row, idx) => (
                          <div
                            key={idx}
                            className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
                          >
                            {/* Institute */}
                            <h4 className="font-semibold text-slate-900 text-base">
                              {row.institute}
                            </h4>

                            {/* Branch */}
                            <p className="mt-1 text-sm text-blue-700 font-medium">
                              {row.academicProgram}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
                              <span className="px-2 py-0.5 border rounded">
                                {selectedExam === "WBJEE"
                                  ? "WBJEE"
                                  : selectedExam === "JEE_ADV"
                                    ? "JEE Advanced"
                                    : "JEE Main"}
                              </span>

                              <span
                                className={`px-2 py-0.5 rounded-full font-medium ${row.quota === "HS"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                  }`}
                              >
                                {row.quota}
                              </span>
                            </div>

                            {/* Cutoff */}
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-slate-500 text-xs">Opening Rank</p>
                                <p className="font-semibold text-slate-900">
                                  {row.openingRank}
                                </p>
                              </div>

                              <div>
                                <p className="text-slate-500 text-xs">Closing Rank</p>
                                <p className="font-semibold text-slate-900">
                                  {row.closingRank}
                                </p>
                              </div>
                            </div>

                            {/* Chance */}
                            <div className="mt-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${row.chance === "Safe"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : row.chance === "Moderate"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-rose-100 text-rose-700"
                                  }`}
                              >
                                {row.chance}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
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
