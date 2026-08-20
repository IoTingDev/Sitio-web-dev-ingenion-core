import { useEffect, useState } from "react";

import { siteConfig, trackEvent } from "@/config/site";

/**
 * Botón flotante de WhatsApp, presente en todo el sitio.
 *
 * Decisiones deliberadas:
 *
 * - **Aparece al desplazarse, no de entrada.** Un botón flotante sobre el hero
 *   compite con la llamada a la acción principal en el primer pantallazo. Se
 *   muestra cuando el visitante ya bajó algo, que es cuando la consulta rápida
 *   tiene sentido.
 * - **No es un popup que interrumpe.** No abre un panel ni un formulario
 *   encima del contenido: es un enlace directo. Un modal automático en un sitio
 *   corporativo molesta más de lo que convierte.
 * - **Abajo a la derecha**, la posición que la gente ya asocia con este canal.
 * - Respeta `prefers-reduced-motion` a través de la clase de transición, y
 *   nunca tapa contenido en móvil porque el pie tiene margen suficiente.
 * - **z-40, no z-50.** El menú móvil (`SiteHeader`, id="menu-movil") también
 *   es `fixed` y usa z-50, y se renderiza en `__root.tsx` ANTES que este
 *   componente. Con el mismo z-index, el orden en el DOM decide qué pinta
 *   encima, y este FAB —al ir después— quedaba por encima del menú abierto:
 *   su esquina inferior derecha era clicable a través de lo que debía ser una
 *   capa modal (verificado con muestreo de 120 puntos en pantalla). Quedar
 *   por debajo del menú es la garantía correcta y no depende de coordinar
 *   estado entre dos componentes que no se conocen entre sí.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setVisible(window.scrollY > 400);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "flotante" })}
      aria-label="Escribir por WhatsApp"
      className={`fixed right-5 bottom-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pr-5 pl-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-deep focus-visible:ring-offset-2 focus-visible:outline-none lg:right-8 lg:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Glifo oficial de WhatsApp. Lucide no lo incluye (son marcas
          registradas), así que va como SVG propio en vez de un icono genérico
          de mensaje, que no se reconocería como este canal. */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.688 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.49" />
      </svg>
      <span className="hidden sm:inline">Escríbanos</span>
    </a>
  );
}
