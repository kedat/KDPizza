export const createOrder = async (payload) => {
  console.log("🚀 ~ file: orderHandle.js:9 ~ userName:", payload)
  const res = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({
      userName: payload.userName,
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      total: parseFloat(payload.total),
      method: payload.paymentMethod,
      status: 1,
    }),
  });
  const id = await res.json();
  return id;
};
