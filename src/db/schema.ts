import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Messages reçus via le formulaire de contact (utilisé uniquement si aucun
// service d'email n'est configuré mais qu'une base de données est disponible).
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  subject: varchar("subject", { length: 150 }).notNull(),
  message: text("message").notNull(),
  lang: varchar("lang", { length: 5 }).notNull().default("fr"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
