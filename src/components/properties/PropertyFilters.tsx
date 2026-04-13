"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import SuchprofilTile from "./SuchprofilTile";
import { siteConfig } from "@/data/site-config";
import { Property } from "@/types/property";

const propertyTypes = ["Alle", "Haus", "Wohnung", "Grundstück", "Gewerbe"];
const statusOptions = ["Alle", "Verfügbar", "In Vorbereitung", "Reserviert", "Verkauft"];

const ITEMS_PER_PAGE = 8;

/** Status priority: available first, sold last */
function statusPriority(status: Property["status"]): number {
  switch (status) {
    case "Verfügbar": return 0;
    case "In Vorbereitung": return 1;
    case "Reserviert": return 2;
    case "Verkauft": return 3;
    default: return 4;
  }
}

interface PropertyFiltersProps {
  properties: Property[];
}

export default function PropertyFilters({ properties }: PropertyFiltersProps) {
  const [typeFilter, setTypeFilter] = useState("Alle");
  const [regionFilter, setRegionFilter] = useState("Alle");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  let filtered = properties;

  if (typeFilter !== "Alle") {
    filtered = filtered.filter((p) => p.type === typeFilter);
  }
  if (regionFilter !== "Alle") {
    filtered = filtered.filter((p) => p.address.region === regionFilter);
  }
  if (statusFilter !== "Alle") {
    filtered = filtered.filter((p) => p.status === statusFilter);
  }

  // Always sort by status priority first, then by selected sort
  filtered = [...filtered].sort((a, b) => {
    const statusDiff = statusPriority(a.status) - statusPriority(b.status);
    if (statusDiff !== 0) return statusDiff;

    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "area") return b.features.livingArea - a.features.livingArea;
    // newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Reset page when filters change
  const handleFilterChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-card shadow-card p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-dark mb-1">
              Immobilientyp
            </label>
            <select
              value={typeFilter}
              onChange={handleFilterChange(setTypeFilter)}
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
              onChange={handleFilterChange(setRegionFilter)}
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
              Status
            </label>
            <select
              value={statusFilter}
              onChange={handleFilterChange(setStatusFilter)}
              className="w-full px-3 py-2 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === "Alle" ? "Alle Status" : s}
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
              onChange={handleFilterChange(setSortBy)}
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
        {totalItems} {totalItems === 1 ? "Immobilie" : "Immobilien"} gefunden
        {totalPages > 1 && (
          <span className="ml-2">
            – Seite {currentPage} von {totalPages}
          </span>
        )}
      </div>

      {/* Property Grid (8 cards + Suchprofil tile) */}
      {pageItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          <SuchprofilTile />
        </div>
      ) : (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-dark mb-2">
            Keine Immobilien gefunden
          </h3>
          <p className="text-slate-body mb-6">
            Versuchen Sie andere Filtereinstellungen oder erstellen Sie ein
            Suchprofil.
          </p>
          <SuchprofilTile />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="flex items-center gap-1 px-4 py-2 rounded-btn border border-gray-300 text-sm font-medium text-slate-dark hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            Zurück
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                p === currentPage
                  ? "w-10 h-10 rounded-btn text-sm font-bold bg-primary text-white"
                  : "w-10 h-10 rounded-btn text-sm font-medium text-slate-dark hover:bg-gray-100 transition-colors"
              }
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-btn border border-gray-300 text-sm font-medium text-slate-dark hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Weiter
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
