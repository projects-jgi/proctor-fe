import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlarmClock, ArrowRight, CalendarDays, Hourglass } from "lucide-react";
import React from "react";
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

function UpcomingExams() {
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

function UpcomingExams() {
  const { currentUser, apiCall } = useProctor();
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingExams = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Mock data for upcoming exams
        const mockExams: Exam[] = [
          {
            id: '1',
            title: 'Data Structures Final Exam',
            description: 'Comprehensive exam covering all data structures topics',
            startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(), // 2 hours later
            duration: 120,
            departmentId: 'computer-science-it',
            status: 'published'
          },
          {
            id: '2',
            title: 'Web Development Mid-term',
            description: 'HTML, CSS, JavaScript fundamentals',
            startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
            endTime: new Date(Date.now() + 172800000 + 3600000).toISOString(), // 1 hour later
            duration: 60,
            departmentId: 'computer-science-it',
            status: 'published'
          }
        ];

        setUpcomingExams(mockExams);
      } catch (error) {
        console.error('Error fetching upcoming exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingExams();
  }, [currentUser]);

  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Upcoming Exams</h2>
          <Link href="/student/exams/upcoming">
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
            Loading upcoming exams...
          </div>
        </div>
      </section>
    );
  }

>>>>>>> Stashed changes
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Exams</h2>
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
            <ExamCard key={index} {...exam} action={<Button>View Details</Button>}  />
          ))}
      </div>
    </section>
  );
}

export default UpcomingExams;
