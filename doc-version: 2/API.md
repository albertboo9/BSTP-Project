# **RAPPORT DE TEST ET DE DOCUMENTATION DE L'API IABSTP CAMEROON** 

**- Hébergement du Space : https://bstp readme.hf.space** 

**Environnement de test : Postman** 

**Format global des échanges : JSON / Form-Data** 

## **1. Matchmaking B2B (Mise en relation intelligente)** 

**Ce module trie instantanément les PME de la base de données pour trouver les soustraitants les plus qualifiés lorsqu'un grand donneur d'ordres publie un Appel d'Offres.** 

- **URL de la route : https://bstp-readme.hf.space/api/features/matchmaking** 

- **Méthode : POST** 

- **Type de corps (Body) : raw (JSON)** 

**Corps de la requête (Payload)** 

{ 

"requestId": "req_match_2026_01", 

"feature": "matchmaking", 

"locale": "fr", 

"payload": { 

"opportunity": { 

"id": "opp_scdp_001", 

"titre": "Maintenance des cuves de stockage de carburant", 

"secteur": "Hydrocarbures & Énergie", 

"region": "Littoral", 

"ville": "Douala", 

"montantEstimeFCFA": 45000000.0, 

"exigencesConformite": ["ISO_9001", "HSQE"] 

}, 

"candidats": [ 

{ 

"pmeId": "pme_alpha_237", 

"raisonSociale": "Alpha Industrial Services", 

"region": "Littoral", 

"ville": "Douala", 

"secteurs": ["Hydrocarbures & Énergie"], 

"scoreMaturite": 16.5, 

"badges": ["ISO_9001", "HSQE"], 

"indiceConfiance": "Gold" 

} 

] 

} 

} 

## **Réponse attendue de l'IA (Exemple)** 

{ 

"opportunityId": "opp_scdp_001", 

"classement": [ 

{ 

"pmeId": "pme_alpha_237", 

"raisonSociale": "Alpha Industrial Services", 

"scorePertinence": 95, 

"justification": "Excellente adéquation. La PME est située à Douala (zone du projet), possède toutes les certifications requises (ISO 9001, HSQE) et bénéficie d'un indice de confiance Gold." 

} 

] 

} 

## **2. Radar de Maturité PME (Diagnostic Industriel)** 

**Outil de diagnostic et de mise à niveau qui évalue la santé de l'entreprise sur les standards internationaux (ONUDI) et le cadre réglementaire du** _**Local Content**_ **.** 

- **URL de la route : https://bstp-readme.hf.space/api/features/maturity-radar** 

- **Méthode : POST** 

- **Type de corps (Body) : raw (JSON)** 

**Corps de la requête (Payload)** 

{ 

"requestId": "req_radar_2026_01", 

"feature": "maturity-radar", 

"locale": "fr", 

"payload": { 

"pmeId": "pme_douala_tech", 

"autoEvaluation": { 

"Gouvernance": 15.0, "Production_Qualite": 7.5, "Conformite_HSE": 6.0, 

"Ressources_Humaines": 14.0, 

"Sante_Financiere": 11.5, 

"Technologie_Innovation": 10.0 

}, 

"documentsDejaFournis": ["RCCM", "NIU"] 

} 

} 

## **Réponse attendue de l'IA (Exemple)** 

{ 

"pmeId": "pme_douala_tech", 

"axesFaibles": ["Production_Qualite", "Conformite_HSE"], 

"diagnostique": { 

"constats": "Le niveau de conformité HSE et la gestion de la qualité de production sont critiques et freinent l'accès aux grands marchés industriels.", 

"recommandations": [ 

"Mettre en place un plan de gestion des risques environnementaux sur les sites de production.", 

"Initier une formation du personnel aux processus qualité pour viser une certification de base." 

], 

"referencesLegales": ["Normes ONUDI sur la mise à niveau industrielle", "Loi Camerounaise sur le Local Content"] 

} 

} 

## **3. Assistant Juridique (Audit de Contrat)** 

Un bouclier pour les PME locales qui analyse le texte brut d'un contrat de sous-traitance afin de détecter et de traduire en français simple les clauses abusives (droit OHADA). 

- **URL de la route :** https://bstp-readme.hf.space/api/features/legal-assistant 

- **Méthode :** POST 

- **Type de corps (Body) :** raw (JSON) 

