'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Votre nom doit contenir au moins 2 caractères.')
    .max(100, 'Votre nom est trop long.'),
  email: z.email('Veuillez saisir une adresse e-mail valide.').trim().max(254),
  subject: z
    .string()
    .trim()
    .min(3, "L'objet doit contenir au moins 3 caractères.")
    .max(150, "L'objet est trop long."),
  message: z
    .string()
    .trim()
    .min(10, 'Votre message doit contenir au moins 10 caractères.')
    .max(5000, 'Votre message ne peut pas dépasser 5000 caractères.'),
})

export type ContactField = keyof z.infer<typeof contactSchema>

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<ContactField, string>>
  values?: Partial<Record<ContactField, string>>
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
  }

  const result = contactSchema.safeParse(values)

  if (!result.success) {
    const errors: Partial<Record<ContactField, string>> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as ContactField
      if (!errors[field]) errors[field] = issue.message
    }
    return {
      status: 'error',
      message: 'Veuillez corriger les champs indiqués.',
      errors,
      values,
    }
  }

  // Branchez ici l'envoi d'e-mail (ex. Resend) ou l'enregistrement en base de données.
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    status: 'success',
    message: `Merci ${result.data.name.split(' ')[0]}, votre message a bien été envoyé. Nous vous répondrons très vite.`,
  }
}
