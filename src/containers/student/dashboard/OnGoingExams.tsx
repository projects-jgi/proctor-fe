import EligibilityTest from "@/containers/student/EligibilityTest";
import ExamCard from "./ExamCard";

<<<<<<< Updated upstream
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
=======
interface Exam {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number;
  departmentId: string;
  status: string;
}

const OngoingExams = () => {
  const { currentUser, apiCall } = useProctor();
  const [ongoingExams, setOngoingExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOngoingExams = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Mock data for ongoing exams
        const mockExams: Exam[] = [
          {
            id: '3',
            title: 'Database Management Systems',
            description: 'SQL queries and database design exam',
            startTime: new Date(Date.now() - 1800000).toISOString(), // Started 30 min ago
            endTime: new Date(Date.now() + 1800000).toISOString(), // Ends in 30 min
            duration: 60,
            departmentId: 'computer-science-it',
            status: 'active'
          }
        ];

        setOngoingExams(mockExams);
      } catch (error) {
        console.error('Error fetching ongoing exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingExams();
  }, [currentUser]);

  if (loading) {
    return (
      <section className="">
        <h2 className="text-xl font-bold">Ongoing Exams</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="text-center py-8 text-gray-500">
            Loading ongoing exams...
          </div>
        </div>
      </section>
    );
  }
>>>>>>> Stashed changes

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
