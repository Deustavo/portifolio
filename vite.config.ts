import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  // saída do Vite (nomes com hash) separada de public/assets, para o cache immutable não pegar favicon/og/áudio
  build: { assetsDir: "_app" },
});
