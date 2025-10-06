"use client"

import type React from "react"
import { Link } from "react-router"
import { useState } from "react"
import { Star, Users, BarChart3, Shield, ArrowRight, CheckCircle } from "lucide-react"



export default function InstructorEvaluationLanding() {
  const [email, setEmail] = useState("")

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`Thank you! We'll send you access details at ${email}`)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e6b012] to-[#d4a012] flex items-center justify-center font-bold text-white text-lg shadow-lg">
                CSU
              </div>
              <span className="text-xl font-bold text-[#11491b]">Evaluation Portal</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-[#11491b] font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#11491b] font-medium transition-colors">
                How it Works
              </a>
              <a href="#contact" className="text-gray-600 hover:text-[#11491b] font-medium transition-colors">
                Contact
              </a>
              <Link to="./components/login-form">
                <button className="bg-[#11491b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0d3614] transition-colors">
                  Sign In
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#11491b]/5 via-white to-[#e6b012]/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#e6b012]/10 text-[#e6b012] px-4 py-2 rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4 animate-spin" />
                  AI-Powered Feedback System
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-[#11491b] leading-tight text-balance">
                  Transform Education with
                  <span className="text-[#e6b012]"> Smart Evaluations</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                  Empower students and instructors with intelligent feedback systems that drive meaningful improvements
                  in teaching and learning outcomes.
                </p>
              </div>

              <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your CSU email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#e6b012] focus:border-[#e6b012] outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#11491b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d3614] transition-colors flex items-center gap-2 justify-center"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e6b012]" />
                  Free for CSU students
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e6b012]" />
                  Instant setup
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#e6b012]/10 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-[#e6b012]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#11491b]">Real-time Analytics</h3>
                      <p className="text-sm text-gray-500">Track performance instantly</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Student Engagement</span>
                      <span className="font-semibold text-[#11491b]">94%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#e6b012] h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Feedback Quality</span>
                      <span className="font-semibold text-[#11491b]">98%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#11491b] h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#11491b] text-balance">
              Everything you need for effective evaluations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Our comprehensive platform provides tools for both students and instructors to create meaningful feedback
              loops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#e6b012]/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-[#e6b012]" />
              </div>
              <h3 className="text-xl font-semibold text-[#11491b] mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Get intelligent analysis of feedback patterns and actionable recommendations for improvement.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#11491b]/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#11491b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#11491b] mb-3">Student-Centered Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface that encourages honest, constructive feedback from students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#e6b012]/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#e6b012]" />
              </div>
              <h3 className="text-xl font-semibold text-[#11491b] mb-3">Privacy & Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Anonymous feedback options with enterprise-grade security to protect all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#11491b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-balance">
              Ready to revolutionize your classroom?
            </h2>
            <p className="text-xl text-white/80 text-pretty">
              Join thousands of educators already using our platform to enhance teaching effectiveness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#e6b012] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#d4a012] transition-colors text-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#11491b] transition-colors text-lg">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#e6b012] flex items-center justify-center font-bold text-white text-sm">
                  CSU
                </div>
                <span className="font-bold">Evaluation Portal</span>
              </div>
              <p className="text-gray-400 text-sm">Transforming education through intelligent feedback systems.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} CSU Evaluation Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
