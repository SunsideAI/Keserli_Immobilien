"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";
import { siteConfig } from "@/data/site-config";

const propertyTypes = ["Alle", "Haus", "Wohnung", "Grundstück", "Gewerbe"];

export default function PropertyFilters() {
  const [typeFilter, setTypeFilter] = useState("Alle");
  const [regionFilter, setRegionFilter] = useState("Alle");
  const [sortBy, setSortBy] = useState("newest");

  let filtered = properties;

  if (typeFilter !== "Alle") {
    filtered = filtered.filter((p) => p.type === typeFilter);
  }
  if (regionFilter !== "Alle") {
    filtered = filtered.filter((p) => p.address.region === regionFilter);
  }

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "area") {
    filtered = [...filtered].sort(
      (a, b) => b.features.livingArea - a.features.livingArea
    );
  } else {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-card shadow-card p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-dark mb-1">
              Immobilientyp
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-dark mb-1">
              Region
            </label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="Alle">Alle Regionen</option>
              {siteConfig.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-dark mb-1">
              Sortierung
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="newest">Neueste zuerst</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
              <option value="area">Fläche absteigend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-body mb-6">
        {filtered.length} {filtered.length === 1 ? "Immobilie" : "Immobilien"}{" "}
        gefunden
      </div>

      {/* Property Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-dark mb-2">
            Keine Immobilien gefunden
          </h3>
          <p className="text-slate-body">
            Versuchen Sie andere Filtereinstellungen oder kontaktieren Sie uns
            direkt.
          </p>
        </div>
      )}
    </div>
  );
}
