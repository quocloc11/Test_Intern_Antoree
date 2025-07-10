// src/apis/suggestions.js
import productsData from "./mock-data";

// Giả lập API gợi ý
export const getSuggestions = async (userId, favorites = [], viewed = []) => {
  return new Promise((resolve) => {
    // Ưu tiên sản phẩm đã thích / đã xem
    const behaviorBased = productsData.filter((p) =>
      favorites.includes(p.id) || viewed.includes(p.id)
    );

    // Nếu không có hành vi, lấy ngẫu nhiên 3 sản phẩm
    const fallback = productsData.slice(0, 3);

    setTimeout(() => {
      resolve(behaviorBased.length > 0 ? behaviorBased : fallback);
    }, 1000); // Giả lập delay
  });
};
