import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Cable,
  Workflow,
  BarChart3,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/hero-field.jpg";
import weighingImg from "@/assets/case-weighing.jpg";
import environmentImg from "@/assets/case-environment.jpg";
import integrationImg from "@/assets/case-integration.jpg";
import { ClosingCta, CtaLink, Eyebrow, FlowDiagram, SectionHeading } from "@/components/site-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dev Ingenion | Ingeniería digital para procesos conectados" },
      {
        name: "description",
        content:
          "Ingeniería que conecta procesos físicos con decisiones informadas: monitoreo, integración, automatización y plataformas digitales para agroindustria, comercio y retail.",
      },
      { property: "og:title", content: "Dev Ingenion | Ingeniería digital para procesos conectados" },
      {
        property: "og:description",
        content:
          "Convertimos procesos físicos en información útil para tomar mejores decisiones. Soluciones de monitoreo, integración y automatización.",
      },
    ],
  }),
  component: Home,
});

const frictions = [
  "Registros que aún se toman a mano y se transcriben después.",
  "Información dispersa entre planillas, equipos y personas.",
  "Equipos que funcionan bien, pero no conversan entre sí.",
  "Datos que llegan cuando la decisión ya se tomó.",
];

const flow = [
  { label: "Proceso físico", detail: "Lo que ya ocurre en su operación todos los días." },
  { label: "Captura", detail: "Instrumentación e integración para obtener el dato en origen." },
  { label: "Conexión", detail: "El dato viaja de forma confiable hasta donde se necesita." },
  { label: "Información", detail: "Se organiza y se presenta con contexto operacional." },
  { label: "Decisión", detail: "Alguien actúa a tiempo, con evidencia." },
];

const method = [
  { label: "Comprender", detail: "Analizamos la necesidad y el proceso real." },
  { label: "Diseñar", detail: "Definimos la solución y su alcance." },
  { label: "Construir", detail: "Integramos hardware, software y conectividad." },
  { label: "Implementar", detail: "Desplegamos en campo y validamos con la operación." },
  { label: "Acompañar", detail: "Sostenemos la solución y la hacemos evolucionar." },
];

