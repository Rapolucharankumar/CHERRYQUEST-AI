"use client";

import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    language?: string;
}

export function CodeEditor({ code, onChange, language = "python" }: CodeEditorProps) {
    return (
        <div className="h-full w-full overflow-hidden rounded-2xl border bg-[#1e1e1e] shadow-2xl">
            <div className="flex items-center justify-between bg-black/40 px-4 py-2 text-xs font-mono text-muted-foreground/50 border-b">
                <span>{language.toUpperCase()} EDITOR</span>
                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                </div>
            </div>
            <Editor
                height="100%"
                defaultLanguage={language}
                theme="vs-dark"
                value={code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--font-geist-mono)",
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: "on",
                    roundedSelection: true,
                }}
            />
        </div>
    );
}
