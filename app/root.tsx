import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { LangProvider } from "./i18n/LangProvider";
import theme from "./styles/theme.css?url";

// roda antes da pintura: aplica o tema salvo (padrão escuro) sem flash e, com movimento,
// já pinta os blocos no estado inicial da entrada (tr-pre, ver transition.css); sem JS nada muda.
// Se o bundle nunca hidratar, tr-pre sai sozinho em 4s para a página não ficar invisível.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("ga-theme");if(t!=="dark"&&t!=="light")t="dark";d.setAttribute("data-theme",t)}catch(e){}if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("tr-pre");setTimeout(function(){d.classList.remove("tr-pre")},4000)}})();`;

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/assets/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
  { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
  { rel: "stylesheet", href: theme },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@300;400;500&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // data-theme e lang mudam antes/depois da hidratação, de propósito
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Outlet />
    </LangProvider>
  );
}
