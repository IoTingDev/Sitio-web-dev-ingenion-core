import { createFileRoute } from "@tanstack/react-router";
import { Activity, Cable, Workflow, BarChart3, LayoutDashboard } from "lucide-react";
import { ClosingCta, CtaLink, Eyebrow, PageHero, SectionHeading } from "@/components/site-ui";

export const Route = createFileRoute("/soluciones")({
  head: () => ({
    meta: [
      { title: "Soluciones | Monitoreo, integración y automatización — Dev Ingenion" },
      {
        name: "description",
        content:
          "Monitoreo inteligente, integración tecnológica, automatización, analítica y plataformas digitales: capacidades que se combinan según el proceso de cada empresa.",
      },
      { property: "og:title", content: "Soluciones de ingeniería digital | Dev Ingenion" },
      {
        property: "og:description",
        content:
          "Capacidades de monitoreo, integración, automatización, analítica y plataformas digitales aplicadas a procesos reales.",
      },
    ],
  }),
  component: Soluciones,
});

const solutions = [
  {
    id: "monitoreo",
    icon: Activity,
    title: "Monitoreo inteligente",
    problem: "La condición de un proceso o un activo solo se conoce estando presente.",
    approach: "Instrumentamos el punto donde se origina el dato y lo llevamos a un lugar consultable.",
    capability: "Seguimiento de variables, estados y activos con histórico y consulta remota.",
    benefit: "Visibilidad continua y reacción antes de que el problema escale.",
    uses: ["Variables ambientales", "Estado de equipos", "Seguimiento de operación"],
  },
  {
    id: "integracion",
    icon: Cable,
    title: "Integración tecnológica",
    problem: "Equipos y sistemas que funcionan bien por separado, pero no comparten información.",
    approach: "Trabajamos sobre lo existente antes de proponer reemplazos.",
    capability: "Conexión entre instrumentos, equipos, plataformas y aplicaciones.",
    benefit: "Un flujo de información único, sin transcripción intermedia.",
    uses: ["Instrumentos de medición", "Equipos de planta", "Sistemas administrativos"],
  },
  {
    id: "automatizacion",
    icon: Workflow,
    title: "Automatización de procesos",
    problem: "Tareas repetitivas que consumen tiempo y admiten error humano.",
    approach: "Automatizamos donde es conveniente, no donde es posible.",
    capability: "Flujos que capturan, validan y registran sin intervención manual.",
    benefit: "Menos reproceso y registros más confiables.",
    uses: ["Captura automática de datos", "Registro y validación", "Notificaciones operativas"],
  },
  {
    id: "analitica",
    icon: BarChart3,
    title: "Analítica de datos",
    problem: "Hay datos, pero no una lectura clara de lo que está ocurriendo.",
    approach: "Definimos con el cliente qué indicadores importan realmente.",
    capability: "Consolidación de información operacional en indicadores comprensibles.",
    benefit: "Conversaciones basadas en evidencia, no en percepción.",
    uses: ["Indicadores de proceso", "Consolidación de registros", "Comparación por periodo"],
  },
  {
    id: "plataformas",
    icon: LayoutDashboard,
    title: "Plataformas digitales",
    problem: "La información existe, pero no hay una herramienta para usarla.",
    approach: "Construimos la interfaz alrededor del trabajo real de quien la usa.",
    capability: "Aplicaciones web para consultar, administrar y compartir información.",
    benefit: "Un solo lugar para consultar lo que la solución genera.",
    uses: ["Consulta operacional", "Administración de usuarios", "Trazabilidad de registros"],
  },
];

function Soluciones() {
  return (
    <>
      <PageHero
        eyebrow="Soluciones"
        title="Capacidades que se combinan según el proceso"
        lead="Cinco capacidades que rara vez se aplican por separado. La combinación depende de qué necesita resolver su operación."
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {solutions.map(({ id, icon: Icon, ...s }, i) => (
            <section
              key={id}
              id={id}
              aria-labelledby={`${id}-titulo`}
              className="scroll-mt-24 border-b border-hairline py-16 last:border-0 lg:py-24"
            >
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                <div>
                  <Eyebrow>0{i + 1}</Eyebrow>
                  <Icon className="mt-6 size-7 text-brand" aria-hidden="true" strokeWidth={1.5} />
                  <h2 id={`${id}-titulo`} className="mt-5 text-3xl font-semibold sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">{s.problem}</p>
                </div>

                <div>
                  <dl className="grid gap-px bg-hairline sm:grid-cols-2">
                    {[
                      ["Enfoque", s.approach],
                      ["Capacidad", s.capability],
                      ["Beneficio", s.benefit],
                      ["Cuándo tiene sentido", `Cuando ${s.problem.charAt(0).toLowerCase()}${s.problem.slice(1, -1)}.`],
                    ].map(([t, d]) => (
                      <div key={t} className="bg-background p-6">
                        <dt className="text-eyebrow text-muted-foreground">{t}</dt>
                        <dd className="mt-3 text-sm leading-relaxed">{d}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      {s.uses.map((u) => (
                        <li key={u} className="flex items-center gap-2">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan" />
                          {u}
                        </li>
                      ))}
                    </ul>
                    <div className="ml-auto">
                      <CtaLink to="/contacto" variant="ghost" event={`cta_solucion_${id}`}>
                        Solicitar asesoría
                      </CtaLink>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Tecnología con disciplina: agrupada por capacidad, sin muro de logos */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Tecnología"
            title="Cómo se sostiene técnicamente una solución"
            lead="Agrupamos nuestro trabajo por capacidad, no por marca. El detalle de implementación se define en cada proyecto."
          />
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Dispositivos e integración", "Instrumentación, sistemas embebidos y conexión con equipos existentes."],
              ["Conectividad", "Transporte confiable del dato desde el punto de captura."],
              ["Desarrollo", "Aplicaciones y servicios que organizan y presentan la información."],
              ["Cloud", "Infraestructura administrada para disponibilidad y escalabilidad."],
            ].map(([t, d]) => (
              <div key={t} className="bg-surface p-7">
                <h3 className="text-base font-semibold">{t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
