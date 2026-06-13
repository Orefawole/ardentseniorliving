import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(200),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(50),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  inquiry_type: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      inquiry_type: data.inquiry_type ?? null,
      message: data.message ?? null,
      source: "website",
    });
    if (error) {
      console.error("[submitInquiry]", error);
      throw new Error("We couldn't submit your inquiry. Please try again or call us directly.");
    }
    return { ok: true as const };
  });
