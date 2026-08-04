import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/config/site";

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={cn("text-eyebrow", tone === "dark" ? "text-cyan" : "text-brand")}>
      <span className="mr-2.5 inline-block size-1.5 translate-y-[-2px] rounded-full bg-cyan align-middle" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-4 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" && "text-deep-foreground",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-deep-muted" : "text-muted-foreground")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function CtaLink({
  to,
  hash,
  children,
  variant = "primary",
  event,
  tone = "light",
}: {
  to: string;
  hash?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  event?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      to={to}
      hash={hash}
      onClick={() => event && trackEvent(event)}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors",
        variant === "primary"
          ? tone === "dark"
            ? "bg-cyan text-deep hover:bg-deep-foreground"
            : "bg-deep text-deep-foreground hover:bg-brand"
          : tone === "dark"
            ? "border border-white/25 text-deep-foreground hover:border-cyan hover:text-cyan"
            : "border border-hairline text-foreground hover:border-brand hover:text-brand",
      )}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

/** Cierre comercial reutilizable: azul profundo como contraste estratégico. */
export function ClosingCta({
  title = "¿Tiene un proceso que podría funcionar mejor?",
  lead = "Conversemos sobre cómo la ingeniería y la tecnología pueden ayudar a transformarlo.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deep">
      <div aria-hidden="true" className="circuit-field pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-[1.08] font-semibold text-deep-foreground sm:text-5xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-deep-muted">{lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/contacto" tone="dark" event="cta_final">
              Hablemos de su proyecto
            </CtaLink>
            <CtaLink to="/soluciones" tone="dark" variant="ghost">
              Conocer soluciones
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Trazo de conexión derivado del isotipo: nodos unidos por una línea fina. */
export function FlowDiagram({
  steps,
  tone = "light",
}: {
  steps: { label: string; detail?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <ol className="grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className={cn(
            "relative px-6 py-8",
            tone === "dark" ? "bg-white/[0.04]" : "bg-surface",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-0 left-0 h-px w-full",
              tone === "dark" ? "bg-white/15" : "bg-hairline",
            )}
          />
          <div className="flex items-center gap-3">
            <span className="grid size-6 place-items-center rounded-full border border-cyan/60">
              <span className="size-1.5 rounded-full bg-cyan" />
            </span>
            <span className={cn("text-xs font-semibold tracking-[0.14em] uppercase", tone === "dark" ? "text-deep-muted" : "text-muted-foreground")}>
              0{i + 1}
            </span>
          </div>
          <h3 className={cn("mt-5 text-lg font-semibold", tone === "dark" && "text-deep-foreground")}>{step.label}</h3>
          {step.detail ? (
            <p className={cn("mt-2 text-sm leading-relaxed", tone === "dark" ? "text-deep-muted" : "text-muted-foreground")}>
              {step.detail}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-surface">
      <div aria-hidden="true" className="circuit-field pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
      </div>
    </section>
  );
}
