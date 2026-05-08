import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function BillingEN() {
  return (
    <>
      <h2>1. Subscription Plans</h2>
      <p>
        HOLO TUTO offers subscription plans for individual families and schools. Current plans and pricing are displayed on the platform's pricing page. All plans are billed in <strong>Canadian dollars (CAD)</strong> and include applicable taxes (QST + GST) where required by law. Payments are processed securely by Stripe.
      </p>
      <ul>
        <li><strong>Family plan:</strong> covers one parent account and up to a specified number of child profiles</li>
        <li><strong>School plan:</strong> covers teacher and school administrator accounts; pricing is per class or institution</li>
      </ul>

      <h2>2. Free Trial</h2>
      <p>
        New users may access a <strong>14-day free trial</strong> with no credit card required. At the end of the trial period, the account becomes inactive unless a paid subscription is activated. Trial data is retained for 30 days after trial expiry before automatic deletion.
      </p>

      <h2>3. Billing and Payment</h2>
      <ul>
        <li>Subscriptions are billed monthly or annually, depending on the selected plan</li>
        <li>Payment is charged automatically at the start of each billing cycle</li>
        <li>All payments are processed by <strong>Stripe Inc.</strong> — HOLO TUTO does not store card numbers or banking data</li>
        <li>A receipt is sent to your registered email address after each successful payment</li>
        <li>If a payment fails, we will retry once and notify you by email — failure to resolve within the grace period may result in account suspension</li>
      </ul>

      <h2>4. Auto-Renewal</h2>
      <p>
        Subscriptions <strong>renew automatically</strong> at the end of each billing period unless cancelled before the renewal date. You will receive a reminder email before the annual renewal. You can cancel auto-renewal at any time from <strong>Settings → Subscription</strong>.
      </p>

      <h2>5. Plan Changes</h2>
      <ul>
        <li><strong>Upgrade:</strong> takes effect immediately; you will be charged a prorated amount for the remainder of the current billing period</li>
        <li><strong>Downgrade:</strong> takes effect at the start of the next billing cycle; you continue to have access to your current plan until the end of the period</li>
      </ul>

      <h2>6. Cancellation</h2>
      <p>
        You may cancel your subscription at any time from <strong>Settings → Subscription → Cancel plan</strong>.
      </p>
      <ul>
        <li>Cancellation takes effect at the <strong>end of the current billing period</strong></li>
        <li>You retain access to all paid features until the period ends</li>
        <li>No partial refund is issued for the remaining days of the current period</li>
        <li>After cancellation, your account and data are retained for 30 days, then automatically deleted (unless you request earlier deletion)</li>
      </ul>

      <h2>7. Refunds</h2>
      <p>
        Subscription fees are generally non-refundable. However, we will issue a full refund if:
      </p>
      <ul>
        <li>You request a refund within <strong>7 days</strong> of initial subscription activation (excluding free trials)</li>
        <li>A technical error on our part caused you to be charged incorrectly</li>
        <li>Applicable consumer protection law in Quebec requires a refund</li>
      </ul>
      <p>
        To request a refund, contact us at <a href="mailto:support@holotuto.com">support@holotuto.com</a>.
      </p>

      <h2>8. Price Changes</h2>
      <p>
        We may change subscription prices with at least <strong>30 days' notice</strong> sent to your registered email. Price changes take effect at your next renewal date. If you do not accept the new price, you may cancel before the renewal date.
      </p>

      <h2>9. Contact</h2>
      <p>
        Billing questions: <a href="mailto:support@holotuto.com">support@holotuto.com</a>
      </p>
    </>
  )
}

