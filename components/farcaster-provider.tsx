"use client"

import React, { useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

interface FarcasterProviderProps {
  children: React.ReactNode
}

export function FarcasterProvider({ children }: FarcasterProviderProps) {
  useEffect(() => {
    // Initialize Farcaster SDK
    const initializeFarcaster = async () => {
      try {
        // Check if we're in a Farcaster frame
        if (sdk.context.isFrame) {
          // Initialize the SDK
          await sdk.actions.ready()
          
          // Optional: Set up event listeners
          sdk.context.on('theme', (theme) => {
            console.log('Theme changed:', theme)
          })
          
          console.log('Farcaster SDK initialized successfully')
        }
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error)
      }
    }

    initializeFarcaster()
  }, [])

  return <>{children}</>
}
