"use client";

import { useState } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Code, Copy, Check, Download, ArrowLeft, Sparkles, FileCode, Settings, Clipboard, Info, Zap, Eye, X } from "lucide-react";
import Link from "next/link";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/plugins/babel";
import * as parserEstree from "prettier/plugins/estree";
import * as parserHtml from "prettier/plugins/html";
import * as parserCss from "prettier/plugins/postcss";
import * as parserTypescript from "prettier/plugins/typescript";
import * as parserMarkdown from "prettier/plugins/markdown";

type Language = "javascript" | "typescript" | "html" | "css" | "json" | "markdown" | "jsx" | "tsx" | "scss" | "less" | "yaml" | "graphql";

export default function CodeFormatterPage() {
  const [inputCode, setInputCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [tabWidth, setTabWidth] = useState(2);
  const [useTabs, setUseTabs] = useState(false);
  const [semiColons, setSemiColons] = useState(true);
  const [singleQuote, setSingleQuote] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [jsonData, setJsonData] = useState<any>(null);
  const [showJsonViewer, setShowJsonViewer] = useState(false);

  const languages: { value: Language; label: string; parser: string; plugins: any[] }[] = [
    { value: "javascript", label: "JavaScript (.js)", parser: "babel", plugins: [parserBabel, parserEstree] },
    { value: "jsx", label: "React JSX (.jsx)", parser: "babel", plugins: [parserBabel, parserEstree] },
    { value: "typescript", label: "TypeScript (.ts)", parser: "typescript", plugins: [parserTypescript, parserEstree] },
    { value: "tsx", label: "React TSX (.tsx)", parser: "typescript", plugins: [parserTypescript, parserEstree] },
    { value: "html", label: "HTML", parser: "html", plugins: [parserHtml] },
    { value: "css", label: "CSS", parser: "css", plugins: [parserCss] },
    { value: "scss", label: "SCSS/Sass", parser: "scss", plugins: [parserCss] },
    { value: "less", label: "Less", parser: "less", plugins: [parserCss] },
    { value: "json", label: "JSON", parser: "json", plugins: [parserBabel, parserEstree] },
    { value: "graphql", label: "GraphQL (Basic)", parser: "babel", plugins: [parserBabel, parserEstree] },
    { value: "yaml", label: "YAML (Basic)", parser: "babel", plugins: [parserBabel, parserEstree] },
    { value: "markdown", label: "Markdown", parser: "markdown", plugins: [parserMarkdown] },
  ];

  // Sample code for each language
  const sampleCode: Record<Language, string> = {
    javascript: `function  hello ( name ) {
const   greeting="Hello, "+name+"!";
console.log(greeting)
return greeting
}

const result=hello('World')`,
    jsx: `import React from 'react';

function Welcome({name,age}){
return (<div className="card"><h1>Hello, {name}!</h1>
<p>You are {age} years old.</p><button onClick={()=>alert('Clicked!')}>Click Me</button></div>)
}

export default Welcome;`,
    typescript: `interface User{name:string;age:number}
function greet(user:User):string{
return \`Hello, \${user.name}! You are \${user.age} years old.\`
}
const user:User={name:"Alice",age:30}
console.log(greet(user))`,
    tsx: `import React from 'react';

interface Props{name:string;age:number;onUpdate:(age:number)=>void}

const UserCard:React.FC<Props>=({name,age,onUpdate})=>{
return (<div className="user-card"><h2>{name}</h2><p>Age: {age}</p>
<button onClick={()=>onUpdate(age+1)}>Increase Age</button></div>)
}

export default UserCard;`,
    html: `<!DOCTYPE html>
<html><head><title>My Page</title></head>
<body><div class="container"><h1>Welcome</h1>
<p>This is a paragraph.</p></div></body></html>`,
    css: `.container{display:flex;justify-content:center;align-items:center}
.button{padding:10px 20px;background-color:#3b82f6;color:white;border:none;border-radius:5px}
.button:hover{background-color:#2563eb}`,
    scss: `$primary-color:#3b82f6;$secondary-color:#8b5cf6;

.container{display:flex;.card{padding:20px;background:$primary-color;
&:hover{background:$secondary-color;transform:scale(1.05);}
.title{font-size:24px;font-weight:bold;}}}`,
    less: `@primary-color:#3b82f6;@spacing:16px;

.container{padding:@spacing;.card{background:@primary-color;margin:@spacing/2;
&:hover{opacity:0.9;}}}`,
    json: `{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","country":"USA"},"hobbies":["reading","coding","gaming"],"settings":{"notifications":true,"theme":"dark"}}`,
    graphql: `query GetUser($id:ID!){user(id:$id){id name email posts{id title content createdAt}}}

mutation CreatePost($input:PostInput!){createPost(input:$input){id title content}}`,
    yaml: `name:My Application
version:1.0.0
description:A sample application
dependencies:{express:"^4.18.0",react:"^18.2.0",typescript:"^5.0.0"}
scripts:{dev:"npm run dev",build:"npm run build"}`,
    markdown: `# Welcome to Markdown

This is a **bold** text and this is *italic*.

- Item 1
- Item 2
- Item 3

\`\`\`javascript
console.log("Hello World!");
\`\`\``,
  };

  // Format code
  const formatCode = async () => {
    if (!inputCode.trim()) {
      setFormattedCode("");
      setError("");
      return;
    }

    setIsFormatting(true);
    setError("");

    try {
      const langConfig = languages.find(l => l.value === language);
      if (!langConfig) {
        setError("Language not supported");
        setIsFormatting(false);
        return;
      }

      const formatted = await prettier.format(inputCode, {
        parser: langConfig.parser,
        plugins: langConfig.plugins,
        tabWidth: tabWidth,
        useTabs: useTabs,
        semi: semiColons,
        singleQuote: singleQuote,
        printWidth: 80,
        trailingComma: "es5",
      });

      setFormattedCode(formatted);
      setError("");

      // Parse JSON for viewer
      if (language === "json") {
        try {
          const parsed = JSON.parse(inputCode);
          setJsonData(parsed);
          setShowJsonViewer(true);
        } catch {
          setJsonData(null);
          setShowJsonViewer(false);
        }
      } else {
        setJsonData(null);
        setShowJsonViewer(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to format code");
      setFormattedCode("");
      setJsonData(null);
      setShowJsonViewer(false);
    } finally {
      setIsFormatting(false);
    }
  };

  // Load sample code
  const loadSample = () => {
    setInputCode(sampleCode[language]);
    setFormattedCode("");
    setError("");
    setJsonData(null);
    setShowJsonViewer(false);
  };

  // Clear all input and output
  const clearAll = () => {
    setInputCode("");
    setFormattedCode("");
    setError("");
    setJsonData(null);
    setShowJsonViewer(false);
  };

  // Paste code from clipboard
  const pasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputCode(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    } catch (error) {
      console.error("Failed to paste:", error);
    }
  };

  // Copy formatted code
  const copyCode = async () => {
    if (!formattedCode) return;
    try {
      await navigator.clipboard.writeText(formattedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Download formatted code
  const downloadCode = () => {
    if (!formattedCode) return;
    const extension = language === "javascript" ? "js" : language === "typescript" ? "ts" : language;
    const blob = new Blob([formattedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `formatted.${extension}`;
    a.click();
  };

  // JSON Viewer Component
  const JsonValue = ({ data, level = 0 }: { data: any; level?: number }) => {
    const [collapsed, setCollapsed] = useState(level > 2);
    
    const isObject = typeof data === "object" && data !== null && !Array.isArray(data);
    const isArray = Array.isArray(data);
    const isPrimitive = !isObject && !isArray;

    if (isPrimitive) {
      const valueColor = 
        typeof data === "string" ? "text-green-400" :
        typeof data === "number" ? "text-blue-400" :
        typeof data === "boolean" ? "text-purple-400" :
        "text-gray-400";
      
      return (
        <span className={valueColor}>
          {typeof data === "string" ? `"${data}"` : String(data)}
        </span>
      );
    }

    if (isArray) {
      if (data.length === 0) return <span className="text-gray-400">[]</span>;
      
      return (
        <div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-yellow-400 hover:text-yellow-300"
          >
            {collapsed ? "▶" : "▼"} Array[{data.length}]
          </button>
          {!collapsed && (
            <div className="ml-4 border-l-2 border-gray-700 pl-3">
              {data.map((item: any, index: number) => (
                <div key={index} className="my-1">
                  <span className="text-gray-500">[{index}]:</span>{" "}
                  <JsonValue data={item} level={level + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (isObject) {
      const keys = Object.keys(data);
      if (keys.length === 0) return <span className="text-gray-400">{"{}"}</span>;
      
      return (
        <div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-cyan-400 hover:text-cyan-300"
          >
            {collapsed ? "▶" : "▼"} Object{"{"}
            {keys.length}
            {"}"}
          </button>
          {!collapsed && (
            <div className="ml-4 border-l-2 border-gray-700 pl-3">
              {keys.map((key) => (
                <div key={key} className="my-1">
                  <span className="text-pink-400">"{key}"</span>
                  <span className="text-gray-500">:</span>{" "}
                  <JsonValue data={data[key]} level={level + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-zinc-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-gray-900/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <CommunityNavbar 
          onStatsClick={() => {}}
          onFavoritesClick={() => {}}
          onHistoryClick={() => {}}
          onKeyboardClick={() => {}}
          onTipsClick={() => {}}
          onExportClick={() => {}}
          historyCount={0}
        />

        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Back Button */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Community Services</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-400 via-gray-500 to-zinc-600 bg-clip-text text-transparent">
                Code Formatter
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Format and beautify your code instantly with Prettier
            </p>
          </div>

          {/* Settings */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tab Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tab Width
                  </label>
                  <select
                    value={tabWidth}
                    onChange={(e) => setTabWidth(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>

                {/* Use Tabs */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Indentation
                  </label>
                  <button
                    onClick={() => setUseTabs(!useTabs)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      useTabs
                        ? "bg-slate-600 text-white"
                        : "bg-gray-700/50 border border-gray-600 text-gray-300"
                    }`}
                  >
                    {useTabs ? "Tabs" : "Spaces"}
                  </button>
                </div>

                {/* Semicolons */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Semicolons
                  </label>
                  <button
                    onClick={() => setSemiColons(!semiColons)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      semiColons
                        ? "bg-slate-600 text-white"
                        : "bg-gray-700/50 border border-gray-600 text-gray-300"
                    }`}
                  >
                    {semiColons ? "Yes" : "No"}
                  </button>
                </div>

                {/* Quotes */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quotes
                  </label>
                  <button
                    onClick={() => setSingleQuote(!singleQuote)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      singleQuote
                        ? "bg-slate-600 text-white"
                        : "bg-gray-700/50 border border-gray-600 text-gray-300"
                    }`}
                  >
                    {singleQuote ? "Single" : "Double"}
                  </button>
                </div>

                {/* Sample Button */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quick Start
                  </label>
                  <button
                    onClick={loadSample}
                    className="w-full px-3 py-2.5 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-500 hover:to-gray-500 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FileCode className="w-4 h-4" />
                    Load Sample
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editors */}
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Code className="w-5 h-5 text-slate-400" />
                  Input Code
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={pasteCode}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    {pasted ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Pasted!</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-4 h-4" />
                        <span>Paste</span>
                      </>
                    )}
                  </button>
                  {inputCode && (
                    <button
                      onClick={clearAll}
                      className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900/70 rounded-lg transition-colors text-sm flex items-center gap-2 text-red-300 hover:text-red-200"
                      title="Clear all"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear</span>
                    </button>
                  )}
                  <span className="text-sm text-gray-400">{inputCode.length} chars</span>
                </div>
              </div>
              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={`Paste your ${language} code here...`}
                className="w-full h-96 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none font-mono text-sm"
                spellCheck={false}
              />
              <div className="mt-4">
                <button
                  onClick={formatCode}
                  disabled={!inputCode.trim() || isFormatting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-500 hover:to-gray-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isFormatting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Formatting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Format Code
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-400" />
                  Formatted Code
                </h2>
                <div className="flex items-center gap-2">
                  {formattedCode && (
                    <>
                      <button
                        onClick={copyCode}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm flex items-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadCode}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {error ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center text-red-400">
                    <p className="text-lg font-semibold mb-2">⚠️ Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              ) : formattedCode ? (
                <pre className="w-full h-96 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white overflow-auto font-mono text-sm">
                  {formattedCode}
                </pre>
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Your formatted code</p>
                    <p className="text-sm mt-2">will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* JSON Viewer */}
          {showJsonViewer && jsonData && (
            <div className="max-w-7xl mx-auto mt-6">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Eye className="w-5 h-5 text-slate-400" />
                    JSON Viewer (Variables & Values)
                  </h2>
                </div>
                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-4 max-h-96 overflow-auto font-mono text-sm">
                  <JsonValue data={jsonData} />
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-slate-900/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-7 h-7 text-slate-400" />
                <h2 className="text-2xl font-bold text-white">Features & How to Use</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Supported Languages
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>JavaScript & JSX</strong> - ES6+, React components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>TypeScript & TSX</strong> - Full TypeScript support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>HTML</strong> - Format HTML documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>CSS, SCSS, Less</strong> - Style preprocessing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>JSON</strong> - Format & visualize data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>GraphQL & YAML</strong> - API schemas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>Markdown</strong> - Documentation formatting</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Formatting Options
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>Tab Width</strong> - 2, 4, or 8 spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>Indentation</strong> - Tabs or spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>Semicolons</strong> - Add or remove</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>Quotes</strong> - Single or double quotes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span><strong>Line Width</strong> - 80 characters (optimal)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-slate-300 mb-4">How to Use</h3>
                <ol className="space-y-3 text-gray-300 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span><strong>Select Language</strong> - Choose your programming language from the dropdown</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span><strong>Configure Options</strong> - Set your preferred formatting style (tab width, quotes, etc.)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span><strong>Paste Code</strong> - Use the "Paste" button or manually paste your unformatted code</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span><strong>Format</strong> - Click "Format Code" to beautify your code instantly</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span><strong>Copy/Download</strong> - Use "Copy" to clipboard or "Download" as a file</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">💡</span>
                    <span><strong>JSON Viewer</strong> - For JSON files, see a tree view of variables and values below the formatter</span>
                  </li>
                </ol>
              </div>

              <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                <p className="text-sm text-blue-300 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Powered by Prettier:</strong> This tool uses Prettier, the industry-standard code formatter used by millions of developers. All formatting is done locally in your browser - no code is sent to any server.</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

