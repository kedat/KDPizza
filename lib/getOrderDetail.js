export const getOrderDetail = async (id) => {
  const res = await fetch(`https://fnl0wh0i.apicdn.sanity.io/v2023-02-15/data/doc/production/${id}`, {
    method: "GET",
  });
  const result = await res.json();
  return result;
};  
