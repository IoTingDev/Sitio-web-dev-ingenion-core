import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-lockup.png";
import { siteConfig, trackEvent } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Dev Ingenion — IoTing Dev"
              width={341}
              height={400}
              className="h-18 w-auto"
            />
            <span className="text-sm leading-tight font-semibold">
              Dev Ingenion SAS
              <span className="block text-[0.68rem] font-medium tracking-[0.18em] text-deep-muted uppercase">
                Ingeniería digital
              </span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-deep-muted">
            Diseñamos soluciones que conectan procesos físicos con información útil para decidir
            mejor.
          </p>
        </div>

        <nav aria-label="Navegación del sitio" className="text-sm">
          <h2 className="text-eyebrow text-cyan">Navegación</h2>
          <ul className="mt-4 space-y-2.5 text-deep-muted">
            <li>
              <Link to="/" className="hover:text-deep-foreground">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/soluciones" className="hover:text-deep-foreground">
                Soluciones
              </Link>
            </li>
            <li>
              <Link to="/sectores" className="hover:text-deep-foreground">
                Sectores
              </Link>
            </li>
            <li>
              <Link to="/como-trabajamos" className="hover:text-deep-foreground">
                Cómo trabajamos
              </Link>
            </li>
            <li>
              <Link to="/empresa" className="hover:text-deep-foreground">
                Empresa
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="text-eyebrow text-cyan">Soluciones</h2>
          <ul className="mt-4 space-y-2.5 text-deep-muted">
            <li>
              <Link to="/soluciones" hash="monitoreo" className="hover:text-deep-foreground">
                Monitoreo inteligente
              </Link>
            </li>
            <li>
              <Link to="/soluciones" hash="automatizacion" className="hover:text-deep-foreground">
                Automatización de procesos
              </Link>
            </li>
            <li>
              <Link to="/soluciones" hash="integracion" className="hover:text-deep-foreground">
                Integración tecnológica
              </Link>
            </li>
            <li>
              <Link to="/soluciones" hash="analitica" className="hover:text-deep-foreground">
                Analítica de datos
              </Link>
            </li>
            <li>
              <Link to="/soluciones" hash="plataformas" className="hover:text-deep-foreground">
                Plataformas digitales
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h2 className="text-eyebrow text-cyan">Contacto</h2>
          <ul className="mt-4 space-y-3 text-deep-muted">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-cyan" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.email}`}
                onClick={() => trackEvent("email_click", { source: "footer" })}
                className="hover:text-deep-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-cyan" aria-hidden="true" />
              {siteConfig.location}
            </li>
            <li>
              <a
                href={siteConfig.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("portal_clientes_click", { source: "footer" })}
                className="inline-flex items-center gap-1.5 font-medium text-deep-foreground hover:text-cyan"
              >
                Portal Clientes
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-deep-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Dev Ingenion SAS. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link
                to="/legal/$slug"
                params={{ slug: "privacidad" }}
                className="hover:text-deep-foreground"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                to="/legal/$slug"
                params={{ slug: "datos" }}
                className="hover:text-deep-foreground"
              >
                Tratamiento de datos
              </Link>
            </li>
            <li>
              <Link
                to="/legal/$slug"
                params={{ slug: "terminos" }}
                className="hover:text-deep-foreground"
              >
                Términos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
