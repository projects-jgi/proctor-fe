"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import FacultyQuestionBank from "@/containers/faculty/dashboard/FacultyQuestionBank";

function FacultyQuestions() {
    return (
        <FacultyLayout>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Question Bank</h1>
                <FacultyQuestionBank />
            </div>
        </FacultyLayout>
    );
}

export default FacultyQuestions;