export enum ExamStatus {
    COMPLETED = 'completed',
    ONGOING = 'ongoing',
    UPCOMING = 'upcoming'
};

export interface ExamQuestion {
    id: number,
    exam_id: number,
    exam_type_id: number,
    question_text: string,
    option_1?: string,
    option_2?: string,
    option_3?: string,
    option_4?: string,
    option_5?: string,
    score: number
}

export interface ExamTypeQuestion{
    [exam_type: string] : {
        [exam_id: number]: ExamQuestion
    }
}