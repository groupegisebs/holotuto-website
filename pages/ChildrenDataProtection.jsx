import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function ChildrenDataEN() {
  return (
    <>
      <p>
        HOLO TUTO is built for children. We apply the highest level of data protection for all minors using the platform, in accordance with Quebec's Law 25 and Canada's PIPEDA.
      </p>

      <h2>1. Who Controls Children's Data</h2>
      <p>
        All child accounts on HOLO TUTO are created and managed exclusively by a <strong>parent or legal guardian</strong>. Children aged 6–15 access the platform through a parent-controlled environment. No child can independently create an account, provide consent, or modify their data privacy settings.
      </p>

      <h2>2. What Data Is Collected for Children</h2>
      <ul>
        <li><strong>First name or alias</strong> (chosen by the parent — a nickname is acceptable)</li>
        <li><strong>Grade level and school subject preferences</strong> set by the parent</li>
        <li><strong>Learning activity:</strong> exercises completed, scores, session durations, difficulty areas, and AI tutoring interactions</li>
      </ul>
      <p>
        We do <strong>not</strong> collect: surnames, photos, geolocation, contact details, social media profiles, or any sensitive personal information from children.
      </p>

      <h2>3. How Children's Data Is Used</h2>
      <p>Children's data is used exclusively to:</p>
      <ul>
        <li>Personalise the AI tutoring experience within the child's session</li>
        <li>Generate progress reports visible to the parent and, if authorised by the parent, the child's teacher</li>
        <li>Improve the quality of tutoring guidance in an aggregated, anonymised manner</li>
      </ul>
      <p>
        Children's data is <strong>never</strong> used for advertising, marketing, profiling, or shared with third parties for commercial purposes.
      </p>

      <h2>4. No Advertising to Children</h2>
      <p>
        HOLO TUTO displays <strong>zero advertising</strong> to users — children or adults. We do not use behavioural tracking, interest-based advertising, retargeting pixels, or data enrichment services that profile minors.
      </p>

      <h2>5. Parental Controls</h2>
      <p>Parents can, at any time:</p>
      <ul>
        <li>Review all data associated with a child profile</li>
        <li>Edit the child's name, grade level, or subject settings</li>
        <li>Delete a child's profile and all associated learning data</li>
        <li>Grant or revoke a teacher's access to the child's progress data</li>
        <li>Delete the entire parent account (and all linked child profiles)</li>
      </ul>

      <h2>6. Teacher Access</h2>
      <p>
        A teacher or school can only view a child's progress data if the parent has <strong>explicitly</strong> sent an invitation to the teacher from within the parent dashboard. Teachers cannot discover or access child profiles without parental authorisation. Parents can revoke teacher access at any time.
      </p>

      <h2>7. Data Sharing with Third Parties</h2>
      <p>
        Children's data is shared only with subprocessors strictly necessary to operate the service (hosting, transactional email). These subprocessors are prohibited by contract from using children's data for any purpose other than service delivery. We do <strong>not</strong> share children's data with:
      </p>
      <ul>
        <li>Advertisers or marketing platforms</li>
        <li>Data brokers or analytics companies</li>
        <li>Social networks</li>
        <li>Any third party for profiling purposes</li>
      </ul>

      <h2>8. Data Retention for Children</h2>
      <ul>
        <li>While the parent account is active: child data is retained as part of the subscription</li>
        <li>When a child profile is deleted by the parent: data permanently removed within 30 days</li>
        <li>When the parent account is deleted: all child data permanently removed within 30 days</li>
        <li>Anonymised, aggregated learning statistics (no personal identifiers) may be retained for service improvement</li>
      </ul>

      <h2>9. Security Measures</h2>
      <ul>
        <li>All data transmitted over HTTPS (TLS 1.2+)</li>
        <li>Access to child data restricted to the parent account and explicitly authorised teachers</li>
        <li>HOLO TUTO staff access to individual child data is limited to technical support cases only, with audit logging</li>
      </ul>

      <h2>10. Compliance</h2>
      <p>HOLO TUTO is designed to comply with:</p>
      <ul>
        <li>Quebec's Act respecting the protection of personal information in the private sector (Law 25 / Bill 64)</li>
        <li>Canada's Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
        <li>Apple App Store guidelines for apps targeting children</li>
        <li>Google Play Families Policy</li>
      </ul>

      <h2>11. Contact</h2>
      <p>
        Questions about children's data: <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Quebec, Canada
      </p>
    </>
  )
}

