# @kilamaelie/react-geo-picker 🌍

[![NPM version](https://img.shields.io/npm/v/%40kilamaelie%2Freact-geo-picker.svg?style=flat-square)](https://www.npmjs.com/package/@kilamaelie/react-geo-picker) [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A lightweight, fully responsive, and accessible React package containing modal components and utilities for selecting **Countries**, **Cities**, and **Phone Number Calling Codes**. 

Built from the ground up with **TypeScript**, **Tailwind CSS**, and **Radix UI**, `react-geo-picker` works seamlessly out-of-the-box in both **Vite (Client SPAs)** and **Next.js (App & Pages Routers, Server/Client components)**.

---

## ✨ Features

- 🚀 **Zero Configuration UI:** Clean, modern modals styled consistently with Tailwind CSS and Radix primitives.
- 📱 **Mobile First & Responsive:** Fluid viewports (`95vw`, optimized heights) ensuring no layout clipping on mobile devices or small screens.
- 🔄 **Framework Agnostic:** Compatible with modern React frameworks supporting `"use client"` directives natively.
- 🛠 **TypeScript First:** Fully typed out of the box with strict generics, making form integration (like `react-hook-form`) seamless.
- 📦 **Rich Built-In Datasets:** Pre-bundled with comprehensive international country profiles, national flags, calling codes, and nested city datasets.

---

## 📦 Installation

Install the package via your preferred package manager:

```bash
npm install @kilamaelie/react-geo-picker
# or
yarn add @kilamaelie/react-geo-picker
# or
pnpm add @kilamaelie/react-geo-picker
```

### Peer Dependencies
Ensure your host application has the following installed:
* `react` (^18.0.0 || ^19.0.0)
* `react-dom` (^18.0.0 || ^19.0.0)
* `lucide-react` (used for UI icons)

### Styling

The package includes compiled CSS, so Tailwind CSS is **not required** in the host
application. Import the stylesheet once in your application entry file:

```tsx
import '@kilamaelie/react-geo-picker/style.css';
```

If your application already uses Tailwind, you can use its own generated utilities
instead. Make sure your Tailwind setup scans the package output so the component
classes are included in your application CSS. For Tailwind v3, add the package to
`content`:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@kilamaelie/react-geo-picker/dist/**/*.{js,ts}',
  ],
}
```

With Tailwind v4, add the package source to your CSS using `@source` if your setup
does not scan dependencies automatically:

```css
@import "tailwindcss";
@source "../node_modules/@kilamaelie/react-geo-picker/dist";
```

Restart the Vite or Next.js development server after changing Tailwind scanning paths.

---

## 🚀 Usage Guide

### 1. Country Selection Modal
Allows users to pick a country name from an alphabetized, scrollable list complete with emoji flags and international codes.

```tsx
import { useState } from 'react';
import { CountryModal } from '@kilamaelie/react-geo-picker';

export default function CountrySelectDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-foreground">Country</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background text-sm shadow-sm hover:bg-muted/50 transition-colors"
      >
        <span>{selectedCountry || 'Select a country...'}</span>
        <span className="text-xs text-muted-foreground">▼</span>
      </button>

      <CountryModal
        showCountryModal={isOpen}
        setShowCountryModal={setIsOpen}
        onChange={(country) => {
          setSelectedCountry(country);
          console.log('Selected country:', country);
        }}
      />
    </div>
  );
}
```

---

### 2. City Selection Modal (Filtered by Country)
Dynamically renders the major cities associated with the selected parent country.

```tsx
import { useState } from 'react';
import { CitiesModal } from "@kilamaelie/react-geo-picker";

export default function CitySelectDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [country] = useState('Canada'); // Can be bound to your state
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-foreground">City ({country})</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background text-sm shadow-sm hover:bg-muted/50 transition-colors"
      >
        <span>{selectedCity || `Select city in ${country}...`}</span>
        <span className="text-xs text-muted-foreground">▼</span>
      </button>

      <CitiesModal
        showCitiesModal={isOpen}
        setShowCitiesModal={setIsOpen}
        country={country}
        onChange={(city) => {
          setSelectedCity(city);
        }}
      />
    </div>
  );
}
```

---

### 3. Phone Number Code Modal & Input Sanitizer Utility
Perfect for onboarding flows, authentication inputs, and international telephone capture.

```tsx
import { useState } from 'react';
import { PhoneNumberModal, formatPhoneNumber } from "@kilamaelie/react-geo-picker";

export default function PhoneInputDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-foreground">Phone Number</label>
      <div className="flex gap-2">
        {/* Country Code Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm font-semibold shadow-sm hover:bg-muted/50 transition-colors flex items-center gap-1.5"
        >
          <span>{countryCode}</span>
          <span className="text-xs text-muted-foreground">▼</span>
        </button>

        {/* Input field utilizing formatPhoneNumber utility */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
          placeholder="555-0199"
          className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <PhoneNumberModal
        showPhoneNumberModal={isOpen}
        setShowPhoneNumberModal={setIsOpen}
        onChange={(code) => {
          setCountryCode(code);
        }}
      />
    </div>
  );
}
```

---

## 📚 API Reference

### Public Exports

```tsx
import {
  CitiesModal,
  CountryModal,
  PhoneNumberModal,
  countries,
  formatPhoneNumber,
} from '@kilamaelie/react-geo-picker';
```

- `CountryModal`: select a country.
- `CitiesModal`: select a city for a country.
- `PhoneNumberModal`: select an international calling code.
- `countries`: the bundled country and city dataset.
- `formatPhoneNumber`: strips non-digits and limits input to 15 digits.

### Component Props

All modal components share an identical and predictable state-handling signature:

| Prop Name | Type | Description |
| :--- | :--- | :--- |
| `show[ModalName]` | `boolean` | Controls the open/closed visibility state of the modal. |
| `setShow[ModalName]` | `React.Dispatch<React.SetStateAction<boolean>>` | State dispatcher function to update visibility. |
| `onChange` | `(value: string) => void` | Callback function triggered when an item is selected. Passes back the target value (`country.name`, `city`, or `country.code`). |
| `country` *(CitiesModal only)* | `string` | The parent country string used to filter and lookup the respective cities array. |

### Utilities

- **`formatPhoneNumber(value: string): string`**
  - Strips all non-digit characters from string input.
  - Automatically bounds strings to a maximum of 15 digits conforming to international standard E.164.

### Troubleshooting Vite Imports

If Vite reports `Failed to resolve import "@kilamaelie/react-geo-picker"`, install the
scoped package name and restart the dev server:

```bash
npm install @kilamaelie/react-geo-picker@latest
npm run dev
```

Do not install or publish `node_modules`; npm installs the package's declared runtime
dependencies automatically.

---

## 🛠 Local Development & Contributing

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kilamaelie/react-geo-picker.git
   cd react-geo-picker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run build watch mode:**
   ```bash
   npm run dev
   ```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

## Publishing

Releases are published to npm through GitHub Actions using npm trusted publishing
with OpenID Connect (OIDC). To configure the trust once, open the package's
**Trusted Publishers** settings on npm and add:

- Repository: `kilamaelie/react-geo-picker`
- Workflow: `.github/workflows/publish.yml`

After that, create and push a `v*` tag for the package version. The workflow
builds the package and publishes it with provenance without an npm token.