import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjEyMTUyLCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4MEJGNDVGOTY3RTkwZmZENjA2MzVkMUFDMTk1MDYyYTNBOUZjQzYyQiJ9",
      payload: "eyJkb21haW4iOiJlY29xdWl6LWhlbm5hLnZlcmNlbC5hcHAifQ==",
      signature: "MHhmMTUwMWRjZjRhM2U1NWE1ZjViNGQ5M2JlNGIxYjZiOGE0ZjcwYWQ5YTE1OTNmNDk1NzllNTA2YjJkZGZjYTBlMzI4ZmRiNDZmNmVjZmFhZTU4NjYwYzBiZDc4YjgzMzc2MDAzYTkxNzhkZGIyZGIyZmM5ZDYwYjU2YTlmYzdmMDFj"
    },
    frame: {
      version: "1",
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
