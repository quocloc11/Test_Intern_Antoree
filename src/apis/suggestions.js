import productsData from "./mock-data";

export const getSuggestions = async (userId, favorites = [], viewed = []) => {
  return new Promise((resolve) => {
    const behaviorBased = productsData.filter((p) =>
      favorites.includes(p.id) || viewed.includes(p.id)
    );
    const fallback = productsData.slice(0, 3);

    setTimeout(() => {
      resolve(behaviorBased.length > 0 ? behaviorBased : fallback);
    }, 1000);
  });
};
