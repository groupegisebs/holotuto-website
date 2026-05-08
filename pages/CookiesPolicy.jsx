import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function CookiesEN() {
  return (
    <>
      <p>
        HOLO TUTO uses only strictly necessary cookies for authentication and session management. We do not use advertising cookies, tracking pixels, or third-party analytics that profile individual users.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device by a website. They allow the site to remember information about your visit, such as your login session, language preference, and settings.
      </p>

      <h2>2. Cookies We Use</h2>

      <h3>2.1 Strictly Necessary Cookies</h3>
      <p>These cookies are essential for the platform to function and cannot be disabled:</p>
      <ul>
        <li><strong>Session cookie:</strong> maintains your authenticated login session while you use the platform</li>
        <li><strong>CSRF token:</strong> protects against cross-site request forgery attacks (security requirement)</li>
        <li><strong>Language preference:</strong> remembers your selected language (French or English)</li>
      </ul>
      <p>These cookies do not track you across other websites and expire when you close your browser or log out.</p>

      <h3>2.2 Analytics Cookies (if applicable)</h3>
      <p>
        If we implement analytics in the future, we will use privacy-respecting, cookieless analytics (e.g., aggregated usage statistics with no personal identifiers). In such cases, we will update this policy and request your consent where legally required.
      </p>
      <p>
        We do <strong>not</strong> currently use Google Analytics, Meta Pixel, or any third-party behavioural tracking tools.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Some pages embed functionality from third parties:
      </p>
      <ul>
        <li><strong>Calendly</strong> (demo booking widget): may place its own cookies when the scheduling modal is opened. Calendly's cookie policy applies to those cookies.</li>
        <li><strong>Stripe</strong> (payment processing): may place cookies during checkout for fraud prevention. Stripe's cookie policy applies.</li>
      </ul>
      <p>We have minimised third-party integrations and do not embed social media widgets or advertising networks.</p>

      <h2>4. Managing Cookies</h2>
      <p>
        You can control cookies through your browser settings:
      </p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
        <li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
      </ul>
      <p>
        Disabling strictly necessary cookies will prevent you from logging in or using the platform.
      </p>

      <h2>5. Children and Cookies</h2>
      <p>
        We do not use cookies to track, profile, or target advertising at children. The only cookies active in a child's session are strictly necessary authentication cookies.
      </p>

      <h2>6. Updates to This Policy</h2>
      <p>
        If we introduce new types of cookies, we will update this policy and display a consent banner where required by applicable law.
      </p>

      <h2>7. Contact</h2>
      <p>
        Cookie questions: <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
      </p>
    </>
  )
}

function CookiesFR() {
  return (
    <>
      <p>
        HOLO TUTO utilise uniquement des témoins strictement nécessaires à l'authentification et à la gestion des sessions. Nous n'utilisons pas de témoins publicitaires, de pixels de suivi ni d'outils d'analyse tiers qui profilent les utilisateurs individuels.
      </p>

      <h2>1. Qu'est-ce qu'un témoin (cookie) ?</h2>
      <p>
        Les témoins sont de petits fichiers texte déposés sur votre appareil par un site web. Ils permettent au site de mémoriser des informations sur votre visite, telles que votre session de connexion, votre préférence de langue et vos paramètres.
      </p>

      <h2>2. Témoins que nous utilisons</h2>

      <h3>2.1 Témoins strictement nécessaires</h3>
      <p>Ces témoins sont essentiels au fonctionnement de la plateforme et ne peuvent pas être désactivés :</p>
      <ul>
        <li><strong>Témoin de session :</strong> maintient votre session de connexion authentifiée pendant que vous utilisez la plateforme</li>
        <li><strong>Jeton CSRF :</strong> protège contre les attaques de falsification de requête intersites (exigence de sécurité)</li>
        <li><strong>Préférence de langue :</strong> mémorise la langue sélectionnée (français ou anglais)</li>
      </ul>
      <p>Ces témoins ne vous suivent pas sur d'autres sites web et expirent lorsque vous fermez votre navigateur ou vous déconnectez.</p>

      <h3>2.2 Témoins d'analyse (le cas échéant)</h3>
      <p>
        Si nous mettons en œuvre des outils d'analyse à l'avenir, nous utiliserons des analyses respectueuses de la vie privée, sans témoin (ex. : statistiques d'utilisation agrégées sans identifiants personnels). Dans ce cas, nous mettrons à jour cette politique et demanderons votre consentement là où la loi l'exige.
      </p>
      <p>
        Nous n'utilisons actuellement <strong>pas</strong> Google Analytics, le Meta Pixel ou tout outil de suivi comportemental tiers.
      </p>

      <h2>3. Témoins tiers</h2>
      <p>
        Certaines pages intègrent des fonctionnalités de tiers :
      </p>
      <ul>
        <li><strong>Calendly</strong> (widget de prise de rendez-vous pour les démos) : peut déposer ses propres témoins lorsque la fenêtre de planification est ouverte. La politique de témoins de Calendly s'applique.</li>
        <li><strong>Stripe</strong> (traitement des paiements) : peut déposer des témoins lors du paiement à des fins de prévention de la fraude. La politique de témoins de Stripe s'applique.</li>
      </ul>
      <p>Nous avons minimisé les intégrations tierces et n'intégrons pas de widgets de réseaux sociaux ni de réseaux publicitaires.</p>

      <h2>4. Gestion des témoins</h2>
      <p>
        Vous pouvez contrôler les témoins via les paramètres de votre navigateur :
      </p>
      <ul>
        <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
        <li><strong>Firefox :</strong> Paramètres → Vie privée et sécurité → Cookies</li>
        <li><strong>Safari :</strong> Préférences → Confidentialité → Gérer les données de sites web</li>
        <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de sites</li>
      </ul>
      <p>
        La désactivation des témoins strictement nécessaires vous empêchera de vous connecter ou d'utiliser la plateforme.
      </p>

      <h2>5. Enfants et témoins</h2>
      <p>
        Nous n'utilisons pas de témoins pour suivre, profiler ou cibler de la publicité auprès des enfants. Les seuls témoins actifs dans la session d'un enfant sont les témoins d'authentification strictement nécessaires.
      </p>

      <h2>6. Mises à jour de cette politique</h2>
      <p>
        Si nous introduisons de nouveaux types de témoins, nous mettrons à jour cette politique et afficherons une bannière de consentement là où la loi applicable l'exige.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions relatives aux témoins : <a href="mailto:privacy@holotuto.com">privacy@holotuto.com</a>
      </p>
    </>
  )
}

export default function CookiesPolicy() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.cookies.title"
      subtitleKey="legal.cookies.subtitle"
      updatedKey="legal.cookies.updated"
    >
      {isFR ? <CookiesFR /> : <CookiesEN />}
    </LegalLayout>
  )
}
