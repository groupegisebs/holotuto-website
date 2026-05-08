import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function PrivacyPolicyEN() {
  return (
    <>
      <p>
        HOLO TUTO collects only the data needed to run the service. We never sell your data, never display advertising, and children's data is handled with the highest level of protection. You can request deletion of your account and all associated data at any time.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        The data controller is <strong>Groupe GISEBS Inc.</strong>, a corporation incorporated under the laws of Quebec, Canada. Contact:{' '}
        <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>.
      </p>

      <h2>2. Data We Collect</h2>
      <h3>2.1 Parent / Guardian Account</h3>
      <ul>
        <li>Full name and email address</li>
        <li>Encrypted password (hashed, never stored in plain text)</li>
        <li>Subscription and billing information (processed by Stripe — we do not store card numbers)</li>
        <li>Language preference and communication preferences</li>
      </ul>
      <h3>2.2 Child Profile</h3>
      <ul>
        <li>First name (or alias) and grade level</li>
        <li>Learning progress: exercises completed, scores, difficulty areas, session duration</li>
        <li>AI interaction logs used solely to personalise tutoring guidance</li>
      </ul>
      <h3>2.3 Teacher / School Account (if invited)</h3>
      <ul>
        <li>Name, institutional email, school name</li>
        <li>Class lists and student progress data for students explicitly linked to the teacher by a parent</li>
      </ul>
      <h3>2.4 Automatically Collected Data</h3>
      <ul>
        <li>Device type, operating system, browser/app version</li>
        <li>IP address (anonymised after 90 days)</li>
        <li>Session timestamps and feature usage for service improvement</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <ul>
        <li>Provide and personalise the HOLO TUTO tutoring service</li>
        <li>Process subscription payments via Stripe</li>
        <li>Send transactional emails (account creation, receipts, password reset)</li>
        <li>Generate progress reports for parents and teachers</li>
        <li>Improve and debug the platform (aggregated, anonymised analytics)</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>We do <strong>not</strong> use your data for targeted advertising, and we do <strong>not</strong> sell or rent data to third parties.</p>

      <h2>4. Children's Data (Under 13)</h2>
      <p>
        HOLO TUTO is designed for children aged 6–15. All child accounts are created and controlled by a parent or legal guardian. We apply the following protections specific to children:
      </p>
      <ul>
        <li>No child creates their own account — a parent account is mandatory</li>
        <li>No behavioural advertising or profiling of children</li>
        <li>No sharing of children's data with third parties for marketing purposes</li>
        <li>AI interaction data is used exclusively for personalised tutoring within the session</li>
        <li>Parents can review, modify, or delete all child data at any time</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>We share data only with trusted subprocessors necessary to operate the service:</p>
      <ul>
        <li><strong>Stripe Inc.</strong> — payment processing (PCI-DSS Level 1 certified)</li>
        <li><strong>Cloud hosting provider</strong> — secure server infrastructure in Canada/North America</li>
        <li><strong>Transactional email provider</strong> — account notifications only</li>
      </ul>
      <p>All subprocessors are bound by data processing agreements. We do not share data with advertisers, data brokers, or analytics companies that profile individuals.</p>

      <h2>6. Data Retention</h2>
      <ul>
        <li>Active accounts: data retained for the duration of the subscription plus 30 days</li>
        <li>After account deletion: personal data permanently deleted within 30 days; anonymised aggregated statistics may be retained</li>
        <li>Billing records: retained for 7 years as required by Quebec tax law</li>
        <li>IP logs: anonymised after 90 days</li>
      </ul>

      <h2>7. Your Rights</h2>
      <p>Under Quebec's Act respecting the protection of personal information in the private sector (Law 25) and Canada's PIPEDA, you have the right to:</p>
      <ul>
        <li><strong>Access</strong> — obtain a copy of the personal information we hold about you</li>
        <li><strong>Rectification</strong> — correct inaccurate or incomplete data</li>
        <li><strong>Deletion</strong> — request erasure of your account and all associated data</li>
        <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
        <li><strong>Withdrawal of consent</strong> — withdraw consent at any time (may affect service availability)</li>
      </ul>
      <p>
        To exercise your rights, email <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a> or use the account deletion page:{' '}
        <a href="/account-deletion">holotuto.com/account-deletion</a>.
      </p>

      <h2>8. Security</h2>
      <ul>
        <li>All data transmitted over HTTPS (TLS 1.2+)</li>
        <li>Passwords hashed using bcrypt</li>
        <li>Access to production data restricted to authorised personnel</li>
        <li>Regular security audits</li>
      </ul>

      <h2>9. Cookies</h2>
      <p>
        We use only essential cookies required for authentication and session management. If we introduce analytics cookies in the future, we will update our{' '}
        <a href="/cookies-policy">Cookies Policy</a> and request your consent.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. In the event of material changes, we will notify registered users by email at least 30 days before the changes take effect.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any privacy-related questions: <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Quebec, Canada
      </p>
    </>
  )
}

