import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          <div className="text-8xl font-extrabold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl font-bold text-slate-dark mb-4">
            Seite nicht gefunden
          </h1>
          <p className="text-slate-body mb-8">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/">Zur Startseite</Button>
            <Button href="/kontakt" variant="secondary">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
