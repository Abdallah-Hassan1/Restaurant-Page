/*
Abdallah JS Utils Library - ES Module Version
Author: Eng. Abdallah Hassan
Website: https://abdallah-hassan.vercel.app
*/
// ------------------------------دوال النصوص-------------------------------------------
export function truncate(str, length) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
// ------------------------------دوال التخزين------------------------------------------
export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeLocal(key) {
  localStorage.removeItem(key);
}

export function clearLocal() {
  localStorage.clear();
}

export function existsLocal(key) {
  return localStorage.getItem(key) !== null;
}

export const CURRENCY = "ج.م";
export const WHATSAPP_NUMBER = "+2" + "01125272001";

export function message(cartItems) {
  let products = "";

  cartItems.map((item, index) => {
    products +=
      String(index + 1) +
      "- اسم المنتج: " +
      String(item.title) +
      "\n" +
      "• الكمية: " +
      String(item.count) +
      "\n-------------------------------------------\n";
  });
  const msg = `السلام عليكم،

أود تأكيد طلبي، وتفاصيله كالتالي:

----------------المنتجات-----------------
${products}
• طريقة الدفع: [نقدًا / تحويل / ...]
• عنوان التوصيل: [العنوان]

يرجى مراجعة التفاصيل والتأكيد على توفر الطلب، مع إفادتي بموعد التسليم المتوقع.

شكرًا لكم، وأتطلع إلى تأكيدكم.`;

  return encodeURIComponent(msg);
}
