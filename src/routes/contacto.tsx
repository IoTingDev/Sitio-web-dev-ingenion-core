import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
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
      {
        property: "og:description",
        content: "Hablemos de su proyecto: cuéntenos qué proceso quiere mejorar.",
      },
    ],
  }),
  component: Contacto,
});

type Status = "idle" | "sending" | "success" | "error" | "consentimiento";

/**
 * Endpoint del formulario (API Gateway -> Lambda -> SES + DynamoDB), construido
 * en el monorepo de plataforma (ADR-0028). Se puede sobreescribir por entorno
 * sin tocar codigo.
 */
const ENDPOINT_CONTACTO =
  import.meta.env["VITE_CONTACTO_ENDPOINT"] ??
  "https://v4rqija3s0.execute-api.us-east-1.amazonaws.com/contacto";

/**
 * Campo senuelo (honeypot). El backend descarta en silencio -- con un 200 falso
 * -- cualquier solicitud que lo traiga relleno. El nombre debe coincidir
 * EXACTAMENTE con el que espera la Lambda: `sitio_web`.
 */
const CAMPO_TRAMPA = "sitio_web";

const fieldClass =
  "mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none";

function Contacto() {
  const [status, setStatus] = useState<Status>("idle");
  // Consentimiento explicito, en falso por defecto (DS-20: base de legitimacion
  // declarada ANTES del tratamiento). Va aparte de `values` a proposito: es una
  // condicion previa, no un campo que se envie al backend.
  const [acepta, setAcepta] = useState(false);
  const [values, setValues] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    necesidad: "",
    [CAMPO_TRAMPA]: "",
  });

  function update(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Segunda barrera, ademas de `disabled` en el boton: un `disabled` se puede
    // quitar desde el navegador, y sin consentimiento no se debe llegar a
    // recolectar nada.
    if (!acepta) {
      setStatus("consentimiento");
      return;
    }

    setStatus("sending");
    trackEvent("formulario_envio");
    try {
      const respuesta = await fetch(ENDPOINT_CONTACTO, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre,
          correo: values.correo,
          // El backend llama `mensaje` a lo que este formulario muestra como
          // "Necesidad o proyecto". El nombre visible no cambia; la carga util
          // usa el nombre del contrato.
          mensaje: values.necesidad,
          empresa: values.empresa,
          telefono: values.telefono,
          [CAMPO_TRAMPA]: values[CAMPO_TRAMPA],
        }),
      });

      // Un fallo real ahora SI llega hasta aqui. El backend responde 502 cuando
      // no pudo ni enviar el correo ni escribir el respaldo -- es el unico caso
      // en que la solicitud se perdio de verdad, y el visitante debe saberlo.
      if (!respuesta.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      // Fallo de red o CORS: tampoco se puede afirmar que la solicitud llego.
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
              <div role="status" className="rounded-lg border border-hairline bg-surface p-8">
                <CheckCircle2 className="size-8 text-cyan" aria-hidden="true" strokeWidth={1.5} />
                <h2 className="mt-5 text-2xl font-semibold">Solicitud recibida</h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  Gracias por escribirnos. Revisaremos la información de su proyecto para continuar
                  la conversación.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate={false} className="max-w-xl">
                {/*
                  Señuelo para robots. Invisible y fuera del orden de tabulación
                  para una persona; un robot que rellena todo lo llena y el
                  backend descarta la solicitud sin avisar. No usa `type=hidden`
                  a propósito: muchos robots ignoran esos campos.
                */}
                <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
                  <label htmlFor={CAMPO_TRAMPA}>No complete este campo</label>
                  <input
                    id={CAMPO_TRAMPA}
                    name={CAMPO_TRAMPA}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values[CAMPO_TRAMPA]}
                    onChange={(e) => update(CAMPO_TRAMPA, e.target.value)}
                  />
                </div>

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

                {/*
                  Aviso de privacidad y consentimiento explicito. Obligacion
                  trasladada a este repositorio por ADR-0028 §4.7: el dato del
                  formulario es personal, luego Restringido (008 §7.2), y DS-20
                  exige base de legitimacion declarada ANTES del tratamiento.
                  El texto es corto y enlaza a las paginas legales que ya
                  existen, en vez de duplicar su contenido.
                */}
                <div className="mt-8 rounded-md border border-hairline bg-surface p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Los datos que envía —nombre, empresa, correo, teléfono opcional y la descripción
                    de su necesidad— se usan únicamente para atender su solicitud y preparar una
                    eventual propuesta. No se ceden a terceros con fines publicitarios. Puede
                    solicitar acceso, rectificación o supresión escribiendo a{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-brand hover:text-cyan"
                    >
                      {siteConfig.email}
                    </a>
                    .
                  </p>

                  <label htmlFor="consentimiento" className="mt-4 flex items-start gap-3 text-sm">
                    <input
                      id="consentimiento"
                      name="consentimiento"
                      type="checkbox"
                      checked={acepta}
                      onChange={(e) => {
                        setAcepta(e.target.checked);
                        if (e.target.checked && status === "consentimiento") setStatus("idle");
                      }}
                      className="mt-0.5 size-4 shrink-0 rounded border-input accent-brand"
                    />
                    <span className="leading-relaxed">
                      Autorizo el tratamiento de mis datos personales conforme a la{" "}
                      <Link
                        to="/legal/$slug"
                        params={{ slug: "privacidad" }}
                        className="font-medium text-brand hover:text-cyan"
                      >
                        política de privacidad
                      </Link>{" "}
                      y a la{" "}
                      <Link
                        to="/legal/$slug"
                        params={{ slug: "datos" }}
                        className="font-medium text-brand hover:text-cyan"
                      >
                        autorización de tratamiento de datos
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {status === "consentimiento" ? (
                  <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="size-4" aria-hidden="true" />
                    Para enviar la solicitud necesitamos su autorización para tratar los datos.
                  </p>
                ) : null}

                {status === "error" ? (
                  <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="size-4" aria-hidden="true" />
                    No pudimos enviar la solicitud. Su información sigue aquí; intente nuevamente.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending" || !acepta}
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-deep px-6 text-sm font-semibold text-deep-foreground transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
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
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 text-cyan" aria-hidden="true" />
                {siteConfig.location}
              </li>
            </ul>

            {/* WhatsApp sale de la lista de "otros canales" y pasa a boton
                  propio: es el canal de respuesta mas rapida y competia en peso
                  visual con una direccion de correo y una ciudad. */}
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "contacto" })}
              className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-[filter] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-deep focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.688 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.49" />
              </svg>
              Escribir por WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Respuesta rápida en horario laboral
            </p>
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
