export type CS2Skin = {
  name: string;
  image: string;
  price: number;
};

const CS2_SKINS: CS2Skin[] = [
  {
    name: "AK-47 | Redline (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvNQ7T_FDrw-_ng5Pu75iY1zI97bhCphiW/360fx360f",
    price: 9.50
  },
  {
    name: "AWP | Asiimov (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXpu5Mx2gv2P8d2t2wDm-Rdoa2_2LY6dew82Z13Z-gC6xb3q18e56ZTLwSFguSNz5irVnhSpwUYbAYkDkO8/360fx360f",
    price: 75.00
  },
  {
    name: "M4A4 | Howl (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09q5mImMn-O6NeLXwjgFsZUp27mZ84333gTm-0FlYjr6cY-VJwM-Zl7T_1S9wbvphJC56szIwHBhuyNzsCvfmBS3hE0bOfBxxavJjO6d9vw/360fx360f",
    price: 4500.00
  },
  {
    name: "Glock-18 | Fade (Factory New)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkIGZnvnxDLbUkmJE5fp9g-7J4cL3jFWx-hBvZjz2I4TEdAVoMFDS-FK9wbu7hZK66YOJlyUXkQhQNQ/360fx360f",
    price: 285.00
  },
  {
    name: "Desert Eagle | Blaze (Factory New)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTj5D_t24k4-fqPv9NLPF2G5XvZIg2b6X9oqh2ADg80I9Mm2mdo6VdQU8aVnRqFntkujshZfovZ7IyHZmvSkhtH7UzEGwhh0aOe8_3rOACQLJ4qTTKZU/360fx360f",
    price: 450.00
  },
  {
    name: "Karambit | Doppler (Factory New)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kfbkI7PYhG5u5Mx2gv2P8N321VLgrkQ5Y2nzIYCWcAZqN1jR_1Poxbjs18C6vZXIwHRh7iAl5SmJnhSpwUYbfpIaRpQ/360fx360f",
    price: 650.00
  },
  {
    name: "USP-S | Kill Confirmed (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j6OrzZglRd6dd2j6fApdms3AawqEJqYW-mItDBclJvYFDR-wK5xOrqhpPvuJ-dznFh6T5iuyiFQGl4LA/360fx360f",
    price: 42.00
  },
  {
    name: "P90 | Asiimov (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FA957ODAQTJQ_tWlnYGGmOHLP7LWnn8fvZEp2ruS8NWh2ALj-UZuYGigJoOVdgBvZgvT81ntw7jrhp-9uJ_XiSw0g7oO4Fl/360fx360f",
    price: 6.75
  },
  {
    name: "AK-47 | Fire Serpent (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLO7LXk39I18h0teXI8oThxlblrRZuNmz7I4-XIQ8_Y1rQqVm4kOfxxcjrpw1BSSY/360fx360f",
    price: 1200.00
  },
  {
    name: "M4A1-S | Hyper Beast (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITSl3tE18l4jeHVu9uhigaw-0dpamD6IoLEJwU_N1-F-FK8yOjom9bi6_tH-Tng/360fx360f",
    price: 11.50
  },
  {
    name: "AWP | Dragon Lore (Field-Tested)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DsI65Yk3b-T8YjxjgLl80c6MGH1doTEcAVqYw6F-AO2wLy8gMS76c7KySNnuHYmsHvbgVXp1hYHKr5W/360fx360f",
    price: 6500.00
  },
  {
    name: "MAC-10 | Neon Rider (Factory New)",
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0Ob3fDxBvYyJh-LnI7-BnvDQmWVY7ch0teXI8oTht1i1uRQ5fT37IdSQJ1NsYgzU_VXvk-i90J65u5-dzSE3uSgrsX7UnRK1hx8eO7YkgvbJHlbLVPFIDOY4RLmf/360fx360f",
    price: 3.25
  },
];

export function getRandomSkin(): CS2Skin {
  const randomIndex = Math.floor(Math.random() * CS2_SKINS.length);
  return CS2_SKINS[randomIndex];
}

export function calculateAccuracy(guessedPrice: number, actualPrice: number): number {
  const difference = Math.abs(guessedPrice - actualPrice);
  const percentageOff = (difference / actualPrice) * 100;
  return Math.round(percentageOff * 100) / 100;
}
