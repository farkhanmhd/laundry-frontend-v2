const KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9_.-]*$/;
const ZOD_DEFAULT_PATTERNS = [/^Invalid/, /^Expected/];

export function translateZodError(
  message: string,
  t: (key: string) => string
): string {
  if (!message) {
    return message;
  }
  if (!KEY_PATTERN.test(message)) {
    if (message === "Required") {
      return t("common.required");
    }
    if (ZOD_DEFAULT_PATTERNS.some((p) => p.test(message))) {
      return t("common.invalid");
    }
    return message;
  }
  const translated = t(message);
  return translated !== message ? translated : message;
}
