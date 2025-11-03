import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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


function CompletedExams() {
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

function CompletedExams() {
  const { currentUser, apiCall } = useProctor();
  const [completedExams, setCompletedExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedExams = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Mock data for completed exams
        const mockExams: Exam[] = [
          {
            id: '4',
            title: 'Introduction to Programming',
            description: 'Basic programming concepts and algorithms',
            startTime: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
            endTime: new Date(Date.now() - 604800000 + 7200000).toISOString(),
            duration: 120,
            departmentId: 'computer-science-it',
            status: 'completed'
          },
          {
            id: '5',
            title: 'Computer Networks',
            description: 'OSI model and network protocols',
            startTime: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            endTime: new Date(Date.now() - 259200000 + 3600000).toISOString(),
            duration: 90,
            departmentId: 'computer-science-it',
            status: 'completed'
          }
        ];

        setCompletedExams(mockExams);
      } catch (error) {
        console.error('Error fetching completed exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedExams();
  }, [currentUser]);

  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Completed Exams</h2>
          <Link href="/student/exams/completed">
            <Button variant={"outline"}>
              View All
              <span>
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="text-center py-8 text-gray-500">
            Loading completed exams...
          </div>
        </div>
      </section>
    );
  }

>>>>>>> Stashed changes
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Completed Exams</h2>
        <Button variant={"outline"}>
          View All
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {exams
          .map((exam, index) => (
            <ExamCard key={index} {...exam} action={<Link href="/student/results"><Button>View Results</Button></Link>}  />
          ))}
      </div>
    </section>
  );
}

export default CompletedExams;