const cases = [
  {
    title: "Pesaje inteligente",
    text: "Captura del peso directamente desde el punto de medición, sin transcripción manual, disponible para quien debe registrar y decidir.",
    img: weighingImg,
    alt: "Operario verificando datos de pesaje en una tableta junto a una báscula de camiones",
  },
  {
    title: "Monitoreo ambiental",
    text: "Seguimiento de variables como temperatura y humedad en espacios donde esas condiciones afectan el resultado del proceso.",
    img: environmentImg,
    alt: "Unidad de monitoreo ambiental instalada sobre un poste dentro de un invernadero",
  },
  {
    title: "Integración de equipos",
    text: "Equipos e instrumentos existentes conectados a un sistema común, sin necesidad de reemplazar lo que ya funciona.",
    img: integrationImg,
    alt: "Ingeniero conectando un equipo industrial a una pasarela de red dentro de un tablero eléctrico",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-hairline bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-16 pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="reveal">
            <Eyebrow>Ingeniería digital</Eyebrow>
            <h1 className="mt-6 text-[2.6rem] leading-[1.03] font-semibold sm:text-6xl lg:text-[4.2rem]">
              Ingeniería que conecta procesos físicos con decisiones informadas
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Diseñamos soluciones que permiten monitorear, conectar y optimizar procesos empresariales,
              integrando instrumentación, conectividad y software en un mismo sistema.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CtaLink to="/contacto" event="cta_hero">
                Hablemos de su proyecto
              </CtaLink>
              <CtaLink to="/soluciones" variant="ghost">
                Conocer soluciones
              </CtaLink>
            </div>
          </div>

          <figure className="relative">
            <div className="overflow-hidden rounded-lg border border-hairline">
              <img
                src={heroImg}
                alt="Técnico cableando un gabinete de control instalado en una estación de pesaje agroindustrial al amanecer"
                width={1600}
                height={1104}
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 200 120"
              className="pointer-events-none absolute -bottom-6 -left-6 hidden w-44 text-cyan lg:block"
            >
              <path
                d="M4 116 L4 60 Q4 44 20 44 L92 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="480"
                style={{ animation: "draw-line 1.6s ease-out forwards" }}
              />
              <circle cx="96" cy="44" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="4" cy="116" r="3" fill="currentColor" />
            </svg>
          </figure>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8 lg:py-32">
          <SectionHeading
            eyebrow="El punto de partida"
            title={<>Sus procesos ya generan información. El desafío es aprovecharla.</>}
            lead="Cada operación produce datos: pesos, tiempos, condiciones, movimientos. La diferencia está en si esa información llega completa, a tiempo y a la persona correcta."
          />
          <ul className="divide-y divide-hairline border-t border-hairline">
            {frictions.map((f) => (
              <li key={f} className="flex items-start gap-4 py-5">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                <p className="text-base leading-relaxed">{f}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TRANSFORMACIÓN */}
      <section className="relative overflow-hidden bg-deep">
        <div aria-hidden="true" className="circuit-field pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeading
            tone="dark"
            eyebrow="La transformación"
            title="Del dato en el campo a la decisión en la oficina"
            lead="Un mismo recorrido, sin saltos manuales. Así entendemos una solución completa."
          />
          <div className="mt-14">
            <FlowDiagram tone="dark" steps={flow} />
          </div>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeading
            eyebrow="Soluciones"
            title="Capacidades que se combinan según el proceso"
            lead="No partimos de un producto predefinido. Partimos de lo que su operación necesita resolver."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Activity,
                title: "Monitoreo inteligente",
                text: "Visibilidad sobre variables, activos y procesos, incluso cuando no está en el sitio.",
              },
              {
                icon: Cable,
                title: "Integración tecnológica",
                text: "Conectamos dispositivos, equipos y sistemas existentes para que trabajen como uno solo.",
              },
              {
                icon: Workflow,
                title: "Automatización de procesos",
                text: "Menos tareas repetitivas y menos transcripción manual donde tiene sentido automatizar.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="group border-t-2 border-deep pt-7">
                <Icon className="size-6 text-brand" aria-hidden="true" strokeWidth={1.6} />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-hairline pt-10 sm:flex-row sm:items-start sm:gap-16">
            {[
              {
                icon: BarChart3,
                title: "Analítica de datos",
                text: "La información operacional se convierte en indicadores comprensibles.",
              },
              {
                icon: LayoutDashboard,
                title: "Plataformas digitales",
                text: "Herramientas propias para consultar y administrar lo que la solución genera.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex max-w-md gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden="true" strokeWidth={1.6} />
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
            <div className="sm:ml-auto sm:self-center">
              <CtaLink to="/soluciones" variant="ghost">
                Explorar aplicaciones
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeading
            eyebrow="Casos de uso"
            title="Aplicaciones donde la ingeniería se nota"
            lead="Situaciones concretas en las que conectar el proceso físico con un sistema digital cambia la forma de trabajar."
          />
          <div className="mt-14 space-y-16 lg:space-y-24">
            {cases.map((c, i) => (
              <article
                key={c.title}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[&>figure]:order-last" : ""}`}
              >
                <figure className="overflow-hidden rounded-lg border border-hairline">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-4/3 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </figure>
                <div className="max-w-md">
                  <span className="text-eyebrow text-muted-foreground">Caso de uso 0{i + 1}</span>
                  <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="Sectores"
              title="Contextos donde trabajamos hoy"
              lead="Priorizamos los sectores donde nuestra experiencia técnica aporta valor real, y adaptamos soluciones cuando el proceso lo permite."
            />
            <ul className="grid gap-px self-start bg-hairline sm:grid-cols-2">
              {[
                { t: "Agroindustria", d: "Pesaje, variables ambientales, captura de información y seguimiento remoto." },
                { t: "Comercio", d: "Digitalización de procesos, captura de datos e integración de herramientas." },
                { t: "Retail", d: "Integración tecnológica, monitoreo y procesos conectados en punto de operación." },
                { t: "Soluciones adaptables", d: "Nuestra ingeniería permite adaptar soluciones a procesos particulares de otras organizaciones." },
              ].map((s) => (
                <li key={s.t} className="bg-background p-7">
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12">
            <Link
              to="/sectores"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-cyan"
            >
              Ver sectores en detalle
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Primero comprendemos. Después construimos."
            lead="Un proceso corto y verificable, pensado para que usted sepa en qué punto está la solución."
          />
          <div className="mt-14">
            <FlowDiagram steps={method} />
          </div>
          <div className="mt-10">
            <CtaLink to="/como-trabajamos" variant="ghost">
              Ver cómo trabajamos
            </CtaLink>
          </div>
        </div>
      </section>

      {/* DIFERENCIADORES */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow="Diferenciadores"
              title="Ingeniería multidisciplinaria, aplicada a un problema concreto"
            />
            <dl className="divide-y divide-hairline border-t border-hairline">
              {[
                ["Ingeniería multidisciplinaria", "Conectamos hardware, software y servicios digitales dentro de una misma solución."],
                ["Soluciones personalizadas", "El proceso determina la solución, no al revés."],
                ["Integración de extremo a extremo", "Trabajamos desde el punto de captura hasta la visualización."],
                ["Escalabilidad", "Diseñamos pensando en que la solución crezca con la operación."],
                ["Acompañamiento", "Continuidad más allá de la implementación."],
              ].map(([t, d]) => (
                <div key={t} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                  <dt className="text-base font-semibold">{t}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
