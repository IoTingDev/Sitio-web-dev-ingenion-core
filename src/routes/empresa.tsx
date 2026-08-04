import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/ioting-dev-logo.png.asset.json";
import { ClosingCta, Eyebrow, PageHero, SectionHeading } from "@/components/site-ui";

export const Route = createFileRoute("/empresa")({
  head: () => ({
    meta: [
      { title: "Empresa | Dev Ingenion SAS e IoTing Dev" },
      {
        name: "description",
        content:
          "Dev Ingenion SAS es una empresa colombiana de ingeniería y tecnología. IoTing Dev es su identidad tecnológica para soluciones conectadas y digitalización.",
      },
      { property: "og:title", content: "Empresa | Dev Ingenion SAS" },
      {
        property: "og:description",
        content: "Creemos que la tecnología adquiere valor cuando mejora procesos reales.",
      },
    ],
  }),
  component: Empresa,
});

function Empresa() {
  return (
    <>
      <PageHero
        eyebrow="Empresa"
        title="Creemos que la tecnología adquiere valor cuando mejora procesos reales"
        lead="Dev Ingenion SAS es una empresa colombiana de ingeniería y tecnología. Trabajamos en la intersección entre el mundo físico de los procesos y el mundo digital de la información."
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Por qué existimos"
            title="Muchas decisiones se toman con información incompleta"
            lead="No por falta de tecnología, sino porque nadie conectó el proceso con el sistema. Ese vacío es nuestro trabajo: hacer que lo que ocurre en la operación llegue completo y a tiempo a quien decide."
          />
          <div className="space-y-8 self-center border-l border-hairline pl-8">
            <p className="text-base leading-relaxed">
              Combinamos disciplinas que normalmente viven separadas: electrónica e instrumentación,
              sistemas embebidos y comunicaciones, desarrollo de software e integración en la nube.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Nuestra fortaleza no está en dominar cada una por separado, sino en integrarlas para
              resolver un problema concreto de una empresa concreta.
            </p>
          </div>
        </div>
      </section>

      {/* Marca */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-28">
          <div className="flex justify-center lg:justify-start">
            <img
              src={logo.url}
              alt="Logotipo IoTing Dev"
              loading="lazy"
              width={220}
              height={230}
              className="h-44 w-auto"
            />
          </div>
          <div>
            <Eyebrow>Una organización, una identidad tecnológica</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Dev Ingenion e IoTing Dev</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Dev Ingenion SAS es la estructura empresarial con la que contratamos, acompañamos y
              respondemos. IoTing Dev es la identidad tecnológica asociada a nuestras soluciones
              conectadas y a los desarrollos de digitalización.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Son dos caras del mismo equipo.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo entendemos la ingeniería */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Cómo entendemos la ingeniería" title="Cuatro criterios que aplicamos siempre" />
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["El proceso manda", "La solución se ajusta a la operación, no al revés."],
              ["Lo simple sostiene", "Una solución que la gente entiende es una solución que se usa."],
              ["Medir con criterio", "No todo dato merece ser capturado; sí el que cambia una decisión."],
              ["Construir para durar", "Diseñamos pensando en el siguiente año, no solo en la entrega."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-7">
                <h3 className="text-base font-semibold">{t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hacia dónde evolucionamos */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Hacia dónde vamos"
            title="Una empresa especializada, preparada para crecer con sus clientes"
            lead="Hoy nuestro foco está en monitoreo, integración y digitalización de procesos. La misma base de ingeniería nos permite avanzar hacia analítica avanzada, inteligencia aplicada al borde y nuevas integraciones empresariales, a medida que los proyectos lo justifiquen."
          />
        </div>
      </section>

      <ClosingCta
        title="¿Conversamos sobre su operación?"
        lead="Cuéntenos qué proceso quiere mejorar y revisamos juntos si tiene sentido intervenirlo."
      />
    </>
  );
}
