- Create onboarding page at app/(protected)/onboarding/page.tsx
- this page is very simple. it only show text that Welcoming User like (Before we continue, lets add your phone number first)
- then add 1 text input and 1 button to submit it. use the useForm hook
- for the text input
  - ensure it has +62 and phone number example
  - ensure the input cannot start with 0
  - ensure it only allow number input. 
  - make the input to be type text with inputMode=numeric
- ensure the page is translated with id.json and en.json
- use useForm hook (react-hook-form)
- ensure the request body schema to be equal with this:
```typescript
const updatePhoneNumberSchema = t.Object({
  phoneNumber: t.String({
    minLength: 7,
    maxLength: 15,
    description: "Phone number must be between 7 and 15 characters",
  }),
});
```
- for the onSubmit it will make a request to elysia.account.phone.post
- since this is on client side, make sure it use fetch: { credentials: 'include' } on the request
- write everything on this file only app/(protected)/onboarding/page.tsx
