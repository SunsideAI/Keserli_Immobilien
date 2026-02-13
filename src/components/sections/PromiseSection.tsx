import { Briefcase, BarChart3, Camera, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

const promises = [
  { icon: Briefcase, text: "Voller Maklerservice" },
  { icon: BarChart3, text: "Kostenlose Marktwertermittlung" },
  { icon: Camera, text: "Professionelle Vermarktung" },
  { icon: MapPin, text: "Persönlich vor Ort" },
];

export default function PromiseSection() {
  return (
    <section className="py-12 bg-primary">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.text}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-white">
                  {p.text}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
