import { createConfig, http } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { farcasterFrame } from '@farcaster/miniapp-wagmi-connector'
import { injected, walletConnect } from 'wagmi/connectors'

// Your wallet address to receive payments
export const PAYMENT_RECIPIENT = process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT || '0x9c3Cf7A804C7c17B945250AAA6a0530690EAff54'
export const PAYMENT_AMOUNT = '0.1' // 0.1 CELO

// CELO chain configuration
export const celoChains = [celo, celoAlfajores]

// Create wagmi config with Farcaster frame connector
export const wagmiConfig = createConfig({
  chains: celoChains,
  connectors: [
    farcasterFrame(),
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'e959d8df1f4c30db205a24cb784d7e3e',
    }),
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
})

// Helper function to get the current chain
export const getCurrentChain = () => {
  return celoChains[0] // Default to mainnet CELO
}

// Helper function to format CELO amount
export const formatCeloAmount = (amount: string) => {
  return `${amount} CELO`
}

// Helper function to get transaction gas settings
export const getTransactionGasSettings = () => {
  return {
    gas: 21000n, // Standard ETH transfer gas limit
    gasPrice: undefined, // Let the network determine gas price
  }
}
