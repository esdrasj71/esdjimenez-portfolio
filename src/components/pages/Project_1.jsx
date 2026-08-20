import { RevealOnScroll } from "../RevealOnScroll";
import { useNavigate } from "react-router-dom";

export const Project_1 = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen py-24 bg-[#F7F9FC]">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-3">
          <div className="mb-6 p-6">
            <h1 className="text-4xl font-bold mb-3 text-slate-800">
              Project Management Platform
            </h1>
            <p className="text-md text-slate-600 max-w-56xl leading-relaxed">
              A full-stack project management platform designed to streamline team collaboration, 
              track project progress in real-time, and optimize workflow efficiency. This platform empowers 
              organizations to manage multiple projects simultaneously, assign tasks effectively, 
              monitor team performance, and deliver results faster through automated 
              workflows and intelligent reporting systems.
            </p>
          </div>

          <div className="mb-8">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="text-5xl mb-3">📊</div>
                  <h3 className="text-xl font-semibold text-slate-700">Project Dashboard Preview</h3>
                  <p className="text-slate-500 text-sm mt-1">Screenshot of the main dashboard interface</p>
                  <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                    Coming Soon: Live Demo
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What It Does Section with Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Project Tracking</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Manage multiple projects with real-time progress tracking, milestone management, 
                  and automated status updates.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Team Collaboration</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Assign tasks, share files, and communicate with team members through 
                  integrated chat and notification systems.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Analytics & Reports</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Generate detailed reports on project performance, team productivity, 
                  and resource allocation with visual dashboards.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* How It Works Section */}
          <div className="mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-slate-900">How It Works</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">Create Project</h4>
                  <p className="text-sm text-slate-600">Set up a new project with details, team members, and timeline</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">Assign Tasks</h4>
                  <p className="text-sm text-slate-600">Break down projects into tasks and assign them to team members</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">Track Progress</h4>
                  <p className="text-sm text-slate-600">Monitor task completion, update statuses, and track milestones</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">Deliver Results</h4>
                  <p className="text-sm text-slate-600">Complete projects on time with full transparency and reporting</p>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">Technologies Used</h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  ReactJS
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Node.js
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  ExpressJS
                </span>
                <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  PostgreSQL
                </span>
                <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  JWT Authentication
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  WebSocket
                </span>
              </div>
            </RevealOnScroll>
          </div>

          <div className="mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">Key Features</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-md">Real-time Notifications</h3>
                    <p className="text-sm text-slate-600">Instant updates on task assignments, comments, and status changes</p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">Role-Based Access</h4>
                    <p className="text-sm text-slate-600">Different permissions for admins, project managers, and team members</p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">Email Automation</h4>
                    <p className="text-sm text-slate-600">Automated email notifications for project updates and deadlines</p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">Progress Dashboard</h4>
                    <p className="text-sm text-slate-600">Visual analytics and charts to track project health and team performance</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md"
            >
              🚀 Live Demo
            </a>
            <a
              href="https://github.com/esdrasj71/Project-Management-Platform"
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-900 hover:scale-105 transition-all duration-300 shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.297C5.374 0.297 0 5.671 0 12.297c0 5.29 3.438 9.774 8.205 11.363.6.111.82-.26.82-.577 0-.285-.011-1.041-.017-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.494.997.108-.775.42-1.304.763-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.309.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.873.119 3.176.77.84 1.233 1.912 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.219.694.825.576C20.565 22.068 24 17.584 24 12.297 24 5.671 18.627.297 12 .297z" />
              </svg>
              Source Code
            </a>
          </div>

          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-xl">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> This project is currently in development. Links to live demo will be available soon.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default Project_1;