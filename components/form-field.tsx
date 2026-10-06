import type { ChangeEvent, HTMLAttributes } from 'react'

type FormFieldProps = {
  id: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  defaultValue?: string
  error?: string
  hint?: string
  maxLength?: number
  multiline?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const controlClass =
  'w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/15'

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  defaultValue,
  error,
  hint,
  maxLength,
  multiline,
  onChange,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name: id,
    placeholder,
    defaultValue,
    maxLength,
    onChange,
    required: true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: `${controlClass} ${error ? 'border-destructive' : 'border-border'}`,
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label} <span className="text-primary" aria-hidden="true">*</span>
        </label>
        {hint ? <span className="text-xs tabular-nums text-muted-foreground">{hint}</span> : null}
      </div>
      {multiline ? (
        <textarea {...shared} rows={6} className={`${shared.className} min-h-36 resize-y`} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} inputMode={inputMode} />
      )}
      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
