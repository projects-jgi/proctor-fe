import EligibilityTest from "../EligibilityTest";
import ExamCard from "./ExamCard";

const exams = [
    {
        name: "MATHEMATICS FINAL EXAM",
        description: "Master of Computer Applications",
        startDate: "01/01/2025",
        endDate: "03/01/2025",
        duration: "90"
    },
    {
        name: "PHYSICS FINAL EXAM",
        description: "Bachelor of Science",
        startDate: "05/01/2025",
        endDate: "07/01/2025",
        duration: "120"
    }
]

function OngoingExams() {
  return (
    <section className="">
      <h2 className="text-xl font-bold">Ongoing Exams</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {exams
          .map((exam, index) => (
            <ExamCard key={index} {...exam} action={<EligibilityTest />}  />
          ))}
      </div>
    </section>
  );
}

export default OngoingExams;
