import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";
import { nav, siteConfig, trackEvent } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-hairline bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Dev Ingenion — inicio"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="" width={683} height={240} className="h-12 w-auto" />
          <span className="hidden text-[0.95rem] leading-tight font-semibold tracking-tight sm:block">
            Dev Ingenion
            <span className="block text-[0.68rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Ingeniería digital
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("portal_clientes_click", { source: "header" })}
            className="inline-flex items-center gap-1.5 rounded-md border border-hairline px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-cyan hover:text-brand"
          >
            Portal Clientes
            <ArrowUpRight className="size-4 text-cyan" aria-hidden="true" />
          </a>
          <Link
            to="/contacto"
            onClick={() => trackEvent("cta_click", { source: "header" })}
            className="inline-flex items-center rounded-md bg-deep px-4 py-2 text-sm font-semibold text-deep-foreground transition-colors hover:bg-brand"
          >
            Hablemos de su proyecto
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-11 items-center justify-center rounded-md border border-hairline lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="menu-movil"
          className="fixed inset-x-0 top-18 bottom-0 z-50 flex flex-col bg-background px-5 pt-6 pb-10 lg:hidden"
        >
          <nav aria-label="Principal móvil" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 text-lg font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-deep px-4 text-sm font-semibold text-deep-foreground"
            >
              Hablemos de su proyecto
            </Link>
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("portal_clientes_click", { source: "menu_movil" })}
              className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-md border border-hairline px-4 text-sm font-medium"
            >
              Portal Clientes
              <ArrowUpRight className="size-4 text-cyan" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