## **Corps de la requête (Payload)** 

{ 

"requestId": "req_legal_2026_01", 

"feature": "legal-assistant", 

"locale": "fr", 

"payload": { 

"texteContrat": "ARTICLE 7 : CONDITIONS DE PAIEMENT. Les factures de la PME seront réglées dans un délai de 120 jours après réception de la marchandise." 

} 

} 

## **Réponse attendue de l'IA (Exemple)** 

## { 

"syntheseGlobale": "Le contrat présente des risques majeurs de déséquilibre financier pour le sous-traitant.", 

"clausesRisque": [ 

{ 

"article": "ARTICLE 7", 

"extrait": "Les factures de la PME seront réglées dans un délai de 120 jours...", 

"niveauRisque": "eleve", 

"explication": "Le délai de paiement de 120 jours est abusif et viole les plafonds légaux réglementant les transactions commerciales, mettant en danger la trésorerie de la PME." 

} 

] 

} 

## **4. Assistant Vocal (Chat Voice via Whisper)** 

**Permet une interaction intuitive avec la plateforme en convertissant un message audio de l'utilisateur en texte avant de formuler une réponse métier adaptée.** 

- **URL de la route : https://bstp-readme.hf.space/api/voice** 

- **Méthode : POST** 

- **Type de corps (Body) : form-data** 

## **Corps de la requête (Paramètres)** 

- **file** _**(Type: File)**_ **: Le fichier audio enregistré (ex: Enregistrement.m4a).** 

## **Réponse attendue de l'IA (Exemple)** 

{ 

"user_said": "Bonjour comment s'inscrire à la BSTP", 

"ai_response": "Bonjour ! Pour inscrire votre PME à la BSTP Cameroon, vous devez fournir votre Registre de Commerce (RCCM), votre Numéro d'Identifiant Unique (NIU) et remplir le formulaire de profilage directement sur notre plateforme." 

} 

## **5. Audit Visuel de Conformité (Document Vision via Llama 4 Scout)** 

Utilise l'intelligence visuelle pour effectuer une lecture OCR et un audit de validité sur les documents administratifs téléchargés par les PME. 

- **URL de la route :** https://bstp-readme.hf.space/api/document-audit 

- **Méthode :** POST 

- **Type de corps (Body) :** form-data 

## **Corps de la requête (Paramètres)** 

- file _(Type: File)_ : L'image ou la photo du document (ex: rccm_doc.png). 

- document_type _(Type: Text)_ : Le type de document transmis (ex: rccm). 

## **Réponse attendue de l'IA (Exemple)** 

{ 

- "is_valid": true, 

"extracted_info": { 

- "raison_sociale": "Alpha Industrial Services", 

- "numero_rccm": "RC/DLA/202X/B/1234", 

- "date_immatriculation": "12/04/2022" 

}, 

"compliance_report": { 

"status": "Conforme", 

"remarques": "Le document est lisible, les numéros d'immatriculation sont correctement extraits et correspondent aux critères du registre du commerce." 

} 

} 

## **6. Assistant de Chat (Texte)** 

Ce module permet aux utilisateurs de poser directement des questions de manière fluide (par texte) pour obtenir des informations sur l'assistance, la réglementation ou les processus internes de la BSTP Cameroon. 

- **URL de la route :** https://bstp-readme.hf.space/api/features/chat 

- **Méthode :** POST 

- **Type de corps (Body) :** raw (JSON) 

## **Corps de la requête (Payload)** 

{ 

"requestId": "req_chat_2026_01", 

"feature": "chat", 

"locale": "fr", 

"payload": { 

"message": "Quels sont les avantages pour ma PME si je rejoins la BSTP ?", 

"historique": [] 

} 

} 

## **Réponse attendue de l'IA (Exemple)** 

## { 

"responseId": "res_req_chat_2026_01", 

"reply": "En rejoignant la BSTP Cameroon, votre PME bénéficie d'une visibilité accrue auprès des Grands Donneurs d'Ordres, d'un accès prioritaire aux appels d'offres via notre moteur de matchmaking, ainsi que de programmes de mise à niveau industrielle alignés sur les standards de l'ONUDI.\n\nPour toute orientation complémentaire sur l'écosystème de la BSTP ou l'utilisation de nos cockpits opérationnels, je reste à votre entière disposition.", 

"status": "success" 

} 

