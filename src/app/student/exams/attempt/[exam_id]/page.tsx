'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/containers/student/exams/attempt/Sidebar';
import Topbar from '@/containers/student/exams/attempt/Topbar'
import { ChevronLeft, ChevronRight, TriangleAlert } from 'lucide-react';
import React from 'react'

function ExamHall() {
    return (
        <>
            <SidebarProvider>
                <aside>
                    <AppSidebar />
                </aside>
                <main className='w-full'>
                    <Topbar />
                    <div className="m-8">
                        <div className="flex flex-wrap gap-12 items-center">
                            <div className='text-md font-bold'>
                                Questions: <Badge>40</Badge>
                            </div>
                            <div className='text-md font-bold'>
                                Answered: <Badge variant="success">30</Badge>
                            </div>
                            <div className='text-md font-bold'>
                                Skipped: <Badge variant="destructive">05</Badge>
                            </div>
                            <div className='text-md font-bold'>
                                Marked for Review: <Badge variant="warning">05</Badge>
                            </div>
                        </div>
                        <section className='mt-4'>
                            <Card>
                                <CardHeader>
                                    <CardDescription className='text-sm mb-2'>Question 1 of 30</CardDescription>
                                    <CardTitle>1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat provident reprehenderit ut, tenetur explicabo ad consequuntur numquam, consectetur, vero officia at perspiciatis! Porro necessitatibus pariatur in laborum ab, eius, veniam labore a ullam ex inventore architecto reprehenderit. Beatae dolore ipsa voluptas! Error, molestias? A quisquam laudantium incidunt dignissimos in!</CardTitle>
                                    <CardAction className='text-sm font-bold'>
                                        Score: 1
                                    </CardAction>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-4">
                                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <Checkbox
                                                id="toggle-2"
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">
                                                    First Option
                                                </p>
                                            </div>
                                        </Label>
                                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <Checkbox
                                                id="toggle-2"
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">
                                                    Second Option
                                                </p>
                                            </div>
                                        </Label>
                                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <Checkbox
                                                id="toggle-2"
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">
                                                    Third Option
                                                </p>
                                            </div>
                                        </Label>
                                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <Checkbox
                                                id="toggle-2"
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">
                                                    Fourth Option
                                                </p>
                                            </div>
                                        </Label>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="w-full flex items-center justify-between">
                                        <Button variant="outline">
                                            <ChevronLeft />
                                            Previous
                                        </Button>
                                        <Button className='bg-warning text-warning-foreground'>
                                            <TriangleAlert />
                                            Mark for Review
                                        </Button>
                                        <Button>
                                            Next
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </section>
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}

export default ExamHall