import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function ContactEN() {
  return (
    <>
      <h2>General Support</h2>
      <p>
        For questions about the platform, your subscription, or your child's account. We aim to respond within <strong>2 business days</strong> — please include the email address associated with your account.
        <br /><br />
        <a href="mailto:support@holotuto.com">support@holotuto.com</a>
      </p>

      <h2>Privacy &amp; Data Requests</h2>
      <p>
        To exercise your rights (access, deletion, rectification) or for any privacy concern:
        <br />
        <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
        <br />
        See also: <a href="/account-deletion">Account &amp; Data Deletion</a> | <a href="/privacy-policy">Privacy Policy</a>
      </p>

      <h2>Schools &amp; Institutional Enquiries</h2>
      <p>
        To schedule a presentation for your school or to discuss an institutional subscription:
        <br />
        <a href="mailto:schools@holotuto.com">schools@holotuto.com</a>
      </p>

      <h2>Billing &amp; Payments</h2>
      <p>
        For invoice disputes, refund requests, or billing questions:
        <br />
        <a href="mailto:support@holotuto.com">support@holotuto.com</a>
        <br />
        See also: <a href="/billing-subscriptions">Billing &amp; Subscriptions</a>
      </p>

      <h2>Legal &amp; Press</h2>
      <p>
        <a href="mailto:info@holotuto.com">info@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Quebec, Canada
      </p>

      <h2>Executive Office</h2>
      <p>
        <a href="mailto:ceo@gisebs.com">ceo@gisebs.com</a>
        <br />
        Groupe GISEBS Inc., Quebec, Canada
      </p>

      <h2>Demo Request</h2>
      <p>
        Want to see HOLO TUTO in action? Request a personalised demo directly from the{' '}
        <a href="/">home page</a>.
      </p>
    </>
  )
}

function ContactFR() {
  return (
    <>
      <h2>Support général</h2>
      <p>
        Pour toute question sur la plateforme, votre abonnement ou le compte de votre enfant. Nous visons à répondre dans les <strong>2 jours ouvrables</strong> — veuillez inclure l'adresse courriel associée à votre compte.
        <br /><br />
        <a href="mailto:support@holotuto.com">support@holotuto.com</a>
      </p>

      <h2>Confidentialité et demandes de données</h2>
      <p>
        Pour exercer vos droits (accès, suppression, rectification) ou pour tout problème de confidentialité :
        <br />
        <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
        <br />
        Voir aussi : <a href="/account-deletion">Suppression de compte et données</a> | <a href="/privacy-policy">Politique de confidentialité</a>
      </p>

      <h2>Écoles et demandes institutionnelles</h2>
      <p>
        Pour planifier une présentation pour votre école ou discuter d'un abonnement institutionnel :
        <br />
        <a href="mailto:schools@holotuto.com">schools@holotuto.com</a>
      </p>

      <h2>Facturation et paiements</h2>
      <p>
        Pour les litiges de facturation, les demandes de remboursement ou les questions de facturation :
        <br />
        <a href="mailto:support@holotuto.com">support@holotuto.com</a>
        <br />
        Voir aussi : <a href="/billing-subscriptions">Paiements et abonnements</a>
      </p>

      <h2>Juridique et presse</h2>
      <p>
        <a href="mailto:info@holotuto.com">info@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Québec, Canada
      </p>

      <h2>Direction</h2>
      <p>
        <a href="mailto:ceo@gisebs.com">ceo@gisebs.com</a>
        <br />
        Groupe GISEBS Inc., Québec, Canada
      </p>

      <h2>Demande de démo</h2>
      <p>
        Vous souhaitez voir HOLO TUTO en action ? Demandez une démo personnalisée directement depuis la{' '}
        <a href="/">page d'accueil</a>.
      </p>
    </>
  )
}

export default function Contact() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.contact.title"
      subtitleKey="legal.contact.subtitle"
    >
      {isFR ? <ContactFR /> : <ContactEN />}
    </LegalLayout>
  )
}
