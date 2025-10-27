"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sun, Moon, Laptop } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const themes = [
    {
        name: "Light",
        Icon: Sun,
        value: "light"
    },
    {
        name: "Dark",
        Icon: Moon,
        value: "dark"
    },
    {
        name: "System",
        Icon: Laptop,
        value: "system"
    }
] as const;

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // prevents hydration mismatch
    if (!mounted) return null;

    const icon =
        resolvedTheme === "dark" ? (
        <Moon className="h-5 w-5" />
        ) : resolvedTheme === "light" ? (
        <Sun className="h-5 w-5" />
        ) : (
        <Laptop className="h-5 w-5" />
        );

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Toggle theme">
            {icon}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {
                themes.map(({name, Icon, value}) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => setTheme(value)}
                        className={
                            cn("cursor-pointer", theme == value && "bg-accent text-accent-foreground")
                        }
                    >
                        <Icon className="mr-2 h-4 w-4" /> {name}
                    </DropdownMenuItem>
                ))
            }
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
