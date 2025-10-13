"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Wallet, AlertCircle, CheckCircle2, ExternalLink, LogOut, RefreshCw } from 'lucide-react'
import { usePayToRevealScore, PaymentState } from '@/hooks/use-pay-to-reveal-score'
import { useAccount, useDisconnect, useConnectors } from 'wagmi'
import { PAYMENT_AMOUNT, formatCeloAmount } from '@/lib/wagmi-config'

interface PaymentGateProps {
  onPaymentSuccess: () => void
  onCancel?: () => void
}

export function PaymentGate({ onPaymentSuccess, onCancel }: PaymentGateProps) {
  const {
    paymentState,
    error,
    isConnected,
    isCorrectChain,
    currentChain,
    connectWallet,
    sendPayment,
    resetPayment,
    transactionHash,
    isTransactionConfirmed,
  } = usePayToRevealScore()

  // Additional wagmi hooks for wallet management
  const { address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const connectors = useConnectors()

  // Handle payment success
  React.useEffect(() => {
    if (paymentState === 'success' && isTransactionConfirmed) {
      onPaymentSuccess()
    }
  }, [paymentState, isTransactionConfirmed, onPaymentSuccess])

  const handleConnectAndPay = async () => {
    if (!isConnected) {
      await connectWallet()
    } else {
      await sendPayment()
    }
  }

  const handleDisconnect = () => {
    disconnect()
    resetPayment()
  }

  const handleConnectDifferentWallet = async () => {
    disconnect()
    resetPayment()
    // Small delay to ensure disconnect is processed
    setTimeout(() => {
      connectWallet()
    }, 100)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getConnectorName = (connector: any) => {
    if (!connector) return 'Unknown'
    return connector.name || connector.id || 'Wallet'
  }

  const getButtonText = () => {
    switch (paymentState) {
      case 'connecting':
        return 'Connecting...'
      case 'switching_chain':
        return 'Switching to CELO...'
      case 'sending':
        return 'Sending Payment...'
      case 'confirming':
        return 'Confirming Transaction...'
      case 'success':
        return 'Payment Successful!'
      default:
        if (isConnected) {
          return `Pay ${formatCeloAmount(PAYMENT_AMOUNT)} to See Score`
        }
        return 'Connect Wallet & Pay'
    }
  }

  const getButtonIcon = () => {
    switch (paymentState) {
      case 'connecting':
      case 'switching_chain':
      case 'sending':
      case 'confirming':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'success':
        return <CheckCircle2 className="w-4 h-4" />
      default:
        return <Wallet className="w-4 h-4" />
    }
  }

  const isButtonDisabled = () => {
    return ['connecting', 'switching_chain', 'sending', 'confirming', 'success'].includes(paymentState)
  }

  return (
    <Card className="w-full max-w-md p-8 text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Unlock Your Eco Score</h2>
        <p className="text-muted-foreground">
          Pay {formatCeloAmount(PAYMENT_AMOUNT)} to reveal your environmental awareness score
        </p>
      </div>

      {/* Connection Status */}
      {isConnected && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Wallet Connected</span>
            </div>
            <Button
              onClick={handleDisconnect}
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-green-600 hover:text-green-800"
            >
              <LogOut className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-600">Wallet:</span>
              <span className="font-medium text-green-800">
                {getConnectorName(connector)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Address:</span>
              <span className="font-mono text-green-800">
                {address ? formatAddress(address) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Network:</span>
              <span className="font-medium text-green-800">
                {isCorrectChain ? 'CELO' : 'Switching...'}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleConnectDifferentWallet}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              disabled={paymentState === 'sending' || paymentState === 'confirming'}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Change Wallet
            </Button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">{error.code}</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Transaction Hash */}
      {transactionHash && (
        <Alert>
          <ExternalLink className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="text-sm font-medium">Transaction Sent</p>
              <a
                href={`https://celoscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                View on CeloScan
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Payment Info */}
      <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Amount:</span>
          <span className="font-medium">{formatCeloAmount(PAYMENT_AMOUNT)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Network:</span>
          <span className="font-medium">CELO</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span className="font-medium capitalize">
            {paymentState.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleConnectAndPay}
          disabled={isButtonDisabled()}
          size="lg"
          className="w-full"
        >
          {getButtonIcon()}
          {getButtonText()}
        </Button>

        {paymentState === 'error' && (
          <Button
            onClick={resetPayment}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Try Again
          </Button>
        )}

        {!isConnected && (
          <div className="text-xs text-muted-foreground text-center">
            Connect your wallet to pay {formatCeloAmount(PAYMENT_AMOUNT)} and see your eco score
          </div>
        )}

        {onCancel && paymentState !== 'success' && (
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            Cancel
          </Button>
        )}
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Make sure you have enough CELO for the payment and gas fees</p>
        <p>• The transaction will be processed on the CELO network</p>
        <p>• Your score will be revealed once payment is confirmed</p>
      </div>
    </Card>
  )
}
