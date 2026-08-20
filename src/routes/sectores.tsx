import { createFileRoute } from "@tanstack/react-router";
import weighingImg from "@/assets/case-weighing.jpg";
import environmentImg from "@/assets/agro3.jpg";
import { ClosingCta, CtaLink, Eyebrow, PageHero, SectionHeading } from "@/components/site-ui";

export const Route = createFileRoute("/sectores")({
  head: () => ({
    meta: [
      { title: "Sectores | Agroindustria, comercio y retail — Dev Ingenion" },
      {
        name: "description",
        content:
          "Soluciones de ingeniería digital aplicadas a contextos operacionales de agroindustria, comercio y retail, con capacidad de adaptación a otros procesos.",
      },
      { property: "og:title", content: "Sectores donde trabajamos | Dev Ingenion" },
      {
        property: "og:description",
        content:
          "Agroindustria, comercio y retail: soluciones aplicadas a contextos operacionales concretos.",
      },
    ],
  }),
  component: Sectores,
});

function Sectores() {
  return (
    <>
      <PageHero
        eyebrow="Sectores"
        title="Soluciones aplicadas a distintos contextos operacionales"
        lead="Cada sector tiene su propio ritmo, sus propias mediciones y sus propias restricciones. El punto de partida siempre es el proceso."
      />

      {/* Agroindustria — mayor profundidad */}
      <section id="agroindustria" className="scroll-mt-24 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Sector prioritario</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Agroindustria</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Procesos que ocurren en campo y en planta, con mediciones que definen pagos, calidad y
                planeación. Aquí la captura confiable del dato tiene efecto inmediato.
              </p>
              <ul className="mt-8 grid gap-px bg-hairline sm:grid-cols-2">
                {[
                  "Pesaje y registro asociado",
                  "Variables ambientales",
                  "Captura de información en origen",
                  "Trazabilidad operacional",
                  "Integración de equipos",
                  "Seguimiento remoto",
                ].map((t) => (
                  <li key={t} className="bg-background px-5 py-4 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <CtaLink to="/contacto" variant="ghost" event="cta_sector_agro">
                  Conversemos
                </CtaLink>
              </div>
            </div>
            <figure className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              <img
                src={weighingImg}
                alt="Camión sobre una báscula de pesaje mientras un operario consulta los datos"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-3/4 w-full rounded-lg border border-hairline object-cover"
              />
              <img
                src={environmentImg}
                alt="Estacion de monitoreo agricola con panel solar, protector de radiacion y pluviometro junto a un cultivo de maiz"
                loading="lazy"
                width={900}
                height={1200}
                className="aspect-3/4 w-full rounded-lg border border-hairline object-cover sm:mt-10"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Comercio y Retail */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {[
              {
                id: "comercio",
                title: "Comercio",
                lead: "Operaciones administrativas y logísticas que todavía dependen de registros manuales y herramientas separadas.",
                items: [
                  "Digitalización de procesos",
                  "Captura de información",
                  "Integración entre herramientas",
                  "Monitoreo de actividad operativa",
                ],
              },
              {
                id: "retail",
                title: "Retail",
                lead: "Puntos de operación donde equipos, procesos e información deben funcionar de forma conectada.",
                items: [
                  "Integración tecnológica",
                  "Captura de datos en punto de operación",
                  "Interacción digital con el proceso",
                  "Monitoreo de condiciones y equipos",
                ],
              },
            ].map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24 border-t-2 border-deep pt-8">
                <h2 className="text-2xl font-semibold sm:text-3xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{s.lead}</p>
                <ul className="mt-7 divide-y divide-hairline border-t border-hairline text-sm">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-center gap-3 py-3.5">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan" />
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Soluciones adaptables */}
      <section id="adaptables" className="scroll-mt-24 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Otros desafíos"
            title="Soluciones adaptables"
            lead="Nuestra capacidad de ingeniería permite adaptar soluciones a procesos y necesidades particulares de otras organizaciones. Si su proceso no aparece aquí, el punto de partida es la misma conversación: entender qué ocurre hoy."
          />
          <div className="mt-10">
            <CtaLink to="/contacto" event="cta_sector_adaptable">
              Hablemos de su proyecto
            </CtaLink>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
