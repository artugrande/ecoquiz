import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the webhook data for debugging
    console.log('Webhook received:', JSON.stringify(body, null, 2))
    
    // Handle different types of webhook events
    if (body.type === 'frame_action') {
      // Handle frame interactions
      const { fid, buttonIndex, inputText } = body.data
      
      console.log(`Frame action from user ${fid}, button ${buttonIndex}, input: ${inputText}`)
      
      // You can add your frame logic here
      return NextResponse.json({ 
        success: true, 
        message: 'Frame action processed' 
      })
    }
    
    if (body.type === 'user_registration') {
      // Handle new user registrations
      const { fid } = body.data
      
      console.log(`New user registered: ${fid}`)
      
      return NextResponse.json({ 
        success: true, 
        message: 'User registration processed' 
      })
    }
    
    // Default response for unknown event types
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received' 
    })
    
  } catch (error) {
    console.error('Webhook error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'EcoQuiz Webhook Endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}
