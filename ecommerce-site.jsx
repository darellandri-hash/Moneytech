import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  TrendingUp,
  Lock,
  User,
  ChevronRight,
  ChevronLeft,
  Check,
  DollarSign,
  Youtube,
  Music2,
  ShoppingBag,
  Link2,
  Shirt,
  ArrowRight,
  PlayCircle,
  BadgeCheck,
  X,
  BookOpen,
  Trophy,
  MessageCircle,
  Send,
  Sparkles,
  Lightbulb,
  Zap,
  Recycle,
  Megaphone,
  LineChart,
  Store,
  Users,
  Settings,
  Palette,
  Crown,
  Image as ImageIcon,
  Globe,
  KeyRound,
  Plus,
  UserPlus,
  UserCheck,
  Bell,
  Gift,
  Shield,
  Search,
  MoreVertical,
  LogOut,
  Heart,
  Hash,
  MessagesSquare,
  Trash2,
  CornerDownRight,
  ShieldCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const NICHES = [
  {
    id: "tiktok",
    label: "Monétisation TikTok",
    tag: "TT",
    icon: Music2,
    pitch: "Fonds créateurs, TikTok Shop, partenariats de marque.",
    courses: [
      {
        title: "Construire un compte qui perce l'algorithme",
        desc: "Fréquence de publication, hooks des 2 premières secondes, formats qui retiennent l'audience.",
        duration: "18 min",
      },
      {
        title: "TikTok Shop : de la vitrine à la première vente",
        desc: "Choisir des produits vendables, filmer un live shopping, gérer les commandes.",
        duration: "24 min",
      },
      {
        title: "Décrocher des partenariats de marque",
        desc: "Construire un media kit, fixer un tarif, démarcher sans paraître amateur.",
        duration: "15 min",
      },
      {
        title: "Diversifier ses revenus créateur",
        desc: "Fonds créateurs, affiliation, produits dérivés : répartir les sources de revenu.",
        duration: "12 min",
      },
      {
        title: "Devenir influenceur : construire une marque personnelle",
        desc: "Positionnement, storytelling personnel, image de marque cohérente — au-delà de la simple vente de produits.",
        duration: "17 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Une vidéo qui ne capte pas l'attention dans les {blank} premières secondes est beaucoup moins poussée par l'algorithme.", options: ["2 à 3", "15", "30"], correct: "2 à 3", tip: "Le hook des toutes premières secondes conditionne toute la diffusion : c'est le premier signal que lit l'algorithme." },
      { type: "blank", sentence: "TikTok favorise les comptes qui publient de façon {blank} plutôt que par à-coups.", options: ["régulière", "rare", "aléatoire"], correct: "régulière", tip: "La régularité entraîne l'algorithme à mieux distribuer ton contenu." },
      { type: "blank", sentence: "Le taux de {blank} jusqu'au bout d'une vidéo est un signal fort pour l'algorithme.", options: ["rétention", "like", "partage"], correct: "rétention", tip: "Un fort taux de rétention indique que le contenu retient vraiment l'audience." },
      { type: "qcm", question: "Quel est le meilleur moment pour couper une vidéo pendant le montage ?", options: ["Dès qu'un plan devient ennuyeux", "Toutes les 10 secondes pile", "Uniquement à la fin"], correct: "Dès qu'un plan devient ennuyeux", tip: "Couper au bon moment garde un rythme qui retient l'attention plus longtemps." },
      { type: "vrai_faux", statement: "Il vaut mieux publier une seule vidéo très travaillée par mois plutôt que plusieurs vidéos régulières.", correct: false, tip: "La régularité aide l'algorithme à mieux distribuer le contenu, bien plus qu'un rythme trop espacé." },
      { type: "intrus", instruction: "Lequel de ces éléments n'aide PAS à retenir l'attention dans les premières secondes d'une vidéo ?", options: ["Un hook fort dès le début", "Un texte à l'écran très chargé", "Une question qui crée de la curiosité", "Un rythme de montage dynamique"], correct: "Un texte à l'écran très chargé", tip: "Trop de texte à la fois fait fuir l'attention plutôt que la capter." },
      { type: "blank", sentence: "Le {blank} d'ouverture doit se jouer dans les deux premières secondes de la vidéo.", options: ["hook", "générique", "logo"], correct: "hook", tip: "Sans accroche immédiate, l'audience quitte la vidéo avant la fin." },
      { type: "blank", sentence: "Ajouter des {blank} à l'écran aide les spectateurs qui regardent sans le son.", options: ["sous-titres", "transitions", "hashtags"], correct: "sous-titres", tip: "Beaucoup regardent sans le son, les sous-titres évitent de perdre l'audience." },
      { type: "blank", sentence: "Pour un premier live TikTok Shop, mieux vaut présenter {blank} produits qu'un catalogue complet.", options: ["1 à 2", "10", "30"], correct: "1 à 2", tip: "Un live avec peu de produits mais bien expliqués convertit mieux qu'un catalogue qui noie l'audience." },
      { type: "blank", sentence: "Un produit avec des {blank} déjà existants inspire davantage confiance en boutique.", options: ["avis", "followers", "likes"], correct: "avis", tip: "Les avis clients réduisent le risque perçu par un nouvel acheteur." },
      { type: "blank", sentence: "Un vendeur TikTok Shop doit annoncer clairement les délais de {blank}.", options: ["livraison", "tournage", "montage"], correct: "livraison", tip: "Des délais clairs évitent la frustration et les avis négatifs." },
      { type: "blank", sentence: "Un bon animateur de live garde un rythme {blank} pour ne pas perdre l'audience.", options: ["dynamique", "monotone", "silencieux"], correct: "dynamique", tip: "Un rythme qui stagne fait décrocher les spectateurs en quelques secondes." },
      { type: "qcm", question: "Que privilégier pour un premier live TikTok Shop ?", options: ["Peu de produits bien expliqués", "Un catalogue complet", "Aucune interaction avec le chat"], correct: "Peu de produits bien expliqués", tip: "Un live simple et clair convertit mieux qu'un catalogue qui noie l'audience." },
      { type: "vrai_faux", statement: "Répondre aux commentaires en direct pendant un live TikTok Shop augmente le taux de conversion.", correct: true, tip: "Répondre en direct rassure l'acheteur et pousse à l'achat immédiat." },
      { type: "intrus", instruction: "Lequel de ces éléments N'EST PAS utile pour démarcher une marque ?", options: ["Un media kit avec des résultats concrets", "Un tarif fixé au hasard sans réflexion", "Un exemple de campagne passée", "Un taux d'engagement clair"], correct: "Un tarif fixé au hasard sans réflexion", tip: "Un tarif réfléchi, basé sur des données réelles, protège la valeur de ton travail." },
      { type: "blank", sentence: "Un media kit efficace pour démarcher une marque montre surtout des {blank} concrets, pas juste un nombre d'abonnés.", options: ["résultats", "selfies", "hashtags"], correct: "résultats", tip: "Les marques cherchent des preuves de performance (vues, engagement, ventes), pas seulement un chiffre d'abonnés." },
      { type: "blank", sentence: "Le taux d'{blank} pèse souvent plus qu'un grand nombre d'abonnés dans une négociation.", options: ["engagement", "abonnement", "hashtag"], correct: "engagement", tip: "Un engagement fort prouve une audience réellement impliquée, pas juste nombreuse." },
      { type: "blank", sentence: "Compter uniquement sur le fonds créateurs rend un revenu {blank} face aux changements de règles.", options: ["fragile", "stable", "élevé"], correct: "fragile", tip: "Les règles des fonds créateurs changent souvent, mieux vaut ne pas en dépendre seul." },
      { type: "blank", sentence: "Construire une identité de créateur, pas seulement de vendeur, aide à fidéliser une {blank} qui suit la personne.", options: ["audience", "boutique", "facture"], correct: "audience", tip: "Une audience attachée à la personne reste fidèle même quand les produits vendus changent." },
    ],
  },
  {
    id: "youtube",
    label: "Monétisation YouTube",
    tag: "YT",
    icon: Youtube,
    pitch: "AdSense, sponsors, produits numériques, memberships.",
    courses: [
      {
        title: "Passer les seuils du Partner Program",
        desc: "Heures de visionnage, abonnés, règles de monétisation à connaître avant de se lancer.",
        duration: "16 min",
      },
      {
        title: "Miniatures et titres qui font cliquer",
        desc: "Construire un système de vignettes cohérent qui donne envie de cliquer sans mentir sur le contenu.",
        duration: "20 min",
      },
      {
        title: "Vendre un sponsoring sans agence",
        desc: "Trouver les bonnes marques, négocier un tarif au CPM, livrer un brief clair.",
        duration: "22 min",
      },
      {
        title: "Construire un produit numérique dérivé",
        desc: "Transformer une expertise récurrente en formation, template ou communauté payante.",
        duration: "19 min",
      },
      {
        title: "Devenir créateur à plein temps, au-delà de la pub",
        desc: "Construire une marque personnelle, vivre de plusieurs formats et d'une communauté — pas seulement des revenus publicitaires.",
        duration: "18 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Pour rejoindre le programme partenaire, YouTube regarde surtout les heures de {blank} cumulées et le nombre d'abonnés.", options: ["visionnage", "commentaires", "partages"], correct: "visionnage", tip: "YouTube évalue le temps de visionnage total et les abonnés sur 12 mois glissants, avant tout autre critère." },
      { type: "blank", sentence: "Le revenu publicitaire dépend en grande partie du {blank} de la chaîne.", options: ["thème", "nombre de vidéos", "nom"], correct: "thème", tip: "Certaines thématiques attirent des annonceurs prêts à payer plus cher." },
      { type: "blank", sentence: "Le RPM mesure le revenu généré pour mille {blank}.", options: ["vues", "abonnés", "commentaires"], correct: "vues", tip: "Le RPM aide à comparer la rentabilité réelle entre différentes vidéos." },
      { type: "qcm", question: "Quel critère pèse le plus pour rejoindre le programme partenaire YouTube ?", options: ["Les heures de visionnage cumulées", "Le nombre de vidéos publiées", "La couleur des miniatures"], correct: "Les heures de visionnage cumulées", tip: "YouTube évalue avant tout le temps de visionnage total et le nombre d'abonnés sur 12 mois." },
      { type: "vrai_faux", statement: "Le CPM permet d'indexer un tarif de sponsoring sur l'audience réelle plutôt que sur une estimation.", correct: true, tip: "Le coût pour mille vues relie directement le tarif à la portée réelle des vidéos." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à fidéliser une audience ?", options: ["Répondre aux commentaires", "Publier à un horaire aléatoire", "Créer une ligne éditoriale cohérente", "Analyser le taux de rétention"], correct: "Publier à un horaire aléatoire", tip: "Un rythme prévisible aide l'audience à intégrer la chaîne dans ses habitudes." },
      { type: "blank", sentence: "Une bonne miniature donne envie de savoir la suite, sans {blank} sur le contenu réel de la vidéo.", options: ["mentir", "insister", "zoomer"], correct: "mentir", tip: "La miniature doit créer une tension ou une question, jamais tromper sur ce que contient vraiment la vidéo." },
      { type: "blank", sentence: "Un titre trop {blank} peut décourager le clic même avec une bonne miniature.", options: ["vague", "court", "clair"], correct: "vague", tip: "Un titre flou ne donne pas assez de raison concrète de cliquer." },
      { type: "blank", sentence: "Le taux de {blank} moyen indique si le montage garde l'attention jusqu'au bout.", options: ["rétention", "abonnement", "like"], correct: "rétention", tip: "Un bon taux de rétention prouve que le contenu tient sa promesse initiale." },
      { type: "blank", sentence: "Demander explicitement de s'abonner augmente légèrement le taux d'{blank}.", options: ["abonnement", "engagement uniquement", "export"], correct: "abonnement", tip: "Un appel à l'action clair, sans excès, aide à convertir un spectateur en abonné." },
      { type: "blank", sentence: "Le {blank} permet d'indexer un tarif de sponsoring sur l'audience réelle plutôt que sur une estimation.", options: ["CPM", "nombre d'abonnés", "format vidéo"], correct: "CPM", tip: "Le coût pour mille vues (CPM) relie directement le tarif à la portée réelle de tes vidéos." },
      { type: "blank", sentence: "Un brief de sponsoring doit préciser les {blank} interdits pendant l'intégration.", options: ["mots-clés", "couleurs", "horaires"], correct: "mots-clés", tip: "Certains termes peuvent enfreindre des règles publicitaires ou légales du sponsor." },
      { type: "qcm", question: "Quel est le rôle principal d'une bonne miniature ?", options: ["Donner envie de savoir la suite sans mentir", "Résumer toute la vidéo", "Afficher un maximum de texte"], correct: "Donner envie de savoir la suite sans mentir", tip: "La miniature doit créer une tension, jamais tromper sur le contenu réel." },
      { type: "vrai_faux", statement: "Un produit numérique se vend mieux quand il reste très générique pour plaire à tout le monde.", correct: false, tip: "Un produit trop vague ne répond à aucun besoin précis et se vend mal." },
      { type: "intrus", instruction: "Lequel de ces éléments N'EST PAS une bonne pratique de sponsoring ?", options: ["Préciser les délais de publication", "Cacher la mention légale du partenariat", "Refuser un sponsor hors thématique", "Négocier un tarif basé sur le CPM"], correct: "Cacher la mention légale du partenariat", tip: "La transparence sur les partenariats rémunérés est une obligation légale et une question de confiance." },
      { type: "blank", sentence: "Transformer une question récurrente de l'audience en {blank} payante répond à un vrai besoin identifié.", options: ["formation", "publicité", "miniature"], correct: "formation", tip: "Un produit qui répond à une demande déjà exprimée se vend plus facilement." },
      { type: "blank", sentence: "Vendre un template ou un modèle réutilisable génère un revenu {blank} de nouvelles vidéos.", options: ["indépendant", "dépendant", "limité"], correct: "indépendant", tip: "Un produit dérivé continue de se vendre même sans nouvelle publication." },
      { type: "blank", sentence: "Dépendre d'une seule source de revenu rend une chaîne {blank} face aux changements de règles publicitaires.", options: ["fragile", "stable", "imprévisible en bien"], correct: "fragile", tip: "Diversifier les revenus protège la chaîne des décisions unilatérales des annonceurs." },
      { type: "blank", sentence: "Se construire une image de créateur reconnu ouvre des opportunités au-delà de la simple {blank} publicitaire.", options: ["monétisation", "montage", "miniature"], correct: "monétisation", tip: "Une marque personnelle forte attire sponsors et opportunités qui ne dépendent pas que des revenus publicitaires." },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce / Dropshipping",
    tag: "DS",
    icon: ShoppingBag,
    pitch: "Boutique en ligne, fournisseurs, publicité, logistique.",
    courses: [
      {
        title: "Choisir un produit qui se vend vraiment",
        desc: "Valider une demande avant de commander : recherche, marge, saisonnalité.",
        duration: "17 min",
      },
      {
        title: "Monter une boutique qui inspire confiance",
        desc: "Structure de page produit, avis, politique de retour, éléments de réassurance.",
        duration: "21 min",
      },
      {
        title: "Premières campagnes publicitaires rentables",
        desc: "Budget de test, ciblage, lecture des indicateurs pour couper ou scaler une pub.",
        duration: "25 min",
      },
      {
        title: "Fournisseurs et logistique sans mauvaise surprise",
        desc: "Choisir un fournisseur fiable, anticiper les délais, gérer le service après-vente.",
        duration: "18 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Avant de commander un stock, la meilleure validation est une {blank} déjà mesurée, pas une intuition.", options: ["demande", "couleur", "tendance musicale"], correct: "demande", tip: "Une pré-vente ou un test publicitaire limité vérifie la demande réelle avant d'engager du capital sur du stock." },
      { type: "blank", sentence: "Un bon produit de départ résout un {blank} clair pour un public précis.", options: ["problème", "logo", "hashtag"], correct: "problème", tip: "Un produit qui répond à un vrai besoin se vend plus facilement qu'un simple gadget." },
      { type: "blank", sentence: "Sur une page produit, les avis clients et une politique de {blank} claire réduisent le risque perçu.", options: ["retour", "livraison express", "fidélité"], correct: "retour", tip: "La preuve sociale et une politique de retour claire pèsent plus lourd que les effets d'urgence artificiels." },
      { type: "qcm", question: "Quelle est la meilleure façon de valider un produit avant de commander du stock ?", options: ["Un test publicitaire ou une pré-vente limitée", "Une simple intuition personnelle", "Copier un concurrent au hasard"], correct: "Un test publicitaire ou une pré-vente limitée", tip: "Une validation mesurée évite d'engager du capital sur une demande qui n'existe pas vraiment." },
      { type: "vrai_faux", statement: "Un temps de chargement lent n'a presque aucun effet sur les ventes d'une boutique en ligne.", correct: false, tip: "Chaque seconde de chargement en trop fait perdre des visiteurs impatients." },
      { type: "intrus", instruction: "Lequel de ces éléments N'EST PAS utile pour rassurer un nouvel acheteur ?", options: ["Des photos nombreuses et nettes", "Une politique de retour claire", "Un temps de chargement très lent", "Des avis clients visibles"], correct: "Un temps de chargement très lent", tip: "Un site lent fait fuir les visiteurs avant même qu'ils voient le produit." },
      { type: "blank", sentence: "Des photos {blank} augmentent la confiance envers un produit inconnu.", options: ["nombreuses et nettes", "floues", "génériques"], correct: "nombreuses et nettes", tip: "Des visuels clairs sous plusieurs angles rassurent sur la qualité réelle du produit." },
      { type: "blank", sentence: "Commander un {blank} avant de lancer une grosse commande limite les mauvaises surprises.", options: ["échantillon", "stock complet", "budget pub"], correct: "échantillon", tip: "Tester la qualité sur un échantillon évite de découvrir un défaut après un gros achat." },
      { type: "blank", sentence: "Un contrat clair avec le fournisseur précise les conditions de {blank} en cas de défaut.", options: ["remboursement", "publicité", "livraison uniquement"], correct: "remboursement", tip: "Des conditions claires évitent les litiges coûteux en cas de produit défectueux." },
      { type: "blank", sentence: "Face à une pub qui ne convertit pas après un budget de test, il vaut mieux {blank} le ciblage que d'augmenter le budget à l'aveugle.", options: ["ajuster", "dupliquer", "ignorer"], correct: "ajuster", tip: "Un budget de test sert à décider vite : ajuster ou couper, plutôt que d'insister sans données." },
      { type: "blank", sentence: "Le CPA mesure le coût pour obtenir un {blank}.", options: ["achat", "like", "abonné"], correct: "achat", tip: "Le coût par acquisition révèle si une publicité est réellement rentable." },
      { type: "blank", sentence: "Un test {blank} compare deux versions d'une page pour savoir laquelle convertit mieux.", options: ["A/B", "aléatoire", "unique"], correct: "A/B", tip: "Comparer deux versions objectivement révèle ce qui fonctionne réellement, pas une impression." },
      { type: "qcm", question: "Que faire face à une publicité qui ne convertit pas après un budget de test ?", options: ["Ajuster le ciblage", "Augmenter le budget à l'aveugle", "Ignorer et attendre"], correct: "Ajuster le ciblage", tip: "Un budget de test sert à décider vite : ajuster ou couper plutôt qu'insister sans données." },
      { type: "vrai_faux", statement: "Commander un échantillon avant une grosse commande limite les mauvaises surprises de qualité.", correct: true, tip: "Tester la qualité sur un échantillon évite de découvrir un défaut après un gros achat." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à choisir un bon fournisseur ?", options: ["Commander un échantillon avant un gros achat", "Vérifier les avis d'autres acheteurs", "Choisir le moins cher sans autre vérification", "Comparer les délais de production"], correct: "Choisir le moins cher sans autre vérification", tip: "Le prix seul ne garantit ni la qualité ni la fiabilité d'un fournisseur." },
      { type: "blank", sentence: "Le retargeting cible des visiteurs qui ont déjà {blank} le site sans acheter.", options: ["visité", "payé", "recommandé"], correct: "visité", tip: "Recibler un visiteur déjà intéressé coûte souvent moins cher qu'un nouveau prospect." },
      { type: "blank", sentence: "Scaler une publicité trop vite peut faire remonter le {blank} d'acquisition brutalement.", options: ["coût", "nombre de vues", "nombre de clics"], correct: "coût", tip: "Augmenter le budget trop vite déstabilise souvent l'algorithme publicitaire et fait grimper les coûts." },
      { type: "blank", sentence: "Suivre la marge {blank} par produit, pas seulement le chiffre d'affaires, révèle la vraie rentabilité.", options: ["nette", "brute uniquement", "affichée"], correct: "nette", tip: "Le chiffre d'affaires seul cache souvent des produits qui rapportent très peu une fois les frais déduits." },
    ],
  },
  {
    id: "affiliation",
    label: "Marketing d'affiliation",
    tag: "AF",
    icon: Link2,
    pitch: "Commissions sur recommandation, sans stock ni service client.",
    courses: [
      {
        title: "Choisir un programme d'affiliation crédible",
        desc: "Taux de commission, réputation du produit, durée du cookie de suivi.",
        duration: "14 min",
      },
      {
        title: "Créer du contenu qui recommande sans forcer",
        desc: "Comparatifs, retours d'expérience honnêtes, mentions de lien qui convertissent.",
        duration: "19 min",
      },
      {
        title: "Suivre ses commissions et optimiser ses liens",
        desc: "Lire un tableau de bord affilié, identifier les contenus qui rapportent vraiment.",
        duration: "13 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Le critère le plus important pour choisir un programme d'affiliation est la commission ET la {blank} réelle du produit.", options: ["crédibilité", "couleur du logo", "popularité du nom"], correct: "crédibilité", tip: "Recommander un produit peu fiable détruit la confiance de l'audience, même avec une commission élevée." },
      { type: "blank", sentence: "La durée du {blank} détermine combien de temps après le clic une vente compte encore pour toi.", options: ["cookie", "logo", "hashtag"], correct: "cookie", tip: "Un cookie plus long augmente les chances de toucher une commission sur un achat différé." },
      { type: "blank", sentence: "Un contenu d'affiliation qui convertit ressemble à un retour d'expérience {blank}, avantages et limites inclus.", options: ["concret", "générique", "payant"], correct: "concret", tip: "La transparence sur les limites d'un produit renforce la crédibilité et augmente le taux de clic réel." },
      { type: "blank", sentence: "Mentionner clairement un lien {blank} respecte la transparence attendue par l'audience.", options: ["affilié", "caché", "secret"], correct: "affilié", tip: "La transparence sur les liens affiliés est une obligation et une question de confiance durable." },
      { type: "qcm", question: "Quel est le critère le plus important pour choisir un programme d'affiliation ?", options: ["La commission ET la crédibilité réelle du produit", "Uniquement le taux de commission affiché", "Le nombre d'affiliés déjà inscrits"], correct: "La commission ET la crédibilité réelle du produit", tip: "Recommander un produit peu fiable détruit la confiance de l'audience, même avec une bonne commission." },
      { type: "vrai_faux", statement: "Un cookie d'affiliation plus long augmente les chances de toucher une commission sur un achat différé.", correct: true, tip: "Plus le cookie dure longtemps, plus il couvre un achat qui arrive après le premier clic." },
      { type: "intrus", instruction: "Lequel de ces éléments N'EST PAS utile pour construire une audience de niche fidèle ?", options: ["Se spécialiser sur un sujet précis", "Publier sur un ton incohérent d'un jour à l'autre", "Interagir directement avec son audience", "Publier régulièrement sur la même thématique"], correct: "Publier sur un ton incohérent d'un jour à l'autre", tip: "La cohérence de ton et de sujet aide à construire une audience qui s'identifie au créateur." },
      { type: "blank", sentence: "Une audience de {blank} convertit souvent mieux qu'une audience large et peu ciblée.", options: ["niche", "masse", "hasard"], correct: "niche", tip: "Une audience précise et intéressée par un sujet précis achète plus facilement ce qui lui correspond." },
      { type: "blank", sentence: "Interagir directement avec son audience aide à comprendre ses {blank} réels avant de recommander un produit.", options: ["besoins", "hashtags", "horaires"], correct: "besoins", tip: "Connaître les vrais besoins de son audience évite de recommander des produits hors sujet." },
      { type: "blank", sentence: "Suivre ses {blank} régulièrement permet d'identifier les contenus qui génèrent vraiment des ventes.", options: ["statistiques", "abonnés uniquement", "likes uniquement"], correct: "statistiques", tip: "Sans suivi régulier, impossible de savoir quel contenu mérite d'être développé davantage." },
      { type: "blank", sentence: "Un lien affilié {blank} facilite le suivi précis des clics par contenu.", options: ["traqué individuellement", "identique partout", "caché"], correct: "traqué individuellement", tip: "Un lien différent par contenu révèle précisément ce qui génère réellement des ventes." },
      { type: "qcm", question: "À quoi ressemble un contenu d'affiliation qui convertit bien ?", options: ["Un retour d'expérience concret, limites incluses", "Une publicité générique sans nuance", "Une liste de liens sans contexte"], correct: "Un retour d'expérience concret, limites incluses", tip: "La transparence sur les limites d'un produit renforce la crédibilité et le taux de clic réel." },
      { type: "vrai_faux", statement: "Il est toujours préférable de dépendre d'un seul programme d'affiliation pour rester simple.", correct: false, tip: "Dépendre d'un seul programme expose tout le revenu à une décision externe hors de ton contrôle." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à suivre ses commissions efficacement ?", options: ["Un lien traqué individuellement par contenu", "Ignorer les commissions annulées après retour", "Un tableau de bord affilié consulté régulièrement", "Comparer la performance de plusieurs produits"], correct: "Ignorer les commissions annulées après retour", tip: "Ignorer les annulations donne une image faussement optimiste du revenu réel généré." },
      { type: "blank", sentence: "Un programme d'affiliation {blank} peut fermer sans préavis et couper une source de revenu entière.", options: ["unique", "secondaire", "diversifié"], correct: "unique", tip: "Ne dépendre que d'un seul programme expose tout le revenu affilié à une décision externe." },
      { type: "blank", sentence: "Rejoindre plusieurs programmes {blank} réduit le risque si l'un d'eux change ses conditions.", options: ["complémentaires", "identiques", "concurrents directs"], correct: "complémentaires", tip: "Des programmes qui se complètent plutôt qu'ils ne se dupliquent élargissent le revenu sans le fragiliser." },
      { type: "blank", sentence: "Un contenu {blank} continue de générer des commissions des mois après sa publication, sans effort supplémentaire.", options: ["evergreen", "éphémère", "sponsorisé uniquement"], correct: "evergreen", tip: "Un contenu intemporel bien référencé continue d'être trouvé et de convertir longtemps après sa sortie." },
      { type: "blank", sentence: "Un revenu affilié durable repose sur la {blank} construite avec l'audience, pas seulement sur le trafic.", options: ["confiance", "couleur du site", "vitesse du site"], correct: "confiance", tip: "Une audience qui fait confiance au créateur continue d'acheter via ses liens sur la durée." },
    ],
  },
  {
    id: "pod",
    label: "Print on demand",
    tag: "PD",
    icon: Shirt,
    pitch: "Designs à la demande, zéro stock, marges à travailler.",
    courses: [
      {
        title: "Trouver des designs qui se vendent",
        desc: "Repérer des niches, tester des visuels, éviter les tendances déjà saturées.",
        duration: "16 min",
      },
      {
        title: "Choisir un imprimeur à la demande fiable",
        desc: "Qualité d'impression, délais, marge nette après frais de production.",
        duration: "15 min",
      },
      {
        title: "Vendre sans faire de publicité payante",
        desc: "Marketplaces, réseaux sociaux organiques, communautés de niche.",
        duration: "17 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Avant de lancer un design en masse, il vaut mieux le tester sur un {blank} volume.", options: ["petit", "grand", "double"], correct: "petit", tip: "Un test à petite échelle évite d'immobiliser du capital sur un design qui ne trouve pas son public." },
      { type: "blank", sentence: "Un bon design de print on demand parle à une {blank} précise plutôt qu'à tout le monde.", options: ["communauté", "couleur", "police"], correct: "communauté", tip: "Un design ciblé sur une passion précise convertit mieux qu'un visuel générique." },
      { type: "blank", sentence: "La marge nette dépend surtout du prix de vente moins les frais de {blank} et de livraison.", options: ["production", "publicité", "design"], correct: "production", tip: "Sans stock, la rentabilité se joue entièrement sur l'écart entre prix de vente et coût réel par unité." },
      { type: "blank", sentence: "Commander un {blank} avant de lancer un design permet de vérifier la qualité d'impression réelle.", options: ["échantillon", "stock complet", "budget pub"], correct: "échantillon", tip: "Voir et toucher le produit fini évite de vendre un article dont la qualité déçoit." },
      { type: "qcm", question: "Que vaut-il mieux faire avant de lancer un design en masse ?", options: ["Le tester sur un petit volume", "Commander directement une grande quantité", "Se fier uniquement à son propre goût"], correct: "Le tester sur un petit volume", tip: "Un test à petite échelle évite d'immobiliser du capital sur un design qui ne trouve pas son public." },
      { type: "vrai_faux", statement: "Copier directement un design tendance déjà existant est une pratique sans risque.", correct: false, tip: "Copier expose à des retraits de plateforme et à des litiges liés aux droits d'auteur." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à vendre sans budget publicitaire ?", options: ["Rejoindre des communautés de niche", "Publier régulièrement sur les réseaux sociaux", "Ignorer complètement les avis clients", "Optimiser le titre pour la recherche interne"], correct: "Ignorer complètement les avis clients", tip: "Des avis nombreux et positifs rassurent gratuitement les visiteurs suivants." },
      { type: "blank", sentence: "Publier régulièrement sur les {blank} sociaux permet de faire connaître ses designs sans budget publicitaire.", options: ["réseaux", "forums privés", "emails uniquement"], correct: "réseaux", tip: "Une présence organique régulière peut générer des ventes sans dépenser en publicité." },
      { type: "blank", sentence: "Rejoindre des {blank} de niche liées au thème d'un design aide à toucher une audience déjà intéressée.", options: ["communautés", "fournisseurs", "imprimeurs"], correct: "communautés", tip: "Les communautés de passionnés sont souvent plus réceptives à un design qui parle directement à leur intérêt." },
      { type: "blank", sentence: "Une identité visuelle {blank} entre tous les designs aide à construire une marque reconnaissable.", options: ["cohérente", "aléatoire", "changeante"], correct: "cohérente", tip: "Une cohérence de style aide l'audience à reconnaître la marque même sans voir le nom." },
      { type: "blank", sentence: "Une marque qui raconte une {blank} claire se différencie d'un simple revendeur de designs génériques.", options: ["histoire", "couleur de logo", "police de titre"], correct: "histoire", tip: "Un univers de marque cohérent donne une raison d'acheter au-delà du simple visuel imprimé." },
      { type: "qcm", question: "Comment se calcule surtout la marge nette en print on demand ?", options: ["Prix de vente moins frais de production et livraison", "Uniquement le prix de vente affiché", "Le nombre de designs publiés"], correct: "Prix de vente moins frais de production et livraison", tip: "Sans stock, la rentabilité dépend entièrement de cet écart réel par unité." },
      { type: "vrai_faux", statement: "Un packaging soigné, même simple, renforce la qualité perçue de la marque à la réception.", correct: true, tip: "Le moment du déballage influence fortement l'impression finale laissée au client." },
      { type: "intrus", instruction: "Lequel de ces éléments N'EST PAS utile pour choisir un bon imprimeur ?", options: ["Commander un échantillon avant de vendre", "Vérifier les avis d'autres vendeurs", "Choisir sans comparer aucun tarif", "Vérifier les zones de livraison couvertes"], correct: "Choisir sans comparer aucun tarif", tip: "Les marges et la qualité varient beaucoup d'un imprimeur à l'autre pour un même produit." },
      { type: "blank", sentence: "Comparer la marge {blank} par produit, pas seulement le prix de vente, révèle la vraie rentabilité.", options: ["nette", "brute uniquement", "affichée"], correct: "nette", tip: "Le prix de vente seul cache souvent des produits qui rapportent très peu une fois tous les frais déduits." },
      { type: "blank", sentence: "Négocier un tarif dégressif avec l'imprimeur devient possible une fois un {blank} de commandes atteint.", options: ["volume", "design unique", "logo"], correct: "volume", tip: "Un volume de commandes régulier donne un vrai levier de négociation avec l'imprimeur." },
      { type: "blank", sentence: "Élargir la collection avec des designs qui {blank} l'univers existant garde une cohérence de marque en grandissant.", options: ["prolongent", "contredisent", "ignorent"], correct: "prolongent", tip: "Une collection cohérente renforce l'identité de marque plutôt que de la diluer avec le temps." },
      { type: "blank", sentence: "Diversifier les canaux de vente réduit la dépendance à une seule {blank} pour tout le revenu.", options: ["marketplace", "couleur", "police"], correct: "marketplace", tip: "Dépendre d'une seule plateforme expose toute la collection à ses changements de règles." },
    ],
  },
  {
    id: "vinted",
    label: "Achat-revente (Vinted)",
    tag: "VR",
    icon: Recycle,
    pitch: "Trouver, retaper et revendre vêtements et objets d'occasion avec marge.",
    courses: [
      {
        title: "Où trouver des articles à revendre",
        desc: "Friperies, brocantes, dépôts-ventes, vide-greniers : repérer ce qui a vraiment de la valeur.",
        duration: "14 min",
      },
      {
        title: "Fixer le bon prix et rédiger une annonce qui vend",
        desc: "Photos, description, mots-clés recherchés par les acheteurs sur l'app.",
        duration: "16 min",
      },
      {
        title: "Gérer les envois et le service client",
        desc: "Emballage, délais, éviter les litiges et les mauvaises évaluations.",
        duration: "12 min",
      },
      {
        title: "Passer du hobby au petit business rentable",
        desc: "Suivre sa marge réelle, réinvestir, augmenter le volume sans perdre en qualité.",
        duration: "15 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Avant d'acheter un article à revendre, il faut estimer son {blank} de revente probable.", options: ["prix", "poids", "âge"], correct: "prix", tip: "Un article mal évalué avant achat peut faire perdre de l'argent une fois revendu." },
      { type: "blank", sentence: "Des photos {blank} sous plusieurs angles augmentent fortement les chances de vente.", options: ["nombreuses et nettes", "floues", "sombres"], correct: "nombreuses et nettes", tip: "Des photos claires rassurent l'acheteur sur l'état réel de l'article." },
      { type: "blank", sentence: "Indiquer les {blank} exactes d'un vêtement évite les retours pour mauvaise taille.", options: ["mesures", "couleurs", "marques"], correct: "mesures", tip: "Les tailles varient beaucoup d'une marque à l'autre, les mesures réelles évitent les mauvaises surprises." },
      { type: "qcm", question: "Que faut-il vérifier avant d'acheter un article à revendre ?", options: ["Son prix de revente probable", "Uniquement sa couleur", "Le nombre de vues sur l'annonce d'origine"], correct: "Son prix de revente probable", tip: "Un article mal évalué avant achat peut faire perdre de l'argent une fois revendu." },
      { type: "vrai_faux", statement: "La marge réelle se juge uniquement au prix de vente, sans tenir compte du prix d'achat.", correct: false, tip: "Le prix de vente seul cache le coût d'achat et les frais qui réduisent la marge réelle." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à vendre plus vite sur Vinted ?", options: ["Des photos nombreuses et nettes", "Répondre rapidement aux messages", "Laisser l'article froissé sur la photo", "Indiquer les mesures exactes"], correct: "Laisser l'article froissé sur la photo", tip: "Un article bien présenté se vend plus cher et plus vite qu'un article froissé." },
      { type: "blank", sentence: "Un prix légèrement {blank} au marché accélère la vente sans brader l'article.", options: ["en dessous", "au-dessus", "identique"], correct: "en dessous", tip: "Un prix un peu plus attractif que la concurrence directe fait vendre plus vite." },
      { type: "blank", sentence: "Répondre vite aux messages augmente la {blank} de l'acheteur avant qu'il change d'avis.", options: ["confiance", "couleur", "taille"], correct: "confiance", tip: "Un vendeur réactif rassure et évite qu'un acheteur hésitant parte voir ailleurs." },
      { type: "blank", sentence: "Nettoyer et repasser un vêtement avant photo améliore nettement sa {blank} perçue.", options: ["qualité", "taille", "couleur"], correct: "qualité", tip: "Un article bien présenté se vend plus cher et plus vite qu'un article froissé." },
      { type: "blank", sentence: "Regrouper plusieurs articles dans un même envoi réduit le {blank} par vente.", options: ["coût de livraison", "prix de vente", "délai"], correct: "coût de livraison", tip: "Mutualiser les envois quand c'est possible améliore la marge nette." },
      { type: "blank", sentence: "Suivre sa marge par {blank}, pas seulement le prix de vente, révèle la vraie rentabilité.", options: ["article", "couleur", "photo"], correct: "article", tip: "Le prix de vente seul cache le coût d'achat et les frais qui réduisent la marge réelle." },
      { type: "qcm", question: "Quel type de prix accélère généralement une vente sans brader l'article ?", options: ["Un prix légèrement en dessous du marché", "Un prix très supérieur au marché", "Un prix identique partout sans vérification"], correct: "Un prix légèrement en dessous du marché", tip: "Un prix un peu plus attractif que la concurrence directe fait vendre plus vite." },
      { type: "vrai_faux", statement: "Regrouper plusieurs articles dans un même envoi peut réduire le coût de livraison par vente.", correct: true, tip: "Mutualiser les envois quand c'est possible améliore la marge nette." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à faire grandir un petit business de revente ?", options: ["Réinvestir les profits dans de nouveaux achats", "Suivre sa marge par article", "Vendre uniquement sur une seule plateforme sans jamais varier", "Se spécialiser sur un type d'articles précis"], correct: "Vendre uniquement sur une seule plateforme sans jamais varier", tip: "Diversifier les plateformes réduit la dépendance à une seule marketplace." },
      { type: "blank", sentence: "Un article invendu depuis longtemps mérite souvent un {blank} de prix plutôt qu'une attente indéfinie.", options: ["ajustement", "doublement", "retrait"], correct: "ajustement", tip: "Revoir le prix à la baisse débloque souvent une vente qui stagnait." },
      { type: "blank", sentence: "Se spécialiser sur un {blank} précis aide à devenir repérable parmi les vendeurs.", options: ["type d'articles", "nombre de photos", "jour de la semaine"], correct: "type d'articles", tip: "Une spécialisation claire aide les acheteurs à te retrouver et te faire confiance." },
      { type: "blank", sentence: "Réinvestir les profits dans de nouveaux {blank} permet de faire grandir le volume de vente.", options: ["achats", "réseaux sociaux uniquement", "emballages"], correct: "achats", tip: "Réinvestir dans du nouveau stock entretient la croissance du petit business." },
      { type: "blank", sentence: "Diversifier les plateformes de vente réduit la dépendance à une seule {blank}.", options: ["marketplace", "couleur", "photo"], correct: "marketplace", tip: "Vendre uniquement sur une plateforme expose au risque d'un changement de règles ou de frais." },
    ],
  },
  {
    id: "digital",
    label: "Marketing digital",
    tag: "MD",
    icon: Megaphone,
    pitch: "Vendre ses compétences en publicité, réseaux sociaux ou référencement à des clients.",
    courses: [
      {
        title: "Choisir une compétence à vendre en premier",
        desc: "Publicité en ligne, réseaux sociaux, SEO, email marketing : se spécialiser avant de se disperser.",
        duration: "15 min",
      },
      {
        title: "Trouver ses premiers clients sans réseau",
        desc: "Prospection directe, portfolio de départ, offres d'appel pour décrocher les premières missions.",
        duration: "18 min",
      },
      {
        title: "Fixer ses tarifs et livrer une prestation claire",
        desc: "Forfait vs horaire, cadrer un brief, définir des livrables précis.",
        duration: "16 min",
      },
      {
        title: "Fidéliser un client et scaler son activité",
        desc: "Prouver des résultats mesurables, vendre plus au même client, déléguer pour grandir.",
        duration: "17 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Se spécialiser sur une seule {blank} au départ facilite les premières missions.", options: ["compétence", "couleur de logo", "ville"], correct: "compétence", tip: "Une spécialisation claire est plus facile à vendre qu'une offre floue et généraliste." },
      { type: "blank", sentence: "Un portfolio, même avec des projets {blank}, rassure un premier client potentiel.", options: ["personnels", "payants uniquement", "anciens de dix ans"], correct: "personnels", tip: "Un projet test ou personnel bien présenté vaut mieux qu'un portfolio vide." },
      { type: "blank", sentence: "Prospecter directement des {blank} précises augmente les chances de réponse.", options: ["entreprises", "couleurs", "polices"], correct: "entreprises", tip: "Cibler des entreprises qui ont un vrai besoin identifié convertit mieux qu'un message générique envoyé à tous." },
      { type: "blank", sentence: "Un tarif {blank} protège d'un projet qui prend plus de temps que prévu.", options: ["au forfait bien cadré", "à l'heure sans limite", "gratuit au départ"], correct: "au forfait bien cadré", tip: "Un forfait avec un périmètre clair évite les dérives de temps non rémunérées." },
      { type: "qcm", question: "Que privilégier au tout début d'une activité de marketing digital freelance ?", options: ["Se spécialiser sur une seule compétence", "Proposer un peu de tout dès le départ", "Attendre d'avoir un grand réseau avant de commencer"], correct: "Se spécialiser sur une seule compétence", tip: "Une spécialisation claire est plus facile à vendre qu'une offre floue et généraliste." },
      { type: "vrai_faux", statement: "Montrer des résultats chiffrés convainc plus qu'une simple promesse de compétence.", correct: true, tip: "Des chiffres concrets sur un projet précédent rassurent bien plus qu'une liste de compétences." },
      { type: "intrus", instruction: "Lequel de ces éléments N'AIDE PAS à décrocher un premier client sans réseau ?", options: ["Un portfolio avec des projets personnels", "Prospecter des entreprises ciblées", "Attendre passivement sans jamais contacter personne", "Proposer une offre d'appel claire"], correct: "Attendre passivement sans jamais contacter personne", tip: "La prospection directe reste nécessaire pour décrocher les toutes premières missions." },
      { type: "blank", sentence: "Un brief client mal {blank} mène souvent à des retours et un travail à refaire.", options: ["clarifié", "payé", "signé"], correct: "clarifié", tip: "Poser les bonnes questions avant de commencer évite de perdre du temps sur un livrable hors sujet." },
      { type: "blank", sentence: "Montrer des {blank} chiffrés convainc plus qu'une simple promesse de compétence.", options: ["résultats", "logos de clients", "diplômes"], correct: "résultats", tip: "Des chiffres concrets sur un projet précédent rassurent bien plus qu'une liste de compétences." },
      { type: "blank", sentence: "Le {blank} mesure l'efficacité réelle d'une campagne gérée pour un client.", options: ["retour sur investissement", "nombre de likes", "nombre d'heures travaillées"], correct: "retour sur investissement", tip: "Le client final se soucie surtout de ce que la campagne lui rapporte, pas du temps passé." },
      { type: "blank", sentence: "Un contrat qui précise les {blank} évite les malentendus sur ce qui est livré.", options: ["livrables", "couleurs du logo", "horaires de travail"], correct: "livrables", tip: "Définir précisément ce qui sera livré protège autant le client que le prestataire." },
      { type: "blank", sentence: "Un client satisfait qui {blank} devient souvent la meilleure source de nouveaux clients.", options: ["recommande", "paie en retard", "annule"], correct: "recommande", tip: "Le bouche-à-oreille d'un client content coûte bien moins cher qu'une nouvelle prospection à froid." },
      { type: "blank", sentence: "Documenter un {blank} de travail répétable facilite la délégation future à une équipe.", options: ["processus", "logo", "tarif unique"], correct: "processus", tip: "Un processus clair et écrit peut être transmis à quelqu'un d'autre sans tout réexpliquer à chaque fois." },
      { type: "qcm", question: "Quel type de tarif protège le mieux d'un projet qui prend plus de temps que prévu ?", options: ["Un forfait bien cadré", "Un tarif horaire sans limite", "Un travail gratuit au départ"], correct: "Un forfait bien cadré", tip: "Un forfait avec un périmètre clair évite les dérives de temps non rémunérées." },
      { type: "vrai_faux", statement: "Dépendre d'un seul gros client est toujours plus sûr que d'avoir plusieurs clients plus petits.", correct: false, tip: "Un revenu concentré sur un seul client expose toute l'activité à sa décision d'arrêter." },
      { type: "intrus", instruction: "Lequel de ces éléments N'EST PAS utile pour fidéliser un client existant ?", options: ["Prouver des résultats mesurables", "Documenter un processus de travail clair", "Changer de méthode à chaque mission sans expliquer pourquoi", "Rester réactif et transparent"], correct: "Changer de méthode à chaque mission sans expliquer pourquoi", tip: "Un processus cohérent et expliqué rassure un client sur la qualité du travail fourni." },
      { type: "blank", sentence: "Augmenter ses tarifs progressivement à mesure des résultats prouvés protège la {blank} du travail fourni.", options: ["valeur", "rapidité", "couleur"], correct: "valeur", tip: "Des tarifs qui suivent les résultats obtenus évitent de rester sous-payé malgré l'expérience gagnée." },
      { type: "blank", sentence: "Diversifier ses clients réduit le risque de dépendre d'un seul {blank} pour tout son revenu.", options: ["contrat", "logo", "réseau social"], correct: "contrat", tip: "Un revenu concentré sur un seul client expose toute l'activité à sa décision d'arrêter." },
    ],
  },
  {
    id: "trading",
    label: "Trading",
    tag: "TR",
    icon: LineChart,
    pitch: "Comprendre les marchés financiers et gérer le risque avant d'y engager du capital.",
    courses: [
      {
        title: "Comprendre les bases des marchés avant de trader",
        desc: "Actions, forex, crypto : ce que ces marchés représentent réellement avant d'y toucher.",
        duration: "16 min",
      },
      {
        title: "Gérer le risque avant de gérer le profit",
        desc: "Taille de position, stop-loss, ne jamais miser plus que ce qu'on peut se permettre de perdre.",
        duration: "20 min",
      },
      {
        title: "Construire une stratégie et un journal de trading",
        desc: "Règles écrites à l'avance, discipline, suivi méthodique de ses erreurs.",
        duration: "18 min",
      },
      {
        title: "Les pièges psychologiques les plus courants",
        desc: "Sur-trading, revenge trading, effet de levier mal maîtrisé.",
        duration: "15 min",
      },
    ],
    path: [
      { type: "blank", sentence: "Avant de trader avec de l'argent réel, s'entraîner sur un compte {blank} limite les pertes d'apprentissage.", options: ["démo", "à effet de levier maximal", "emprunté"], correct: "démo", tip: "Un compte de démonstration permet d'apprendre les mécanismes sans risquer de vrai capital." },
      { type: "blank", sentence: "Ne jamais risquer plus qu'un petit {blank} de son capital sur une seule position protège des grosses pertes.", options: ["pourcentage", "doublement", "emprunt"], correct: "pourcentage", tip: "Limiter le risque par position évite qu'une seule mauvaise décision ne mette tout le capital en danger." },
      { type: "blank", sentence: "Un {blank} placé à l'avance limite automatiquement une perte si le marché part dans le mauvais sens.", options: ["stop-loss", "effet de levier", "compte démo"], correct: "stop-loss", tip: "Définir à l'avance le niveau de sortie évite de prendre une décision sous le coup de l'émotion." },
      { type: "qcm", question: "Que faut-il faire avant de trader avec de l'argent réel ?", options: ["S'entraîner sur un compte démo", "Emprunter de l'argent pour commencer plus fort", "Utiliser directement l'effet de levier maximal"], correct: "S'entraîner sur un compte démo", tip: "Un compte de démonstration permet d'apprendre les mécanismes sans risquer de vrai capital." },
      { type: "vrai_faux", statement: "L'effet de levier amplifie aussi bien les gains que les pertes potentielles.", correct: true, tip: "Un levier élevé peut transformer une petite variation de marché en perte importante rapidement." },
      { type: "intrus", instruction: "Lequel de ces comportements N'EST PAS une bonne pratique de gestion du risque ?", options: ["Limiter le risque à un petit pourcentage du capital par position", "Tenir un journal de trading", "Miser une très grosse part du capital sur une seule position", "Placer un stop-loss avant d'ouvrir une position"], correct: "Miser une très grosse part du capital sur une seule position", tip: "Une seule mauvaise décision ne doit jamais pouvoir mettre tout le capital en danger." },
      { type: "blank", sentence: "L'effet de {blank} amplifie aussi bien les gains que les pertes potentielles.", options: ["levier", "stop-loss", "spread"], correct: "levier", tip: "Un levier élevé peut transformer une petite variation de marché en perte importante rapidement." },
      { type: "blank", sentence: "Tenir un {blank} de trading aide à repérer ses erreurs répétées dans le temps.", options: ["journal", "compte multiple", "secret"], correct: "journal", tip: "Noter chaque décision et son résultat révèle des schémas d'erreur qu'on ne voit pas sur le moment." },
      { type: "blank", sentence: "Trader sous le coup d'une émotion forte après une perte s'appelle du {blank}.", options: ["revenge trading", "day trading", "swing trading"], correct: "revenge trading", tip: "Vouloir immédiatement se refaire après une perte pousse souvent à prendre des risques mal calculés." },
      { type: "blank", sentence: "Une stratégie écrite à l'avance réduit les décisions prises sous le coup de l'{blank}.", options: ["émotion", "analyse", "expérience"], correct: "émotion", tip: "Des règles définies à froid évitent de céder à la panique ou à l'euphorie en plein marché." },
      { type: "blank", sentence: "Diversifier ses positions plutôt que tout miser sur un seul actif réduit le risque {blank}.", options: ["global", "de spread", "de levier"], correct: "global", tip: "Répartir le capital sur plusieurs actifs limite l'impact d'un seul mauvais scénario." },
      { type: "blank", sentence: "Le trading comporte un risque réel de perte, y compris de la totalité du {blank} engagé.", options: ["capital", "temps", "logiciel"], correct: "capital", tip: "Aucune stratégie ne garantit un gain : le risque de perte fait partie intégrante des marchés." },
      { type: "blank", sentence: "Comprendre les {blank} macroéconomiques aide à situer un actif dans son contexte avant d'agir.", options: ["tendances", "couleurs de graphique", "noms de plateformes"], correct: "tendances", tip: "Le contexte économique global influence souvent plus un marché que l'actualité isolée d'un seul actif." },
      { type: "qcm", question: "Quel outil limite automatiquement une perte si le marché part dans le mauvais sens ?", options: ["Un stop-loss", "Un effet de levier plus élevé", "Un compte sans limite"], correct: "Un stop-loss", tip: "Définir à l'avance le niveau de sortie évite de prendre une décision sous le coup de l'émotion." },
      { type: "vrai_faux", statement: "Le trading ne comporte aucun risque réel de perte si on suit une bonne stratégie.", correct: false, tip: "Aucune stratégie ne garantit un gain : le risque de perte fait partie intégrante des marchés." },
      { type: "intrus", instruction: "Lequel de ces comportements correspond au revenge trading ?", options: ["Réduire sa taille de position après une perte", "Reprendre immédiatement une position plus grosse pour se refaire après une perte", "Suivre son plan de trading écrit à l'avance", "Faire une pause après une série de pertes"], correct: "Reprendre immédiatement une position plus grosse pour se refaire après une perte", tip: "Vouloir se refaire tout de suite après une perte pousse souvent à prendre des risques mal calculés." },
      { type: "blank", sentence: "Réduire la taille de ses positions après une série de pertes protège le capital {blank}.", options: ["restant", "emprunté", "doublé"], correct: "restant", tip: "Réduire le risque après une mauvaise période évite d'aggraver les pertes en cherchant à se refaire vite." },
      { type: "blank", sentence: "Se former en continu sur les marchés reste nécessaire même après plusieurs années d'{blank}.", options: ["expérience", "effet de levier", "argent emprunté"], correct: "expérience", tip: "Les marchés évoluent constamment, une stratégie qui marchait hier peut ne plus fonctionner demain." },
    ],
  },
];

const CAPITAL_TIERS = [
  { id: "t0", label: "0 €", range: "Aucun capital de départ", hint: "Miser sur l'organique et le temps" },
  { id: "t1", label: "1 – 500 €", range: "Petit budget de test", hint: "Premiers tests low-cost" },
  { id: "t2", label: "500 – 2 000 €", range: "Budget de lancement", hint: "Premiers stocks ou publicités" },
  { id: "t3", label: "2 000 – 5 000 €", range: "Budget structurant", hint: "Scaler ce qui fonctionne" },
  { id: "t4", label: "5 000 – 20 000 €", range: "Budget confortable", hint: "Diversifier les canaux" },
  { id: "t5", label: "20 000 € +", range: "Capital important", hint: "Investir plusieurs axes en parallèle" },
];

const TICKER_ITEMS = [
  "TIKTOK SHOP · LIVE SHOPPING",
  "YOUTUBE · PARTNER PROGRAM",
  "DROPSHIPPING · TEST PRODUIT",
  "AFFILIATION · COMMISSION RÉCURRENTE",
  "PRINT ON DEMAND · ZÉRO STOCK",
];

const PRO_PRICE = "2,99 €";
// Coupe la vente/le don Pro en libre-service tant que le paiement réel n'est pas branché.
// Les comptes déjà Pro (ou accordés via l'onglet Admin) ne sont pas affectés.
const PRO_SALES_OPEN = false;

const THEME_PRESETS = [
  { id: "lime", label: "Lime", lime: "#C6FF3D", amber: "#FF9F45", surfaceTint: "#15191B", surface2Tint: "#1D2224" },
  { id: "ocean", label: "Océan", lime: "#4DE8FF", amber: "#4D7CFF", surfaceTint: "#0F1A1D", surface2Tint: "#152428" },
  { id: "sunset", label: "Coucher de soleil", lime: "#FF9F45", amber: "#FF4DA6", surfaceTint: "#1D1512", surface2Tint: "#261B16" },
  { id: "berry", label: "Berry", lime: "#FF4DA6", amber: "#B084FF", surfaceTint: "#1A1017", surface2Tint: "#241621" },
  { id: "royal", label: "Royal", lime: "#B084FF", amber: "#4DE8FF", surfaceTint: "#15121D", surface2Tint: "#1D1927" },
  { id: "ember", label: "Braise", lime: "#FF5C5C", amber: "#FF9F45", surfaceTint: "#1D1312", surface2Tint: "#261917" },
];

const AVATAR_OPTIONS = ["🦁", "🚀", "💼", "📈", "🎯", "🔥", "💎", "🌟", "🧠", "⚡", "🐺", "🦊"];

const GROUP_ICONS = ["💬", "📈", "🎯", "🚀", "💼", "🔥", "🌍", "🧠", "🛍️", "📷"];

const CHANNEL_TYPES = [
  { id: "text", label: "Texte", icon: Hash, desc: "Discussion libre pour tous les membres" },
  { id: "announcement", label: "Annonces", icon: Megaphone, desc: "Seul le créateur du groupe peut publier" },
  { id: "forum", label: "Forum", icon: MessagesSquare, desc: "Sujets avec réponses, comme un forum" },
];

function defaultChannels() {
  return [{ id: "c-general", name: "général", type: "text", messages: [] }];
}

const BANNER_COLORS = [
  { id: "b-lime", color: "#2E3B0F" },
  { id: "b-amber", color: "#4A2E12" },
  { id: "b-cyan", color: "#0F3A40" },
  { id: "b-pink", color: "#401A2E" },
  { id: "b-violet", color: "#2A1A40" },
  { id: "b-steel", color: "#1E2528" },
];

const BANNER_GRADIENTS = [
  { id: "g-sunset", css: "linear-gradient(135deg, #FF9F45, #FF4DA6)" },
  { id: "g-ocean", css: "linear-gradient(135deg, #4DE8FF, #2E3B8F)" },
  { id: "g-forest", css: "linear-gradient(135deg, #C6FF3D, #14532D)" },
  { id: "g-royal", css: "linear-gradient(135deg, #B084FF, #2A1A40)" },
  { id: "g-fire", css: "linear-gradient(135deg, #FF5C5C, #FF9F45)" },
  { id: "g-mono", css: "linear-gradient(135deg, #2A3032, #0B0D0E)" },
];

// ---------------------------------------------------------------------------
// SHARED UI
// ---------------------------------------------------------------------------

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span className="ticker-item" key={i}>
            <span className="ticker-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepDots({ step, total }) {
  return (
    <div className="step-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
          <span>{String(i + 1).padStart(2, "0")}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCREENS
// ---------------------------------------------------------------------------

function Landing({ onStart }) {
  return (
    <div className="screen landing">
      <Ticker />
      <header className="nav">
        <div className="brand">
          <TrendingUp size={20} strokeWidth={2.4} />
          <span>FORMA CODEX</span>
        </div>
        <button className="btn-ghost" onClick={onStart}>
          Créer un compte
        </button>
      </header>

      <section className="hero">
        <div className="eyebrow">Formation e-commerce &amp; monétisation</div>
        <h1>
          Transforme ton temps
          <br />
          en <span className="accent">capital.</span>
        </h1>
        <p className="hero-sub">
          TikTok, YouTube, dropshipping, affiliation, print on demand — un parcours de
          cours construit pour ton profil, ton budget et ton objectif réel.
        </p>
        <button className="btn-primary" onClick={onStart}>
          <span>Commencer</span>
          <ArrowRight size={18} />
        </button>
      </section>

      <section className="ledger">
        <div className="ledger-head">
          <span>Voie</span>
          <span>Ce que tu apprends</span>
        </div>
        {NICHES.map((n) => {
          const Icon = n.icon;
          return (
            <div className="ledger-row" key={n.id}>
              <div className="ledger-tag">{n.tag}</div>
              <div className="ledger-main">
                <div className="ledger-title">
                  <Icon size={16} />
                  {n.label}
                </div>
                <div className="ledger-pitch">{n.pitch}</div>
              </div>
              <ChevronRight size={16} className="ledger-arrow" />
            </div>
          );
        })}
      </section>

      <footer className="foot">
        <span>FORMA CODEX — formation e-commerce</span>
      </footer>
    </div>
  );
}

function AuthCard({ onBack, onSignup, onLogin }) {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function switchMode(next) {
    setMode(next);
    setError("");
  }

  function handleSubmit() {
    if (pseudo.trim().length < 3) {
      setError("Ton pseudo doit faire au moins 3 caractères.");
      return;
    }
    if (password.length < 6) {
      setError("Ton mot de passe doit faire au moins 6 caractères.");
      return;
    }
    const result =
      mode === "signup"
        ? onSignup(pseudo.trim(), password)
        : onLogin(pseudo.trim(), password);
    if (result) setError(result);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="screen center-screen">
      <div className="auth-card">
        <button className="btn-icon-back" onClick={onBack} aria-label="Retour">
          <ChevronLeft size={18} />
        </button>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => switchMode("signup")}
          >
            Créer un compte
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => switchMode("login")}
          >
            Se connecter
          </button>
        </div>

        <div className="auth-head">
          <div className="brand small">
            <TrendingUp size={16} />
            <span>FORMA CODEX</span>
          </div>
          <h2>{mode === "signup" ? "Créer ton compte" : "Content de te revoir"}</h2>
          <p>
            {mode === "signup"
              ? "30 secondes pour ouvrir ton espace de formation."
              : "Connecte-toi pour retrouver ton espace."}
          </p>
        </div>

        <div className="auth-form">
          <label className="field">
            <span className="field-label">
              <User size={14} /> Pseudo
            </span>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ex. capital_lucas"
              autoComplete="off"
            />
          </label>

          <label className="field">
            <span className="field-label">
              <Lock size={14} /> Mot de passe
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="6 caractères minimum"
            />
          </label>

          {error && <div className="field-error">{error}</div>}

          <button type="button" className="btn-primary full" onClick={handleSubmit}>
            <span>{mode === "signup" ? "Ouvrir mon compte" : "Me connecter"}</span>
            <ArrowRight size={18} />
          </button>

          <button type="button" className="auth-switch" onClick={() => switchMode(mode === "signup" ? "login" : "signup")}>
            {mode === "signup" ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? En créer un"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Questionnaire({ pseudo, onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [capital, setCapital] = useState(null);
  const [niche, setNiche] = useState(null);

  const steps = ["Profil", "Capital", "Objectif"];

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete({ age, gender, capital, niche });
  }
  function prev() {
    if (step === 0) onBack();
    else setStep(step - 1);
  }

  const canNext =
    (step === 0 && age !== "" && gender !== "") ||
    (step === 1 && capital !== null) ||
    (step === 2 && niche !== null);

  return (
    <div className="screen center-screen">
      <div className="quiz-card wide">
        <button className="btn-icon-back" onClick={prev} aria-label="Précédent">
          <ChevronLeft size={18} />
        </button>

        <StepDots step={step} total={steps.length} />
        <div className="step-label">
          {String(step + 1).padStart(2, "0")} / {steps[step]}
        </div>

        {step === 0 && (
          <div className="step-body">
            <h2>Ton profil, {pseudo}</h2>
            <label className="field">
              <span className="field-label">Âge</span>
              <input
                type="number"
                min="13"
                max="99"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="ex. 22"
              />
            </label>

            <span className="field-label" style={{ marginTop: "1.25rem" }}>
              Genre
            </span>
            <div className="pill-row">
              {["Homme", "Femme", "Autre / préfère ne pas dire"].map((g) => (
                <button
                  key={g}
                  className={`pill ${gender === g ? "selected" : ""}`}
                  onClick={() => setGender(g)}
                  type="button"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="step-body">
            <h2>Ton capital de départ</h2>
            <p className="step-sub">Ça oriente les stratégies qu'on te propose ensuite.</p>
            <div className="capital-grid">
              {CAPITAL_TIERS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`capital-card ${capital?.id === c.id ? "selected" : ""}`}
                  onClick={() => setCapital(c)}
                >
                  <div className="capital-label">
                    <DollarSign size={14} />
                    {c.label}
                  </div>
                  <div className="capital-range">{c.range}</div>
                  <div className="capital-hint">{c.hint}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-body">
            <h2>Ce que tu veux faire</h2>
            <p className="step-sub">Choisis la voie que tu veux explorer en premier.</p>
            <div className="niche-grid">
              {NICHES.map((n) => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    type="button"
                    className={`niche-card ${niche?.id === n.id ? "selected" : ""}`}
                    onClick={() => setNiche(n)}
                  >
                    <Icon size={18} />
                    <div className="niche-label">{n.label}</div>
                    <div className="niche-pitch">{n.pitch}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button className="btn-primary full" disabled={!canNext} onClick={next}>
          <span>{step === steps.length - 1 ? "Voir mon espace" : "Continuer"}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function CourseItem({ course, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`course-item ${open ? "open" : ""}`}>
      <button className="course-head" onClick={() => setOpen(!open)}>
        <span className="course-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="course-title">{course.title}</span>
        <span className="course-duration">{course.duration}</span>
        <PlayCircle size={16} className="course-play" />
      </button>
      {open && <div className="course-desc">{course.desc}</div>}
    </div>
  );
}

function CourseList({ niche }) {
  return (
    <div className="course-panel">
      <div className="panel-head">
        <BookOpen size={16} />
        <h3>Cours — {niche.label}</h3>
      </div>
      <p className="panel-sub">
        {niche.courses.length} modules courts, à faire dans l'ordre ou pas.
      </p>
      {niche.courses.map((c, i) => (
        <CourseItem course={c} index={i} key={i} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PARCOURS DE JEU — phrases à compléter
// ---------------------------------------------------------------------------

function XPBar({ totalXP }) {
  const rang = Math.floor(totalXP / 100);
  const inRang = totalXP % 100;
  return (
    <div className="xp-bar-row">
      <div className="xp-rang">
        <Zap size={13} /> Rang {rang}
      </div>
      <div className="xp-track">
        <div className="xp-fill" style={{ width: `${inRang}%` }} />
      </div>
      <div className="xp-count">{inRang}/100 XP</div>
    </div>
  );
}

function GamePath({ niche, totalXP, onGainXP }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = niche.path;
  const finished = current >= questions.length;
  const gainedRef = useRef(false);

  // Normalise chaque type de question vers { prompt, options, correctLabel }
  function normalize(question) {
    if (question.type === "vrai_faux") {
      return {
        options: ["Vrai", "Faux"],
        correctLabel: question.correct ? "Vrai" : "Faux",
      };
    }
    if (question.type === "qcm" || question.type === "intrus") {
      return { options: question.options, correctLabel: question.correct };
    }
    // "blank"
    return { options: question.options, correctLabel: question.correct };
  }

  const score = useMemo(
    () =>
      questions.reduce((acc, q, i) => {
        const { correctLabel } = normalize(q);
        return acc + (answers[i] === correctLabel ? 1 : 0);
      }, 0),
    [answers, questions]
  );

  useEffect(() => {
    if (finished && !gainedRef.current) {
      gainedRef.current = true;
      onGainXP(10);
    }
  }, [finished, onGainXP]);

  function choose(word) {
    if (answers[current] !== undefined) return; // déjà répondu
    setAnswers({ ...answers, [current]: word });
  }

  function restart() {
    setCurrent(0);
    setAnswers({});
    gainedRef.current = false;
  }

  const q = !finished ? questions[current] : null;
  const { options, correctLabel } = q ? normalize(q) : { options: [], correctLabel: null };
  const answered = q ? answers[current] !== undefined : false;
  const chosen = q ? answers[current] : null;
  const isCorrect = q && chosen === correctLabel;
  const [before, after] = q && q.type === "blank" ? q.sentence.split("{blank}") : ["", ""];

  const typeLabel = {
    blank: "Phrase à compléter",
    qcm: "Question directe",
    vrai_faux: "Vrai ou faux",
    intrus: "Trouve l'intrus",
  };

  return (
    <div className="path-panel">
      <div className="panel-head">
        <Trophy size={16} />
        <h3>Parcours — comment réussir en {niche.label.toLowerCase()}</h3>
      </div>
      <XPBar totalXP={totalXP} />
      <p className="panel-sub">Types d'exercices variés — phrases à trous, QCM, vrai/faux, intrus. +10 XP à la fin du parcours, tous les 100 XP tu passes un rang.</p>

      <div className="path-map">
        {questions.map((_, i) => (
          <React.Fragment key={i}>
            <div
              className={`path-node ${
                i < current || (i === current && finished) ? "done" : i === current ? "active" : "locked"
              }`}
            >
              {i < current || finished ? <Check size={14} /> : i + 1}
            </div>
            {i < questions.length - 1 && (
              <div className={`path-link ${i < current ? "done" : ""}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {!finished ? (
        <div className="blank-card">
          <div className="exercise-type-tag">{typeLabel[q.type] || "Exercice"}</div>

          {q.type === "blank" ? (
            <div className="blank-sentence">
              {before}
              <span className={`blank-slot ${answered ? (isCorrect ? "correct" : "wrong") : ""}`}>
                {answered ? chosen : "___"}
              </span>
              {after}
            </div>
          ) : (
            <div className="blank-sentence">{q.question || q.statement || q.instruction}</div>
          )}

          <div className={`blank-options ${q.type === "vrai_faux" ? "vf-options" : ""}`}>
            {options.map((opt) => {
              const isChosen = chosen === opt;
              const showCorrect = answered && opt === correctLabel;
              const showWrong = answered && isChosen && opt !== correctLabel;
              return (
                <button
                  key={opt}
                  type="button"
                  className={`blank-chip ${q.type === "vrai_faux" ? "vf-chip" : ""} ${isChosen ? "chosen" : ""} ${
                    showCorrect ? "correct" : ""
                  } ${showWrong ? "wrong" : ""}`}
                  onClick={() => choose(opt)}
                  disabled={answered}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="blank-tip">
              <Lightbulb size={14} />
              <span>{q.tip}</span>
            </div>
          )}

          {answered && (
            <button className="btn-primary full" onClick={() => setCurrent(current + 1)}>
              <span>{current === questions.length - 1 ? "Voir mon résultat" : "Continuer"}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      ) : (
        <div className="path-result">
          <Trophy size={30} className="path-trophy" />
          <div className="quiz-score">
            {score} / {questions.length}
          </div>
          <div className="xp-gain">
            <Zap size={14} /> +10 XP
          </div>
          <div className="quiz-result-text">
            {score === questions.length
              ? "Parcours parfait — tu maîtrises déjà les bases, passe à la pratique."
              : score >= Math.ceil(questions.length / 2)
              ? "Bonne base — relis les cours au-dessus avant de te lancer."
              : "Reprends les cours au-dessus : chaque point manqué y est couvert."}
          </div>
          <button className="btn-ghost" onClick={restart}>
            Refaire le parcours
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// COACH IA — bot de questions/réponses
// ---------------------------------------------------------------------------

function buildSystemPrompt(niche, capital, pseudo, isPro) {
  const base =
    "Tu es le Coach IA de FORMA CODEX, une plateforme de formation sur le business en ligne. " +
    "Tu parles à " + pseudo + ", qui explore actuellement la voie \"" + niche.label + "\" (" + niche.pitch + ") " +
    "avec un capital de départ de " + capital.label + ". " +
    "Ton rôle : répondre à absolument toutes ses questions sur ce sujet — stratégie, doutes, blocages, organisation, technique — " +
    "de façon concrète et actionnable, pour le faire avancer réellement dans son projet, pas juste l'informer. " +
    "Donne-lui souvent une prochaine étape claire et réaliste vu son capital. " +
    "De temps en temps, partage aussi un vrai avis personnel ou une réflexion assumée (pas juste neutre et lisse) sur ce qu'il te dit, " +
    "comme le ferait un mentor honnête. Reste concis (quelques phrases, pas de longs pavés), en français, sans markdown lourd ni listes à puces systématiques.";
  if (isPro) {
    return (
      base +
      " Ce membre a le compte Pro : tu peux aller plus loin dans le détail et la nuance quand la question le mérite (chiffres, étapes précises, scénarios alternatifs), tout en restant structuré et concret."
    );
  }
  return base;
}

function CoachBot({ niche, capital, pseudo, isPro }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Salut " + pseudo + ". Je suis ton coach sur \"" + niche.label + "\". Pose-moi une question — un doute, un blocage, une étape que tu ne comprends pas — et on avance ensemble.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function requestReply(fullMessages) {
    setLoading(true);
    setError("");
    try {
      // L'API exige que les messages envoyés commencent par un rôle "user" :
      // on retire le message d'accueil initial (index 0), qui n'est qu'un texte d'UI.
      const apiMessages = fullMessages.slice(1);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: isPro ? 2000 : 1000,
          system: buildSystemPrompt(niche, capital, pseudo, isPro),
          messages: apiMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error("HTTP " + response.status + " " + errText);
      }
      const data = await response.json();
      const reply = (data.content || [])
        .map((block) => (block.type === "text" ? block.text : ""))
        .filter(Boolean)
        .join("\n")
        .trim();

      if (!reply) throw new Error("empty reply");

      setMessages([...fullMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(
        "Le coach n'a pas pu répondre (" +
          (e && e.message ? e.message : "erreur inconnue") +
          "). Ça arrive surtout si ce fichier est ouvert hors de l'aperçu Claude — réessaie, ou vérifie ta connexion."
      );
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    requestReply(newMessages);
  }

  function retryLast() {
    if (loading) return;
    requestReply(messages);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="bot-panel">
      <div className="panel-head">
        <MessageCircle size={16} />
        <h3>Coach IA — {niche.label}</h3>
        {isPro && (
          <span className="pro-badge">
            <Crown size={11} /> Pro
          </span>
        )}
      </div>
      <p className="panel-sub">
        {isPro
          ? "Pose n'importe quelle question — réponses plus détaillées avec le compte Pro."
          : "Pose n'importe quelle question, il te répond et te pousse à avancer."}
      </p>

      <div className="bot-messages" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bot-bubble-row ${m.role}`}>
            {m.role === "assistant" && <Sparkles size={13} className="bot-avatar" />}
            <div className={`bot-bubble ${m.role}`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="bot-bubble-row assistant">
            <Sparkles size={13} className="bot-avatar" />
            <div className="bot-bubble assistant typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="coach-error">
          <div className="field-error">{error}</div>
          <button className="btn-ghost" onClick={retryLast}>
            Réessayer
          </button>
        </div>
      )}

      <div className="bot-input-row">
        <textarea
          className="bot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écris ta question au coach..."
          rows={1}
        />
        <button
          type="button"
          className="bot-send"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="Envoyer"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// BOUTIQUE — abonnement Pro
// ---------------------------------------------------------------------------

const PRO_FEATURES = [
  "Onglet Communauté : crée ou rejoins des groupes de discussion publics ou privés, avec rôles admin",
  "Bannière de profil en dégradé ou image personnalisée (couleur simple en gratuit)",
  "Thème personnalisé : choisis ta couleur d'accent dans tout le site",
  "Photo de profil : choisis un avatar parmi une sélection",
  "Coach IA plus performant : réponses plus détaillées et plus nuancées",
  "Offre le compte Pro à l'un de tes amis",
];

function Boutique({ isPro, onSetPro, pseudo, friendships, accounts, onGiftPro }) {
  const [confirming, setConfirming] = useState(false);
  const [giftTarget, setGiftTarget] = useState("");
  const [giftSent, setGiftSent] = useState("");

  const myFriends = friendships
    .filter((pair) => pair.includes(pseudo))
    .map((pair) => pair.find((p) => p !== pseudo))
    .filter((f) => accounts[f] && !accounts[f].isPro);

  function sendGift() {
    if (!giftTarget) return;
    onGiftPro(giftTarget);
    setGiftSent(giftTarget);
    setGiftTarget("");
  }

  return (
    <div className="shop-panel">
      <div className="panel-head">
        <Store size={16} />
        <h3>Boutique</h3>
      </div>
      <p className="panel-sub">Un seul palier Pro, tout inclus.</p>
      {!PRO_SALES_OPEN && (
        <div className="unavailable-box" style={{ marginBottom: 14 }}>
          <Lock size={14} />
          <span>Les nouvelles inscriptions Pro sont temporairement suspendues.</span>
        </div>
      )}

      <div className={`plan-card ${isPro ? "active" : ""}`}>
        <div className="plan-head">
          <div className="plan-name">
            <Crown size={16} /> FORMA CODEX Pro
          </div>
          <div className="plan-price">
            {PRO_PRICE}
            <span>/mois</span>
          </div>
        </div>

        <ul className="plan-features">
          {PRO_FEATURES.map((f) => (
            <li key={f}>
              <Check size={14} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {isPro ? (
          <>
            <div className="plan-active-tag">
              <Check size={14} /> Abonnement actif
            </div>
            {!confirming ? (
              <button className="btn-ghost" onClick={() => setConfirming(true)}>
                Résilier l'abonnement
              </button>
            ) : (
              <div className="confirm-row">
                <span>Résilier vraiment ?</span>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    onSetPro(false);
                    setConfirming(false);
                  }}
                >
                  Oui, résilier
                </button>
                <button className="btn-ghost" onClick={() => setConfirming(false)}>
                  Annuler
                </button>
              </div>
            )}
          </>
        ) : PRO_SALES_OPEN ? (
          <button className="btn-primary full" onClick={() => onSetPro(true)}>
            <span>Passer Pro — {PRO_PRICE}/mois</span>
            <ArrowRight size={18} />
          </button>
        ) : (
          <div className="unavailable-box">
            <Lock size={14} />
            <span>Version Pro bientôt disponible — les inscriptions sont temporairement fermées.</span>
          </div>
        )}
      </div>

      {isPro && PRO_SALES_OPEN && (
        <div className="gift-card">
          <div className="plan-name" style={{ marginBottom: 10 }}>
            <Gift size={16} /> Offrir Pro à un ami
          </div>
          {myFriends.length === 0 ? (
            <p className="panel-sub">Aucun ami à qui offrir Pro pour l'instant (ou ils le sont déjà).</p>
          ) : (
            <>
              <div className="pill-row">
                {myFriends.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`pill ${giftTarget === f ? "selected" : ""}`}
                    onClick={() => setGiftTarget(f)}
                  >
                    <AvatarBadge avatar={accounts[f]?.avatar} size={14} />{" "}
                    {f}
                  </button>
                ))}
              </div>
              <button className="btn-primary full" disabled={!giftTarget} onClick={sendGift}>
                <span>Offrir Pro à {giftTarget || "..."}</span>
                <Gift size={18} />
              </button>
              {giftSent && (
                <div className="plan-active-tag" style={{ marginTop: 12 }}>
                  <Check size={14} /> Pro offert à {giftSent} !
                </div>
              )}
            </>
          )}
        </div>
      )}
      {isPro && !PRO_SALES_OPEN && (
        <div className="gift-card">
          <div className="plan-name" style={{ marginBottom: 10 }}>
            <Gift size={16} /> Offrir Pro à un ami
          </div>
          <p className="panel-sub">Le don d'abonnement est temporairement désactivé en même temps que les nouvelles inscriptions Pro.</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMMUNAUTÉ — groupes de discussion (réservé Pro)
// ---------------------------------------------------------------------------

function Community({ isPro, pseudo, onGoToShop, groups, setGroups }) {
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [activePostId, setActivePostId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState(GROUP_ICONS[0]);
  const [newPrivate, setNewPrivate] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [joinAttemptId, setJoinAttemptId] = useState(null);
  const [banNoticeId, setBanNoticeId] = useState(null);
  const [banTargetMember, setBanTargetMember] = useState(null);
  const [banReasonDraft, setBanReasonDraft] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [joinError, setJoinError] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState("info"); // "info" | "channels"
  const [groupSearch, setGroupSearch] = useState("");
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editIcon, setEditIcon] = useState(GROUP_ICONS[0]);
  const [editPrivate, setEditPrivate] = useState(false);
  const [editPassword, setEditPassword] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState("text");
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [replyText, setReplyText] = useState("");
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  if (!isPro) {
    return (
      <div className="shop-panel">
        <div className="panel-head">
          <Users size={16} />
          <h3>Communauté</h3>
        </div>
        <div className="upsell-box">
          <Crown size={22} className="upsell-crown" />
          <p>La communauté est réservée aux membres Pro : crée ou rejoins des groupes de discussion, publics ou privés.</p>
          <button className="btn-primary" onClick={onGoToShop}>
            <span>Voir l'offre Pro</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  const activeGroup = groups.find((g) => g.id === activeGroupId) || null;
  const isOwner = activeGroup && activeGroup.owner === pseudo;
  const isAdmin = activeGroup && (isOwner || activeGroup.admins.includes(pseudo));
  const activeChannel = activeGroup ? (activeGroup.channels || []).find((c) => c.id === activeChannelId) : null;

  function updateGroup(groupId, updater) {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? updater(g) : g)));
  }

  function updateChannel(groupId, channelId, updater) {
    updateGroup(groupId, (g) => ({
      ...g,
      channels: g.channels.map((c) => (c.id === channelId ? updater(c) : c)),
    }));
  }

  function createGroup() {
    if (!newName.trim()) return;
    if (newPrivate && newPassword.trim().length < 3) return;
    const id = "g" + Date.now();
    const group = {
      id,
      name: newName.trim(),
      description: newDesc.trim(),
      icon: newIcon,
      isPrivate: newPrivate,
      password: newPrivate ? newPassword.trim() : "",
      owner: pseudo,
      admins: [pseudo],
      members: [pseudo],
      channels: defaultChannels(),
      bannedUsers: [],
    };
    setGroups([...groups, group]);
    setNewName("");
    setNewDesc("");
    setNewIcon(GROUP_ICONS[0]);
    setNewPrivate(false);
    setNewPassword("");
    setCreating(false);
    setActiveGroupId(id);
    setActiveChannelId(group.channels[0].id);
  }

  function openGroup(group) {
    function enter() {
      setActiveGroupId(group.id);
      setActiveChannelId((group.channels || defaultChannels())[0].id);
      setJoinAttemptId(null);
      setBanNoticeId(null);
      setShowMembers(false);
      setShowSettings(false);
      setActivePostId(null);
    }
    const ban = (group.bannedUsers || []).find((b) => b.pseudo === pseudo);
    if (ban) {
      setBanNoticeId(group.id);
      setJoinAttemptId(null);
      return;
    }
    if (group.members.includes(pseudo) || !group.isPrivate) {
      if (group.isPrivate && !group.members.includes(pseudo)) {
        setGroups(groups.map((g) => (g.id === group.id ? { ...g, members: [...g.members, pseudo] } : g)));
      }
      enter();
    } else {
      setJoinAttemptId(group.id);
      setBanNoticeId(null);
      setJoinPassword("");
      setJoinError("");
    }
  }

  function confirmJoin(group) {
    const ban = (group.bannedUsers || []).find((b) => b.pseudo === pseudo);
    if (ban) {
      setBanNoticeId(group.id);
      setJoinAttemptId(null);
      return;
    }
    if (joinPassword !== group.password) {
      setJoinError("Mot de passe incorrect.");
      return;
    }
    setGroups(groups.map((g) => (g.id === group.id ? { ...g, members: [...g.members, pseudo] } : g)));
    setActiveGroupId(group.id);
    setActiveChannelId((group.channels || defaultChannels())[0].id);
    setJoinAttemptId(null);
  }

  function sendText() {
    if (!messageText.trim() || !activeGroup || !activeChannel) return;
    const msg = { author: pseudo, text: messageText.trim(), image: null };
    updateChannel(activeGroup.id, activeChannel.id, (c) => ({ ...c, messages: [...c.messages, msg] }));
    setMessageText("");
  }

  function sendImage(e) {
    const file = e.target.files && e.target.files[0];
    if (!file || !activeGroup || !activeChannel) return;
    const reader = new FileReader();
    reader.onload = () => {
      const msg = { author: pseudo, text: "", image: reader.result };
      updateChannel(activeGroup.id, activeChannel.id, (c) => ({ ...c, messages: [...c.messages, msg] }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function kickMember(member) {
    if (!isAdmin || member === activeGroup.owner) return;
    setGroups(
      groups.map((g) =>
        g.id === activeGroup.id
          ? { ...g, members: g.members.filter((m) => m !== member), admins: g.admins.filter((m) => m !== member) }
          : g
      )
    );
  }

  function banMember(member, reason) {
    if (!isAdmin || member === activeGroup.owner) return;
    setGroups(
      groups.map((g) =>
        g.id === activeGroup.id
          ? {
              ...g,
              members: g.members.filter((m) => m !== member),
              admins: g.admins.filter((m) => m !== member),
              bannedUsers: [...(g.bannedUsers || []), { pseudo: member, reason: reason.trim() || "Aucune raison précisée", bannedBy: pseudo, date: Date.now() }],
            }
          : g
      )
    );
    setBanTargetMember(null);
    setBanReasonDraft("");
  }

  function unbanMember(member) {
    if (!isAdmin) return;
    setGroups(
      groups.map((g) =>
        g.id === activeGroup.id ? { ...g, bannedUsers: (g.bannedUsers || []).filter((b) => b.pseudo !== member) } : g
      )
    );
  }

  function toggleAdmin(member) {
    if (!isOwner || member === activeGroup.owner) return;
    setGroups(
      groups.map((g) =>
        g.id === activeGroup.id
          ? {
              ...g,
              admins: g.admins.includes(member) ? g.admins.filter((m) => m !== member) : [...g.admins, member],
            }
          : g
      )
    );
  }

  function leaveGroup() {
    setGroups(
      groups
        .map((g) =>
          g.id === activeGroup.id
            ? { ...g, members: g.members.filter((m) => m !== pseudo), admins: g.admins.filter((m) => m !== pseudo) }
            : g
        )
        .filter((g) => !(g.id === activeGroup.id && g.owner === pseudo))
    );
    setActiveGroupId(null);
    setShowMembers(false);
    setShowSettings(false);
  }

  function openSettings() {
    setEditName(activeGroup.name);
    setEditDesc(activeGroup.description || "");
    setEditIcon(activeGroup.icon || GROUP_ICONS[0]);
    setEditPrivate(activeGroup.isPrivate);
    setEditPassword(activeGroup.password || "");
    setSettingsTab("info");
    setShowSettings(true);
    setShowMembers(false);
  }

  function saveSettings() {
    if (!editName.trim()) return;
    if (editPrivate && editPassword.trim().length < 3) return;
    setGroups(
      groups.map((g) =>
        g.id === activeGroup.id
          ? {
              ...g,
              name: editName.trim(),
              description: editDesc.trim(),
              icon: editIcon,
              isPrivate: editPrivate,
              password: editPrivate ? editPassword.trim() : "",
            }
          : g
      )
    );
    setShowSettings(false);
  }

  function addChannel() {
    if (!newChannelName.trim()) return;
    const channel = { id: "c" + Date.now(), name: newChannelName.trim(), type: newChannelType, messages: [], posts: [] };
    updateGroup(activeGroup.id, (g) => ({ ...g, channels: [...g.channels, channel] }));
    setNewChannelName("");
    setNewChannelType("text");
  }

  function deleteChannel(channelId) {
    if (activeGroup.channels.length <= 1) return;
    updateGroup(activeGroup.id, (g) => ({ ...g, channels: g.channels.filter((c) => c.id !== channelId) }));
    if (activeChannelId === channelId) {
      const remaining = activeGroup.channels.filter((c) => c.id !== channelId);
      setActiveChannelId(remaining[0]?.id || null);
    }
  }

  function createPost() {
    if (!postTitle.trim() || !postText.trim() || !activeChannel) return;
    const post = { id: "p" + Date.now(), author: pseudo, title: postTitle.trim(), text: postText.trim(), replies: [] };
    updateChannel(activeGroup.id, activeChannel.id, (c) => ({ ...c, posts: [...(c.posts || []), post] }));
    setPostTitle("");
    setPostText("");
  }

  function replyToPost(postId) {
    if (!replyText.trim() || !activeChannel) return;
    updateChannel(activeGroup.id, activeChannel.id, (c) => ({
      ...c,
      posts: (c.posts || []).map((p) => (p.id === postId ? { ...p, replies: [...p.replies, { author: pseudo, text: replyText.trim() }] } : p)),
    }));
    setReplyText("");
  }

  const canPostHere = activeChannel && (activeChannel.type !== "announcement" || isOwner);

  if (activeGroup && activeChannel) {
    const activePost = activeChannel.type === "forum" ? (activeChannel.posts || []).find((p) => p.id === activePostId) : null;

    return (
      <div className="shop-panel wide-panel">
        <button className="back-link" onClick={() => setActiveGroupId(null)}>
          <ChevronLeft size={14} /> Groupes
        </button>
        <div className="panel-head">
          <span className="group-icon-badge">{activeGroup.icon || "💬"}</span>
          <h3>{activeGroup.name}</h3>
          {activeGroup.isPrivate ? <Lock size={13} className="tab-lock" /> : <Globe size={13} className="tab-lock" />}
          <button className="icon-btn small" onClick={() => { setShowMembers(!showMembers); setShowSettings(false); }} aria-label="Membres">
            <Users size={14} />
          </button>
          {isAdmin && (
            <button className="icon-btn small" onClick={showSettings ? () => setShowSettings(false) : openSettings} aria-label="Paramètres du groupe">
              <Settings size={14} />
            </button>
          )}
        </div>
        {activeGroup.description && <p className="panel-sub">{activeGroup.description}</p>}
        <p className="panel-sub">{activeGroup.members.length} membre(s){isOwner ? " · Tu es le créateur" : isAdmin ? " · Tu es admin" : ""}</p>

        {showSettings && isAdmin && (
          <div className="members-panel">
            <div className="pill-row">
              <button type="button" className={`pill ${settingsTab === "info" ? "selected" : ""}`} onClick={() => setSettingsTab("info")}>
                Infos
              </button>
              <button type="button" className={`pill ${settingsTab === "channels" ? "selected" : ""}`} onClick={() => setSettingsTab("channels")}>
                Salons
              </button>
            </div>

            {settingsTab === "info" && (
              <>
                <label className="field">
                  <span className="field-label">Nom du groupe</span>
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                </label>
                <label className="field">
                  <span className="field-label">Description</span>
                  <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Optionnel" />
                </label>
                <span className="field-label">Icône du groupe</span>
                <div className="avatar-grid">
                  {GROUP_ICONS.map((ic) => (
                    <button key={ic} type="button" className={`avatar-option ${editIcon === ic ? "selected" : ""}`} onClick={() => setEditIcon(ic)}>
                      {ic}
                    </button>
                  ))}
                </div>
                <div className="pill-row" style={{ marginTop: 10 }}>
                  <button type="button" className={`pill ${!editPrivate ? "selected" : ""}`} onClick={() => setEditPrivate(false)}>
                    <Globe size={13} style={{ marginRight: 4 }} /> Public
                  </button>
                  <button type="button" className={`pill ${editPrivate ? "selected" : ""}`} onClick={() => setEditPrivate(true)}>
                    <Lock size={13} style={{ marginRight: 4 }} /> Privé
                  </button>
                </div>
                {editPrivate && (
                  <label className="field">
                    <span className="field-label"><KeyRound size={13} /> Mot de passe du groupe</span>
                    <input type="text" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="3 caractères minimum" />
                  </label>
                )}
                <button className="btn-primary full" onClick={saveSettings}>
                  <span>Enregistrer</span>
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {settingsTab === "channels" && (
              <>
                {activeGroup.channels.map((c) => {
                  const meta = CHANNEL_TYPES.find((t) => t.id === c.type) || CHANNEL_TYPES[0];
                  const Icon = meta.icon;
                  return (
                    <div className="member-row" key={c.id}>
                      <Icon size={13} />
                      <span className="member-name">{c.name}</span>
                      <span className="role-tag">{meta.label}</span>
                      {activeGroup.channels.length > 1 && (
                        <button className="member-action danger" onClick={() => deleteChannel(c.id)}>
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  );
                })}
                <div className="create-group-form" style={{ marginTop: 10 }}>
                  <label className="field">
                    <span className="field-label">Nom du salon</span>
                    <input type="text" value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)} placeholder="ex. annonces" />
                  </label>
                  <div className="pill-row">
                    {CHANNEL_TYPES.map((t) => {
                      const Icon = t.icon;
                      return (
                        <button key={t.id} type="button" className={`pill ${newChannelType === t.id ? "selected" : ""}`} onClick={() => setNewChannelType(t.id)}>
                          <Icon size={13} style={{ marginRight: 4 }} /> {t.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="settings-hint">{CHANNEL_TYPES.find((t) => t.id === newChannelType)?.desc}</p>
                  <button className="btn-primary full" onClick={addChannel}>
                    <span>Ajouter le salon</span>
                    <Plus size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {showMembers && (
          <div className="members-panel">
            {activeGroup.members.map((m) => {
              const role = m === activeGroup.owner ? "Créateur" : activeGroup.admins.includes(m) ? "Admin" : "Membre";
              return (
                <React.Fragment key={m}>
                  <div className="member-row">
                    <span className="member-name">{m}</span>
                    <span className={`role-tag role-${role.toLowerCase()}`}>
                      {role === "Créateur" && <Crown size={11} />}
                      {role === "Admin" && <Shield size={11} />}
                      {role}
                    </span>
                    {isOwner && m !== activeGroup.owner && (
                      <button className="member-action" onClick={() => toggleAdmin(m)}>
                        {activeGroup.admins.includes(m) ? "Rétrograder" : "Promouvoir"}
                      </button>
                    )}
                    {isAdmin && m !== activeGroup.owner && m !== pseudo && (
                      <>
                        <button className="member-action danger" onClick={() => kickMember(m)}>
                          Exclure
                        </button>
                        <button
                          className="member-action danger"
                          onClick={() => {
                            setBanTargetMember(banTargetMember === m ? null : m);
                            setBanReasonDraft("");
                          }}
                        >
                          Bannir
                        </button>
                      </>
                    )}
                  </div>
                  {banTargetMember === m && (
                    <div className="create-group-form">
                      <label className="field">
                        <span className="field-label">Raison du bannissement</span>
                        <input
                          type="text"
                          value={banReasonDraft}
                          onChange={(e) => setBanReasonDraft(e.target.value)}
                          placeholder="ex. Spam répété, propos irrespectueux..."
                        />
                      </label>
                      <button className="btn-primary full" onClick={() => banMember(m, banReasonDraft)}>
                        <span>Confirmer le bannissement</span>
                        <Shield size={16} />
                      </button>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {isAdmin && (activeGroup.bannedUsers || []).length > 0 && (
              <>
                <div className="settings-hint" style={{ marginTop: 6 }}>Membres bannis</div>
                {activeGroup.bannedUsers.map((b) => (
                  <div className="member-row" key={b.pseudo}>
                    <span className="member-name">{b.pseudo}</span>
                    <span className="role-tag">{b.reason}</span>
                    <button className="member-action" onClick={() => unbanMember(b.pseudo)}>
                      Débannir
                    </button>
                  </div>
                ))}
              </>
            )}

            <button className="btn-ghost" onClick={leaveGroup}>
              <LogOut size={14} style={{ marginRight: 6 }} />
              {isOwner ? "Supprimer le groupe" : "Quitter le groupe"}
            </button>
          </div>
        )}

        <div className="channel-bar">
          {activeGroup.channels.map((c) => {
            const meta = CHANNEL_TYPES.find((t) => t.id === c.type) || CHANNEL_TYPES[0];
            const Icon = meta.icon;
            return (
              <button
                key={c.id}
                className={`channel-pill ${activeChannelId === c.id ? "active" : ""}`}
                onClick={() => {
                  setActiveChannelId(c.id);
                  setActivePostId(null);
                }}
              >
                <Icon size={13} />
                {c.name}
              </button>
            );
          })}
        </div>

        {activeChannel.type === "forum" ? (
          activePost ? (
            <div className="forum-post-detail">
              <button className="back-link" onClick={() => setActivePostId(null)}>
                <ChevronLeft size={14} /> Sujets
              </button>
              <div className="forum-post-title">{activePost.title}</div>
              <div className="group-author">{activePost.author}</div>
              <p className="forum-post-text">{activePost.text}</p>
              <div className="forum-replies">
                {activePost.replies.map((r, i) => (
                  <div className="forum-reply" key={i}>
                    <CornerDownRight size={12} />
                    <div>
                      <div className="group-author">{r.author}</div>
                      <div>{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bot-input-row">
                <textarea
                  className="bot-input"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Répondre..."
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      replyToPost(activePost.id);
                    }
                  }}
                />
                <button type="button" className="bot-send" onClick={() => replyToPost(activePost.id)} disabled={!replyText.trim()} aria-label="Répondre">
                  <Send size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="forum-list">
              <div className="create-group-form">
                <label className="field">
                  <span className="field-label">Titre du sujet</span>
                  <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="De quoi veux-tu parler ?" />
                </label>
                <label className="field">
                  <span className="field-label">Message</span>
                  <input type="text" value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Détaille ton sujet" />
                </label>
                <button className="btn-primary full" onClick={createPost}>
                  <span>Publier le sujet</span>
                  <Plus size={18} />
                </button>
              </div>
              {(activeChannel.posts || []).length === 0 && <p className="panel-sub">Aucun sujet pour l'instant — lance le premier.</p>}
              {(activeChannel.posts || [])
                .slice()
                .reverse()
                .map((p) => (
                  <button key={p.id} className="chapter-row group-row" onClick={() => setActivePostId(p.id)}>
                    <div className="chapter-num"><MessagesSquare size={15} /></div>
                    <div className="chapter-info">
                      <div className="chapter-title">{p.title}</div>
                      <div className="chapter-sub">{p.author} · {p.replies.length} réponse(s)</div>
                    </div>
                    <ChevronRight size={16} className="chapter-arrow" />
                  </button>
                ))}
            </div>
          )
        ) : (
          <>
            <div className="bot-messages large" ref={scrollRef}>
              {activeChannel.messages.length === 0 && (
                <div className="empty-chat">Aucun message pour l'instant — lance la discussion.</div>
              )}
              {activeChannel.messages.map((m, i) => (
                <div key={i} className={`bot-bubble-row ${m.author === pseudo ? "user" : ""}`}>
                  <div className={`bot-bubble ${m.author === pseudo ? "user" : "assistant"} group-bubble`}>
                    <div className="group-author">{m.author}</div>
                    {m.text && <div>{m.text}</div>}
                    {m.image && <img src={m.image} alt="" className="group-image" />}
                  </div>
                </div>
              ))}
            </div>

            {canPostHere ? (
              <div className="bot-input-row">
                <button type="button" className="bot-send secondary" onClick={() => fileInputRef.current?.click()} aria-label="Envoyer une photo">
                  <ImageIcon size={16} />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={sendImage} />
                <textarea
                  className="bot-input"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendText();
                    }
                  }}
                  placeholder="Écris un message..."
                  rows={1}
                />
                <button type="button" className="bot-send" onClick={sendText} disabled={!messageText.trim()} aria-label="Envoyer">
                  <Send size={16} />
                </button>
              </div>
            ) : (
              <p className="settings-hint">Seul le créateur du groupe peut publier dans ce salon d'annonces.</p>
            )}
          </>
        )}
      </div>
    );
  }

  const filteredGroups = groups.filter((g) => g.name.toLowerCase().includes(groupSearch.trim().toLowerCase()));

  return (
    <div className="shop-panel wide-panel">
      <div className="panel-head">
        <Users size={16} />
        <h3>Communauté</h3>
        <span className="pro-badge">
          <Crown size={11} /> Pro
        </span>
      </div>
      <p className="panel-sub">Rejoins un groupe public ou privé, ou crée le tien.</p>

      {!creating ? (
        <button className="btn-ghost" onClick={() => setCreating(true)}>
          <Plus size={14} style={{ marginRight: 6 }} />
          Créer un groupe
        </button>
      ) : (
        <div className="create-group-form">
          <label className="field">
            <span className="field-label">Nom du groupe</span>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="ex. Débutants dropshipping" />
          </label>
          <label className="field">
            <span className="field-label">Description (optionnel)</span>
            <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="De quoi parle ce groupe ?" />
          </label>
          <span className="field-label">Icône du groupe</span>
          <div className="avatar-grid">
            {GROUP_ICONS.map((ic) => (
              <button key={ic} type="button" className={`avatar-option ${newIcon === ic ? "selected" : ""}`} onClick={() => setNewIcon(ic)}>
                {ic}
              </button>
            ))}
          </div>
          <div className="pill-row">
            <button type="button" className={`pill ${!newPrivate ? "selected" : ""}`} onClick={() => setNewPrivate(false)}>
              <Globe size={13} style={{ marginRight: 4 }} /> Public
            </button>
            <button type="button" className={`pill ${newPrivate ? "selected" : ""}`} onClick={() => setNewPrivate(true)}>
              <Lock size={13} style={{ marginRight: 4 }} /> Privé
            </button>
          </div>
          {newPrivate && (
            <label className="field">
              <span className="field-label"><KeyRound size={13} /> Mot de passe du groupe</span>
              <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="3 caractères minimum" />
            </label>
          )}
          <p className="settings-hint">Le groupe démarre avec un salon texte "général" — ajoute des salons annonces ou forum ensuite dans ses paramètres.</p>
          <button className="btn-primary full" onClick={createGroup}>
            <span>Créer</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn-ghost" onClick={() => setCreating(false)}>
            Annuler
          </button>
        </div>
      )}

      {groups.length > 3 && (
        <label className="field" style={{ marginTop: 14 }}>
          <span className="field-label"><Search size={13} /> Chercher un groupe</span>
          <input type="text" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} placeholder="Nom du groupe" />
        </label>
      )}

      <div className="group-list">
        {groups.length === 0 && <p className="panel-sub">Aucun groupe pour l'instant — sois le premier à en créer un.</p>}
        {groups.length > 0 && filteredGroups.length === 0 && <p className="panel-sub">Aucun groupe ne correspond à "{groupSearch}".</p>}
        {filteredGroups.map((g) => (
          <div key={g.id}>
            <button className="chapter-row group-row" onClick={() => openGroup(g)}>
              <div className="chapter-num group-icon-badge">{g.icon || "💬"}</div>
              <div className="chapter-info">
                <div className="chapter-title">
                  {g.name} {g.isPrivate ? <Lock size={11} className="tab-lock" /> : <Globe size={11} className="tab-lock" />}
                </div>
                <div className="chapter-sub">{g.description ? g.description + " · " : ""}{g.members.length} membre(s) · {(g.channels || []).length} salon(s)</div>
              </div>
              <ChevronRight size={16} className="chapter-arrow" />
            </button>
            {joinAttemptId === g.id && (
              <div className="create-group-form">
                <label className="field">
                  <span className="field-label"><KeyRound size={13} /> Mot de passe requis</span>
                  <input type="text" value={joinPassword} onChange={(e) => setJoinPassword(e.target.value)} placeholder="Mot de passe du groupe" />
                </label>
                {joinError && <div className="field-error">{joinError}</div>}
                <button className="btn-primary full" onClick={() => confirmJoin(g)}>
                  <span>Rejoindre</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            {banNoticeId === g.id && (
              <div className="ban-notice">
                <Shield size={16} />
                <div>
                  <strong>Tu as été banni de ce groupe.</strong>
                  <p>Raison : {(g.bannedUsers || []).find((b) => b.pseudo === pseudo)?.reason || "Aucune raison précisée"}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({ isPro, avatar, onSetAvatar, themeId, onSetTheme, banner, onSetBanner, onGoToShop, onClose }) {
  const bannerFileRef = useRef(null);
  const avatarFileRef = useRef(null);

  function handleBannerUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onSetBanner({ type: "image", value: reader.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleAvatarUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onSetAvatar(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="settings-panel">
      <div className="settings-head">
        <div className="panel-head" style={{ marginBottom: 0 }}>
          <Settings size={16} />
          <h3>Paramètres</h3>
        </div>
        <button className="btn-icon-back" style={{ margin: 0 }} onClick={onClose} aria-label="Fermer">
          <X size={16} />
        </button>
      </div>

      <div className="settings-section">
        <span className="field-label"><ImageIcon size={13} /> Bannière de profil</span>
        <div className="theme-grid">
          {BANNER_COLORS.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`banner-swatch ${banner.type === "color" && banner.value === b.color ? "selected" : ""}`}
              style={{ background: b.color }}
              onClick={() => onSetBanner({ type: "color", value: b.color })}
              aria-label="Couleur de bannière"
            />
          ))}
        </div>
        {!isPro && <p className="settings-hint">Dégradés et image personnalisée réservés au compte Pro.</p>}

        {isPro && (
          <>
            <div className="theme-grid" style={{ marginTop: 10 }}>
              {BANNER_GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`banner-swatch ${banner.type === "gradient" && banner.value === g.css ? "selected" : ""}`}
                  style={{ background: g.css }}
                  onClick={() => onSetBanner({ type: "gradient", value: g.css })}
                  aria-label="Dégradé de bannière"
                />
              ))}
            </div>
            <button className="btn-ghost" style={{ marginTop: 10 }} onClick={() => bannerFileRef.current?.click()}>
              <ImageIcon size={14} style={{ marginRight: 6 }} />
              Importer une image personnalisée
            </button>
            <input ref={bannerFileRef} type="file" accept="image/*" hidden onChange={handleBannerUpload} />
          </>
        )}
      </div>

      {!isPro ? (
        <div className="upsell-box">
          <Crown size={22} className="upsell-crown" />
          <p>Le thème personnalisé et la photo de profil sont réservés aux membres Pro.</p>
          <button className="btn-primary" onClick={onGoToShop}>
            <span>Voir l'offre Pro</span>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <div className="settings-section">
            <span className="field-label"><ImageIcon size={13} /> Photo de profil</span>
            <div className="avatar-grid">
              <button type="button" className="avatar-option avatar-upload" onClick={() => avatarFileRef.current?.click()}>
                {isImageAvatar(avatar) ? <img src={avatar} alt="" className="avatar-preview-img" /> : <ImageIcon size={16} />}
              </button>
              {AVATAR_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`avatar-option ${avatar === a ? "selected" : ""}`}
                  onClick={() => onSetAvatar(a)}
                >
                  {a}
                </button>
              ))}
            </div>
            <input ref={avatarFileRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
            <p className="settings-hint">Le premier bouton importe ta propre photo depuis ton appareil.</p>
          </div>

          <div className="settings-section">
            <span className="field-label"><Palette size={13} /> Thème du site</span>
            <div className="theme-grid">
              {THEME_PRESETS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-swatch ${themeId === t.id ? "selected" : ""}`}
                  style={{ background: `linear-gradient(135deg, ${t.lime}, ${t.amber})` }}
                  onClick={() => onSetTheme(t.id)}
                  aria-label={t.label}
                  title={t.label}
                />
              ))}
            </div>
            <p className="settings-hint">Change les couleurs et les fonds dans tout le site, pas juste un accent.</p>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PROFIL — bannière, followers, amis, messages privés
// ---------------------------------------------------------------------------

function isImageAvatar(a) {
  return typeof a === "string" && a.startsWith("data:image");
}

function AvatarBadge({ avatar, size }) {
  if (isImageAvatar(avatar)) {
    return <img src={avatar} alt="" className="avatar-img" style={{ width: size, height: size }} />;
  }
  if (avatar) return <span className="avatar-emoji">{avatar}</span>;
  return <User size={size ? size * 0.6 : 14} />;
}

function bannerStyle(banner) {
  if (!banner) return { background: BANNER_COLORS[0].color };
  if (banner.type === "image") return { backgroundImage: `url(${banner.value})`, backgroundSize: "cover", backgroundPosition: "center" };
  if (banner.type === "gradient") return { background: banner.value };
  return { background: banner.value };
}

function ProfileView({
  pseudo,
  avatar,
  banner,
  isPro,
  accounts,
  friendships,
  friendRequests,
  followers,
  dms,
  dmKey,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onRemoveFriend,
  onToggleFollow,
  onSendDM,
  onSetBio,
  onGoToShop,
}) {
  const [section, setSection] = useState("friends"); // "friends" | "requests" | "search"
  const [search, setSearch] = useState("");
  const [dmWith, setDmWith] = useState(null);
  const [dmText, setDmText] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState("");
  const scrollRef = useRef(null);

  const myAccount = accounts[pseudo] || {};

  function formatJoinDate(ts) {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    } catch (e) {
      return "";
    }
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const myFriends = friendships
    .filter((pair) => pair.includes(pseudo))
    .map((pair) => pair.find((p) => p !== pseudo));
  const incoming = friendRequests.filter((r) => r.to === pseudo);
  const myFollowers = followers[pseudo] || [];

  const searchResults =
    search.trim().length > 0
      ? Object.keys(accounts).filter(
          (p) => p !== pseudo && p.toLowerCase().includes(search.trim().toLowerCase())
        )
      : [];

  function statusFor(other) {
    if (myFriends.includes(other)) return "friend";
    if (friendRequests.some((r) => r.from === pseudo && r.to === other)) return "pending";
    return "none";
  }

  if (dmWith) {
    const key = dmKey(pseudo, dmWith);
    const messages = dms[key] || [];
    return (
      <div className="shop-panel">
        <button className="back-link" onClick={() => setDmWith(null)}>
          <ChevronLeft size={14} /> Amis
        </button>
        <div className="panel-head">
          <MessageCircle size={16} />
          <h3>{dmWith}</h3>
        </div>
        <div className="bot-messages" ref={scrollRef}>
          {messages.length === 0 && <div className="empty-chat">Aucun message pour l'instant — dis bonjour.</div>}
          {messages.map((m, i) => (
            <div key={i} className={`bot-bubble-row ${m.author === pseudo ? "user" : ""}`}>
              <div className={`bot-bubble ${m.author === pseudo ? "user" : "assistant"}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="bot-input-row">
          <textarea
            className="bot-input"
            value={dmText}
            onChange={(e) => setDmText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (dmText.trim()) {
                  onSendDM(dmWith, { author: pseudo, text: dmText.trim() });
                  setDmText("");
                }
              }
            }}
            placeholder="Écris un message..."
            rows={1}
          />
          <button
            type="button"
            className="bot-send"
            disabled={!dmText.trim()}
            onClick={() => {
              onSendDM(dmWith, { author: pseudo, text: dmText.trim() });
              setDmText("");
            }}
            aria-label="Envoyer"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-panel no-pad-top">
      <div className="profile-banner" style={bannerStyle(banner)}>
        {isPro && (
          <span className="vip-tag">
            <Crown size={12} /> VIP
          </span>
        )}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar"><AvatarBadge avatar={avatar} size={44} /></div>
        </div>
      </div>
      <div className="profile-header">
        <div className="profile-name-block">
          <div className="profile-name">
            {pseudo} {isPro && <Crown size={13} className="tab-lock" />}
          </div>
          {myAccount.createdAt && <div className="profile-joined">Membre depuis {formatJoinDate(myAccount.createdAt)}</div>}
          {myAccount.userId && <div className="profile-joined">ID : {myAccount.userId}</div>}
        </div>
        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-num">{myFollowers.length}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{myFriends.length}</span>
            <span className="stat-label">Amis</span>
          </div>
        </div>
      </div>

      <div className="profile-bio-block">
        {!editingBio ? (
          <>
            <p className="profile-bio">{myAccount.bio ? myAccount.bio : "Aucune bio pour l'instant."}</p>
            <button
              className="member-action"
              onClick={() => {
                setBioDraft(myAccount.bio || "");
                setEditingBio(true);
              }}
            >
              Modifier ma bio
            </button>
          </>
        ) : (
          <div className="create-group-form">
            <label className="field">
              <span className="field-label">Ta bio</span>
              <input
                type="text"
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value.slice(0, 140))}
                placeholder="Dis-en un peu plus sur toi (140 caractères max)"
              />
            </label>
            <div className="pill-row">
              <button
                className="btn-primary"
                onClick={() => {
                  onSetBio(bioDraft.trim());
                  setEditingBio(false);
                }}
              >
                Enregistrer
              </button>
              <button className="btn-ghost" onClick={() => setEditingBio(false)}>
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="tab-bar sub-tab-bar">
        <button className={`tab-btn ${section === "friends" ? "active" : ""}`} onClick={() => setSection("friends")}>
          <Users size={14} /> Amis
        </button>
        <button className={`tab-btn ${section === "requests" ? "active" : ""}`} onClick={() => setSection("requests")}>
          <Bell size={14} /> Demandes {incoming.length > 0 && <span className="req-count">{incoming.length}</span>}
        </button>
        <button className={`tab-btn ${section === "search" ? "active" : ""}`} onClick={() => setSection("search")}>
          <Search size={14} /> Rechercher
        </button>
      </div>

      {section === "friends" && (
        <div className="group-list">
          {myFriends.length === 0 && <p className="panel-sub">Pas encore d'amis — cherche un pseudo dans l'onglet Rechercher.</p>}
          {myFriends.map((f) => {
            const acc = accounts[f] || {};
            return (
              <div className="chapter-row group-row" key={f} onClick={() => setDmWith(f)} style={{ cursor: "pointer" }}>
                <div className="chapter-num"><AvatarBadge avatar={acc.avatar} size={18} /></div>
                <div className="chapter-info">
                  <div className="chapter-title">
                    {f} {acc.isPro && <Crown size={11} className="tab-lock" />}
                  </div>
                  <div className="chapter-sub">Discuter</div>
                </div>
                <MessageCircle size={16} className="chapter-arrow" />
              </div>
            );
          })}
        </div>
      )}

      {section === "requests" && (
        <div className="group-list">
          {incoming.length === 0 && <p className="panel-sub">Aucune demande en attente.</p>}
          {incoming.map((r) => (
            <div className="member-row" key={r.from}>
              <span className="member-name">{r.from}</span>
              <button className="member-action" onClick={() => onAcceptFriendRequest(r.from)}>
                <UserCheck size={12} style={{ marginRight: 4 }} />
                Accepter
              </button>
              <button className="member-action danger" onClick={() => onDeclineFriendRequest(r.from)}>
                Refuser
              </button>
            </div>
          ))}
        </div>
      )}

      {section === "search" && (
        <div>
          <label className="field">
            <span className="field-label"><Search size={13} /> Chercher un pseudo</span>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ex. capital_lucas" />
          </label>
          <div className="group-list">
            {searchResults.map((p) => {
              const acc = accounts[p] || {};
              const status = statusFor(p);
              const amFollowing = (followers[p] || []).includes(pseudo);
              return (
                <div className="member-row" key={p}>
                  <span className="member-name">
                    <AvatarBadge avatar={acc.avatar} size={16} />{" "}
                    {p} {acc.isPro && <Crown size={11} className="tab-lock" />}
                  </span>
                  <button className="member-action" onClick={() => onToggleFollow(p)}>
                    <Heart size={12} style={{ marginRight: 4 }} />
                    {amFollowing ? "Suivi" : "Suivre"}
                  </button>
                  {status === "friend" ? (
                    <button className="member-action" onClick={() => setDmWith(p)}>
                      Discuter
                    </button>
                  ) : status === "pending" ? (
                    <button className="member-action" disabled>
                      Demande envoyée
                    </button>
                  ) : (
                    <button className="member-action" onClick={() => onSendFriendRequest(p)}>
                      <UserPlus size={12} style={{ marginRight: 4 }} />
                      Ajouter
                    </button>
                  )}
                </div>
              );
            })}
            {search.trim() && searchResults.length === 0 && <p className="panel-sub">Aucun profil trouvé pour "{search}".</p>}
          </div>
        </div>
      )}
    </div>
  );
}


// ---------------------------------------------------------------------------
// ADMIN — recherche par ID, octroi du VIP (visible uniquement par le propriétaire du site)
// ---------------------------------------------------------------------------

function AdminPanel({ accounts, onGrantPro, onRevokePro }) {
  const [search, setSearch] = useState("");
  const [justGranted, setJustGranted] = useState("");

  const normalizedSearch = search.trim().toUpperCase();
  const foundEntry = normalizedSearch
    ? Object.entries(accounts).find(([, acc]) => (acc.userId || "").toUpperCase() === normalizedSearch)
    : null;
  const foundPseudo = foundEntry ? foundEntry[0] : null;
  const foundAccount = foundEntry ? foundEntry[1] : null;

  return (
    <div className="shop-panel">
      <div className="panel-head">
        <ShieldCheck size={16} />
        <h3>Admin</h3>
        <span className="pro-badge">
          <Crown size={11} /> Toi seul
        </span>
      </div>
      <p className="panel-sub">Recherche un compte par son ID pour voir son profil et lui donner le VIP.</p>

      <label className="field">
        <span className="field-label"><Search size={13} /> ID du joueur</span>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ex. FC-8K3P2Q" />
      </label>

      {normalizedSearch && !foundAccount && <p className="panel-sub">Aucun compte ne correspond à cet ID.</p>}

      {foundAccount && (
        <div className="shop-panel no-pad-top" style={{ marginTop: 16 }}>
          <div className="profile-banner" style={bannerStyle(foundAccount.banner)}>
            {foundAccount.isPro && (
              <span className="vip-tag">
                <Crown size={12} /> VIP
              </span>
            )}
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <AvatarBadge avatar={foundAccount.avatar} size={44} />
              </div>
            </div>
          </div>
          <div className="profile-header">
            <div className="profile-name-block">
              <div className="profile-name">{foundPseudo}</div>
              <div className="profile-joined">ID : {foundAccount.userId}</div>
            </div>
          </div>
          <div className="profile-bio-block">
            <p className="profile-bio">{foundAccount.bio ? foundAccount.bio : "Aucune bio."}</p>
            {foundAccount.isPro ? (
              <button
                className="member-action danger"
                onClick={() => {
                  onRevokePro(foundPseudo);
                }}
              >
                Retirer le VIP
              </button>
            ) : (
              <button
                className="member-action"
                onClick={() => {
                  onGrantPro(foundPseudo);
                  setJustGranted(foundPseudo);
                }}
              >
                <Crown size={12} style={{ marginRight: 4 }} />
                Donner le VIP
              </button>
            )}
          </div>
          {justGranted === foundPseudo && foundAccount.isPro && (
            <div className="plan-active-tag" style={{ padding: "0 20px 16px" }}>
              <Check size={14} /> VIP accordé à {foundPseudo} — il/elle le verra à sa prochaine connexion.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Dashboard({
  pseudo,
  profile,
  onChangeNiche,
  isPro,
  onSetPro,
  avatar,
  onSetAvatar,
  themeId,
  onSetTheme,
  banner,
  onSetBanner,
  onSetBio,
  accounts,
  friendships,
  friendRequests,
  followers,
  dms,
  dmKey,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onRemoveFriend,
  onToggleFollow,
  onSendDM,
  onGiftPro,
  isSiteOwner,
  onAdminGrantPro,
  onAdminRevokePro,
  proWelcome,
  onDismissProWelcome,
}) {
  const [activeNicheId, setActiveNicheId] = useState(profile.niche.id);
  const [tab, setTab] = useState("courses"); // "courses" | "path" | "bot" | "community" | "profile" | "shop"
  const [totalXP, setTotalXP] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const activeNiche = NICHES.find((n) => n.id === activeNicheId);

  function gainXP(amount) {
    setTotalXP((prev) => prev + amount);
  }

  return (
    <div className="screen dashboard">
      <Ticker />
      <header className="nav">
        <div className="brand">
          <TrendingUp size={20} strokeWidth={2.4} />
          <span>FORMA CODEX</span>
        </div>
        <div className="nav-right">
          <button className="icon-btn" onClick={() => setSettingsOpen(!settingsOpen)} aria-label="Paramètres">
            <Settings size={16} />
          </button>
          <button className="account-chip account-chip-btn" onClick={() => setTab("profile")}>
            <AvatarBadge avatar={avatar} size={16} />
            {pseudo}
            {isPro && (
              <span className="pro-badge small">
                <Crown size={10} />
              </span>
            )}
          </button>
        </div>
      </header>

      {proWelcome && (
        <div className="pro-welcome-banner">
          <Crown size={18} />
          <div>
            <strong>Bienvenue dans FORMA CODEX Pro !</strong>
            <p>Ton compte vient de passer Pro — profite de la communauté, des thèmes, de la bannière et du Coach IA amélioré.</p>
          </div>
          <button className="icon-btn small" onClick={onDismissProWelcome} aria-label="Fermer">
            <X size={14} />
          </button>
        </div>
      )}

      {settingsOpen && (
        <div className="settings-wrap">
          <SettingsPanel
            isPro={isPro}
            avatar={avatar}
            onSetAvatar={onSetAvatar}
            themeId={themeId}
            onSetTheme={onSetTheme}
            banner={banner}
            onSetBanner={onSetBanner}
            onGoToShop={() => {
              setTab("shop");
              setSettingsOpen(false);
            }}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      )}

      <section className="dash-head">
        <div className="dash-welcome">
          <div className="eyebrow">Ton espace</div>
          <h1>
            Objectif : <span className="accent">{activeNiche.label}</span>
          </h1>
        </div>
        <div className="dash-tags">
          <span className="tag">
            <DollarSign size={13} /> {profile.capital.label}
          </span>
          <span className="tag">{profile.gender}</span>
          <span className="tag">{profile.age} ans</span>
        </div>
      </section>

      <section className="niche-switch">
        {NICHES.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              className={`switch-pill ${activeNicheId === n.id ? "selected" : ""}`}
              onClick={() => setActiveNicheId(n.id)}
            >
              <Icon size={14} />
              {n.tag}
            </button>
          );
        })}
      </section>

      <section className="tab-bar">
        <button className={`tab-btn ${tab === "courses" ? "active" : ""}`} onClick={() => setTab("courses")}>
          <BookOpen size={15} /> Cours
        </button>
        <button className={`tab-btn ${tab === "path" ? "active" : ""}`} onClick={() => setTab("path")}>
          <Trophy size={15} /> Parcours
        </button>
        <button className={`tab-btn ${tab === "bot" ? "active" : ""}`} onClick={() => setTab("bot")}>
          <MessageCircle size={15} /> Coach IA
        </button>
        <button className={`tab-btn ${tab === "community" ? "active" : ""}`} onClick={() => setTab("community")}>
          <Users size={15} /> Communauté {!isPro && <Crown size={11} className="tab-lock" />}
        </button>
        <button className={`tab-btn ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>
          <User size={15} /> Profil
        </button>
        <button className={`tab-btn ${tab === "shop" ? "active" : ""}`} onClick={() => setTab("shop")}>
          <Store size={15} /> Boutique
        </button>
        {isSiteOwner && (
          <button className={`tab-btn ${tab === "admin" ? "active" : ""}`} onClick={() => setTab("admin")}>
            <ShieldCheck size={15} /> Admin
          </button>
        )}
      </section>

      <section className={`dash-body ${tab === "community" || tab === "profile" ? "wide" : ""}`}>
        {tab === "courses" && <CourseList niche={activeNiche} />}
        {tab === "path" && (
          <GamePath niche={activeNiche} totalXP={totalXP} onGainXP={gainXP} key={"path-" + activeNiche.id} />
        )}
        {tab === "bot" && (
          <CoachBot
            niche={activeNiche}
            capital={profile.capital}
            pseudo={pseudo}
            isPro={isPro}
            key={"bot-" + activeNiche.id}
          />
        )}
        {tab === "community" && (
          <Community
            isPro={isPro}
            pseudo={pseudo}
            onGoToShop={() => setTab("shop")}
            groups={groups}
            setGroups={setGroups}
          />
        )}
        {tab === "profile" && (
          <ProfileView
            pseudo={pseudo}
            avatar={avatar}
            banner={banner}
            isPro={isPro}
            accounts={accounts}
            friendships={friendships}
            friendRequests={friendRequests}
            followers={followers}
            dms={dms}
            dmKey={dmKey}
            onSendFriendRequest={onSendFriendRequest}
            onAcceptFriendRequest={onAcceptFriendRequest}
            onDeclineFriendRequest={onDeclineFriendRequest}
            onRemoveFriend={onRemoveFriend}
            onToggleFollow={onToggleFollow}
            onSendDM={onSendDM}
            onSetBio={onSetBio}
            onGoToShop={() => setTab("shop")}
          />
        )}
        {tab === "shop" && (
          <Boutique
            isPro={isPro}
            onSetPro={onSetPro}
            pseudo={pseudo}
            friendships={friendships}
            accounts={accounts}
            onGiftPro={onGiftPro}
          />
        )}
        {tab === "admin" && isSiteOwner && (
          <AdminPanel accounts={accounts} onGrantPro={onAdminGrantPro} onRevokePro={onAdminRevokePro} />
        )}
      </section>

      <footer className="foot">
        <button className="btn-ghost" onClick={onChangeNiche}>
          Refaire le questionnaire de profil
        </button>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// APP
// ---------------------------------------------------------------------------

export default function App() {
  const [view, setView] = useState("landing");
  const [pseudo, setPseudo] = useState("");
  const [profile, setProfile] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [themeId, setThemeId] = useState(THEME_PRESETS[0].id);
  const [banner, setBanner] = useState({ type: "color", value: BANNER_COLORS[0].color });
  // Registre de comptes en mémoire : { [pseudo]: { password, profile, isPro, avatar, themeId, banner, userId } }
  const [accounts, setAccounts] = useState({});
  const [siteOwner, setSiteOwner] = useState(null); // pseudo du tout premier compte créé dans la session
  const [proWelcome, setProWelcome] = useState(false);
  const activeTheme = THEME_PRESETS.find((t) => t.id === themeId) || THEME_PRESETS[0];

  // Données sociales partagées entre tous les comptes de la session
  const [friendships, setFriendships] = useState([]); // [[a,b], ...]
  const [friendRequests, setFriendRequests] = useState([]); // [{from, to}]
  const [followers, setFollowers] = useState({}); // { [pseudo]: [followerPseudo, ...] }
  const [dms, setDms] = useState({}); // { "a|b": [{author, text, image}] }

  function dmKey(a, b) {
    return [a, b].sort().join("|");
  }

  function generateUserId() {
    return "FC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  const defaultBanner = { type: "color", value: BANNER_COLORS[0].color };

  function findAccountKey(p) {
    return Object.keys(accounts).find((k) => k.toLowerCase() === p.toLowerCase());
  }

  function handleSignup(p, password) {
    if (findAccountKey(p)) {
      return "Ce pseudo est déjà utilisé — connecte-toi plutôt.";
    }
    const isFirstAccount = Object.keys(accounts).length === 0;
    setAccounts((prev) => ({
      ...prev,
      [p]: {
        password,
        profile: null,
        isPro: false,
        avatar: "",
        themeId: THEME_PRESETS[0].id,
        banner: defaultBanner,
        bio: "",
        createdAt: Date.now(),
        userId: generateUserId(),
      },
    }));
    if (isFirstAccount) setSiteOwner(p);
    setPseudo(p);
    setIsPro(false);
    setAvatar("");
    setThemeId(THEME_PRESETS[0].id);
    setBanner(defaultBanner);
    setView("questionnaire");
    return null;
  }

  function handleLogin(p, password) {
    const key = findAccountKey(p);
    const account = key ? accounts[key] : null;
    if (!account) {
      return "Ce compte n'existe pas encore — crée-en un.";
    }
    if (account.password !== password) {
      return "Mot de passe incorrect.";
    }
    setPseudo(key);
    setIsPro(!!account.isPro);
    setAvatar(account.avatar || "");
    setThemeId(account.themeId || THEME_PRESETS[0].id);
    setBanner(account.banner || defaultBanner);
    if (account.justUpgraded) {
      setProWelcome(true);
      setAccounts((prev) => ({ ...prev, [key]: { ...prev[key], justUpgraded: false } }));
    }
    if (account.profile) {
      setProfile(account.profile);
      setView("dashboard");
    } else {
      setView("questionnaire");
    }
    return null;
  }

  function handleQuestionnaireComplete(p) {
    setProfile(p);
    setAccounts((prev) => ({
      ...prev,
      [pseudo]: { ...prev[pseudo], profile: p },
    }));
    setView("dashboard");
  }

  function updateAccount(fields, forPseudo) {
    const target = forPseudo || pseudo;
    setAccounts((prev) => ({ ...prev, [target]: { ...prev[target], ...fields } }));
  }

  function handleSetPro(value) {
    setIsPro(value);
    updateAccount({ isPro: value });
  }

  function handleSetAvatar(value) {
    setAvatar(value);
    updateAccount({ avatar: value });
  }

  function handleSetTheme(value) {
    setThemeId(value);
    updateAccount({ themeId: value });
  }

  function handleSetBanner(value) {
    setBanner(value);
    updateAccount({ banner: value });
  }

  function handleSetBio(value) {
    updateAccount({ bio: value });
  }

  // ---- social ----
  function sendFriendRequest(toPseudo) {
    if (toPseudo === pseudo) return;
    const already = friendships.some((pair) => pair.includes(pseudo) && pair.includes(toPseudo));
    const pending = friendRequests.some((r) => r.from === pseudo && r.to === toPseudo);
    if (already || pending) return;
    setFriendRequests((prev) => [...prev, { from: pseudo, to: toPseudo }]);
  }

  function acceptFriendRequest(fromPseudo) {
    setFriendRequests((prev) => prev.filter((r) => !(r.from === fromPseudo && r.to === pseudo)));
    setFriendships((prev) => [...prev, [pseudo, fromPseudo]]);
  }

  function declineFriendRequest(fromPseudo) {
    setFriendRequests((prev) => prev.filter((r) => !(r.from === fromPseudo && r.to === pseudo)));
  }

  function removeFriend(otherPseudo) {
    setFriendships((prev) => prev.filter((pair) => !(pair.includes(pseudo) && pair.includes(otherPseudo))));
  }

  function toggleFollow(targetPseudo) {
    setFollowers((prev) => {
      const list = prev[targetPseudo] || [];
      const isFollowing = list.includes(pseudo);
      return {
        ...prev,
        [targetPseudo]: isFollowing ? list.filter((f) => f !== pseudo) : [...list, pseudo],
      };
    });
  }

  function sendDM(otherPseudo, message) {
    const key = dmKey(pseudo, otherPseudo);
    setDms((prev) => ({ ...prev, [key]: [...(prev[key] || []), message] }));
  }

  function giftPro(toPseudo) {
    updateAccount({ isPro: true, justUpgraded: true }, toPseudo);
  }

  function adminGrantPro(toPseudo) {
    updateAccount({ isPro: true, justUpgraded: true }, toPseudo);
  }

  function adminRevokePro(toPseudo) {
    updateAccount({ isPro: false }, toPseudo);
  }

  return (
    <div
      className="app-root"
      style={{
        "--lime": activeTheme.lime,
        "--amber": activeTheme.amber,
        "--surface": activeTheme.surfaceTint,
        "--surface-2": activeTheme.surface2Tint,
      }}
    >
      <style>{CSS}</style>

      {view === "landing" && <Landing onStart={() => setView("auth")} />}

      {view === "auth" && (
        <AuthCard
          onBack={() => setView("landing")}
          onSignup={handleSignup}
          onLogin={handleLogin}
        />
      )}

      {view === "questionnaire" && (
        <Questionnaire
          pseudo={pseudo}
          onBack={() => setView("auth")}
          onComplete={handleQuestionnaireComplete}
        />
      )}

      {view === "dashboard" && profile && (
        <Dashboard
          pseudo={pseudo}
          profile={profile}
          onChangeNiche={() => setView("questionnaire")}
          isPro={isPro}
          onSetPro={handleSetPro}
          avatar={avatar}
          onSetAvatar={handleSetAvatar}
          themeId={themeId}
          onSetTheme={handleSetTheme}
          banner={banner}
          onSetBanner={handleSetBanner}
          onSetBio={handleSetBio}
          accounts={accounts}
          friendships={friendships}
          friendRequests={friendRequests}
          followers={followers}
          dms={dms}
          dmKey={dmKey}
          onSendFriendRequest={sendFriendRequest}
          onAcceptFriendRequest={acceptFriendRequest}
          onDeclineFriendRequest={declineFriendRequest}
          onRemoveFriend={removeFriend}
          onToggleFollow={toggleFollow}
          onSendDM={sendDM}
          onGiftPro={giftPro}
          isSiteOwner={pseudo === siteOwner}
          onAdminGrantPro={adminGrantPro}
          onAdminRevokePro={adminRevokePro}
          proWelcome={proWelcome}
          onDismissProWelcome={() => setProWelcome(false)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// STYLES
// ---------------------------------------------------------------------------

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg: #0B0D0E;
  --surface: #15191B;
  --surface-2: #1D2224;
  --border: #2A3032;
  --text: #F1EFE7;
  --muted: #8B9296;
  --lime: #C6FF3D;
  --amber: #FF9F45;
}

* { box-sizing: border-box; }

.app-root {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  width: 100%;
}

.screen { min-height: 100vh; display: flex; flex-direction: column; }

h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; margin: 0; letter-spacing: -0.01em; }

.accent { color: var(--lime); }

/* ---- ticker ---- */
.ticker-wrap {
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  white-space: nowrap;
}
.ticker-track {
  display: inline-flex;
  animation: scroll-left 28s linear infinite;
  padding: 8px 0;
}
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ticker-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--lime); display: inline-block; }
@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
}

/* ---- nav ---- */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px clamp(20px, 5vw, 64px);
}
.brand { display: flex; align-items: center; gap: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: 0.04em; color: var(--lime); }
.brand.small { font-size: 13px; }

/* ---- buttons ---- */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--lime); color: #0B0D0E;
  border: none; border-radius: 4px;
  padding: 13px 22px; font-weight: 600; font-size: 14px;
  cursor: pointer; font-family: 'Inter', sans-serif;
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.btn-primary:hover { transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
.btn-primary.full { width: 100%; justify-content: center; margin-top: 16px; }
.btn-primary:focus-visible, .btn-ghost:focus-visible, .btn-icon-back:focus-visible { outline: 2px solid var(--lime); outline-offset: 2px; }

.btn-ghost {
  background: transparent; color: var(--text);
  border: 1px solid var(--border); border-radius: 4px;
  padding: 11px 20px; font-size: 13px; font-weight: 500;
  cursor: pointer; font-family: 'Inter', sans-serif;
}
.btn-ghost:hover { border-color: var(--lime); color: var(--lime); }

.btn-icon-back {
  background: transparent; border: 1px solid var(--border); border-radius: 4px;
  color: var(--muted); padding: 8px; cursor: pointer; margin-bottom: 20px;
}
.btn-icon-back:hover { color: var(--text); border-color: var(--text); }

/* ---- landing hero ---- */
.hero { padding: clamp(40px, 8vw, 90px) clamp(20px, 5vw, 64px) 40px; max-width: 780px; }
.eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber); margin-bottom: 16px; }
.hero h1 { font-size: clamp(36px, 6vw, 64px); line-height: 1.02; font-weight: 700; }
.hero-sub { color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 520px; margin: 22px 0 30px; }

/* ---- ledger ---- */
.ledger { padding: 0 clamp(20px, 5vw, 64px) 60px; border-top: 1px solid var(--border); margin-top: 20px; }
.ledger-head {
  display: flex; justify-content: space-between;
  font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted);
  padding: 16px 0; text-transform: uppercase; letter-spacing: 0.08em;
}
.ledger-row {
  display: flex; align-items: center; gap: 18px;
  padding: 18px 0; border-top: 1px solid var(--border);
}
.ledger-tag {
  font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--lime);
  border: 1px solid var(--border); border-radius: 4px; padding: 4px 8px; flex-shrink: 0;
}
.ledger-main { flex: 1; }
.ledger-title { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; }
.ledger-pitch { color: var(--muted); font-size: 13px; margin-top: 4px; }
.ledger-arrow { color: var(--muted); flex-shrink: 0; }

.foot { padding: 24px clamp(20px, 5vw, 64px) 40px; color: var(--muted); font-size: 12px; display: flex; justify-content: center; }

/* ---- centered auth / quiz screens ---- */
.center-screen { align-items: center; justify-content: center; padding: 24px; }
.auth-card, .quiz-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
  padding: clamp(24px, 5vw, 40px); width: 100%; max-width: 400px;
}
.quiz-card.wide { max-width: 620px; }

.auth-tabs { display: flex; gap: 4px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 4px; }
.auth-tab {
  flex: 1; background: none; border: none; border-radius: 4px;
  padding: 9px 10px; font-size: 12.5px; font-weight: 500; color: var(--muted);
  cursor: pointer; font-family: 'Inter', sans-serif;
}
.auth-tab.active { background: var(--lime); color: #0B0D0E; font-weight: 600; }

.auth-head h2 { font-size: 24px; margin-top: 20px; }
.auth-head p { color: var(--muted); font-size: 13px; margin: 8px 0 0; }

.auth-form { margin-top: 28px; display: flex; flex-direction: column; gap: 18px; }
.auth-switch {
  background: none; border: none; color: var(--muted); font-size: 12.5px;
  cursor: pointer; text-align: center; padding: 4px 0 0; text-decoration: underline;
  text-underline-offset: 3px; font-family: 'Inter', sans-serif;
}
.auth-switch:hover { color: var(--lime); }

.field { display: flex; flex-direction: column; gap: 8px; }
.field-label { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
.field input {
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 4px;
  padding: 12px 14px; color: var(--text); font-size: 14px; font-family: 'Inter', sans-serif;
}
.field input:focus { outline: none; border-color: var(--lime); }
.field-error { color: var(--amber); font-size: 12px; }
.coach-error { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.coach-error .btn-ghost { width: auto; margin-top: 0; padding: 6px 14px; font-size: 12px; }

/* ---- step dots ---- */
.step-dots { display: flex; gap: 8px; margin-bottom: 6px; }
.step-dot {
  width: 30px; height: 4px; border-radius: 2px; background: var(--border);
}
.step-dot.active { background: var(--lime); }
.step-dot.done { background: var(--amber); }
.step-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.06em; }

.step-body h2 { font-size: 22px; margin-bottom: 6px; }
.step-sub { color: var(--muted); font-size: 13px; margin: 0 0 20px; }

.pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.pill {
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px;
  padding: 9px 16px; font-size: 13px; color: var(--text); cursor: pointer;
}
.pill.selected { border-color: var(--lime); color: var(--lime); }

.capital-grid, .niche-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px; }
.capital-card, .niche-card {
  text-align: left; background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px;
  padding: 14px; cursor: pointer; color: var(--text);
}
.capital-card.selected, .niche-card.selected { border-color: var(--lime); background: rgba(198,255,61,0.06); }
.capital-label { display: flex; align-items: center; gap: 4px; font-weight: 600; font-size: 14px; }
.capital-range { font-size: 12px; color: var(--muted); margin-top: 4px; }
.capital-hint { font-size: 11px; color: var(--amber); margin-top: 6px; font-family: 'JetBrains Mono', monospace; }

.niche-card { display: flex; flex-direction: column; gap: 6px; }
.niche-label { font-weight: 600; font-size: 14px; }
.niche-pitch { font-size: 12px; color: var(--muted); }

@media (max-width: 560px) {
  .capital-grid, .niche-grid { grid-template-columns: 1fr; }
}

/* ---- dashboard ---- */
.dash-head { padding: 20px clamp(20px, 5vw, 64px) 0; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; align-items: flex-end; }
.dash-welcome h1 { font-size: clamp(24px, 4vw, 34px); margin-top: 8px; }
.dash-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tag {
  font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted);
  border: 1px solid var(--border); border-radius: 20px; padding: 6px 12px;
  display: inline-flex; align-items: center; gap: 4px;
}
.account-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--muted); border: 1px solid var(--border); border-radius: 20px; padding: 6px 12px;
  background: transparent; font-family: 'Inter', sans-serif;
}

.niche-switch { display: flex; gap: 8px; padding: 20px clamp(20px, 5vw, 64px) 0; flex-wrap: wrap; }
.switch-pill {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
  padding: 8px 14px; font-size: 12px; color: var(--muted); cursor: pointer; font-family: 'JetBrains Mono', monospace;
}
.switch-pill.selected { border-color: var(--lime); color: var(--lime); }

/* ---- tab bar ---- */
.tab-bar {
  display: flex; gap: 8px; padding: 20px clamp(20px, 5vw, 64px) 0;
  border-bottom: 1px solid var(--border); margin: 0 clamp(20px, 5vw, 64px);
  padding-left: 0; padding-right: 0;
  overflow-x: auto; overflow-y: hidden; flex-wrap: nowrap; scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.tab-bar::-webkit-scrollbar { display: none; }
.tab-btn {
  display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
  background: none; border: none; color: var(--muted);
  padding: 10px 4px 14px; font-size: 13px; font-weight: 500; cursor: pointer;
  border-bottom: 2px solid transparent; margin-right: 18px; font-family: 'Inter', sans-serif;
  white-space: nowrap;
}
.tab-btn.active { color: var(--lime); border-bottom-color: var(--lime); }

.dash-body { padding: 24px clamp(20px, 5vw, 64px) 40px; max-width: 720px; }
.dash-body.wide { max-width: 980px; }

.course-panel, .path-panel, .bot-panel {
  background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 20px;
}
.panel-head { display: flex; align-items: center; gap: 8px; color: var(--lime); margin-bottom: 4px; }
.panel-head h3 { font-size: 16px; }
.panel-sub { color: var(--muted); font-size: 12px; margin: 6px 0 18px; }

/* ---- xp bar ---- */
.xp-bar-row { display: flex; align-items: center; gap: 10px; margin: 4px 0 6px; }
.xp-rang { display: inline-flex; align-items: center; gap: 4px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--amber); flex-shrink: 0; }
.xp-track { flex: 1; height: 6px; background: var(--surface-2); border-radius: 4px; overflow: hidden; }
.xp-fill { height: 100%; background: var(--lime); transition: width 0.3s ease; }
.xp-count { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--muted); flex-shrink: 0; }
.xp-gain { display: inline-flex; align-items: center; gap: 4px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--amber); margin: 8px 0; }

.course-item { border-top: 1px solid var(--border); }
.course-item:first-of-type { border-top: none; margin-top: 12px; }
.course-head {
  width: 100%; display: flex; align-items: center; gap: 12px;
  background: none; border: none; color: var(--text); cursor: pointer;
  padding: 14px 0; text-align: left; font-family: 'Inter', sans-serif;
}
.course-index { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--amber); flex-shrink: 0; }
.course-title { flex: 1; font-size: 13.5px; font-weight: 500; }
.course-duration { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); flex-shrink: 0; }
.course-play { color: var(--muted); flex-shrink: 0; }
.course-item.open .course-play { color: var(--lime); }
.course-desc { color: var(--muted); font-size: 13px; line-height: 1.5; padding: 0 0 16px 40px; }

/* ---- game path ---- */
.path-map { display: flex; align-items: center; padding: 8px 4px 26px; flex-wrap: wrap; row-gap: 14px; }
.path-node {
  width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
  border: 2px solid var(--border); color: var(--muted); background: var(--surface-2);
}
.path-node.active { border-color: var(--amber); color: var(--amber); box-shadow: 0 0 0 4px rgba(255,159,69,0.12); }
.path-node.done { border-color: var(--lime); color: #0B0D0E; background: var(--lime); }
.path-link { flex: 1; min-width: 16px; height: 2px; background: var(--border); margin: 0 6px; }
.path-link.done { background: var(--lime); }

.blank-card { border-top: 1px solid var(--border); padding-top: 20px; }
.exercise-type-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--amber); border: 1px solid var(--border); border-radius: 20px; padding: 4px 10px; margin-bottom: 14px; }
.vf-options { gap: 10px; }
.vf-chip { flex: 1; min-width: 100px; text-align: center; font-weight: 600; padding: 14px 16px; }
.blank-sentence {
  font-family: 'Space Grotesk', sans-serif; font-size: 17px; line-height: 1.55;
  margin-bottom: 20px;
}
.blank-slot {
  display: inline-block; min-width: 60px; text-align: center;
  border-bottom: 2px solid var(--muted); color: var(--muted);
  padding: 0 4px; margin: 0 2px; font-family: 'JetBrains Mono', monospace;
}
.blank-slot.correct { border-color: var(--lime); color: var(--lime); }
.blank-slot.wrong { border-color: var(--amber); color: var(--amber); }

.blank-options { display: flex; flex-wrap: wrap; gap: 8px; }
.blank-chip {
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px;
  padding: 10px 16px; font-size: 13px; color: var(--text); cursor: pointer; font-family: 'Inter', sans-serif;
}
.blank-chip.chosen { border-color: var(--muted); }
.blank-chip.correct { border-color: var(--lime); color: var(--lime); }
.blank-chip.wrong { border-color: var(--amber); color: var(--amber); }
.blank-chip:disabled { cursor: default; }

.blank-tip {
  display: flex; gap: 8px; align-items: flex-start;
  color: var(--muted); font-size: 12.5px; line-height: 1.5;
  margin-top: 16px; background: var(--surface-2); border-radius: 6px; padding: 12px;
}
.blank-tip svg { flex-shrink: 0; margin-top: 2px; color: var(--amber); }

.path-result { text-align: center; padding-top: 12px; }
.path-trophy { color: var(--lime); margin-bottom: 10px; }
.quiz-score { font-family: 'Space Grotesk', sans-serif; font-size: 32px; color: var(--lime); font-weight: 700; }
.quiz-result-text { color: var(--muted); font-size: 13px; margin: 8px 0 18px; }

/* ---- coach bot ---- */
.bot-messages {
  display: flex; flex-direction: column; gap: 12px;
  max-height: 360px; overflow-y: auto; padding: 4px 2px 8px;
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  margin-bottom: 14px;
}
.bot-messages.large { max-height: 560px; min-height: 420px; }
.shop-panel.wide-panel { padding: 24px; }
.bot-bubble-row { display: flex; align-items: flex-start; gap: 8px; }
.bot-bubble-row.user { justify-content: flex-end; }
.bot-avatar { color: var(--lime); margin-top: 8px; flex-shrink: 0; }
.bot-bubble {
  max-width: 78%; padding: 10px 14px; border-radius: 10px; font-size: 13.5px; line-height: 1.55;
  white-space: pre-wrap;
}
.bot-bubble.assistant { background: var(--surface-2); border: 1px solid var(--border); }
.bot-bubble.user { background: rgba(198,255,61,0.1); border: 1px solid rgba(198,255,61,0.3); color: var(--text); }
.bot-bubble.typing { display: flex; gap: 4px; align-items: center; }
.bot-bubble.typing .dot {
  width: 5px; height: 5px; border-radius: 50%; background: var(--muted);
  animation: bounce 1.2s infinite ease-in-out;
}
.bot-bubble.typing .dot:nth-child(2) { animation-delay: 0.15s; }
.bot-bubble.typing .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .bot-bubble.typing .dot { animation: none; opacity: 0.7; }
}

.bot-input-row { display: flex; gap: 8px; align-items: flex-end; }
.bot-input {
  flex: 1; resize: none; background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px;
  padding: 11px 12px; color: var(--text); font-size: 13.5px; font-family: 'Inter', sans-serif;
  max-height: 100px;
}
.bot-input:focus { outline: none; border-color: var(--lime); }
.bot-send {
  background: var(--lime); border: none; border-radius: 6px; width: 40px; height: 40px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; color: #0B0D0E; cursor: pointer;
}
.bot-send:disabled { opacity: 0.35; cursor: not-allowed; }
.bot-send.secondary { background: var(--surface-2); color: var(--text); border: 1px solid var(--border); }

/* ---- nav right / settings ---- */
.nav-right { display: flex; align-items: center; gap: 10px; }
.icon-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; color: var(--muted); width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.icon-btn.small { width: 26px; height: 26px; margin-left: auto; }
.icon-btn:hover { color: var(--text); border-color: var(--text); }
.avatar-emoji { font-size: 14px; line-height: 1; }
.avatar-img { border-radius: 50%; object-fit: cover; display: inline-block; flex-shrink: 0; }
.pro-badge { display: inline-flex; align-items: center; gap: 3px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #0B0D0E; background: var(--lime); border-radius: 20px; padding: 3px 7px; font-weight: 700; }
.pro-badge.small { padding: 3px 5px; }
.tab-lock { color: var(--amber); margin-left: 2px; }

.settings-wrap { padding: 0 clamp(20px, 5vw, 64px); margin-top: -8px; }
.settings-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 18px; margin-top: 10px; }
.settings-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.settings-section { margin-top: 18px; }
.avatar-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.avatar-option { width: 42px; height: 42px; border-radius: 8px; background: var(--surface-2); border: 1px solid var(--border); font-size: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.avatar-upload { color: var(--lime); border-style: dashed; border-color: var(--lime); overflow: hidden; }
.avatar-preview-img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; }
.avatar-option.selected { border-color: var(--lime); background: rgba(198,255,61,0.1); }
.theme-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
.theme-swatch { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--border); cursor: pointer; }
.theme-swatch.selected { border-color: var(--text); box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--text); }

/* ---- boutique ---- */
.shop-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 20px; }
.plan-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-top: 6px; }
.plan-card.active { border-color: var(--lime); }
.plan-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
.plan-name { display: flex; align-items: center; gap: 6px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; color: var(--lime); }
.plan-price { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; }
.plan-price span { font-size: 12px; color: var(--muted); font-weight: 500; font-family: 'Inter', sans-serif; }
.plan-features { list-style: none; margin: 0 0 18px; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.plan-features li { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--text); }
.plan-features li svg { color: var(--lime); flex-shrink: 0; margin-top: 2px; }
.plan-active-tag { display: inline-flex; align-items: center; gap: 6px; color: var(--lime); font-size: 13px; font-weight: 600; margin-bottom: 10px; }
.confirm-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
.confirm-row .btn-ghost { width: auto; margin-top: 0; }

.upsell-box { text-align: center; padding: 30px 10px 10px; }
.upsell-crown { color: var(--amber); margin-bottom: 10px; }
.upsell-box p { color: var(--muted); font-size: 13px; line-height: 1.6; margin: 0 0 18px; max-width: 340px; margin-left: auto; margin-right: auto; }
.ban-notice { display: flex; gap: 10px; align-items: flex-start; background: rgba(255,92,92,0.08); border: 1px solid var(--amber); border-radius: 6px; padding: 12px; margin: 10px 0; color: var(--amber); }
.ban-notice svg { flex-shrink: 0; margin-top: 2px; }
.ban-notice strong { display: block; color: var(--text); font-size: 13px; margin-bottom: 4px; }
.ban-notice p { margin: 0; font-size: 12.5px; color: var(--muted); }
.unavailable-box { display: flex; align-items: center; gap: 8px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 12px 14px; color: var(--muted); font-size: 12.5px; }
.unavailable-box svg { flex-shrink: 0; color: var(--amber); }
.pro-welcome-banner {
  display: flex; align-items: flex-start; gap: 12px;
  background: rgba(198,255,61,0.08); border: 1px solid var(--lime); border-radius: 8px;
  padding: 14px 16px; margin: 0 clamp(20px, 5vw, 64px) 16px; color: var(--lime);
}
.pro-welcome-banner strong { display: block; color: var(--text); font-size: 13.5px; margin-bottom: 3px; }
.pro-welcome-banner p { margin: 0; font-size: 12.5px; color: var(--muted); line-height: 1.5; }
.pro-welcome-banner .icon-btn.small { margin-left: auto; flex-shrink: 0; }

/* ---- communauté ---- */
.create-group-form { display: flex; flex-direction: column; gap: 12px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 14px; margin: 10px 0; }
.chapter-row {
  display: flex; align-items: center; gap: 14px; width: 100%;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px;
  padding: 14px; cursor: pointer; text-align: left; color: var(--text);
  font-family: 'Inter', sans-serif; font-size: 13px;
}
.chapter-row:hover { border-color: var(--lime); }
.chapter-num {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--muted); overflow: hidden;
}
.chapter-info { flex: 1; min-width: 0; }
.chapter-title { font-weight: 600; font-size: 13.5px; display: flex; align-items: center; gap: 6px; }
.chapter-sub { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); margin-top: 3px; }
.chapter-arrow { color: var(--muted); flex-shrink: 0; }
.group-icon-badge { font-size: 18px; line-height: 1; }
.group-list { margin-top: 14px; }
.group-row { margin-top: 8px; }
.members-panel { background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 12px; margin: 10px 0; display: flex; flex-direction: column; gap: 8px; }
.member-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12.5px; padding: 4px 0; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
.member-row:last-of-type { border-bottom: none; }
.member-name { flex: 1; font-weight: 500; }
.role-tag { display: inline-flex; align-items: center; gap: 3px; font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 3px 7px; border-radius: 20px; border: 1px solid var(--border); color: var(--muted); }
.role-tag.role-créateur { color: var(--lime); border-color: var(--lime); }
.role-tag.role-admin { color: var(--amber); border-color: var(--amber); }
.member-action { background: none; border: 1px solid var(--border); border-radius: 4px; color: var(--muted); font-size: 11px; padding: 4px 8px; cursor: pointer; }
.member-action:hover { color: var(--text); }
.member-action.danger:hover { color: var(--amber); border-color: var(--amber); }

/* ---- profil ---- */
.no-pad-top { padding-top: 0; overflow: hidden; }
.profile-banner { height: 170px; margin: -20px -20px 0; position: relative; display: flex; align-items: flex-start; justify-content: flex-end; padding: 14px; background-color: var(--surface-2); }
.vip-tag { display: inline-flex; align-items: center; gap: 4px; background: rgba(11,13,14,0.75); backdrop-filter: blur(4px); color: var(--lime); font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; padding: 4px 9px; border-radius: 20px; border: 1px solid rgba(198,255,61,0.4); }
.profile-avatar-wrap { position: absolute; left: 20px; bottom: -36px; }
.profile-avatar { width: 84px; height: 84px; border-radius: 50%; background: var(--surface-2); border: 4px solid var(--surface); display: flex; align-items: center; justify-content: center; font-size: 36px; color: var(--muted); overflow: hidden; }
.profile-header { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 14px; padding: 44px 20px 18px 128px; }
.profile-name-block { display: flex; flex-direction: column; }
.profile-name { display: flex; align-items: center; gap: 6px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 19px; }
.profile-joined { font-size: 11.5px; color: var(--muted); margin-top: 3px; }
.profile-stats { display: flex; gap: 24px; }
.profile-bio-block { padding: 0 20px 18px; border-bottom: 1px solid var(--border); margin-bottom: 4px; }
.profile-bio { font-size: 13px; color: var(--text); line-height: 1.5; margin: 0 0 8px; }
.stat-box { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; }
.stat-label { font-size: 11px; color: var(--muted); }
.sub-tab-bar { margin: 0 -20px; padding-left: 20px; padding-right: 20px; }
.account-chip-btn { cursor: pointer; }
@media (max-width: 460px) {
  .profile-avatar { width: 64px; height: 64px; font-size: 28px; }
  .profile-avatar-wrap { bottom: -26px; }
  .profile-header { padding-left: 20px; padding-top: 40px; }
}
.account-chip-btn:hover { border-color: var(--lime); }
.req-count { background: var(--amber); color: #0B0D0E; font-size: 10px; font-weight: 700; border-radius: 20px; padding: 1px 6px; margin-left: 4px; }
.banner-swatch { width: 44px; height: 32px; border-radius: 6px; border: 2px solid var(--border); cursor: pointer; }
.banner-swatch.selected { border-color: var(--text); }
.settings-hint { font-size: 11px; color: var(--muted); margin: 8px 0 0; }
.gift-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 18px; margin-top: 14px; }
.empty-chat { color: var(--muted); font-size: 13px; text-align: center; padding: 20px 0; }
.group-bubble { display: flex; flex-direction: column; gap: 4px; }
.group-author { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--amber); text-transform: uppercase; letter-spacing: 0.04em; }
.group-image { max-width: 100%; border-radius: 6px; margin-top: 4px; }

/* ---- salons (channels) ---- */
.channel-bar {
  display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;
  padding: 4px 0 12px; margin-top: 4px; border-bottom: 1px solid var(--border); margin-bottom: 14px;
}
.channel-bar::-webkit-scrollbar { display: none; }
.channel-pill {
  display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px;
  padding: 7px 13px; font-size: 12px; color: var(--muted); cursor: pointer; font-family: 'Inter', sans-serif;
  white-space: nowrap;
}
.channel-pill.active { border-color: var(--lime); color: var(--lime); }

.forum-list { display: flex; flex-direction: column; gap: 4px; }
.forum-post-detail { padding-top: 4px; }
.forum-post-title { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700; margin: 10px 0 2px; }
.forum-post-text { font-size: 13.5px; line-height: 1.6; color: var(--text); margin: 10px 0 18px; }
.forum-replies { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--border); padding-top: 14px; margin-bottom: 14px; }
.forum-reply { display: flex; gap: 8px; font-size: 13px; }
.forum-reply svg { color: var(--muted); flex-shrink: 0; margin-top: 3px; }
`;
