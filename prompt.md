# Implementation Tasks: Navigation and Localization Enhancements

## Overview
Enhance the user experience by providing easy navigation between authentication pages and receipt pages, and ensuring translation options and localized strings are available on these routes using `next-intl`.

## Tasks

### 0. Update Translation Messages
- **Target Files:**
  - `messages/en.json`
  - `messages/id.json`
- **Requirement:** Add navigation keys for the new links.
- **Implementation Detail:**
  - In `Navigation` section, add:
    - `"checkReceipt": "Check Receipt"` (EN) / `"checkReceipt": "Cek Struk"` (ID)
    - `"login": "Login"` (EN) / `"login": "Masuk"` (ID)

### 1. Add "Check Receipt" link to Auth Pages
- **Target Files:**
  - `app/(auth)/login/page.tsx`
  - `app/(auth)/register/page.tsx`
- **Requirement:** Add a localized link to `/receipt` in the top-right corner, positioned next to the `ThemeToggle` and `TranslatorToggle`.
- **Implementation Detail:**
  - Use `getTranslations` from `next-intl` to fetch the `Navigation.checkReceipt` string.
  - Use `Link` from `next/link` and a `Button` component with `variant="ghost"`.
  - Use the `Receipt` icon from `lucide-react`.
  - Ensure consistent spacing (gap) with existing toggles.

### 2. Add Login link and Translation Toggle to Receipt Pages
- **Target Files:**
  - `app/receipt/page.tsx`
  - `app/receipt/[id]/page.tsx`
- **Requirement:**
  - Add a localized link to `/login` in the top-right corner.
  - Add the `TranslatorToggle` component next to the `ThemeToggle`.
- **Implementation Detail:**
  - Use `getTranslations` from `next-intl` for the `Navigation.login` string.
  - Import and use `TranslatorToggle` from `@/components/providers/translator`.
  - Use `Link` from `next/link` and a `Button` component with `variant="ghost"`.
  - Use the `LogIn` icon from `lucide-react`.
  - Match the top-bar layout style of the auth pages.

## Step-by-Step Implementation Guide

### Step 1: Update Translation Files
1.  **Edit `messages/en.json`**:
    Add under `"Navigation"`:
    ```json
    "checkReceipt": "Check Receipt",
    "login": "Login"
    ```
2.  **Edit `messages/id.json`**:
    Add under `"Navigation"`:
    ```json
    "checkReceipt": "Cek Struk",
    "login": "Masuk"
    ```

### Step 2: Update Auth Pages (`app/(auth)/login/page.tsx` & `app/(auth)/register/page.tsx`)
1.  Make the page component `async`.
2.  Import `getTranslations` from `next-intl`.
3.  Import `Link` from `next/link`, `Button` from `@/components/ui/button`, and `Receipt` from `lucide-react`.
4.  Initialize translations: `const t = await getTranslations("Navigation");`.
5.  Add the link before `TranslatorToggle`:
    ```tsx
    <Button variant="ghost" size="sm" className="gap-2" asChild>
      <Link href="/receipt">
        <Receipt className="h-4 w-4" />
        <span className="hidden sm:inline">{t("checkReceipt")}</span>
      </Link>
    </Button>
    ```

### Step 3: Update Receipt Pages (`app/receipt/page.tsx` & `app/receipt/[id]/page.tsx`)
1.  Make the page component `async` (if not already).
2.  Import `getTranslations` from `next-intl`.
3.  Import `Link`, `Button`, `LogIn`, and `TranslatorToggle`.
4.  Initialize translations: `const t = await getTranslations("Navigation");`.
5.  Update the top bar `div` to include the login link and translation toggle:
    ```tsx
    <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
      <Button variant="ghost" size="sm" className="gap-2" asChild>
        <Link href="/login">
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">{t("login")}</span>
        </Link>
      </Button>
      <TranslatorToggle />
      <ThemeToggle />
    </div>
    ```
