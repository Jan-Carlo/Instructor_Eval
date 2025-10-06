"use client"

import { useState } from "react"
import { Search, MapPin, User, Star, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EvaluationForm } from "@/components/evaluation-form"
import { useAuth } from "@/lib/auth-context"

// Mock data for demonstration
const mockInstructors = [
  {
    id: "1",
    name: "Dr. John Smith",
    department: "Computer Science",
    office: "Room 301, Science Building",
    status: "active",
    courses: ["CS101 - Introduction to Programming", "CS201 - Data Structures"],
    rating: 4.5,
    totalEvaluations: 45,
  },
  {
    id: "2",
    name: "Prof. Mary Johnson",
    department: "Mathematics",
    office: "Room 205, Math Building",
    status: "active",
    courses: ["MATH101 - Calculus I", "MATH201 - Linear Algebra"],
    rating: 4.8,
    totalEvaluations: 32,
  },
  {
    id: "3",
    name: "Dr. David Brown",
    department: "Physics",
    office: "Room 150, Physics Building",
    status: "active",
    courses: ["PHYS101 - General Physics", "PHYS201 - Modern Physics"],
    rating: 4.2,
    totalEvaluations: 28,
  },
]

export function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null)
  const [showEvaluationForm, setShowEvaluationForm] = useState(false)
  const [evaluatingInstructor, setEvaluatingInstructor] = useState<any>(null)

  const { user, logout } = useAuth()

  const filteredInstructors = mockInstructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.courses.some((course) => course.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleEvaluateClick = (instructorId: string) => {
    const instructor = mockInstructors.find((i) => i.id === instructorId)
    if (instructor) {
      setEvaluatingInstructor(instructor)
      setShowEvaluationForm(true)
    }
  }

  const handleCloseEvaluation = () => {
    setShowEvaluationForm(false)
    setEvaluatingInstructor(null)
  }

  if (showEvaluationForm && evaluatingInstructor) {
    return <EvaluationForm instructor={evaluatingInstructor} onClose={handleCloseEvaluation} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Instructor Evaluation System</h1>
              <p className="text-muted-foreground mt-1">Find and evaluate your instructors</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Welcome, {user?.firstName} {user?.lastName}
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                <User className="w-4 h-4 mr-1" />
                Student Portal
              </Badge>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by instructor name, department, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              {searchQuery ? `Search Results (${filteredInstructors.length})` : "All Instructors"}
            </h2>
          </div>

          {/* Instructor Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onMouseEnter={() => setSelectedInstructor(instructor.id)}
                onMouseLeave={() => setSelectedInstructor(null)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold text-foreground">{instructor.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {instructor.department}
                      </CardDescription>
                    </div>
                    <Badge variant={instructor.status === "active" ? "default" : "secondary"} className="text-xs">
                      {instructor.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Office Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{instructor.office}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{instructor.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({instructor.totalEvaluations} evaluations)</span>
                  </div>

                  {/* Courses */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Courses:</p>
                    <div className="space-y-1">
                      {instructor.courses.map((course, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {course}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Evaluate Button */}
                  <div className="pt-2">
                    <Button
                      onClick={() => handleEvaluateClick(instructor.id)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="sm"
                    >
                      EVALUATE INSTRUCTOR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredInstructors.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No instructors found</h3>
                <p>Try adjusting your search terms or browse all instructors.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
