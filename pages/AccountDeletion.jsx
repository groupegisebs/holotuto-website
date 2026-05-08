import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function AccountDeletionEN() {
  return (
    <>
      <h2>1. What Gets Deleted</h2>
      <p>When you request account deletion, the following data is permanently and irreversibly erased:</p>
      <ul>
        <li>Your parent/guardian account (name, email, password)</li>
        <li>All child profiles linked to your account</li>
        <li>All learning progress, exercise history, scores and AI interaction logs</li>
        <li>Communication preferences and language settings</li>
        <li>Any teacher or school linkages established under your account</li>
      </ul>
      <p>
        <strong>Billing records</strong> (invoices, transaction identifiers) are retained for 7 years as required by Quebec tax law, but they contain no browsing or learning data.
      </p>

      <h2>2. How to Delete Your Account</h2>

      <h3>Option A — From within the HOLO TUTO app</h3>
      <ol>
        <li>Sign in to your parent account</li>
        <li>Go to <strong>Settings → Account</strong></li>
        <li>Scroll to the bottom and tap <strong>Delete my account</strong></li>
        <li>Confirm by entering your password</li>
        <li>Your account and all data will be queued for permanent deletion</li>
      </ol>

      <h3>Option B — By email request</h3>
      <p>
        Send an email to <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a> with the subject line{' '}
        <strong>"Account Deletion Request"</strong>. Include the email address associated with your account. We will process your request within <strong>30 days</strong> and send you a confirmation.
      </p>

      <h2>3. What Happens After Deletion</h2>
      <ul>
        <li>All personal and learning data is permanently deleted within <strong>30 days</strong> of the confirmed request</li>
        <li>Your active subscription (if any) is immediately cancelled — no further charges will occur</li>
        <li>You will receive a confirmation email once the deletion is complete</li>
        <li>Deletion is <strong>irreversible</strong> — data cannot be recovered once deleted</li>
      </ul>

      <h2>4. Cancellation Without Deletion</h2>
      <p>
        If you only wish to cancel your subscription without deleting your account and data, you can do so from{' '}
        <strong>Settings → Subscription → Cancel plan</strong>. Your account will remain accessible until the end of the current billing period, then become inactive (data retained for 30 days before automatic deletion).
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about account or data deletion: <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
      </p>
    </>
  )
}

function AccountDeletionFR() {
  return (
    <>
      <h2>1. Ce qui est supprimé</h2>
      <p>Lorsque vous demandez la suppression de votre compte, les données suivantes sont effacées de manière permanente et irréversible :</p>
      <ul>
        <li>Votre compte parent/tuteur (nom, courriel, mot de passe)</li>
        <li>Tous les profils enfants liés à votre compte</li>
        <li>Toute la progression, l'historique des exercices, les résultats et les journaux d'interaction IA</li>
        <li>Les préférences de communication et les paramètres de langue</li>
        <li>Tous les liens avec des enseignants ou établissements scolaires établis sous votre compte</li>
      </ul>
      <p>
        Les <strong>dossiers de facturation</strong> (factures, identifiants de transaction) sont conservés 7 ans conformément à la loi fiscale québécoise, mais ne contiennent aucune donnée de navigation ni d'apprentissage.
      </p>

      <h2>2. Comment supprimer votre compte</h2>

      <h3>Option A — Depuis l'application HOLO TUTO</h3>
      <ol>
        <li>Connectez-vous à votre compte parent</li>
        <li>Accédez à <strong>Paramètres → Compte</strong></li>
        <li>Faites défiler vers le bas et appuyez sur <strong>Supprimer mon compte</strong></li>
        <li>Confirmez en saisissant votre mot de passe</li>
        <li>Votre compte et toutes les données seront mis en file d'attente pour suppression définitive</li>
      </ol>

      <h3>Option B — Par demande par courriel</h3>
      <p>
        Envoyez un courriel à <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a> avec l'objet{' '}
        <strong>« Demande de suppression de compte »</strong>. Indiquez l'adresse courriel associée à votre compte. Nous traiterons votre demande dans les <strong>30 jours</strong> et vous enverrons une confirmation.
      </p>

      <h2>3. Ce qui se passe après la suppression</h2>
      <ul>
        <li>Toutes les données personnelles et d'apprentissage sont définitivement supprimées dans les <strong>30 jours</strong> suivant la confirmation de la demande</li>
        <li>Votre abonnement actif (le cas échéant) est immédiatement résilié — aucun prélèvement supplémentaire ne sera effectué</li>
        <li>Vous recevrez un courriel de confirmation une fois la suppression effectuée</li>
        <li>La suppression est <strong>irréversible</strong> — les données ne peuvent pas être récupérées une fois supprimées</li>
      </ul>

      <h2>4. Résiliation sans suppression</h2>
      <p>
        Si vous souhaitez uniquement résilier votre abonnement sans supprimer votre compte et vos données, vous pouvez le faire depuis{' '}
        <strong>Paramètres → Abonnement → Annuler le forfait</strong>. Votre compte restera accessible jusqu'à la fin de la période de facturation en cours, puis deviendra inactif (données conservées 30 jours avant suppression automatique).
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions concernant la suppression de compte ou de données : <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
      </p>
    </>
  )
}

export default function AccountDeletion() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.accountDeletion.title"
      subtitleKey="legal.accountDeletion.subtitle"
      updatedKey="legal.accountDeletion.updated"
    >
      {isFR ? <AccountDeletionFR /> : <AccountDeletionEN />}
    </LegalLayout>
  )
}
