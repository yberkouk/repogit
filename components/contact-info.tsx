import { Clock, Mail, MapPin, Phone } from 'lucide-react'

const details = [
  { icon: Mail, label: 'E-mail', value: 'bonjour@exemple.fr', href: 'mailto:bonjour@exemple.fr' },
  { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
  { icon: MapPin, label: 'Adresse', value: '12 rue de la Paix, 75002 Paris' },
  { icon: Clock, label: 'Horaires', value: 'Du lundi au vendredi, 9h – 18h' },
]

export function ContactInfo() {
  return (
    <section aria-labelledby="contact-heading" className="flex flex-col justify-center gap-10">
      <div className="flex flex-col gap-5">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
        <h1
          id="contact-heading"
          className="font-serif text-4xl font-medium leading-tight text-balance md:text-5xl lg:text-6xl"
        >
          Parlons de votre projet.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          {"Une question, une idée ou simplement l'envie d'échanger ? Remplissez le formulaire et notre équipe vous répondra sous 24 heures."}
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        {details.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">{label}</span>
              {href ? (
                <a href={href} className="font-medium underline-offset-4 hover:text-primary hover:underline">
                  {value}
                </a>
              ) : (
                <span className="font-medium">{value}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
