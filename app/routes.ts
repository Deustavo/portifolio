import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { cases } from "./data/cases";

export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("sobre", "routes/sobre.tsx"),
    route("jogos", "routes/jogos.tsx"),
    // uma rota por slug, e não "projects/:slug": assim /projects/inexistente cai no "*"
    // e o 404.html que a Vercel entrega hidrata sem mismatch
    ...cases.map(({ slug }) => route(`projects/${slug}`, "routes/case.tsx", { id: `case/${slug}` })),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
