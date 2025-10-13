import React, { useState, useCallback } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi'
import { parseEther } from 'viem'
import { celo, celoAlfajores } from 'wagmi/chains'
import { PAYMENT_RECIPIENT, PAYMENT_AMOUNT, celoChains } from '@/lib/wagmi-config'

export type PaymentState = 
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'switching_chain'
  | 'sending'
  | 'confirming'
  | 'success'
  | 'error'

export interface PaymentError {
  code: string
  message: string
}

export interface UsePayToRevealScoreReturn {
  // State
  paymentState: PaymentState
  error: PaymentError | null
  isConnected: boolean
  isCorrectChain: boolean
  currentChain: number | undefined
  
  // Actions
  connectWallet: () => Promise<void>
  sendPayment: () => Promise<void>
  resetPayment: () => void
  
  // Transaction data
  transactionHash: string | undefined
  isTransactionConfirmed: boolean
}

export function usePayToRevealScore(): UsePayToRevealScoreReturn {
  const [paymentState, setPaymentState] = useState<PaymentState>('idle')
  const [error, setError] = useState<PaymentError | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | undefined>()

  // Wagmi hooks
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  
  const { sendTransaction, data: sendData, error: sendError, isPending: isSending } = useSendTransaction()
  const { 
    isLoading: isConfirming, 
    isSuccess: isTransactionConfirmed,
    error: receiptError 
  } = useWaitForTransactionReceipt({
    hash: sendData,
  })

  // Check if user is on correct chain (CELO mainnet or Alfajores testnet)
  const isCorrectChain = celoChains.some(chain => chain.id === chainId)

  // Reset payment state
  const resetPayment = useCallback(() => {
    setPaymentState('idle')
    setError(null)
    setTransactionHash(undefined)
  }, [])

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      setPaymentState('connecting')
      setError(null)

      // In a Farcaster frame, the wallet should already be connected
      // This function mainly handles chain switching if needed
      if (!isConnected) {
        throw new Error('Wallet not connected. Please connect your wallet first.')
      }

      setPaymentState('connected')

      // Check if we need to switch chains
      if (!isCorrectChain) {
        setPaymentState('switching_chain')
        await switchChain({ chainId: celo.id }) // Switch to CELO mainnet
        setPaymentState('connected')
      }
    } catch (err: any) {
      setPaymentState('error')
      setError({
        code: 'CONNECTION_ERROR',
        message: err.message || 'Failed to connect wallet'
      })
    }
  }, [isConnected, isCorrectChain, switchChain])

  // Send payment transaction
  const sendPayment = useCallback(async () => {
    try {
      if (!isConnected) {
        throw new Error('Wallet not connected')
      }

      if (!isCorrectChain) {
        throw new Error('Please switch to CELO network')
      }

      setPaymentState('sending')
      setError(null)

      // Send 0.1 CELO to the recipient
      const hash = await sendTransaction({
        to: PAYMENT_RECIPIENT as `0x${string}`,
        value: parseEther(PAYMENT_AMOUNT),
        chainId: celo.id,
      })

      setTransactionHash(hash)
      setPaymentState('confirming')
    } catch (err: any) {
      setPaymentState('error')
      setError({
        code: 'TRANSACTION_ERROR',
        message: err.message || 'Failed to send payment'
      })
    }
  }, [isConnected, isCorrectChain, sendTransaction])

  // Update state based on transaction status
  React.useEffect(() => {
    if (isSending) {
      setPaymentState('sending')
    } else if (isConfirming) {
      setPaymentState('confirming')
    } else if (isTransactionConfirmed) {
      setPaymentState('success')
    } else if (sendError || receiptError) {
      setPaymentState('error')
      setError({
        code: 'TRANSACTION_ERROR',
        message: (sendError || receiptError)?.message || 'Transaction failed'
      })
    }
  }, [isSending, isConfirming, isTransactionConfirmed, sendError, receiptError])

  return {
    // State
    paymentState,
    error,
    isConnected,
    isCorrectChain,
    currentChain: chainId,
    
    // Actions
    connectWallet,
    sendPayment,
    resetPayment,
    
    // Transaction data
    transactionHash,
    isTransactionConfirmed,
  }
}