function ChildrenDataFR() {
  return (
    <>
      <p>
        HOLO TUTO est conçu pour les enfants. Nous appliquons le plus haut niveau de protection des données pour tous les mineurs utilisant la plateforme, conformément à la Loi 25 du Québec et à la LPRPDE du Canada.
      </p>

      <h2>1. Qui contrôle les données des enfants</h2>
      <p>
        Tous les comptes enfants sur HOLO TUTO sont créés et gérés exclusivement par un <strong>parent ou tuteur légal</strong>. Les enfants de 6 à 15 ans accèdent à la plateforme dans un environnement contrôlé par les parents. Aucun enfant ne peut créer un compte de manière indépendante, donner son consentement ou modifier ses paramètres de confidentialité.
      </p>

      <h2>2. Données collectées pour les enfants</h2>
      <ul>
        <li><strong>Prénom ou alias</strong> (choisi par le parent — un surnom est acceptable)</li>
        <li><strong>Niveau scolaire et préférences de matières</strong> définis par le parent</li>
        <li><strong>Activité d'apprentissage :</strong> exercices complétés, résultats, durée des séances, zones de difficulté et interactions de tutorat IA</li>
      </ul>
      <p>
        Nous ne collectons <strong>pas</strong> : les noms de famille, photos, géolocalisation, coordonnées, profils de réseaux sociaux ou toute information personnelle sensible des enfants.
      </p>

      <h2>3. Utilisation des données des enfants</h2>
      <p>Les données des enfants sont utilisées exclusivement pour :</p>
      <ul>
        <li>Personnaliser l'expérience de tutorat IA dans la séance de l'enfant</li>
        <li>Générer des rapports de progression visibles par le parent et, si autorisé par le parent, par l'enseignant de l'enfant</li>
        <li>Améliorer la qualité des conseils de tutorat de manière agrégée et anonymisée</li>
      </ul>
      <p>
        Les données des enfants ne sont <strong>jamais</strong> utilisées à des fins publicitaires, commerciales, de profilage ou partagées avec des tiers à des fins commerciales.
      </p>

      <h2>4. Aucune publicité pour les enfants</h2>
      <p>
        HOLO TUTO n'affiche <strong>aucune publicité</strong> aux utilisateurs — enfants ou adultes. Nous n'utilisons pas de suivi comportemental, de publicité ciblée, de pixels de reciblage ou de services d'enrichissement de données qui profilent les mineurs.
      </p>

      <h2>5. Contrôle parental</h2>
      <p>Les parents peuvent, à tout moment :</p>
      <ul>
        <li>Consulter toutes les données associées à un profil enfant</li>
        <li>Modifier le prénom, le niveau scolaire ou les paramètres de matières de l'enfant</li>
        <li>Supprimer le profil d'un enfant et toutes les données d'apprentissage associées</li>
        <li>Accorder ou révoquer l'accès d'un enseignant aux données de progression de l'enfant</li>
        <li>Supprimer l'intégralité du compte parent (et tous les profils enfants liés)</li>
      </ul>

      <h2>6. Accès des enseignants</h2>
      <p>
        Un enseignant ou un établissement scolaire ne peut consulter les données de progression d'un enfant que si le parent a <strong>explicitement</strong> envoyé une invitation à l'enseignant depuis le tableau de bord parent. Les enseignants ne peuvent pas découvrir ou accéder aux profils enfants sans autorisation parentale. Les parents peuvent révoquer l'accès de l'enseignant à tout moment.
      </p>

      <h2>7. Partage avec des tiers</h2>
      <p>
        Les données des enfants sont partagées uniquement avec les sous-traitants strictement nécessaires au fonctionnement du service (hébergement, courriel transactionnel). Ces sous-traitants sont contractuellement interdits d'utiliser les données des enfants à toute fin autre que la prestation de services. Nous ne partageons <strong>pas</strong> les données des enfants avec :
      </p>
      <ul>
        <li>Des annonceurs ou des plateformes de marketing</li>
        <li>Des courtiers en données ou des sociétés d'analyse</li>
        <li>Des réseaux sociaux</li>
        <li>Tout tiers à des fins de profilage</li>
      </ul>

      <h2>8. Conservation des données des enfants</h2>
      <ul>
        <li>Pendant que le compte parent est actif : les données de l'enfant sont conservées dans le cadre de l'abonnement</li>
        <li>Lorsqu'un profil enfant est supprimé par le parent : données définitivement supprimées dans les 30 jours</li>
        <li>Lorsque le compte parent est supprimé : toutes les données des enfants définitivement supprimées dans les 30 jours</li>
        <li>Des statistiques d'apprentissage agrégées et anonymisées (sans identifiants personnels) peuvent être conservées pour l'amélioration du service</li>
      </ul>

      <h2>9. Mesures de sécurité</h2>
      <ul>
        <li>Toutes les données transmises via HTTPS (TLS 1.2+)</li>
        <li>Accès aux données des enfants restreint au compte parent et aux enseignants explicitement autorisés</li>
        <li>L'accès du personnel de HOLO TUTO aux données individuelles des enfants est limité aux cas de support technique uniquement, avec journalisation des accès</li>
      </ul>

      <h2>10. Conformité</h2>
      <p>HOLO TUTO est conçu pour se conformer aux :</p>
      <ul>
        <li>Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25 / Projet de loi 64)</li>
        <li>Loi sur la protection des renseignements personnels et les documents électroniques du Canada (LPRPDE)</li>
        <li>Directives de l'App Store d'Apple pour les applications destinées aux enfants</li>
        <li>Politique Familles de Google Play</li>
      </ul>

      <h2>11. Contact</h2>
      <p>
        Questions sur les données des enfants : <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Québec, Canada
      </p>
    </>
  )
}

export default function ChildrenDataProtection() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.children.title"
      subtitleKey="legal.children.subtitle"
      updatedKey="legal.children.updated"
    >
      {isFR ? <ChildrenDataFR /> : <ChildrenDataEN />}
    </LegalLayout>
  )
}
