import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-card" />
  ),
});

interface MapWrapperProps {
  className?: string;
}

export default function MapWrapper({ className }: MapWrapperProps) {
  return <LeafletMap className={className} />;
}
