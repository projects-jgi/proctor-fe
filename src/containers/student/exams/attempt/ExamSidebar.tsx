'use client';

import * as React from "react"
import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ExamQuestion, ExamTypeQuestion } from "@/types/exam";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionCounter } from "@/lib/redux/state/ExamAttempt";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Logical",
      url: "#",
    },
    {
      title: "Verbal",
      url: "#",
    },
    {
      title: "Technical",
      url: "#",
    },
    {
      title: "Aptitude",
      url: "#",
    },
  ],
}

export function ExamSidebar({ questions }: { questions: ExamTypeQuestion }) {
  const questionCounter = useSelector(state => state.exam_attempt.questionCounter);
  const selectedAnswers = useSelector(state => state.exam_attempt.selectedAnswers);
  const dispatch = useDispatch();

  let question_counter = 1;

  function handleItemClick(event: any){
    // setQuestionCounter(counter)
    let {questionCounter} = event.currentTarget.dataset

    dispatch(setQuestionCounter(parseInt(questionCounter)))
  }
  return (
    <Sidebar>
        <SidebarHeader>
            <span className="text-lg inline-block text-center font-bold p-4">LOGO</span>
        </SidebarHeader>
      <SidebarContent className="gap-0">
        {Object.keys(questions).map((exam_type: string, index) => (
          <Collapsible
            key={exam_type}
            title={exam_type}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-md font-bold mb-2"
              >
                <CollapsibleTrigger>
                  {exam_type}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="grid grid-cols-4 gap-3">
                    {Object.values(questions[exam_type]).map((question: ExamQuestion, index) => (
                        <SidebarMenuItem
                          key={index}
                          className={cn(
                            "w-full aspect-square bg-secondary text-secondary-foreground ring-2 ring-border",
                            selectedAnswers[question.id] != null && selectedAnswers[question.id].length > 0 && "ring-success",
                            (questionCounter == question_counter) && 'bg-primary'
                          )}
                          onClick={handleItemClick}
                          data-question-counter={question_counter}
                          data-question-id={question.id}
                        >
                            <SidebarMenuButton isActive={false} className="inline-flex w-full h-full items-center justify-center">
                                {question_counter++}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-success"></span>
                <span className="text-sm">Answered</span>
            </SidebarMenuItem>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-warning"></span>
                <span className="text-sm">Marked for Review</span>
            </SidebarMenuItem>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-border"></span>
                <span className="text-sm">Not Visited</span>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
