import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "fnl0wh0i",
  dataset: "production",
  apiVersion: "2023-04-21",
  useCdn: true,
  token:
    "skYNeWi03uuC1VhSPeMJ4E86pKpE2H7Qj0BofJqd2cr47dLdSDj02zBWB74cYx3FGEraq5WEGQCnxfuNbgBtNnoGQVuRprS2AcB1tdJy0d2xcU4OB9wAXhXCyNNBCuGuHrp2PKwv73TmfF0iMXBQuUuw0PWS5kSg51PFuQcWmOt0Lxmhk53Y",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
