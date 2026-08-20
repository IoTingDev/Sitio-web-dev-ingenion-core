import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site-ui";
import { siteConfig } from "@/config/site";

const pages: Record<string, { title: string; lead: string; body: string[] }> = {
  privacidad: {
    title: "Política de privacidad",
    lead: "Cómo tratamos la información que usted comparte con nosotros a través de este sitio.",
    body: [
      "Dev Ingenion SAS recolecta únicamente los datos que usted envía voluntariamente mediante el formulario de contacto: nombre, empresa, correo, teléfono opcional y la descripción de su necesidad.",
      "Esa información se utiliza exclusivamente para responder su solicitud y avanzar en una eventual relación comercial. No se comercializa ni se cede a terceros con fines publicitarios.",
      `Puede solicitar la consulta, actualización o eliminación de sus datos escribiendo a ${siteConfig.email}.`,
    ],
  },
  datos: {
    title: "Tratamiento de datos",
    lead: "Autorización y finalidad del tratamiento de datos personales.",
    body: [
      "El formulario de contacto solicita su autorización expresa mediante una casilla que usted debe marcar antes de enviarlo: sin esa autorización la solicitud no se envía y no se recolecta ningún dato. Al marcarla, usted autoriza a Dev Ingenion SAS a tratar sus datos personales con la finalidad de atender su solicitud, elaborar propuestas y mantener comunicación relacionada con el proyecto consultado.",
      "El tratamiento se realiza conforme a la normativa colombiana de protección de datos personales. Usted conserva sus derechos de conocer, actualizar, rectificar y suprimir su información.",
      `Las solicitudes relacionadas con estos derechos se atienden en ${siteConfig.email}.`,
    ],
  },
  terminos: {
    title: "Términos de uso",
    lead: "Condiciones aplicables a la navegación en este sitio corporativo.",
    body: [
      "El contenido de este sitio tiene carácter informativo sobre las capacidades y servicios de Dev Ingenion SAS y no constituye una oferta comercial vinculante.",
      "Las condiciones específicas de alcance, plazos y precios de cada solución se definen en la propuesta correspondiente a cada proyecto.",
      "Las marcas, textos e imágenes publicados son propiedad de Dev Ingenion SAS salvo indicación en contrario.",
    ],
  },
};

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    const page = pages[params.slug];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Legal"} | Dev Ingenion` },
      { name: "description", content: loaderData?.lead ?? "Información legal de Dev Ingenion SAS." },
      { property: "og:title", content: `${loaderData?.title ?? "Legal"} | Dev Ingenion` },
      { property: "og:description", content: loaderData?.lead ?? "Información legal de Dev Ingenion SAS." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const page = Route.useLoaderData();

  return (
    <>
      <PageHero eyebrow="Legal" title={page.title} lead={page.lead} />
      <section className="bg-background">
        <div className="mx-auto max-w-3xl space-y-6 px-5 py-20 lg:px-8 lg:py-28">
          {page.body.map((p: string) => (
            <p key={p} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
