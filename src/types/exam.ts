export enum ExamStatus {
    COMPLETED = 'completed',
    ONGOING = 'ongoing',
    UPCOMING = 'upcoming'
};

export interface ExamQuestion {
    id: number,
    exam_type_id: number,
    question_text: string,
    option_1?: string,
    option_2?: string,
    option_3?: string,
    option_4?: string,
    option_5?: string,
    is_correct_1?: string,
    is_correct_2?: string,
    is_correct_3?: string,
    is_correct_4?: string,
    is_correct_5?: string,
    explanation_1?: string,
    explanation_2?: string,
    explanation_3?: string,
    explanation_4?: string,
    explanation_5?: string,
    score: number
}

export interface Exam{
    id: number,
    description?: string,
    department_id: number,
    name: string,
    start_time?: string,
    end_time?: string,
    duration_in_minutes: number,
    passing_percentage: number,
    max_attempts?: number,
    status?: number,
    show_answers?: number,
    completion_status: number
}

export interface ExamTypeQuestion{
    [exam_type: string] : {
        [exam_id: number]: ExamQuestion
    }
}