/**
 * Configuración del sitio corporativo.
 * El Portal de Clientes es una aplicación independiente: su URL se configura
 * mediante variable de entorno para no acoplar ambos sistemas.
 */
export const siteConfig = {
  company: "Dev Ingenion SAS",
  brand: "IoTing Dev",
  portalUrl: import.meta.env["VITE_PORTAL_URL"] ?? "https://portal.devingenion.com",
  email: "contacto@devingenion.com",
  whatsapp: "https://wa.me/573000000000",
  location: "Colombia",
};

export const nav = [
  { label: "Soluciones", to: "/soluciones" },
  { label: "Sectores", to: "/sectores" },
  { label: "Cómo trabajamos", to: "/como-trabajamos" },
  { label: "Empresa", to: "/empresa" },
  { label: "Contacto", to: "/contacto" },
] as const;

/** Eventos conceptuales de analítica (sin tracking invasivo). */
export function trackEvent(name: string, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("devingenion:analytics", { detail: { name, ...detail } }));
}
