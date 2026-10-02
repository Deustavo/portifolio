// Cards do /jogos. Nome, cor, thumb (card.webp), tag e frase vêm do case (`slug`);
// o chip "Ver case" (tree.case) é sempre o primeiro e aponta para o próprio case.
export const games: {
  slug: string;
  play: string; // link principal do card
  cta: "tree.play" | "tree.open";
  chips: { k: "tree.itch" | "tree.github"; href: string }[];
}[] = [
  {
    slug: "jogo-chinela-destroyer",
    play: "https://chinela-destroyer.vercel.app/",
    cta: "tree.play",
    chips: [
      { k: "tree.itch", href: "https://deustavo.itch.io/chinela-destroyer" },
      { k: "tree.github", href: "https://github.com/Deustavo/chinela-destroyer" },
    ],
  },
  {
    slug: "demon-arena",
    play: "https://demonarena.vercel.app/",
    cta: "tree.play",
    chips: [{ k: "tree.itch", href: "https://deustavo.itch.io/demonarena" }],
  },
  {
    slug: "pergunte-ao-polvo",
    play: "https://pergunteaopolvo.com/",
    cta: "tree.open",
    chips: [{ k: "tree.github", href: "https://github.com/Deustavo/Pergunte-ao-polvo" }],
  },
];
