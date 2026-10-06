'use client'

import { useActionState, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions'
import { FormField } from '@/components/form-field'

const initialState: ContactState = { status: 'idle' }
const MESSAGE_MAX = 5000

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)
  const [dismissedState, setDismissedState] = useState<ContactState | null>(null)

  if (state.status === 'success' && state !== dismissedState) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-3xl font-medium">Message envoyé</h2>
        <p className="max-w-sm leading-relaxed text-muted-foreground text-pretty">{state.message}</p>
        <button
          type="button"
          onClick={() => setDismissedState(state)}
          className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <ContactFormFields state={state} formAction={formAction} isPending={isPending} />
  )
}

function ContactFormFields({
  state,
  formAction,
  isPending,
}: {
  state: ContactState
  formAction: (payload: FormData) => void
  isPending: boolean
}) {
  const [messageLength, setMessageLength] = useState(state.values?.message?.length ?? 0)

  return (
    <form
      action={formAction}
      noValidate
      aria-describedby={state.status === 'error' ? 'form-error' : undefined}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-2xl font-medium">Envoyez-nous un message</h2>
        <p className="text-sm text-muted-foreground">
          Les champs marqués d&apos;un <span className="text-primary">*</span> sont obligatoires.
        </p>
      </div>

      {state.status === 'error' && state.message ? (
        <p
          id="form-error"
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="name"
          label="Nom complet"
          autoComplete="name"
          placeholder="Marie Dupont"
          defaultValue={state.values?.name}
          error={state.errors?.name}
        />
        <FormField
          id="email"
          label="Adresse e-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="marie@exemple.fr"
          defaultValue={state.values?.email}
          error={state.errors?.email}
        />
      </div>

      <FormField
        id="subject"
        label="Objet"
        placeholder="Demande de devis, partenariat…"
        defaultValue={state.values?.subject}
        error={state.errors?.subject}
      />

      <FormField
        id="message"
        label="Message"
        multiline
        placeholder="Décrivez votre demande en quelques lignes…"
        defaultValue={state.values?.message}
        error={state.errors?.message}
        maxLength={MESSAGE_MAX}
        onChange={(e) => setMessageLength(e.currentTarget.value.length)}
        hint={`${messageLength} / ${MESSAGE_MAX}`}
      />

      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground md:max-w-xs">
          Vos données sont uniquement utilisées pour répondre à votre demande.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer le message
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