function PrivacyPolicyFR() {
  return (
    <>
      <p>
        HOLO TUTO collecte uniquement les données nécessaires au fonctionnement du service. Nous ne vendons jamais vos données, n'affichons aucune publicité, et les données des enfants font l'objet des protections les plus strictes. Vous pouvez demander la suppression de votre compte et de toutes les données associées à tout moment.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est <strong>Groupe GISEBS Inc.</strong>, société incorporée selon les lois du Québec, Canada. Contact :{' '}
        <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>.
      </p>

      <h2>2. Données collectées</h2>
      <h3>2.1 Compte parent / tuteur</h3>
      <ul>
        <li>Nom complet et adresse courriel</li>
        <li>Mot de passe chiffré (haché, jamais stocké en clair)</li>
        <li>Informations d'abonnement et de facturation (traitées par Stripe — nous ne stockons pas les numéros de carte)</li>
        <li>Préférence de langue et préférences de communication</li>
      </ul>
      <h3>2.2 Profil enfant</h3>
      <ul>
        <li>Prénom (ou alias) et niveau scolaire</li>
        <li>Progression : exercices complétés, résultats, zones de difficulté, durée des séances</li>
        <li>Journaux d'interaction IA utilisés uniquement pour personnaliser l'accompagnement pédagogique</li>
      </ul>
      <h3>2.3 Compte enseignant / école (si invité)</h3>
      <ul>
        <li>Nom, courriel institutionnel, nom de l'école</li>
        <li>Listes de classe et données de progression des élèves explicitement liés à l'enseignant par un parent</li>
      </ul>
      <h3>2.4 Données collectées automatiquement</h3>
      <ul>
        <li>Type d'appareil, système d'exploitation, version du navigateur/application</li>
        <li>Adresse IP (anonymisée après 90 jours)</li>
        <li>Horodatages de session et utilisation des fonctionnalités à des fins d'amélioration du service</li>
      </ul>

      <h2>3. Utilisation des données</h2>
      <ul>
        <li>Fournir et personnaliser le service de tutorat HOLO TUTO</li>
        <li>Traiter les paiements d'abonnement via Stripe</li>
        <li>Envoyer des courriels transactionnels (création de compte, reçus, réinitialisation de mot de passe)</li>
        <li>Générer des rapports de progression pour les parents et les enseignants</li>
        <li>Améliorer et déboguer la plateforme (analyses agrégées et anonymisées)</li>
        <li>Respecter les obligations légales</li>
      </ul>
      <p>Nous <strong>n'utilisons pas</strong> vos données à des fins de publicité ciblée, et nous <strong>ne vendons ni ne louons</strong> les données à des tiers.</p>

      <h2>4. Données des enfants (moins de 13 ans)</h2>
      <p>
        HOLO TUTO est conçu pour les enfants de 6 à 15 ans. Tous les comptes enfants sont créés et gérés par un parent ou tuteur légal. Nous appliquons les protections suivantes spécifiques aux enfants :
      </p>
      <ul>
        <li>Aucun enfant ne crée son propre compte — un compte parent est obligatoire</li>
        <li>Aucune publicité comportementale ni profilage des enfants</li>
        <li>Aucun partage des données des enfants avec des tiers à des fins commerciales</li>
        <li>Les données d'interaction IA sont utilisées exclusivement pour le tutorat personnalisé dans la séance</li>
        <li>Les parents peuvent consulter, modifier ou supprimer toutes les données de l'enfant à tout moment</li>
      </ul>

      <h2>5. Partage des données</h2>
      <p>Nous partageons les données uniquement avec des sous-traitants de confiance nécessaires au fonctionnement du service :</p>
      <ul>
        <li><strong>Stripe Inc.</strong> — traitement des paiements (certifié PCI-DSS Niveau 1)</li>
        <li><strong>Hébergeur cloud</strong> — infrastructure de serveurs sécurisés au Canada/Amérique du Nord</li>
        <li><strong>Prestataire de courriel transactionnel</strong> — notifications de compte uniquement</li>
      </ul>
      <p>Tous les sous-traitants sont liés par des ententes de traitement des données. Nous ne partageons pas les données avec des annonceurs, courtiers en données ou sociétés d'analyse qui profilent les individus.</p>

      <h2>6. Conservation des données</h2>
      <ul>
        <li>Comptes actifs : données conservées pendant la durée de l'abonnement plus 30 jours</li>
        <li>Après suppression du compte : données personnelles définitivement supprimées dans les 30 jours ; des statistiques agrégées anonymisées peuvent être conservées</li>
        <li>Dossiers de facturation : conservés 7 ans conformément à la loi fiscale québécoise</li>
        <li>Journaux IP : anonymisés après 90 jours</li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>En vertu de la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et de la LPRPDE fédérale, vous avez le droit de :</p>
      <ul>
        <li><strong>Accès</strong> — obtenir une copie des renseignements personnels que nous détenons</li>
        <li><strong>Rectification</strong> — corriger des données inexactes ou incomplètes</li>
        <li><strong>Suppression</strong> — demander l'effacement de votre compte et de toutes les données associées</li>
        <li><strong>Portabilité</strong> — recevoir vos données dans un format structuré et lisible par machine</li>
        <li><strong>Retrait du consentement</strong> — retirer votre consentement à tout moment (peut affecter la disponibilité du service)</li>
      </ul>
      <p>
        Pour exercer vos droits, écrivez à <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a> ou utilisez la page de suppression de compte :{' '}
        <a href="/account-deletion">holotuto.com/account-deletion</a>.
      </p>

      <h2>8. Sécurité</h2>
      <ul>
        <li>Toutes les données transmises via HTTPS (TLS 1.2+)</li>
        <li>Mots de passe hachés avec bcrypt</li>
        <li>Accès aux données de production restreint au personnel autorisé</li>
        <li>Audits de sécurité réguliers</li>
      </ul>

      <h2>9. Témoins (cookies)</h2>
      <p>
        Nous utilisons uniquement les témoins essentiels requis pour l'authentification et la gestion des sessions. Si nous introduisons des témoins d'analyse à l'avenir, nous mettrons à jour notre{' '}
        <a href="/cookies-policy">Politique relative aux témoins</a> et vous demanderons votre consentement.
      </p>

      <h2>10. Modifications de cette politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique de temps à autre. En cas de modifications substantielles, nous notifierons les utilisateurs inscrits par courriel au moins 30 jours avant l'entrée en vigueur des changements.
      </p>

      <h2>11. Contact</h2>
      <p>
        Pour toute question relative à la confidentialité : <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Québec, Canada
      </p>
    </>
  )
}

export default function PrivacyPolicy() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.privacyPolicy.title"
      subtitleKey="legal.privacyPolicy.subtitle"
      updatedKey="legal.privacyPolicy.updated"
    >
      {isFR ? <PrivacyPolicyFR /> : <PrivacyPolicyEN />}
    </LegalLayout>
  )
}
