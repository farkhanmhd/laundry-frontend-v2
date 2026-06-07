import type { useTranslations } from "next-intl";

type Translator = ReturnType<typeof useTranslations>;

const notificationRegex = /^Notifications\./;

export function toastResponse(
  t: Translator,
  response: {
    messageKey?: string;
    messageParams?: Record<string, unknown>;
    message?: string;
  }
) {
  if (response?.messageKey) {
    const key = response.messageKey.replace(notificationRegex, "");
    return t(
      key,
      response.messageParams as Record<string, string | number | Date>
    );
  }
  return response?.message ?? "";
}
