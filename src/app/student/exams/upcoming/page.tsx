import Topbar from "@/containers/student/Topbar";
import UpcomingExams from "@/containers/student/dashboard/UpcomingExams";

function UpcomingExamsPage() {
    return (
        <>
            <Topbar />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Upcoming Exams</h1>
                <UpcomingExams />
            </div>
        </>
    );
}

export default UpcomingExamsPage;