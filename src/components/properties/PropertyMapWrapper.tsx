import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-card" />
  ),
});

interface PropertyMapWrapperProps {
  lat: number;
  lng: number;
  title: string;
  city: string;
  hideExactLocation?: boolean;
  className?: string;
}

export default function PropertyMapWrapper(props: PropertyMapWrapperProps) {
  return <PropertyMap {...props} />;
}
