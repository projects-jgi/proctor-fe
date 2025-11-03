import Topbar from "@/containers/student/Topbar";
import CompletedExams from "@/containers/student/dashboard/CompletedExams";

function CompletedExamsPage() {
    return (
        <>
            <Topbar />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Completed Exams</h1>
                <CompletedExams />
            </div>
        </>
    );
}

export default CompletedExamsPage;