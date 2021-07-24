export const validatePrice = (price) => {
  if (price?.["24_hours"]?.average) return price["24_hours"].average;
  if (price?.["30_days"]?.average) return price["30_days"].average;
  if (price?.["all_time"]?.average) return price["all_time"].average;

  return 0;
};

export const stripName = (name) => {
  // Remove space from Souvenir and StatTrak
  return name
    .replace("Souvenir ", "")
    .replace("(Factory New)", "")
    .replace("(Minimal Wear)", "")
    .replace("(Field-Tested)", "")
    .replace("(Well-Worn)", "")
    .replace("(Battle-Scarred)", "")
    .replace("StatTrak™ ", "");
};
