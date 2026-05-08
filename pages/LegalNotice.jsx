import { useTranslation } from 'react-i18next'
import LegalLayout from './LegalLayout'

function LegalNoticeEN() {
  return (
    <>
      <h2>Publisher</h2>
      <p>
        <strong>Company name:</strong> Groupe GISEBS Inc.<br />
        <strong>Legal form:</strong> Corporation incorporated under the Business Corporations Act (Quebec, Canada)<br />
        <strong>Province:</strong> Quebec, Canada<br />
        <strong>General contact:</strong> <a href="mailto:info@holotuto.com">info@holotuto.com</a><br />
        <strong>Website:</strong> <a href="https://holotuto.com" target="_blank" rel="noopener noreferrer">holotuto.com</a>
      </p>

      <h2>Publication Director</h2>
      <p>
        The publication director is a representative of Groupe GISEBS Inc.<br />
        Contact: <a href="mailto:info@holotuto.com">info@holotuto.com</a>
      </p>

      <h2>Hosting</h2>
      <p>
        The HOLO TUTO platform is hosted on secure cloud infrastructure located in Canada and/or North America. Hosting services are provided by a certified cloud provider compliant with Canadian data privacy laws.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on the holotuto.com website and HOLO TUTO applications — including but not limited to text, images, graphics, logos, icons, AI models, pedagogical frameworks, and software — is the exclusive property of Groupe GISEBS Inc. or its licensors, and is protected by Canadian copyright law and applicable international treaties.
      </p>
      <p>
        Any reproduction, distribution, modification, or use of this content without prior written permission from Groupe GISEBS Inc. is strictly prohibited.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Groupe GISEBS Inc. makes every effort to ensure the accuracy and availability of information published on this site. However, it cannot guarantee that the site will be free from errors or interruptions. The company shall not be held liable for any direct or indirect damage resulting from the use of this site or its content.
      </p>

      <h2>Hyperlinks</h2>
      <p>
        This site may contain links to external websites. Groupe GISEBS Inc. has no control over the content of those sites and accepts no responsibility for their content, privacy practices, or availability.
      </p>

      <h2>Applicable Law</h2>
      <p>
        This legal notice is governed by the laws of the Province of Quebec and the applicable laws of Canada.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:info@holotuto.com">info@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Quebec, Canada
      </p>
    </>
  )
}

function LegalNoticeFR() {
  return (
    <>
      <h2>Éditeur du site</h2>
      <p>
        <strong>Raison sociale :</strong> Groupe GISEBS Inc.<br />
        <strong>Forme juridique :</strong> Société par actions incorporée en vertu de la Loi sur les sociétés par actions (Québec, Canada)<br />
        <strong>Province :</strong> Québec, Canada<br />
        <strong>Contact général :</strong> <a href="mailto:info@holotuto.com">info@holotuto.com</a><br />
        <strong>Site web :</strong> <a href="https://holotuto.com" target="_blank" rel="noopener noreferrer">holotuto.com</a>
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        Le directeur de la publication est un représentant de Groupe GISEBS Inc.<br />
        Contact : <a href="mailto:info@holotuto.com">info@holotuto.com</a>
      </p>

      <h2>Hébergement</h2>
      <p>
        La plateforme HOLO TUTO est hébergée sur une infrastructure infonuagique sécurisée située au Canada et/ou en Amérique du Nord. Les services d'hébergement sont fournis par un prestataire certifié conforme aux lois canadiennes sur la protection des renseignements personnels.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Tout le contenu du site holotuto.com et des applications HOLO TUTO — notamment les textes, images, graphiques, logos, icônes, modèles d'IA, cadres pédagogiques et logiciels — est la propriété exclusive de Groupe GISEBS Inc. ou de ses concédants de licence, et est protégé par la Loi sur le droit d'auteur du Canada et les traités internationaux applicables.
      </p>
      <p>
        Toute reproduction, distribution, modification ou utilisation de ce contenu sans autorisation écrite préalable de Groupe GISEBS Inc. est strictement interdite.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Groupe GISEBS Inc. met tout en œuvre pour assurer l'exactitude et la disponibilité des informations publiées sur ce site. Toutefois, il ne peut garantir que le site sera exempt d'erreurs ou d'interruptions. La société ne saurait être tenue responsable de tout dommage direct ou indirect résultant de l'utilisation de ce site ou de son contenu.
      </p>

      <h2>Hyperliens</h2>
      <p>
        Ce site peut contenir des liens vers des sites web externes. Groupe GISEBS Inc. n'a aucun contrôle sur le contenu de ces sites et n'assume aucune responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur disponibilité.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par les lois de la Province de Québec et les lois applicables du Canada.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:info@holotuto.com">info@holotuto.com</a>
        <br />
        Groupe GISEBS Inc., Québec, Canada
      </p>
    </>
  )
}

export default function LegalNotice() {
  const { i18n } = useTranslation()
  const isFR = i18n.language?.startsWith('fr')

  return (
    <LegalLayout
      titleKey="legal.legalNotice.title"
      subtitleKey="legal.legalNotice.subtitle"
      updatedKey="legal.legalNotice.updated"
    >
      {isFR ? <LegalNoticeFR /> : <LegalNoticeEN />}
    </LegalLayout>
  )
}
