export interface RatgeberDownload {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  pages: number;
  category: string;
  downloadUrl: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  sections: {
    heading: string;
    text: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const ratgeberDownloads: RatgeberDownload[] = [
  {
    id: "energetische-sanierung",
    slug: "energetische-sanierung",
    title: "Energetische Sanierung.",
    subtitle: "So steigern Sie den Wert Ihrer Immobilie und senken Energiekosten",
    description:
      "Erfahren Sie, welche energetischen Maßnahmen sich wirklich lohnen – von der Dämmung über neue Fenster bis zur Heizungsmodernisierung. Mit Fördermittel-Übersicht und Kosten-Nutzen-Rechnung.",
    coverImage: "/images/energetische-sanierung.jpg",
    pages: 22,
    category: "Sanierung",
    downloadUrl: "/ratgeber-downloads/energetische-sanierung.pdf",
    tags: ["Energieeffizienz", "Sanierung", "Fördermittel", "KfW"],
    seo: {
      metaTitle: "Energetische Sanierung – Ratgeber für Immobilieneigentümer",
      metaDescription:
        "Energetische Sanierung: Welche Maßnahmen lohnen sich? Kosten, Fördermittel (KfW/BAFA) und Wertsteigerung im Überblick. Kostenloser Ratgeber von homefin.",
      keywords: [
        "energetische Sanierung",
        "Immobilie sanieren",
        "KfW Förderung",
        "Energieeffizienz Haus",
        "Dämmung Kosten",
        "Heizung modernisieren",
      ],
    },
    sections: [
      {
        heading: "Warum energetische Sanierung?",
        text: "Steigende Energiepreise, verschärfte gesetzliche Anforderungen und der Wunsch nach Klimaschutz machen die energetische Sanierung zu einem der wichtigsten Themen für Immobilieneigentümer. Eine gut geplante Sanierung kann den Energieverbrauch um bis zu 80 % senken und den Marktwert Ihrer Immobilie deutlich steigern.",
      },
      {
        heading: "Die wichtigsten Maßnahmen im Überblick",
        text: "Von der Fassadendämmung über den Fenstertausch bis zur modernen Heizungsanlage – unser Ratgeber erklärt Ihnen Schritt für Schritt, welche Maßnahmen den größten Effekt erzielen. Wir zeigen Ihnen, in welcher Reihenfolge Sie vorgehen sollten und welche Kombinationen besonders wirtschaftlich sind.",
      },
      {
        heading: "Fördermittel und Finanzierung",
        text: "KfW-Kredite, BAFA-Zuschüsse und steuerliche Absetzbarkeit: Die Förderlandschaft ist komplex, aber lohnend. Unser Ratgeber gibt Ihnen einen klaren Überblick über alle verfügbaren Förderprogramme und zeigt, wie Sie bis zu 45 % der Kosten erstattet bekommen können.",
      },
      {
        heading: "Wertsteigerung durch Sanierung",
        text: "Eine energetisch sanierte Immobilie erzielt am Markt höhere Preise und lässt sich schneller verkaufen. Wir zeigen Ihnen, welchen Einfluss die Energieeffizienzklasse auf den Verkaufspreis hat und wie Sie den Return on Investment Ihrer Sanierung berechnen.",
      },
    ],
    faq: [
      {
        question: "Was kostet eine energetische Sanierung?",
        answer:
          "Die Kosten variieren je nach Maßnahme: Eine Fassadendämmung kostet ca. 100–200 €/m², neue Fenster 500–1.000 € pro Stück, eine neue Heizung 15.000–35.000 €. Durch Fördermittel können Sie bis zu 45 % der Kosten zurückerhalten.",
      },
      {
        question: "Welche Fördermittel gibt es für energetische Sanierung?",
        answer:
          "Die wichtigsten Programme sind: KfW-Kredit 261/262 für energieeffizientes Sanieren, BAFA-Zuschüsse für Einzelmaßnahmen und die steuerliche Förderung nach §35c EStG. Unser Ratgeber erklärt alle Programme im Detail.",
      },
      {
        question: "Steigert energetische Sanierung den Immobilienwert?",
        answer:
          "Ja, deutlich. Studien zeigen, dass eine Verbesserung um eine Energieeffizienzklasse den Wert um ca. 5–10 % steigern kann. Immobilien mit Klasse A oder B erzielen am Markt bis zu 25 % höhere Preise als vergleichbare unsanierte Objekte.",
      },
      {
        question: "In welcher Reihenfolge sollte ich sanieren?",
        answer:
          "Die empfohlene Reihenfolge ist: 1. Dach- und Fassadendämmung, 2. Fenstertausch, 3. Heizungsmodernisierung, 4. Lüftungsanlage. So vermeiden Sie Fehlplanung und maximieren den Effekt jeder Maßnahme.",
      },
    ],
  },
  {
    id: "immobilie-geerbt",
    slug: "immobilie-geerbt",
    title: "Geerbt... und nun?",
    subtitle: "Der Leitfaden für Erben einer Immobilie",
    description:
      "Was tun, wenn Sie eine Immobilie erben? Von der Erbschaftsteuer über die Erbengemeinschaft bis zur Entscheidung: Halten, vermieten oder verkaufen? Alle Optionen verständlich erklärt.",
    coverImage: "/images/immobilie-geerbt.jpg",
    pages: 18,
    category: "Recht & Steuern",
    downloadUrl: "/ratgeber-downloads/immobilie-geerbt.pdf",
    tags: ["Erbimmobilie", "Erbschaftsteuer", "Erbengemeinschaft", "Nachlass"],
    seo: {
      metaTitle: "Immobilie geerbt – Was tun? Ratgeber für Erben",
      metaDescription:
        "Immobilie geerbt? Erbschaftsteuer, Erbengemeinschaft, verkaufen oder behalten – alle Optionen im Überblick. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Immobilie geerbt",
        "Erbimmobilie verkaufen",
        "Erbschaftsteuer Immobilie",
        "Erbengemeinschaft Haus",
        "geerbtes Haus",
        "Erbe Immobilie Optionen",
      ],
    },
    sections: [
      {
        heading: "Die ersten Schritte nach dem Erbe",
        text: "Wer eine Immobilie erbt, steht vor vielen Fragen. Unser Ratgeber führt Sie durch die wichtigsten Schritte: vom Erbschein über die Grundbuchumschreibung bis zur Bestandsaufnahme der Immobilie. Wir erklären, welche Fristen Sie beachten müssen und welche Unterlagen Sie benötigen.",
      },
      {
        heading: "Erbschaftsteuer verstehen und optimieren",
        text: "Je nach Verwandtschaftsgrad und Immobilienwert kann Erbschaftsteuer anfallen. Wir zeigen Ihnen die geltenden Freibeträge, Bewertungsmethoden und legale Möglichkeiten zur Steueroptimierung – etwa die Selbstnutzungsregelung für Ehepartner und Kinder.",
      },
      {
        heading: "Erbengemeinschaft: Rechte und Pflichten",
        text: "Wenn mehrere Erben beteiligt sind, wird es komplex. Unser Ratgeber erklärt die Rechte und Pflichten innerhalb einer Erbengemeinschaft und zeigt Wege auf, Konflikte zu vermeiden – von der einvernehmlichen Teilung bis zur Teilungsversteigerung.",
      },
      {
        heading: "Behalten, vermieten oder verkaufen?",
        text: "Die wichtigste Entscheidung: Was machen Sie mit der geerbten Immobilie? Wir vergleichen alle Optionen mit ihren Vor- und Nachteilen und helfen Ihnen, die für Ihre Situation beste Lösung zu finden.",
      },
    ],
    faq: [
      {
        question: "Muss ich Erbschaftsteuer auf eine geerbte Immobilie zahlen?",
        answer:
          "Das hängt vom Verwandtschaftsgrad und dem Wert der Immobilie ab. Ehepartner haben einen Freibetrag von 500.000 €, Kinder von 400.000 €. Zudem gibt es eine Steuerbefreiung bei Selbstnutzung (bis 200 m² Wohnfläche).",
      },
      {
        question: "Kann ich eine geerbte Immobilie sofort verkaufen?",
        answer:
          "Ja, grundsätzlich schon. Beachten Sie aber die Spekulationsfrist: War die Immobilie weniger als 10 Jahre im Besitz des Erblassers und nicht selbst genutzt, kann Spekulationssteuer anfallen. Die Besitzdauer des Erblassers wird angerechnet.",
      },
      {
        question: "Was passiert bei einer Erbengemeinschaft?",
        answer:
          "Alle Erben verwalten die Immobilie gemeinsam. Entscheidungen müssen mehrheitlich oder einstimmig getroffen werden. Jeder Erbe kann die Auflösung der Gemeinschaft verlangen – im Notfall durch eine Teilungsversteigerung.",
      },
      {
        question: "Welche Kosten kommen auf mich als Erbe zu?",
        answer:
          "Neben der möglichen Erbschaftsteuer fallen Kosten für den Erbschein (0,5 % des Nachlasswerts), die Grundbuchumschreibung und ggf. Instandhaltungsmaßnahmen an. Bei einem Verkauf kommen Maklerprovision und Notarkosten hinzu.",
      },
    ],
  },
  {
    id: "immobilie-in-der-scheidung",
    slug: "immobilie-in-der-scheidung",
    title: "Immobilie in der Scheidung",
    subtitle: "Faire Lösungen für beide Seiten",
    description:
      "Eine Scheidung ist emotional belastend – die gemeinsame Immobilie macht es oft noch komplizierter. Unser Ratgeber zeigt alle Optionen: Verkauf, Auszahlung, Teilung oder Realteilung.",
    coverImage: "/images/immobilie-in-der-scheidung.jpg",
    pages: 16,
    category: "Recht & Steuern",
    downloadUrl: "/ratgeber-downloads/immobilie-scheidung.pdf",
    tags: ["Scheidung", "Zugewinnausgleich", "Immobilienteilung", "Trennung"],
    seo: {
      metaTitle: "Immobilie bei Scheidung – Alle Optionen im Überblick",
      metaDescription:
        "Scheidung und Immobilie: Verkaufen, auszahlen oder behalten? Zugewinnausgleich, Rechte & faire Lösungen. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Immobilie Scheidung",
        "Haus bei Trennung",
        "Zugewinnausgleich Immobilie",
        "Scheidungsimmobilie verkaufen",
        "gemeinsames Haus Scheidung",
      ],
    },
    sections: [
      {
        heading: "Die gemeinsame Immobilie bei Trennung",
        text: "Bei einer Scheidung ist die gemeinsame Immobilie oft der größte Vermögenswert. Wer darf bleiben? Wer zahlt den Kredit weiter? Unser Ratgeber klärt die rechtlichen Grundlagen und zeigt, welche Regelungen während der Trennungszeit gelten.",
      },
      {
        heading: "Ihre Optionen im Überblick",
        text: "Verkauf und Erlösteilung, Übernahme durch einen Partner mit Auszahlung, Realteilung oder Vermietung – jede Option hat Vor- und Nachteile. Wir erklären alle Möglichkeiten mit konkreten Rechenbeispielen.",
      },
      {
        heading: "Zugewinnausgleich und Immobilie",
        text: "Wie wird der Wert der Immobilie im Zugewinnausgleich berücksichtigt? Wir erklären die Berechnung, den Unterschied zwischen Anfangs- und Endvermögen und wann eine Immobilienbewertung durch einen Sachverständigen sinnvoll ist.",
      },
      {
        heading: "Tipps für eine einvernehmliche Lösung",
        text: "Eine außergerichtliche Einigung spart Zeit, Geld und Nerven. Unser Ratgeber gibt Ihnen praktische Tipps, wie Sie trotz der emotionalen Situation eine sachliche und faire Lösung finden können.",
      },
    ],
    faq: [
      {
        question: "Muss die Immobilie bei einer Scheidung verkauft werden?",
        answer:
          "Nein, ein Verkauf ist nicht zwingend. Alternativen sind die Übernahme durch einen Partner, die Vermietung oder die Realteilung. Nur wenn keine Einigung erzielt wird, kann als letztes Mittel eine Teilungsversteigerung beantragt werden.",
      },
      {
        question: "Wer darf in der gemeinsamen Immobilie wohnen bleiben?",
        answer:
          "Während der Trennungszeit kann das Familiengericht einem Partner das alleinige Nutzungsrecht zuweisen – besonders wenn Kinder im Haushalt leben. Nach der Scheidung hängt es von der Eigentumslage und den getroffenen Vereinbarungen ab.",
      },
      {
        question: "Wie wird der Immobilienwert bei Scheidung ermittelt?",
        answer:
          "Der Verkehrswert wird in der Regel durch ein unabhängiges Gutachten ermittelt. Bei einvernehmlichen Lösungen kann auch eine Maklerbewertung ausreichen. Entscheidend ist der Wert zum Stichtag des Scheidungsantrags.",
      },
      {
        question: "Was passiert mit dem gemeinsamen Kredit?",
        answer:
          "Beide Partner haften weiterhin gegenüber der Bank (Gesamtschuldner). Bei Übernahme durch einen Partner muss dieser den anderen aus dem Kredit entlassen lassen – was die Zustimmung der Bank erfordert.",
      },
    ],
  },
  {
    id: "immobilienwelt-erklaert",
    slug: "immobilienwelt-erklaert",
    title: "Immobilienwelt erklärt",
    subtitle: "Fakten und Begriffe verständlich aufbereitet",
    description:
      "Von A wie Auflassung bis Z wie Zwangsversteigerung: Unser Immobilien-Lexikon erklärt die wichtigsten Begriffe, Prozesse und Zusammenhänge der Immobilienwelt – leicht verständlich und praxisnah.",
    coverImage: "/images/immobilien-fakten-und-begriffe.jpg",
    pages: 28,
    category: "Wissen",
    downloadUrl: "/ratgeber-downloads/immobilienwelt-erklaert.pdf",
    tags: ["Immobilien-Lexikon", "Fachbegriffe", "Grundlagen", "Einsteiger"],
    seo: {
      metaTitle: "Immobilienwelt erklärt – Fachbegriffe & Grundlagen",
      metaDescription:
        "Immobilien-Fachbegriffe einfach erklärt: Von Auflassung bis Zwangsversteigerung. Das Immobilien-Lexikon für Einsteiger. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Immobilien Fachbegriffe",
        "Immobilien Lexikon",
        "Immobilienwelt erklärt",
        "Grundbuch erklärt",
        "Immobilien Grundlagen",
        "Notarvertrag erklärt",
      ],
    },
    sections: [
      {
        heading: "Warum Immobilienwissen wichtig ist",
        text: "Ob Kauf, Verkauf oder Vermietung – wer die Sprache der Immobilienwelt versteht, trifft bessere Entscheidungen. Unser Ratgeber vermittelt Ihnen das nötige Grundwissen, damit Sie bei Gesprächen mit Maklern, Banken und Notaren auf Augenhöhe agieren.",
      },
      {
        heading: "Kauf- und Verkaufsprozess verstehen",
        text: "Vom ersten Kontakt bis zur Schlüsselübergabe: Wir erklären den typischen Ablauf eines Immobiliengeschäfts mit allen Stationen – Besichtigung, Finanzierungszusage, Notartermin, Grundbucheintrag und Übergabe.",
      },
      {
        heading: "Wichtige Fachbegriffe einfach erklärt",
        text: "Was bedeutet Auflassung? Was ist eine Grundschuld? Wofür steht der Bodenrichtwert? Unser Glossar erklärt über 50 der wichtigsten Immobilienbegriffe in verständlicher Sprache – mit Praxisbeispielen.",
      },
      {
        heading: "Rechte, Pflichten und Verträge",
        text: "Von der Teilungserklärung über den Mietvertrag bis zur Grunddienstbarkeit: Wir erklären die rechtlichen Grundlagen, die jeder Immobilieneigentümer und -käufer kennen sollte.",
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Grundbuch und Kataster?",
        answer:
          "Das Grundbuch dokumentiert die Eigentumsverhältnisse und Belastungen eines Grundstücks (geführt vom Amtsgericht). Das Kataster ist das amtliche Verzeichnis der Flurstücke mit Lage und Größe (geführt vom Vermessungsamt).",
      },
      {
        question: "Was bedeutet Auflassung bei Immobilien?",
        answer:
          "Die Auflassung ist die notariell beurkundete Einigung zwischen Verkäufer und Käufer über den Eigentumsübergang einer Immobilie. Sie ist Voraussetzung für die Umschreibung im Grundbuch.",
      },
      {
        question: "Was ist eine Grundschuld?",
        answer:
          "Eine Grundschuld ist ein Sicherungsrecht an einer Immobilie, das meist zur Absicherung eines Bankdarlehens dient. Anders als die Hypothek bleibt sie auch nach Rückzahlung des Darlehens bestehen und kann für neue Kredite genutzt werden.",
      },
      {
        question: "Was ist der Bodenrichtwert?",
        answer:
          "Der Bodenrichtwert ist der durchschnittliche Lagewert eines Quadratmeters Boden in einem bestimmten Gebiet. Er wird von Gutachterausschüssen ermittelt und dient als Orientierung für die Grundstücksbewertung.",
      },
    ],
  },
  {
    id: "immobilie-finanzieren",
    slug: "immobilie-finanzieren",
    title: "Immobilie finanzieren",
    subtitle: "Der Weg zur optimalen Baufinanzierung",
    description:
      "Eigenkapital, Zinsbindung, Tilgungsrate – die Immobilienfinanzierung ist komplex. Unser Ratgeber erklärt alle Bausteine verständlich und zeigt, wie Sie die beste Finanzierung für Ihre Immobilie finden.",
    coverImage: "/images/immobilienfinanzierung.jpg",
    pages: 24,
    category: "Finanzierung",
    downloadUrl: "/ratgeber-downloads/immobilienfinanzierung.pdf",
    tags: ["Baufinanzierung", "Eigenkapital", "Zinsbindung", "Tilgung"],
    seo: {
      metaTitle: "Immobilie finanzieren – Ratgeber Baufinanzierung",
      metaDescription:
        "Immobilienfinanzierung leicht gemacht: Eigenkapital, Zinsbindung, Tilgung und Fördermittel. Kostenloser Finanzierungsratgeber von homefin.",
      keywords: [
        "Immobilie finanzieren",
        "Baufinanzierung Ratgeber",
        "Eigenkapital Immobilie",
        "Zinsbindung",
        "Tilgungsrate berechnen",
        "KfW Förderung Hauskauf",
      ],
    },
    sections: [
      {
        heading: "Grundlagen der Immobilienfinanzierung",
        text: "Wie viel Immobilie kann ich mir leisten? Wir erklären die wichtigsten Kennzahlen: Eigenkapitalquote, monatliche Belastung, Beleihungsauslauf und Gesamtkosten. Mit unserer Faustregel können Sie schnell Ihre finanzielle Leistungsfähigkeit einschätzen.",
      },
      {
        heading: "Die richtige Finanzierungsstrategie",
        text: "Annuitätendarlehen, Volltilger oder KfW-Kombination? Wir vergleichen die gängigen Finanzierungsmodelle und zeigen, welches Modell zu welcher Lebenssituation passt. Inklusive Rechenbeispielen und Zinsvergleichen.",
      },
      {
        heading: "Eigenkapital optimal einsetzen",
        text: "Wie viel Eigenkapital ist nötig? Ist eine 100 %-Finanzierung sinnvoll? Wir erklären die Zusammenhänge zwischen Eigenkapital, Zinssatz und monatlicher Rate – und warum mehr Eigenkapital nicht immer die beste Lösung ist.",
      },
      {
        heading: "Fördermittel und Zuschüsse nutzen",
        text: "Von KfW-Programmen über Wohn-Riester bis zu regionalen Fördertöpfen: Wir zeigen Ihnen alle Möglichkeiten, wie Sie Ihre Finanzierung mit staatlichen Mitteln optimieren können.",
      },
    ],
    faq: [
      {
        question: "Wie viel Eigenkapital brauche ich für einen Immobilienkauf?",
        answer:
          "Als Faustregel gelten mindestens 20–30 % des Kaufpreises als Eigenkapital, davon etwa 10–15 % für Kaufnebenkosten. Je mehr Eigenkapital Sie einbringen, desto bessere Zinskonditionen erhalten Sie von der Bank.",
      },
      {
        question: "Was ist besser: lange oder kurze Zinsbindung?",
        answer:
          "Bei niedrigen Zinsen empfiehlt sich eine lange Zinsbindung (15–20 Jahre) zur Planungssicherheit. Bei hohen Zinsen kann eine kürzere Bindung (5–10 Jahre) mit der Hoffnung auf sinkende Zinsen sinnvoll sein – birgt aber ein Risiko.",
      },
      {
        question: "Welche Nebenkosten fallen beim Immobilienkauf an?",
        answer:
          "In NRW rechnen Sie mit ca. 10–12 % Kaufnebenkosten: Grunderwerbsteuer (6,5 %), Notar- und Grundbuchkosten (ca. 2 %) und ggf. Maklerprovision (3,57 % inkl. MwSt.).",
      },
      {
        question: "Kann ich eine Immobilie ohne Eigenkapital finanzieren?",
        answer:
          "Eine 100 %-Finanzierung ist möglich, aber mit höheren Zinsen und strengeren Bonitätsanforderungen verbunden. Die Kaufnebenkosten müssen in der Regel trotzdem aus Eigenmitteln bezahlt werden.",
      },
    ],
  },
  {
    id: "leibrente",
    slug: "leibrente-eigenheim",
    title: "Die Leibrente des Eigenheims.",
    subtitle: "Im eigenen Haus wohnen bleiben und trotzdem Kapital freisetzen",
    description:
      "Die Leibrente ermöglicht es Eigentümern im Alter, in ihrer Immobilie wohnen zu bleiben und gleichzeitig Kapital freizusetzen. Erfahren Sie, wie das Modell funktioniert und für wen es sich eignet.",
    coverImage: "/images/leibrente.jpg",
    pages: 16,
    category: "Finanzierung",
    downloadUrl: "/ratgeber-downloads/leibrente.pdf",
    tags: ["Leibrente", "Immobilienverrentung", "Wohnrecht", "Altersvorsorge"],
    seo: {
      metaTitle: "Leibrente Immobilie – Wohnen bleiben & Kapital freisetzen",
      metaDescription:
        "Leibrente: Immobilie verkaufen und wohnen bleiben. Modelle, Berechnung und Vor-/Nachteile im Überblick. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Leibrente Immobilie",
        "Immobilienverrentung",
        "Haus verkaufen wohnen bleiben",
        "Wohnrecht auf Lebenszeit",
        "Nießbrauch Immobilie",
        "Altersvorsorge Immobilie",
      ],
    },
    sections: [
      {
        heading: "Was ist eine Immobilien-Leibrente?",
        text: "Bei der Leibrente verkaufen Sie Ihre Immobilie, behalten aber ein lebenslanges Wohnrecht. Im Gegenzug erhalten Sie eine monatliche Rente oder eine Einmalzahlung. So können Sie in Ihrem Zuhause wohnen bleiben und gleichzeitig Ihr Vermögen nutzen.",
      },
      {
        heading: "Leibrente vs. Nießbrauch vs. Rückmietverkauf",
        text: "Es gibt verschiedene Modelle der Immobilienverrentung. Wir erklären die Unterschiede zwischen Leibrente, Nießbrauch und Rückmietverkauf – mit ihren jeweiligen Vor- und Nachteilen, steuerlichen Aspekten und typischen Vertragsgestaltungen.",
      },
      {
        heading: "Berechnung und Bewertung",
        text: "Wie wird die Höhe der Leibrente berechnet? Welche Faktoren spielen eine Rolle? Wir erklären die Bewertungsmethoden, den Einfluss von Alter, Immobilienwert und Wohnrecht auf die Rentenhöhe.",
      },
      {
        heading: "Für wen eignet sich die Leibrente?",
        text: "Die Leibrente ist nicht für jeden die richtige Lösung. Wir zeigen Ihnen, in welchen Situationen das Modell besonders sinnvoll ist und wann Sie besser andere Alternativen in Betracht ziehen sollten.",
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Leibrente und Nießbrauch?",
        answer:
          "Bei der Leibrente erhalten Sie eine lebenslange Rente plus Wohnrecht. Beim Nießbrauch behalten Sie das Recht, die Immobilie selbst zu nutzen oder zu vermieten, erhalten aber keine regelmäßige Zahlung – dafür meist einen höheren Einmalbetrag.",
      },
      {
        question: "Ab welchem Alter lohnt sich eine Leibrente?",
        answer:
          "Die Leibrente wird typischerweise ab 65–70 Jahren interessant. Je älter Sie sind, desto höher fällt die monatliche Rente aus, da die statistische Restlebenszeit kürzer ist.",
      },
      {
        question: "Muss ich Steuern auf die Leibrente zahlen?",
        answer:
          "Ja, der Ertragsanteil der Leibrente ist einkommensteuerpflichtig. Der steuerpflichtige Anteil hängt vom Alter bei Beginn der Rente ab und sinkt mit zunehmendem Alter. Bei Verkauf kann zudem Spekulationssteuer anfallen.",
      },
      {
        question: "Was passiert mit dem Wohnrecht, wenn ich ins Pflegeheim muss?",
        answer:
          "Das hängt von der vertraglichen Gestaltung ab. Oft kann das Wohnrecht in einen Geldbetrag umgewandelt werden. Es ist wichtig, diese Situation im Vertrag klar zu regeln.",
      },
    ],
  },
  {
    id: "privater-immobilienverkauf",
    slug: "privater-immobilienverkauf",
    title: "Privater Immobilienverkauf",
    subtitle: "Ohne Makler verkaufen – worauf Sie achten müssen",
    description:
      "Sie möchten Ihre Immobilie privat verkaufen? Unser Ratgeber erklärt den gesamten Prozess: von der Wertermittlung über die Vermarktung bis zum Notartermin – mit allen Chancen und Risiken.",
    coverImage: "/images/privater-immobilienverkauf.jpg",
    pages: 20,
    category: "Verkauf",
    downloadUrl: "/ratgeber-downloads/privater-immobilienverkauf.pdf",
    tags: ["Privatverkauf", "Ohne Makler", "Immobilie verkaufen", "Verhandlung"],
    seo: {
      metaTitle: "Immobilie privat verkaufen – Ratgeber ohne Makler",
      metaDescription:
        "Immobilie ohne Makler verkaufen: Schritt-für-Schritt-Anleitung, Risiken und Tipps. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Immobilie privat verkaufen",
        "Haus verkaufen ohne Makler",
        "Privatverkauf Immobilie",
        "Immobilie selbst verkaufen",
        "Verkauf ohne Makler Tipps",
      ],
    },
    sections: [
      {
        heading: "Privat verkaufen – ist das sinnvoll?",
        text: "Der Verkauf ohne Makler spart Provision, bedeutet aber auch mehr Aufwand und Risiko. Wir zeigen Ihnen ehrlich die Vor- und Nachteile und helfen Ihnen einzuschätzen, ob ein Privatverkauf in Ihrer Situation sinnvoll ist.",
      },
      {
        heading: "Den richtigen Preis finden",
        text: "Der häufigste Fehler beim Privatverkauf: ein falscher Angebotspreis. Zu hoch schreckt Käufer ab, zu niedrig kostet Sie bares Geld. Wir erklären, wie Sie den Marktwert Ihrer Immobilie realistisch ermitteln können.",
      },
      {
        heading: "Vermarktung und Besichtigungen",
        text: "Professionelle Fotos, aussagekräftiges Exposé und die richtigen Portale: Wir zeigen Ihnen, wie Sie Ihre Immobilie optimal präsentieren. Plus: Tipps für erfolgreiche Besichtigungen und den Umgang mit Kaufinteressenten.",
      },
      {
        heading: "Vom Kaufangebot zum Notartermin",
        text: "Preisverhandlung, Bonitätsprüfung, Kaufvertragsentwurf, Notartermin und Übergabe – wir führen Sie durch die letzten Schritte des Verkaufsprozesses und erklären, welche Fallstricke Sie vermeiden sollten.",
      },
    ],
    faq: [
      {
        question: "Kann ich meine Immobilie ohne Makler verkaufen?",
        answer:
          "Ja, selbstverständlich. Es gibt keine Pflicht, einen Makler einzuschalten. Allerdings sollten Sie den zeitlichen Aufwand, die rechtlichen Risiken und die fehlende Marktkenntnis realistisch einschätzen.",
      },
      {
        question: "Wie finde ich den richtigen Preis ohne Makler?",
        answer:
          "Nutzen Sie Vergleichsportale, Bodenrichtwerte und ggf. ein kostenpflichtiges Kurzgutachten. Eine kostenlose Erstbewertung bieten auch viele Makler an – ohne Verpflichtung zur Beauftragung.",
      },
      {
        question: "Welche Unterlagen brauche ich für den Verkauf?",
        answer:
          "Grundbuchauszug, Energieausweis, Wohnflächenberechnung, Grundrisse, Baupläne, Nebenkostenabrechnung und bei Eigentumswohnungen: Teilungserklärung, Protokolle der Eigentümerversammlungen und Wirtschaftsplan.",
      },
      {
        question: "Was sind die größten Risiken beim Privatverkauf?",
        answer:
          "Die häufigsten Fehler: falsche Preisvorstellung, rechtliche Fehler im Kaufvertrag, fehlende Bonitätsprüfung des Käufers und mangelnde Dokumentation. Ein zu niedriger Preis kostet schnell mehr als die gesparte Provision.",
      },
    ],
  },
  {
    id: "richtiger-immobilienpreis",
    slug: "der-richtige-immobilienpreis",
    title: "Der richtige Immobilienpreis",
    subtitle: "So ermitteln Sie den optimalen Verkaufspreis",
    description:
      "Der Angebotspreis entscheidet über den Verkaufserfolg. Unser Ratgeber erklärt die drei anerkannten Bewertungsverfahren und zeigt, wie Sie den marktgerechten Preis für Ihre Immobilie finden.",
    coverImage: "/images/richtiger-immobilienpreis.jpg",
    pages: 18,
    category: "Bewertung",
    downloadUrl: "/ratgeber-downloads/richtiger-immobilienpreis.pdf",
    tags: ["Immobilienbewertung", "Verkaufspreis", "Marktwert", "Wertermittlung"],
    seo: {
      metaTitle: "Der richtige Immobilienpreis – Bewertung & Wertermittlung",
      metaDescription:
        "Immobilienpreis richtig ermitteln: Vergleichswert, Sachwert, Ertragswert – alle Verfahren erklärt. Kostenloser Bewertungsratgeber von homefin.",
      keywords: [
        "Immobilienpreis ermitteln",
        "Immobilienbewertung",
        "Verkehrswert berechnen",
        "Haus bewerten",
        "Wertermittlung Immobilie",
        "Marktwert Immobilie",
      ],
    },
    sections: [
      {
        heading: "Warum der richtige Preis entscheidend ist",
        text: "Ein zu hoher Preis führt zu langen Standzeiten und Preisreduktionen. Ein zu niedriger Preis kostet Sie bares Geld. Studien zeigen: Immobilien mit marktgerechtem Erstpreis erzielen im Durchschnitt höhere Endpreise als solche, die nachträglich reduziert werden.",
      },
      {
        heading: "Die drei Bewertungsverfahren",
        text: "Vergleichswertverfahren, Sachwertverfahren und Ertragswertverfahren – jedes hat seine Stärken. Wir erklären, wann welches Verfahren angewendet wird und wie die Berechnung funktioniert. Mit Praxisbeispielen für jedes Verfahren.",
      },
      {
        heading: "Werttreiber und Wertminderer",
        text: "Lage, Zustand, Ausstattung, Energieeffizienz, Grundriss – über 20 Faktoren beeinflussen den Wert einer Immobilie. Wir erklären die wichtigsten Stellschrauben und zeigen, welche Faktoren den größten Einfluss haben.",
      },
      {
        heading: "Professionelle vs. eigene Bewertung",
        text: "Wann reicht eine eigene Einschätzung und wann brauchen Sie ein Sachverständigengutachten? Wir vergleichen die verschiedenen Bewertungsoptionen: Online-Rechner, Makler-Bewertung, Kurzgutachten und Vollgutachten.",
      },
    ],
    faq: [
      {
        question: "Wie ermittle ich den Wert meiner Immobilie?",
        answer:
          "Für eine erste Orientierung nutzen Sie Online-Bewertungsrechner und Vergleichspreise aus Portalen. Für eine fundierte Bewertung empfiehlt sich eine professionelle Marktwertanalyse durch einen Makler oder Sachverständigen.",
      },
      {
        question: "Was ist der Unterschied zwischen Verkehrswert und Angebotspreis?",
        answer:
          "Der Verkehrswert (Marktwert) ist der objektiv ermittelte Wert einer Immobilie. Der Angebotspreis ist der Preis, zu dem Sie die Immobilie anbieten. Je nach Marktlage und Verhandlungsstrategie kann der Angebotspreis über oder unter dem Verkehrswert liegen.",
      },
      {
        question: "Was kostet ein Immobiliengutachten?",
        answer:
          "Ein Kurzgutachten kostet ca. 500–1.500 €, ein Vollgutachten (Verkehrswertgutachten) ca. 1.500–3.000 €. Viele Makler bieten eine kostenlose Erstbewertung an, die für einen Verkauf in der Regel ausreicht.",
      },
      {
        question: "Welche Faktoren beeinflussen den Immobilienwert am meisten?",
        answer:
          "Die drei wichtigsten Faktoren sind: 1. Lage (Mikro- und Makrolage), 2. Zustand und Ausstattung der Immobilie, 3. Aktuelle Marktlage (Angebot und Nachfrage). Auch Energieeffizienz und Grundriss spielen eine zunehmende Rolle.",
      },
    ],
  },
  {
    id: "immobilie-sanieren",
    slug: "immobilie-sanieren",
    title: "Eine Immobilie sanieren",
    subtitle: "Planung, Kosten und Umsetzung",
    description:
      "Sanierung richtig planen: Von der Bestandsaufnahme über die Kostenplanung bis zur Umsetzung. Unser Ratgeber zeigt, welche Sanierungsmaßnahmen sich lohnen und wie Sie Kosten im Griff behalten.",
    coverImage: "/images/sanierung-einer-immobilie.jpg",
    pages: 20,
    category: "Sanierung",
    downloadUrl: "/ratgeber-downloads/immobilie-sanieren.pdf",
    tags: ["Sanierung", "Renovierung", "Modernisierung", "Kosten"],
    seo: {
      metaTitle: "Immobilie sanieren – Planung, Kosten & Tipps",
      metaDescription:
        "Immobilie sanieren: Kosten, Reihenfolge und Förderung. Alles zur Sanierungsplanung für Eigentümer. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Immobilie sanieren",
        "Haus sanieren Kosten",
        "Sanierung planen",
        "Renovierung Immobilie",
        "Altbausanierung",
        "Modernisierung Haus",
      ],
    },
    sections: [
      {
        heading: "Sanierung, Renovierung oder Modernisierung?",
        text: "Die Begriffe werden oft verwechselt, meinen aber unterschiedliche Dinge. Wir erklären die Unterschiede und helfen Ihnen einzuschätzen, welche Maßnahmen bei Ihrer Immobilie notwendig sind – von der kosmetischen Renovierung bis zur Kernsanierung.",
      },
      {
        heading: "Bestandsaufnahme und Planung",
        text: "Vor jeder Sanierung steht die gründliche Analyse des Ist-Zustands. Wir zeigen Ihnen, wie Sie systematisch vorgehen: Bausubstanz prüfen, Schadstoffe erkennen, Prioritäten setzen und einen realistischen Sanierungsfahrplan erstellen.",
      },
      {
        heading: "Kosten realistisch kalkulieren",
        text: "Was kostet eine Badsanierung? Was eine neue Elektrik? Wir geben Ihnen Richtwerte für die häufigsten Sanierungsmaßnahmen und zeigen, wie Sie einen Puffer für Unvorhergesehenes einplanen.",
      },
      {
        heading: "Die richtigen Handwerker finden",
        text: "Gute Handwerker sind rar. Wir geben Ihnen Tipps zur Handwerkersuche, zur Angebotsvergleich und zur Vertragsgestaltung. Plus: Worauf Sie bei der Baubegleitung achten sollten.",
      },
    ],
    faq: [
      {
        question: "Was kostet eine Komplettsanierung?",
        answer:
          "Eine Komplettsanierung kostet je nach Umfang zwischen 500 und 1.500 €/m². Ein Einfamilienhaus mit 150 m² kann also zwischen 75.000 und 225.000 € kosten. Einzelmaßnahmen wie Badsanierung (15.000–30.000 €) oder Dachsanierung (20.000–50.000 €) sind günstiger.",
      },
      {
        question: "In welcher Reihenfolge sollte saniert werden?",
        answer:
          "Die empfohlene Reihenfolge: 1. Dach und Fassade (Schutz vor Witterung), 2. Fenster und Türen, 3. Sanitär und Elektrik, 4. Innenausbau (Böden, Wände, Decken), 5. Außenanlagen. So vermeiden Sie Folgeschäden.",
      },
      {
        question: "Lohnt sich eine Sanierung vor dem Verkauf?",
        answer:
          "Das hängt von der Immobilie und dem Markt ab. Kleinere Maßnahmen (Streichen, Böden, Bad auffrischen) haben oft einen hohen Return on Investment. Große Sanierungen lohnen sich vor dem Verkauf meist nur, wenn die Immobilie sonst schwer verkäuflich wäre.",
      },
      {
        question: "Brauche ich eine Baugenehmigung für die Sanierung?",
        answer:
          "Für reine Instandhaltung und Renovierung in der Regel nicht. Genehmigungspflichtig sind: Änderungen an der Statik, Nutzungsänderungen, Dachausbauten, Anbauten und wesentliche Veränderungen der Fassade. Fragen Sie im Zweifel beim Bauamt nach.",
      },
    ],
  },
  {
    id: "wohnen-im-alter",
    slug: "wohnen-im-alter",
    title: "Wohnen im Alter",
    subtitle: "Rechtzeitig planen – die besten Optionen für Ihre Zukunft",
    description:
      "Barrierefreier Umbau, Wohnrecht, Verrentung oder Verkauf? Unser Ratgeber zeigt Ihnen alle Optionen für das Wohnen im Alter und hilft Ihnen, rechtzeitig die richtige Entscheidung zu treffen.",
    coverImage: "/images/wohnen-im-alter.jpg",
    pages: 18,
    category: "Wissen",
    downloadUrl: "/ratgeber-downloads/wohnen-im-alter.pdf",
    tags: ["Wohnen im Alter", "Barrierefreiheit", "Altersgerecht", "Seniorenwohnung"],
    seo: {
      metaTitle: "Wohnen im Alter – Optionen für Immobilieneigentümer",
      metaDescription:
        "Wohnen im Alter: Barrierefreier Umbau, Verrentung oder Verkauf? Alle Optionen für Senioren im Überblick. Kostenloser Ratgeber von homefin.",
      keywords: [
        "Wohnen im Alter",
        "barrierefreies Wohnen",
        "altersgerechter Umbau",
        "Immobilie im Alter",
        "Seniorenwohnung",
        "Immobilie verkaufen Alter",
      ],
    },
    sections: [
      {
        heading: "Rechtzeitig planen statt reagieren",
        text: "Die Wohnsituation im Alter sollte man nicht dem Zufall überlassen. Wir zeigen, warum es sinnvoll ist, sich frühzeitig – idealerweise ab 55 – mit dem Thema auseinanderzusetzen und welche Fragen Sie sich stellen sollten.",
      },
      {
        heading: "Altersgerechter Umbau",
        text: "Schwellenfreie Zugänge, bodengleiche Duschen, Treppenlifte – viele Maßnahmen ermöglichen es, länger im eigenen Haus zu wohnen. Wir erklären, welche Umbauten sinnvoll sind, was sie kosten und welche Zuschüsse es gibt (z. B. KfW-Programm 455-B).",
      },
      {
        heading: "Alternativen zum eigenen Haus",
        text: "Seniorenresidenz, betreutes Wohnen, Mehrgenerationenhaus oder Wohngemeinschaft – die Möglichkeiten sind vielfältig. Wir stellen die verschiedenen Wohnformen vor und vergleichen Kosten, Betreuungsangebote und Lebensqualität.",
      },
      {
        heading: "Immobilie verkaufen oder vererben?",
        text: "Soll die Immobilie verkauft, vererbt oder verrentet werden? Wir zeigen die steuerlichen und finanziellen Auswirkungen jeder Option und helfen Ihnen, die beste Lösung für Ihre Familie zu finden.",
      },
    ],
    faq: [
      {
        question: "Ab wann sollte ich über das Wohnen im Alter nachdenken?",
        answer:
          "Idealerweise ab 55–60 Jahren. So haben Sie genug Zeit, um in Ruhe zu planen, eventuelle Umbauten vorzunehmen und finanzielle Entscheidungen ohne Zeitdruck zu treffen.",
      },
      {
        question: "Was kostet ein barrierefreier Umbau?",
        answer:
          "Die Kosten variieren stark: Ein Treppenlift kostet 3.000–15.000 €, eine bodengleiche Dusche 3.000–8.000 €, schwellenfreie Türen 500–1.500 € pro Stück. Die KfW fördert altersgerechte Umbauten mit bis zu 6.250 € Zuschuss.",
      },
      {
        question: "Kann ich mein Haus verkaufen und trotzdem darin wohnen bleiben?",
        answer:
          "Ja, das ist über die Leibrente oder den Nießbrauch möglich. Sie verkaufen die Immobilie, behalten aber ein lebenslanges Wohnrecht und erhalten eine Rente oder einen Einmalbetrag.",
      },
      {
        question: "Was ist besser: Immobilie vererben oder zu Lebzeiten übertragen?",
        answer:
          "Eine Übertragung zu Lebzeiten kann steuerliche Vorteile haben, da Freibeträge alle 10 Jahre erneut genutzt werden können. Zudem vermeiden Sie mögliche Konflikte in der Erbengemeinschaft. Lassen Sie sich hierzu fachlich beraten.",
      },
    ],
  },
];
