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
