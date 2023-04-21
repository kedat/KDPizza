export const createOrder = async (payload) => {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      userName: payload.userName,
      phone: payload.phone,
      name: payload.userName,
      address: payload.address,
      total: parseFloat(payload.total),
      method: payload.paymentMethod,
      status: 1,
    }),
  });
  const id = await res.json();
  return id;
};
