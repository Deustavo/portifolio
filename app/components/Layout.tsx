import { Outlet, useLocation } from "react-router";
import { usePageTransition } from "../hooks/usePageTransition";
import { Bar } from "./Bar";
import { BlobCursor } from "./BlobCursor";
import { Foot } from "./Foot";

export default function Layout() {
  // o prerender renderiza "/sobre/"; o navegador está em "/sobre"
  const page = useLocation().pathname.replace(/(.)\/$/, "$1");
  usePageTransition();
  return (
    <>
      <Bar page={page} />
      <Outlet />
      {/* home e sobre já terminam no bloco de contato */}
      <Foot cta={page !== "/" && page !== "/sobre"} />
      <BlobCursor />
    </>
  );
}
