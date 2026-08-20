import { createFileRoute } from "@tanstack/react-router";
import dashboardImg from "@/assets/dashboardagro.jpg";
import { ClosingCta, PageHero, SectionHeading } from "@/components/site-ui";

export const Route = createFileRoute("/como-trabajamos")({
  head: () => ({
    meta: [
      { title: "Cómo trabajamos | Método de proyecto — Dev Ingenion" },
      {
        name: "description",
        content:
          "Comprender, diseñar, construir, implementar y acompañar: el método con el que Dev Ingenion lleva una necesidad operacional hasta una solución en funcionamiento.",
      },
      { property: "og:title", content: "Cómo trabajamos | Dev Ingenion" },
      {
        property: "og:description",
        content:
          "Un método corto y verificable para llevar una necesidad operacional a una solución en funcionamiento.",
      },
    ],
  }),
  component: ComoTrabajamos,
});

const steps = [
  {
    t: "Comprendemos",
    d: "Analizamos la necesidad y el proceso tal como ocurre hoy, con quienes lo operan. Sin esta etapa, cualquier solución es una suposición.",
  },
  {
    t: "Diseñamos",
    d: "Definimos qué se va a medir, cómo viaja la información y qué debe poder hacer el usuario final. El alcance queda explícito.",
  },
  {
    t: "Construimos",
    d: "Integramos instrumentación, conectividad y software. Probamos en condiciones cercanas a las reales antes de salir a campo.",
  },
  {
    t: "Implementamos",
    d: "Desplegamos en sitio, validamos con la operación y ajustamos según lo que aparece en el uso diario.",
  },
  {
    t: "Acompañamos",
    d: "Sostenemos la solución y la hacemos evolucionar a medida que el proceso cambia.",
  },
];

function ComoTrabajamos() {
  return (
    <>
      <PageHero
        eyebrow="Cómo trabajamos"
        title="Primero comprender el proceso. Después construir la solución."
        lead="No llegamos con un producto predeterminado. Llegamos con preguntas sobre cómo funciona hoy su operación."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <ol className="relative border-l border-hairline">
            {steps.map((s, i) => (
              <li key={s.t} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[7px] grid size-3.5 place-items-center rounded-full border border-cyan bg-background"
                >
                  <span className="size-1.5 rounded-full bg-cyan" />
                </span>
                <span className="text-eyebrow text-muted-foreground">Etapa 0{i + 1}</span>
                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{s.t}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          {/* Proporcion nativa 3:2, no 4:3: es una captura de interfaz y un recorte
              le cortaria el 11% del ancho, incluida la barra lateral. */}
          <figure className="overflow-hidden rounded-lg border border-hairline">
            <img
              src={dashboardImg}
              alt="Panel de monitoreo de calidad de agua con indicadores de pH, conductividad y temperatura, historial y alertas"
              loading="lazy"
              width={1536}
              height={1024}
              className="aspect-3/2 w-full object-cover"
            />
          </figure>
          <SectionHeading
            eyebrow="Trabajo en campo"
            title="La validación ocurre donde ocurre el proceso"
            lead="Una solución conectada se prueba en el sitio: con las condiciones, los tiempos y las personas reales. Ese contacto con la operación es parte del método, no un extra."
          />
        </div>
      </section>

      <ClosingCta
        title="¿Quiere revisar su proceso con nosotros?"
        lead="La primera conversación sirve para entender si hay una oportunidad clara. Sin compromiso."
      />
    </>
  );
}
