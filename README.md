# Eco Quiz - Farcaster Miniapp with CELO Payments

An environmental awareness quiz built as a Farcaster miniapp that requires users to pay 0.1 CELO to reveal their final eco score.

## Features

- 🌱 Interactive environmental awareness quiz with 10 timed questions
- 💰 Payment-gated score reveal (0.1 CELO required)
- 🔗 Farcaster miniapp integration with frame SDK
- 💳 CELO blockchain payments via wagmi
- 📱 Responsive design optimized for mobile and desktop
- 🎯 Real-time quiz with countdown timer
- 📊 Detailed answer review with eco tips

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Blockchain**: wagmi, viem, CELO network
- **Farcaster**: @farcaster/frame-sdk, @farcaster/frame-wagmi-connector
- **State Management**: React hooks, React Query

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# WalletConnect Project ID (get from https://cloud.reown.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id-here

# Your wallet address to receive payments
NEXT_PUBLIC_PAYMENT_RECIPIENT=0x1234567890123456789012345678901234567890
```

### 3. Configure Payment Settings

Update the payment configuration in `lib/wagmi-config.ts`:

```typescript
// Replace with your actual wallet address
export const PAYMENT_RECIPIENT = '0x1234567890123456789012345678901234567890'
export const PAYMENT_AMOUNT = '0.1' // 0.1 CELO
```

### 4. Farcaster Manifest

Update the Farcaster manifest in `.well-known/farcaster.json`:

```json
{
  "frame": {
    "name": "Eco Quiz",
    "iconUrl": "https://your-domain.com/icon.png",
    "homeUrl": "https://your-domain.com",
    "imageUrl": "https://your-domain.com/frame-image.png",
    "webhookUrl": "https://your-domain.com/api/webhook"
  }
}
```

### 5. Deploy and Configure

1. Deploy your app to a hosting service (Vercel, Netlify, etc.)
2. Update all URLs in the manifest and configuration files
3. Register your miniapp with Farcaster

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## How It Works

### Quiz Flow

1. **Welcome Screen**: Users see the quiz introduction
2. **Quiz Questions**: 10 timed questions about environmental topics
3. **Results Screen**: Shows completion status
4. **Payment Gate**: Users must pay 0.1 CELO to see their score
5. **Score Reveal**: Shows detailed eco score and feedback
6. **Review**: Optional answer review with eco tips

### Payment Integration

The app uses a custom hook `usePayToRevealScore` that:

- Connects to user's wallet via Farcaster frame
- Switches to CELO network if needed
- Sends exactly 0.1 CELO to your wallet address
- Waits for transaction confirmation
- Only reveals the score after successful payment

### Farcaster Integration

- Uses `@farcaster/frame-sdk` for frame communication
- Integrates with `@farcaster/frame-wagmi-connector` for wallet connectivity
- Supports Farcaster's native wallet integration
- Handles frame-specific UI and interactions

## File Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main quiz component
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Radix UI components
│   ├── payment-gate.tsx    # Payment interface
│   ├── wagmi-provider.tsx  # Wagmi configuration
│   └── farcaster-provider.tsx # Farcaster SDK setup
├── hooks/
│   └── use-pay-to-reveal-score.ts # Payment logic hook
├── lib/
│   ├── wagmi-config.ts     # Wagmi and CELO configuration
│   ├── quiz-data.ts        # Quiz questions and data
│   └── utils.ts            # Utility functions
└── .well-known/
    └── farcaster.json      # Farcaster miniapp manifest
```

## Key Components

### usePayToRevealScore Hook

Handles the complete payment flow:

```typescript
const {
  paymentState,      // Current payment state
  error,            // Any errors
  isConnected,      // Wallet connection status
  isCorrectChain,   // CELO network check
  connectWallet,    // Connect wallet function
  sendPayment,      // Send payment function
  resetPayment,     // Reset payment state
  transactionHash,  // Transaction hash
  isTransactionConfirmed // Payment confirmation
} = usePayToRevealScore()
```

### PaymentGate Component

Provides the payment interface with:

- Wallet connection prompts
- Network switching
- Transaction status
- Error handling
- Success confirmation

### Wagmi Configuration

Configured for CELO network with:

- Farcaster frame connector
- CELO mainnet and Alfajores testnet
- Proper RPC endpoints
- Gas settings optimization

## Security Considerations

- Always validate transactions on-chain
- Use proper error handling for failed payments
- Implement rate limiting for payment attempts
- Store transaction hashes for verification
- Consider implementing refund mechanisms

## Testing

For testing, you can:

1. Use CELO Alfajores testnet
2. Get test CELO from the faucet
3. Test the complete payment flow
4. Verify transaction confirmations

## Deployment

1. Build the application: `pnpm build`
2. Deploy to your hosting platform
3. Update all URLs in configuration files
4. Register with Farcaster
5. Test the complete flow

## Support

For issues or questions:

- Check the Farcaster documentation
- Review wagmi and viem documentation
- Test with CELO testnet first
- Verify all configuration settings

## License

MIT License - see LICENSE file for details
