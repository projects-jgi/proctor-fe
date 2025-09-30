import Header from "@/components/auth/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Topbar from "@/containers/student/Topbar";

function Results() {
    const results = [
        {
            examName: "MATHEMATICS FINAL EXAM",
            score: 78,
            status: "Passed",
            details: "You have successfully passed the exam with a good score."
        },
        {
            examName: "PHYSICS FINAL EXAM",
            score: 65,
            status: "Passed",
            details: "You have successfully passed the exam."
        }
    ];

    return (
        <>
            <Topbar />
            <div>
                <section className="grid grid-cols-1 gap-4 mt-8">
                    {results.map((result, index) => (
                        <Card key={index} className="border p-4">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">
                                    {result.examName}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">Score: {result.score}%</Badge>
                                    <Badge variant={result.status === "Passed" ? "success" : "destructive"}>{result.status}</Badge>
                                </div>
                                <p className="text-sm mt-2">{result.details}</p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </div>
        </>
    );
}

export default Results;