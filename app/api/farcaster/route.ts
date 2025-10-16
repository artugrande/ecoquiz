import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    frame: {
      name: "EcoQuiz",
      version: "1",
      iconUrl: "https://ecoquiz-henna.vercel.app/icon.png",
      homeUrl: "https://ecoquiz-henna.vercel.app/",
      imageUrl: "https://ecoquiz-henna.vercel.app/image.png",
      splashImageUrl: "https://ecoquiz-henna.vercel.app/splash.png",
      splashBackgroundColor: "#2E7D32",
      webhookUrl: "https://ecoquiz-henna.vercel.app/api/webhook",
      subtitle: "Learn and care for the planet while you play",
      description: "EcoQuiz is an educational app that blends fun and environmental awareness. Answer quizzes about ecology, sustainability, and climate change — earn points and discover how your actions can make a positive impact on the world. 🌱✨",
      primaryCategory: "education"
    }
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
