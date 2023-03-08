export const createAccount = async (data) => {
  const res = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      name: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
      status: 1,
    }),
  });
  const id = await res.json();
  return id;
};
