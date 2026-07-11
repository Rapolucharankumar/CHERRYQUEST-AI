"use client";

import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, Terminal as TerminalIcon, CheckCircle, ChevronLeft, Bot } from "lucide-react";
import Link from "next/link";

export default function MissionPlayground() {
  const [code, setCode] = useState('def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("CherryQuest"))');
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Mock code execution function
  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate network delay for compiling
    setTimeout(() => {
      // Very basic mock output for demo purposes
      if (code.includes('print(greet("CherryQuest"))')) {
        setOutput("Hello, CherryQuest!\n\nProcess finished with exit code 0.");
      } else {
        setOutput("Output:\n" + code.split('\n').filter(line => line.includes('print')).map(line => line.replace('print(', '').replace(')', '')).join('\n') + "\n\nProcess finished with exit code 0.");
      }
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col -m-8">
      {/* Mission Header */}
      <header className="h-14 border-b border-white/5 bg-zinc-950 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">Mission 1</span>
            <h1 className="font-bold">Slay the Syntax Bug</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 border-zinc-700 bg-zinc-900 text-zinc-300">
            <Bot className="w-4 h-4 mr-2 text-indigo-400" />
            Ask AI Mentor
          </Button>
          <Button 
            onClick={runCode} 
            disabled={isRunning}
            className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white border-0"
          >
            <Play className="w-4 h-4 mr-1.5 fill-white" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button className="h-8 bg-indigo-600 hover:bg-indigo-500 text-white border-0">
            Submit Quest
          </Button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel: Story & Theory */}
          <Panel defaultSize={30} minSize={20} className="bg-zinc-950 p-6 overflow-y-auto">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-white">The Broken Spell</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Welcome to the Python realm, young mage. To cast your first spell and unlock the gates to the variable dungeon, you must fix the broken syntax in the ancient scroll.
              </p>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Objective
                </h3>
                <p className="text-sm text-zinc-400">
                  Write a function that prints a greeting. Use the <code>print()</code> command to output exactly: <strong>Hello, CherryQuest!</strong>
                </p>
              </div>

              <h3 className="font-bold text-lg text-white mb-2">Theory: The Print Command</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                In Python, we use the <code>print()</code> function to display messages on the screen. It is one of the most fundamental spells you will learn.
              </p>
              <pre className="bg-zinc-900 p-3 rounded-lg text-sm text-indigo-300 border border-zinc-800">
                <code>print("Your text here")</code>
              </pre>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-white/5 hover:bg-rose-500/50 transition-colors cursor-col-resize" />

          {/* Right Panel: Code & Terminal */}
          <Panel defaultSize={70}>
            <PanelGroup direction="vertical">
              {/* Code Editor */}
              <Panel defaultSize={70} minSize={30} className="bg-[#1e1e1e] relative">
                <div className="absolute top-0 right-4 z-10 px-3 py-1 bg-zinc-800 rounded-b-lg text-xs font-bold text-zinc-400 border border-t-0 border-zinc-700">
                  main.py
                </div>
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    fontFamily: "var(--font-geist-mono)",
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                  }}
                />
              </Panel>

              <PanelResizeHandle className="h-1 bg-white/5 hover:bg-rose-500/50 transition-colors cursor-row-resize" />

              {/* Terminal Output */}
              <Panel defaultSize={30} minSize={20} className="bg-black p-4 flex flex-col font-mono text-sm">
                <div className="flex items-center gap-2 text-zinc-500 mb-3 select-none">
                  <TerminalIcon className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-wider text-xs">Terminal Output</span>
                </div>
                <div className="flex-1 overflow-y-auto text-zinc-300">
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <span className="text-zinc-600">Waiting for code execution...</span>
                  )}
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
