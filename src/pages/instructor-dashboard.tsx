"use client"

import { useState } from "react"
import { BookOpen, Users, TrendingUp, MessageSquare, Smile, Frown, Star, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"

// Mock data for demonstration
const mockInstructorData = {
  instructor: {
    name: "Dr. John Smith",
    department: "Computer Science",
    courses: [
      { id: "1", code: "CS101", name: "Introduction to Programming", year: 2024, semester: "Fall" },
      { id: "2", code: "CS201", name: "Data Structures", year: 2024, semester: "Fall" },
    ],
  },
  courseData: {
    "1": {
      overallRating: 4.3,
      totalEvaluations: 45,
      categoryAverages: {
        teaching: 4.5,
        materials: 4.1,
        communication: 4.3,
      },
      sentiment: "positive", // positive, negative, neutral
      aiAnalysis: {
        positiveSummary:
          "Students consistently praise your clear explanations and engaging teaching style. Many appreciate your patience with beginners and your ability to make complex programming concepts accessible. Your enthusiasm for the subject matter is frequently mentioned as motivating.",
        improvementAreas:
          "Some students suggest providing more practical examples and hands-on exercises. A few mentioned that the pace could be adjusted for different learning speeds. Consider offering additional office hours during exam periods.",
        strengths: [
          "Clear and engaging explanations",
          "Patient with student questions",
          "Enthusiastic about subject matter",
          "Well-organized course structure",
        ],
        weaknesses: [
          "Could use more practical examples",
          "Pace sometimes too fast for beginners",
          "Limited office hours during busy periods",
        ],
        recommendations: [
          "Incorporate more hands-on coding exercises in lectures",
          "Consider flipped classroom approach for complex topics",
          "Provide additional practice problems with solutions",
          "Offer extended office hours before major assignments",
        ],
      },
      comments: [
        {
          id: "1",
          category: "teaching",
          text: "Professor Smith explains concepts very clearly and makes programming fun to learn. His examples are always relevant and easy to understand.",
          sentiment: "positive",
        },
        {
          id: "2",
          category: "materials",
          text: "The course materials are comprehensive and well-organized. The textbook recommendations were very helpful.",
          sentiment: "positive",
        },
        {
          id: "3",
          category: "communication",
          text: "Always available during office hours and responds to emails quickly. Very approachable and helpful.",
          sentiment: "positive",
        },
        {
          id: "4",
          category: "teaching",
          text: "Sometimes the pace is a bit fast for beginners. Would appreciate more time on difficult concepts.",
          sentiment: "neutral",
        },
        {
          id: "5",
          category: "materials",
          text: "Could use more practical examples and real-world applications of the concepts we learn.",
          sentiment: "neutral",
        },
      ],
    },
  },
}

export function InstructorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState("1")
  const [showAllComments, setShowAllComments] = useState(false)

  const { user, logout } = useAuth()

  const currentCourseData = mockInstructorData.courseData[selectedCourse as keyof typeof mockInstructorData.courseData]
  const selectedCourseInfo = mockInstructorData.instructor.courses.find((c) => c.id === selectedCourse)

  const getSentimentIcon = (rating: number) => {
    if (rating >= 4.0) {
      return <Smile className="w-8 h-8 text-green-500" />
    } else if (rating >= 3.0) {
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm">😐</div>
      )
    } else {
      return <Frown className="w-8 h-8 text-red-500" />
    }
  }

  const getSentimentColor = (rating: number) => {
    if (rating >= 4.0) return "text-green-600"
    if (rating >= 3.0) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                {user?.firstName} {user?.lastName} - {mockInstructorData.instructor.department}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                Instructor Portal
              </Badge>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Course Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Select Course:</span>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockInstructorData.instructor.courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.code} - {course.name} ({course.semester} {course.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
              {getSentimentIcon(currentCourseData.overallRating)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCourseData.overallRating}/5.0</div>
              <p className="text-xs text-muted-foreground">Based on {currentCourseData.totalEvaluations} evaluations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teaching</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCourseData.categoryAverages.teaching}/5.0</div>
              <Progress value={currentCourseData.categoryAverages.teaching * 20} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Materials</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCourseData.categoryAverages.materials}/5.0</div>
              <Progress value={currentCourseData.categoryAverages.materials * 20} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Communication</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCourseData.categoryAverages.communication}/5.0</div>
              <Progress value={currentCourseData.categoryAverages.communication * 20} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Positive Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Smile className="w-5 h-5" />
                Positive Feedback Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">{currentCourseData.aiAnalysis.positiveSummary}</p>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <TrendingUp className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">{currentCourseData.aiAnalysis.improvementAreas}</p>
            </CardContent>
          </Card>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Your Strengths</CardTitle>
              <CardDescription>What students appreciate most about your teaching</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentCourseData.aiAnalysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas to Focus On */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Areas to Focus On</CardTitle>
              <CardDescription>Opportunities for growth and development</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentCourseData.aiAnalysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Star className="w-5 h-5" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions to enhance your teaching effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {currentCourseData.aiAnalysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Anonymous Student Comments
              </span>
              <Button variant="outline" size="sm" onClick={() => setShowAllComments(!showAllComments)}>
                {showAllComments ? "Show Less" : "Show All"}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAllComments ? "rotate-180" : ""}`} />
              </Button>
            </CardTitle>
            <CardDescription>All feedback is anonymous to encourage honest and constructive comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(showAllComments ? currentCourseData.comments : currentCourseData.comments.slice(0, 3)).map(
                (comment, index) => (
                  <div key={comment.id} className="border-l-4 border-l-primary/20 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {comment.category}
                      </Badge>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          comment.sentiment === "positive"
                            ? "bg-green-500"
                            : comment.sentiment === "negative"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{comment.text}</p>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
