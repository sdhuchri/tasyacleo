export type LogAction =
  | "page.visit"
  | "letter.generated"
  | "chat.message"
  | "zodiac.checked"
  | "secret.unlocked"
  | "secret.wrong_password"
  | "gallery.photo_viewed"
  | "prayer.saved"
  | "countdown.viewed"
  | "code.copied";

export async function log(action: LogAction, detail?: string) {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, detail }),
    });
  } catch {
    // silent fail — logging should never break the app
  }
}
