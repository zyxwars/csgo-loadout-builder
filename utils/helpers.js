import { validatePrice, validateQuantitySold } from "./validators";

export const orderByExterior = (skins) => {
  const getExteriorValue = (skinName) => {
    if (skinName.includes("Factory New")) return 0;
    if (skinName.includes("Minimal Wear")) return 1;
    if (skinName.includes("Field-Tested")) return 2;
    if (skinName.includes("Well-Worn")) return 3;
    return 4;
  };

  const normalSkins = [];
  const statTrakSkins = [];
  const souvenirSkins = [];

  for (const skin of skins) {
    if (skin.name.includes("StatTrak")) {
      statTrakSkins.push(skin);
      continue;
    }
    if (skin.name.includes("Souvenir")) {
      souvenirSkins.push(skin);
      continue;
    }

    normalSkins.push(skin);
  }

  normalSkins.sort(
    (a, b) => getExteriorValue(a.name) > getExteriorValue(b.name)
  );
  statTrakSkins.sort(
    (a, b) => getExteriorValue(a.name) > getExteriorValue(b.name)
  );
  souvenirSkins.sort(
    (a, b) => getExteriorValue(a.name) > getExteriorValue(b.name)
  );

  return [...normalSkins, ...statTrakSkins, ...souvenirSkins];
};

export const orderByPrice = (skins, ascending = true) => {
  if (ascending)
    return skins.sort(
      (a, b) => validatePrice(a.price) > validatePrice(b.price)
    );

  return skins.sort((a, b) => validatePrice(a.price) < validatePrice(b.price));
};

// TODO: Fix not ordering properly
export const orderByQuantitySold = (skins, ascending = true) => {
  if (ascending)
    return skins.sort(
      (a, b) => validateQuantitySold(a.price) > validateQuantitySold(b.price)
    );

  return skins.sort(
    (a, b) => validateQuantitySold(a.price) < validateQuantitySold(b.price)
  );
};

export const orderByRarity = (skins, ascending = true) => {
  const getRarityValue = (skin) => {
    let rarityValue = 0;

    if (skin.name.includes("StatTrak")) rarityValue = 8;
    else if (skin.name.includes("Souvenir")) rarityValue = 16;

    if (skin.rarity === "Consumer Grade") return rarityValue + 0;
    if (skin.rarity === "Industrial Grade") return rarityValue + 1;
    if (skin.rarity === "Mil-Spec Grade") return rarityValue + 2;
    if (skin.rarity === "Restricted") return rarityValue + 3;
    if (skin.rarity === "Classified") return rarityValue + 4;
    if (skin.rarity === "Covert") return rarityValue + 5;
    if (skin.rarity === "Contraband") return rarityValue + 6;
    return rarityValue + 7;
  };

  if (ascending)
    return skins.sort((a, b) => getRarityValue(a) > getRarityValue(b));
  return skins.sort((a, b) => getRarityValue(a) < getRarityValue(b));
};
