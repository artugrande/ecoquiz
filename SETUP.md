# Setup Guide for Eco Quiz Farcaster Miniapp

## Quick Start

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
# WalletConnect Project ID (get from https://cloud.reown.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=e959d8df1f4c30db205a24cb784d7e3e

# Your wallet address to receive payments
NEXT_PUBLIC_PAYMENT_RECIPIENT=0x9c3Cf7A804C7c17B945250AAA6a0530690EAff54
```

### 2. Payment Configuration ✅

Your payment configuration is already set up:
- **Wallet Address**: `0x9c3Cf7A804C7c17B945250AAA6a0530690EAff54`
- **Payment Amount**: `0.1 CELO`
- **WalletConnect Project ID**: `e959d8df1f4c30db205a24cb784d7e3e`

### 3. Update Farcaster Manifest

Edit `.well-known/farcaster.json` and replace all placeholder URLs:

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

### 4. WalletConnect Project ID ✅

Your WalletConnect Project ID is already configured: `e959d8df1f4c30db205a24cb784d7e3e`

### 5. Deploy and Test

1. Deploy to Vercel, Netlify, or your preferred platform
2. Update all URLs in configuration files
3. Test with CELO testnet first
4. Register your miniapp with Farcaster

## Testing with CELO Testnet

For testing, you can use CELO Alfajores testnet:

1. Get test CELO from [CELO Faucet](https://faucet.celo.org/)
2. Switch to Alfajores testnet in your wallet
3. Test the complete payment flow
4. Verify transactions on [Alfajores Explorer](https://alfajores.celoscan.io/)

## Production Checklist

- [ ] Update all placeholder URLs
- [ ] Set up proper domain and SSL
- [ ] Configure environment variables
- [ ] Test payment flow thoroughly
- [ ] Register with Farcaster
- [ ] Set up monitoring and analytics
- [ ] Implement error handling
- [ ] Test on mobile devices

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify wallet connection
3. Ensure you're on the correct network
4. Check transaction status on CeloScan
5. Review Farcaster frame documentation
