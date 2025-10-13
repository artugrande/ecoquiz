"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizData } from "@/lib/quiz-data"
import { Leaf, Clock, CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import { PaymentGate } from "@/components/payment-gate"

type QuizState = "welcome" | "quiz" | "results" | "review" | "payment"
type Answer = number | null

export default function EcoQuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("welcome")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>(Array(10).fill(null))
  const [timeLeft, setTimeLeft] = useState(quizData[0].timeLimit)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  // Timer logic
  useEffect(() => {
    if (quizState !== "quiz") return

    if (timeLeft === 0) {
      handleTimeout()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, quizState, currentQuestion])

  const handleTimeout = () => {
    // Record as incorrect (null answer)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = null
    setUserAnswers(newAnswers)

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(quizData[currentQuestion + 1].timeLimit)
    } else {
      calculateScore(newAnswers)
      setQuizState("results")
    }
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1)
        setTimeLeft(quizData[currentQuestion + 1].timeLimit)
      } else {
        calculateScore(newAnswers)
        setQuizState("results")
      }
    }, 300)
  }

  const calculateScore = (answers: Answer[]) => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++
      }
    })
    setScore(correct)
  }

  const startQuiz = () => {
    setQuizState("quiz")
    setCurrentQuestion(0)
    setUserAnswers(Array(10).fill(null))
    setTimeLeft(quizData[0].timeLimit)
    setScore(0)
    setShowScore(false)
  }

  const handlePaymentSuccess = () => {
    setShowScore(true)
    setQuizState("results")
  }

  const handlePaymentCancel = () => {
    setQuizState("results")
  }

  const restartQuiz = () => {
    startQuiz()
  }

  if (quizState === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Eco Quiz</h1>
            <p className="text-muted-foreground text-pretty">
              Test your environmental awareness with 10 timed questions
            </p>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4" />
              <span>15-25 seconds per question</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="w-4 h-4" />
              <span>10 questions covering key environmental topics</span>
            </div>
          </div>
          <Button onClick={startQuiz} size="lg" className="w-full">
            Start Quiz
          </Button>
        </Card>
      </div>
    )
  }

  if (quizState === "quiz") {
    const question = quizData[currentQuestion]
    const progress = ((currentQuestion + 1) / 10) * 100

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-6 space-y-6">
          {/* Progress and Timer */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Question {currentQuestion + 1} of 10</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className={`font-mono font-semibold ${timeLeft <= 5 ? "text-destructive" : "text-foreground"}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-balance leading-relaxed">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  variant="outline"
                  className="w-full h-auto py-4 px-6 text-left justify-start hover:bg-primary/10 hover:border-primary hover:text-foreground transition-colors"
                >
                  <span className="text-base leading-relaxed">{option}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (quizState === "results") {
    const ecoScore = (score / 10) * 100

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Quiz Complete!</h2>
            <p className="text-muted-foreground">You answered {score} out of 10 questions correctly</p>
          </div>

          {!showScore ? (
            <Button onClick={() => setQuizState("payment")} size="lg" className="w-full">
              See Eco Score
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-6 bg-primary/10 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Your Eco Score</p>
                <p className="text-5xl font-bold text-primary">{ecoScore}%</p>
                <p className="text-xs text-muted-foreground">Formula: (Correct Answers / 10) × 100</p>
              </div>

              <div className="text-sm text-muted-foreground text-pretty">
                {ecoScore >= 80 && "Excellent! You're an eco champion! 🌟"}
                {ecoScore >= 60 && ecoScore < 80 && "Great job! You have solid environmental awareness! 🌱"}
                {ecoScore >= 40 && ecoScore < 60 && "Good effort! Keep learning about sustainability! 🌿"}
                {ecoScore < 40 && "Every journey starts somewhere! Check the review to learn more! 🌍"}
              </div>

              <div className="space-y-2">
                <Button onClick={() => setQuizState("review")} variant="outline" className="w-full">
                  Review Answers
                </Button>
                <Button onClick={restartQuiz} variant="ghost" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    )
  }

  if (quizState === "review") {
    return (
      <div className="min-h-screen p-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Answer Review</h2>
            <p className="text-muted-foreground">
              Your score: {score}/10 ({((score / 10) * 100).toFixed(0)}%)
            </p>
          </div>

          <div className="space-y-4">
            {quizData.map((question, qIndex) => {
              const userAnswer = userAnswers[qIndex]
              const isCorrect = userAnswer === question.correctAnswer
              const wasTimeout = userAnswer === null

              return (
                <Card key={qIndex} className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Question {qIndex + 1}</p>
                        <p className="font-semibold text-balance leading-relaxed">{question.question}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Your answer: </span>
                          <span
                            className={
                              wasTimeout
                                ? "text-muted-foreground italic"
                                : isCorrect
                                  ? "text-success font-medium"
                                  : "text-destructive"
                            }
                          >
                            {wasTimeout ? "No answer (time expired)" : question.options[userAnswer]}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div>
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-success font-medium">{question.options[question.correctAnswer]}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary mb-1">💡 Eco Tip</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{question.ecoTip}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="flex gap-3">
            <Button onClick={restartQuiz} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button onClick={() => setQuizState("welcome")} variant="outline" className="flex-1">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (quizState === "payment") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <PaymentGate
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    )
  }

  return null
}
