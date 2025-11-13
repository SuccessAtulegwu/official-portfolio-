"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe, 
  Linkedin, 
  Github, 
  Plus, 
  Trash2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "classic" | "minimal">("modern");

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: ""
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    setSkills([...skills, {
      id: Date.now().toString(),
      name: "",
      level: 3
    }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const downloadPDF = () => {
    alert("PDF download feature coming soon! For now, use your browser's print feature (Ctrl/Cmd + P) and save as PDF.");
  };

  const templates = [
    { id: "modern", name: "Modern", gradient: "from-purple-600 to-pink-600" },
    { id: "classic", name: "Classic", gradient: "from-blue-600 to-cyan-600" },
    { id: "minimal", name: "Minimal", gradient: "from-gray-600 to-slate-600" }
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/community"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Tools</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === "edit"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-800/60 text-gray-400 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === "preview"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-800/60 text-gray-400 hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:scale-105 transition-transform"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Resume & CV Builder
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Create a professional resume with our easy-to-use builder
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            {activeTab === "edit" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Sidebar - Templates */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Choose Template
                    </h2>
                    <div className="space-y-3">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id as any)}
                          className={`w-full p-4 rounded-xl border-2 transition-all ${
                            selectedTemplate === template.id
                              ? "border-purple-500 bg-gradient-to-r " + template.gradient + " bg-opacity-10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <div className="text-center">
                            <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${template.gradient} mb-3 opacity-80`}></div>
                            <p className="font-semibold">{template.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <User className="w-6 h-6 text-purple-400" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email *
                        </label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          placeholder="+1 234 567 8900"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Location
                        </label>
                        <input
                          type="text"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                          placeholder="New York, USA"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Globe className="w-4 h-4 inline mr-1" />
                          Website
                        </label>
                        <input
                          type="url"
                          value={personalInfo.website}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Linkedin className="w-4 h-4 inline mr-1" />
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={personalInfo.linkedin}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                          placeholder="linkedin.com/in/johndoe"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Github className="w-4 h-4 inline mr-1" />
                          GitHub
                        </label>
                        <input
                          type="url"
                          value={personalInfo.github}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                          placeholder="github.com/johndoe"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Professional Summary
                        </label>
                        <textarea
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                          placeholder="Brief summary about yourself and your career goals..."
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-purple-400" />
                        Work Experience
                      </h2>
                      <button
                        onClick={addExperience}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-transform"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {experiences.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">
                          No experience added yet. Click "Add" to get started.
                        </p>
                      ) : (
                        experiences.map((exp) => (
                          <div key={exp.id} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                            <div className="flex justify-end mb-3">
                              <button
                                onClick={() => removeExperience(exp.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                placeholder="Position *"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="Company *"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                placeholder="Start Date"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                placeholder="End Date"
                                disabled={exp.current}
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                              />
                              <div className="md:col-span-2 flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                  className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-300">
                                  I currently work here
                                </label>
                              </div>
                              <textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                placeholder="Describe your responsibilities and achievements..."
                                rows={3}
                                className="md:col-span-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-purple-400" />
                        Education
                      </h2>
                      <button
                        onClick={addEducation}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-transform"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {education.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">
                          No education added yet. Click "Add" to get started.
                        </p>
                      ) : (
                        education.map((edu) => (
                          <div key={edu.id} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                            <div className="flex justify-end mb-3">
                              <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                placeholder="Institution *"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Degree *"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                placeholder="Field of Study"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                placeholder="Start Date"
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                placeholder="End Date"
                                disabled={edu.current}
                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`current-edu-${edu.id}`}
                                  checked={edu.current}
                                  onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                                  className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor={`current-edu-${edu.id}`} className="text-sm text-gray-300">
                                  Currently studying
                                </label>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Award className="w-6 h-6 text-purple-400" />
                        Skills
                      </h2>
                      <button
                        onClick={addSkill}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-transform"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {skills.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">
                          No skills added yet. Click "Add" to get started.
                        </p>
                      ) : (
                        skills.map((skill) => (
                          <div key={skill.id} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                            <div className="flex items-center gap-4">
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                                placeholder="Skill name *"
                                className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">Level:</span>
                                <input
                                  type="range"
                                  min="1"
                                  max="5"
                                  value={skill.level}
                                  onChange={(e) => updateSkill(skill.id, "level", parseInt(e.target.value))}
                                  className="w-32"
                                />
                                <span className="text-sm font-medium text-purple-400 w-8">{skill.level}/5</span>
                              </div>
                              <button
                                onClick={() => removeSkill(skill.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Preview Section */
              <div className="bg-white text-black rounded-2xl shadow-2xl max-w-4xl mx-auto p-12">
                {/* Modern Template Preview */}
                {selectedTemplate === "modern" && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b-4 border-purple-600 pb-6">
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {personalInfo.fullName || "Your Name"}
                      </h1>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {personalInfo.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {personalInfo.email}
                          </div>
                        )}
                        {personalInfo.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {personalInfo.phone}
                          </div>
                        )}
                        {personalInfo.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {personalInfo.location}
                          </div>
                        )}
                      </div>
                      {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                        <div className="flex flex-wrap gap-4 text-sm text-purple-600 mt-2">
                          {personalInfo.website && <div>{personalInfo.website}</div>}
                          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                          {personalInfo.github && <div>{personalInfo.github}</div>}
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Professional Summary</h2>
                        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {experiences.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Work Experience</h2>
                        <div className="space-y-4">
                          {experiences.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">{exp.position || "Position"}</h3>
                                  <p className="text-purple-600 font-medium">{exp.company || "Company"}</p>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                </div>
                              </div>
                              {exp.description && (
                                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
                        <div className="space-y-4">
                          {education.map((edu) => (
                            <div key={edu.id}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">
                                    {edu.degree || "Degree"}
                                    {edu.field && ` in ${edu.field}`}
                                  </h3>
                                  <p className="text-purple-600 font-medium">{edu.institution || "Institution"}</p>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
                        <div className="space-y-3">
                          {skills.map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-900 font-medium">{skill.name || "Skill"}</span>
                                <span className="text-gray-600 text-sm">{skill.level}/5</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                                  style={{ width: `${(skill.level / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!personalInfo.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Fill in your information in the Edit tab to see your resume preview
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-3">💡 Tips for a Great Resume</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Keep it concise - aim for 1-2 pages maximum</li>
              <li>• Use action verbs to describe your accomplishments</li>
              <li>• Quantify your achievements with numbers and metrics</li>
              <li>• Tailor your resume for each job application</li>
              <li>• Proofread carefully for spelling and grammar errors</li>
              <li>• Use the preview button to see how your resume looks before downloading</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

