// Validation partagée entre le formulaire (client) et l'API (serveur).
export const LIMITS = { name: 100, email: 254, subject: 150, message: 5000, messageMin: 10 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Retourne un objet { champ: "code_erreur" } — les codes sont traduits côté interface. */
export function validateContact(values) {
  const errors = {};
  const name = (values.name || "").trim();
  const email = (values.email || "").trim();
  const subject = (values.subject || "").trim();
  const message = (values.message || "").trim();

  if (!name) errors.name = "name_required";
  if (!email) errors.email = "email_required";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = "email_invalid";
  if (!subject) errors.subject = "subject_required";
  if (!message) errors.message = "message_required";
  else if (message.length < LIMITS.messageMin) errors.message = "message_short";

  return errors;
}
