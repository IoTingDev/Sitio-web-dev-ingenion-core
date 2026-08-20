import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
// Imagen social definitiva: 1200x630 (la proporcion que esperan las redes),
// generada a partir de logo.png compuesto sobre el color --deep del sitio
// (#072445). No es un recorte: el lockup es casi cuadrado y recortarlo a
// 1200x630 decapitaria la palabra.
import ogImage from "../assets/og-image.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="text-eyebrow text-brand">Error 404</p>
        <h1 className="mt-4 text-3xl font-semibold">No encontramos esta página</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Es posible que el enlace haya cambiado o que la página ya no exista.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center rounded-md bg-deep px-5 text-sm font-semibold text-deep-foreground transition-colors hover:bg-brand"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70dvh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Esta página no cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocurrió un problema al mostrar el contenido. Puede intentar nuevamente o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center rounded-md bg-deep px-5 text-sm font-semibold text-deep-foreground hover:bg-brand"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center rounded-md border border-hairline px-5 text-sm font-medium hover:border-brand"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dev Ingenion | Ingeniería digital para procesos conectados" },
      {
        name: "description",
        content:
          "Dev Ingenion diseña soluciones de monitoreo, integración y automatización que convierten procesos físicos en información útil para decidir.",
      },
      { name: "author", content: "Dev Ingenion SAS" },
      { property: "og:site_name", content: "Dev Ingenion" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
      // og:image debe ser ABSOLUTA: los rastreadores sociales no resuelven
      // rutas relativas. `ogImage` llega como ruta con hash desde Vite.
      { property: "og:image", content: `${siteConfig.url}${ogImage}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Dev Ingenion — ingeniería digital para procesos conectados" },
      { name: "twitter:image", content: `${siteConfig.url}${ogImage}` },
      { property: "og:url", content: siteConfig.url },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-deep focus:px-4 focus:py-2 focus:text-sm focus:text-deep-foreground"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
