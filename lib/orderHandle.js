export const createOrder = async (payload) => {
  const res = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({
      userName: payload.userName,
      phone: payload.phone,
      name: payload.name,
      address: payload.address,
      total: parseFloat(payload.total),
      method: payload.paymentMethod,
      item: payload.pizzas,
      status: 1,
    }),
  });
  const id = await res.json();
  return id;
};
