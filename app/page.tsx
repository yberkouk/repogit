import { ContactForm } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'

export default function Page() {
  return (
    <main className="min-h-dvh px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <ContactInfo />
        <ContactForm />
      </div>
    </main>
  )
}
