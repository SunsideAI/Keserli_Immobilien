import { siteConfig } from "@/data/site-config";

interface SchemaMarkupProps {
  additionalSchema?: Record<string, unknown>[];
}

export default function SchemaMarkup({ additionalSchema }: SchemaMarkupProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    areaServed: siteConfig.regions.map((region) => ({
      "@type": "City",
      name: region,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.googleRating,
      reviewCount: siteConfig.stats.googleReviews,
      bestRating: 5,
    },
    priceRange: "ab 1,95% Provision",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {additionalSchema?.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
