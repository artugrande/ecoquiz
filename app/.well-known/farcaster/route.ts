import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjEzNzgwNTMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhmRGNERUI1NjJCQWZlZUVFNmQ2OWQ1ZTkwMWY3RTEwNzZjMTc2MDY3In0",
      payload: "eyJkb21haW4iOiJlY29xdWl6LWhlbm5hLnZlcmNlbC5hcHAifQ",
      signature: "M4KKdVMJv8voCxebv9E1g4F7vOsbmIE3JB+QzQcUX7Jaj7yknkHDmAQcFPk30YGoQvcyYJLkVmSqtIpv8+bzoBw="
    },
    frame: {
      version: "1.1",
      name: "EcoQuiz",
      iconUrl: "https://ecoquiz-henna.vercel.app/icon.png",
      homeUrl: "https://ecoquiz-henna.vercel.app",
      imageUrl: "https://ecoquiz-henna.vercel.app/icon.png",
      buttonTitle: "Open EcoQuiz",
      splashImageUrl: "https://ecoquiz-henna.vercel.app/splash.png",
      splashBackgroundColor: "#2E7D32"
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
