"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router";
import { Eye, EyeOff, User, Lock, GraduationCap, Users } from "lucide-react"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/lib/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"student" | "instructor">("student")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password, role)
      if (success) {
        // Redirect based on role
        if (role === "instructor") {
          router.push("/instructor")
        } else {
          router.push("/")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">I am a:</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as "student" | "instructor")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instructor" id="instructor" />
                <Label htmlFor="instructor" className="flex items-center gap-2 cursor-pointer">
                  <Users className="w-4 h-4" />
                  Instructor
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">{error}</div>}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              <strong>Student:</strong> student1@university.edu / password123
            </p>
            <p>
              <strong>Instructor:</strong> john.smith@university.edu / password123
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
