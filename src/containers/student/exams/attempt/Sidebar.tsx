'use client';

import { ChevronRight } from "lucide-react";

import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from '@/components/ui/scroll-area'; // Assuming ScrollArea is available for scrolling
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
} from "@/components/ui/sidebar";
import { cn } from '@/lib/utils'; // Assuming cn utility for class merging

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

interface Question {
	id: number;
	text: string;
	options: string[];
	score: number;
	type: string;
}

interface AppSidebarProps {
	questions: Question[];
	currentIndex: number;
	answers: Record<number, string[]>;
	markedForReview: Set<number>;
	onQuestionSelect: (index: number) => void;
}

export function AppSidebar({ questions, currentIndex, answers, markedForReview, onQuestionSelect }: AppSidebarProps) {
	const getQuestionStatus = (questionId: number, index: number) => {
		const isAnswered = answers[questionId] && answers[questionId].length > 0;
		const isMarked = markedForReview.has(questionId);
		const isCurrent = index === currentIndex;

		if (isCurrent) return 'current';
		if (isAnswered && isMarked) return 'answered-marked';
		if (isAnswered) return 'answered';
		if (isMarked) return 'marked';
		return 'unanswered';
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'current': return 'bg-blue-500 text-white';
			case 'answered': return 'bg-green-500 text-white';
			case 'marked': return 'bg-yellow-500 text-black';
			case 'answered-marked': return 'bg-green-600 text-white border-yellow-500 border-2';
			default: return 'bg-gray-300 text-black';
		}
	};

  return (
    <Sidebar>
        <SidebarHeader>
            <span className="text-lg inline-block text-center font-bold p-4">LOGO</span>
        </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-md font-bold mb-2"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="grid grid-cols-4 gap-3">
                    {Array(10).fill(0).map((_, index) => (
                        <SidebarMenuItem key={index} className="w-full aspect-square bg-secondary text-secondary-foreground ring-2 ring-border">
                            <SidebarMenuButton asChild isActive={false} className="inline-flex w-full h-full items-center justify-center">
                                <a href={item.url}>10</a>
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
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-destructive"></span>
                <span className="text-sm">Marked for Review</span>
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
			<div className="w-64 bg-background border-r p-4">
				<h3 className="text-lg font-semibold mb-4">Questions</h3>
				<ScrollArea className="h-full">
					<div className="grid grid-cols-5 gap-2">
						{questions.map((question, index) => {
							const status = getQuestionStatus(question.id, index);
							return (
								<Button
									key={question.id}
									variant="outline"
									size="sm"
									className={cn('w-10 h-10 p-0', getStatusColor(status))}
									onClick={() => onQuestionSelect(index)}
								>
									{index + 1}
								</Button>
							);
						})}
					</div>
				</ScrollArea>
				<div className="mt-4 space-y-2 text-xs">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-blue-500 rounded"></div>
						<span>Current</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-green-500 rounded"></div>
						<span>Answered</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-yellow-500 rounded"></div>
						<span>Marked</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-300 rounded"></div>
						<span>Unanswered</span>
					</div>
				</div>
			</div>
    </Sidebar>
  )
}
