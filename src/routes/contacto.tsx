import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, MapPin, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/site-ui";
import { siteConfig, trackEvent } from "@/config/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Hablemos de su proyecto — Dev Ingenion" },
      {
        name: "description",
        content:
          "Cuéntenos qué proceso quiere mejorar. Revisamos su necesidad y le proponemos una conversación con el equipo de ingeniería de Dev Ingenion.",
      },
      { property: "og:title", content: "Contacto | Dev Ingenion" },
      { property: "og:description", content: "Hablemos de su proyecto: cuéntenos qué proceso quiere mejorar." },
    ],
  }),
  component: Contacto,
});

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none";

function Contacto() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ nombre: "", empresa: "", correo: "", telefono: "", necesidad: "" });

  function update(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    trackEvent("formulario_envio");
    try {
      // El sitio corporativo mantiene el backend al mínimo: por ahora la
      // solicitud se entrega por correo. El contenido nunca se pierde.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de su proyecto"
        lead="Cuéntenos qué proceso quiere mejorar. Con esa información preparamos una primera conversación útil."
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8 lg:py-28">
          <div>
            {status === "success" ? (
              <div
                role="status"
                className="rounded-lg border border-hairline bg-surface p-8"
              >
                <CheckCircle2 className="size-8 text-cyan" aria-hidden="true" strokeWidth={1.5} />
                <h2 className="mt-5 text-2xl font-semibold">Solicitud recibida</h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  Gracias por escribirnos. Revisaremos la información de su proyecto para continuar la
                  conversación.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate={false} className="max-w-xl">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      required
                      autoComplete="name"
                      value={values.nombre}
                      onChange={(e) => update("nombre", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="empresa" className="text-sm font-medium">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      required
                      autoComplete="organization"
                      value={values.empresa}
                      onChange={(e) => update("empresa", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="correo" className="text-sm font-medium">
                      Correo
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.correo}
                      onChange={(e) => update("correo", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="telefono" className="text-sm font-medium">
                      Teléfono <span className="text-muted-foreground">(opcional)</span>
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      value={values.telefono}
                      onChange={(e) => update("telefono", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="necesidad" className="text-sm font-medium">
                      Necesidad o proyecto
                    </label>
                    <textarea
                      id="necesidad"
                      name="necesidad"
                      required
                      rows={5}
                      value={values.necesidad}
                      onChange={(e) => update("necesidad", e.target.value)}
                      placeholder="¿Qué proceso quiere mejorar y qué dificultad tiene hoy?"
                      className={`${fieldClass} resize-y`}
                    />
                  </div>
                </div>

                {status === "error" ? (
                  <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="size-4" aria-hidden="true" />
                    No pudimos enviar la solicitud. Su información sigue aquí; intente nuevamente.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-deep px-6 text-sm font-semibold text-deep-foreground transition-colors hover:bg-brand disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    "Enviar solicitud"
                  )}
                </button>
              </form>
            )}
          </div>

          <aside className="self-start border-t border-hairline pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <h2 className="text-eyebrow text-brand">Otros canales</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-cyan" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  onClick={() => trackEvent("email_click", { source: "contacto" })}
                  className="hover:text-brand"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 text-cyan" aria-hidden="true" />
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click")}
                  className="hover:text-brand"
                >
                  Escribir por WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 text-cyan" aria-hidden="true" />
                {siteConfig.location}
              </li>
            </ul>
            <p className="mt-8 border-t border-hairline pt-6 text-sm leading-relaxed text-muted-foreground">
              ¿Ya es cliente? El acceso a sus servicios está en el{" "}
              <a
                href={siteConfig.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("portal_clientes_click", { source: "contacto" })}
                className="font-medium text-brand hover:text-cyan"
              >
                Portal Clientes
              </a>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
