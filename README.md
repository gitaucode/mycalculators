# MyCalculators

MyCalculators is a practical calculator platform for Kenyan consumers. It includes tools for M-Pesa charges, salary deductions, loans, VAT, utilities, planning, health estimates, and current financial rates.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
pnpm exec tsc --noEmit
pnpm build
```

## Android App

The Android app uses Capacitor and bundles the static Next.js export, so calculators continue to work without a network connection.

Requirements:

- Android Studio with its bundled JDK
- Android SDK 36
- An emulator or connected Android device

Build and sync web changes into the native project:

```bash
pnpm android:sync
```

Open the native project in Android Studio:

```bash
pnpm android:open
```

Run from the command line after an emulator or device is available:

```bash
pnpm android:run
```

The Android application ID is `ke.co.mycalculators.app`. Calculator fields, invoices, and receipts are stored locally on the device. Invoice and receipt PDF actions use Android's share/print chooser.

## Deployment

The app is a Next.js project and can be deployed to Vercel, Cloudflare Pages, or any platform that supports Next.js builds.

Production domain: `https://mycalculators.co.ke`
