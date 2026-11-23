import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

// Healthcheck : vérifie la base si DATABASE_URL est défini, sinon répond OK
// (le portfolio peut tourner en mode statique, sans base de données).
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({ ok: true, database: false });
  }
  try {
    const { db } = await import("@/db");
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
