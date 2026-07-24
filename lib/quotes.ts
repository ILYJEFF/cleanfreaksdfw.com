import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { CF_TABLES } from "@/lib/supabase/schema";

export type QuoteRequestInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyType?: string;
  city?: string;
  message: string;
  source?: string;
};

export async function saveQuoteRequest(input: QuoteRequestInput) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(CF_TABLES.quoteRequests)
    .insert({
      first_name: input.firstName.trim(),
      last_name: input.lastName.trim(),
      phone: input.phone.trim(),
      email: input.email.trim().toLowerCase(),
      property_type: input.propertyType?.trim() || null,
      city: input.city?.trim() || null,
      message: input.message.trim(),
      source: input.source?.trim() || "website",
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as { id: string };
}

export async function markQuoteEmailSent(id: string, sent: boolean) {
  if (!isSupabaseConfigured()) return;
  const supabase = createServiceClient();
  await supabase
    .from(CF_TABLES.quoteRequests)
    .update({ email_sent: sent })
    .eq("id", id);
}