function BillingFR() {
  return (
    <>
      <h2>1. Forfaits d'abonnement</h2>
      <p>
        HOLO TUTO propose des forfaits d'abonnement pour les familles et les établissements scolaires. Les forfaits actuels et les tarifs sont affichés sur la page de tarification de la plateforme. Tous les forfaits sont facturés en <strong>dollars canadiens (CAD)</strong> et incluent les taxes applicables (TVQ + TPS) là où la loi l'exige. Les paiements sont traités de manière sécurisée par Stripe.
      </p>
      <ul>
        <li><strong>Forfait famille :</strong> couvre un compte parent et jusqu'à un nombre défini de profils enfants</li>
        <li><strong>Forfait école :</strong> couvre les comptes enseignants et administrateurs scolaires ; tarification par classe ou établissement</li>
      </ul>

      <h2>2. Période d'essai gratuit</h2>
      <p>
        Les nouveaux utilisateurs peuvent accéder à un <strong>essai gratuit de 14 jours</strong> sans carte bancaire. À la fin de la période d'essai, le compte devient inactif si un abonnement payant n'est pas activé. Les données de l'essai sont conservées 30 jours après expiration avant suppression automatique.
      </p>

      <h2>3. Facturation et paiement</h2>
      <ul>
        <li>Les abonnements sont facturés mensuellement ou annuellement selon le forfait sélectionné</li>
        <li>Le paiement est prélevé automatiquement au début de chaque cycle de facturation</li>
        <li>Tous les paiements sont traités par <strong>Stripe Inc.</strong> — HOLO TUTO ne stocke pas les numéros de carte ni les données bancaires</li>
        <li>Un reçu est envoyé à votre adresse courriel enregistrée après chaque paiement réussi</li>
        <li>En cas d'échec de paiement, nous effectuons une nouvelle tentative et vous notifions par courriel — l'absence de régularisation dans le délai de grâce peut entraîner la suspension du compte</li>
      </ul>

      <h2>4. Renouvellement automatique</h2>
      <p>
        Les abonnements se <strong>renouvellent automatiquement</strong> à la fin de chaque période de facturation, sauf annulation avant la date de renouvellement. Vous recevrez un courriel de rappel avant le renouvellement annuel. Vous pouvez annuler le renouvellement automatique à tout moment depuis <strong>Paramètres → Abonnement</strong>.
      </p>

      <h2>5. Changement de forfait</h2>
      <ul>
        <li><strong>Mise à niveau :</strong> prend effet immédiatement ; un montant calculé au prorata pour le reste de la période de facturation en cours vous sera facturé</li>
        <li><strong>Rétrogradation :</strong> prend effet au début du prochain cycle de facturation ; vous conservez l'accès à votre forfait actuel jusqu'à la fin de la période</li>
      </ul>

      <h2>6. Annulation</h2>
      <p>
        Vous pouvez annuler votre abonnement à tout moment depuis <strong>Paramètres → Abonnement → Annuler le forfait</strong>.
      </p>
      <ul>
        <li>L'annulation prend effet à la <strong>fin de la période de facturation en cours</strong></li>
        <li>Vous conservez l'accès à toutes les fonctionnalités payantes jusqu'à la fin de la période</li>
        <li>Aucun remboursement partiel n'est émis pour les jours restants de la période en cours</li>
        <li>Après annulation, votre compte et vos données sont conservés pendant 30 jours, puis automatiquement supprimés (sauf demande de suppression anticipée)</li>
      </ul>

      <h2>7. Remboursements</h2>
      <p>
        Les frais d'abonnement sont généralement non remboursables. Cependant, nous émettrons un remboursement intégral si :
      </p>
      <ul>
        <li>Vous demandez un remboursement dans les <strong>7 jours</strong> suivant l'activation initiale de l'abonnement (hors essai gratuit)</li>
        <li>Une erreur technique de notre part a entraîné une facturation incorrecte</li>
        <li>La loi applicable sur la protection du consommateur au Québec exige un remboursement</li>
      </ul>
      <p>
        Pour demander un remboursement, contactez-nous à <a href="mailto:support@holotuto.com">support@holotuto.com</a>.
      </p>

      <h2>8. Modifications des tarifs</h2>
      <p>
        Nous pouvons modifier les tarifs d'abonnement avec un préavis d'au moins <strong>30 jours</strong> envoyé à votre courriel enregistré. Les modifications de tarif prennent effet à votre prochaine date de renouvellement. Si vous n'acceptez pas le nouveau tarif, vous pouvez annuler avant la date de renouvellement.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions de facturation : <a href="mailto:support@holotuto.com">support@holotuto.com</a>
      </p>
    </>
  )
}

export default function BillingSubscriptions() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.billing.title"
      subtitleKey="legal.billing.subtitle"
      updatedKey="legal.billing.updated"
    >
      {isFR ? <BillingFR /> : <BillingEN />}
    </LegalLayout>
  )
}
