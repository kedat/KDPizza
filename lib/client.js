import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "fnl0wh0i",
  dataset: "production",
  apiVersion: "2023-02-15",
  useCdn: true,
  token:
    "skBRPIJr4EXJfMrxEi40lLp9rjn9Kz0SpmWUIPC1YdqWJYKlSixEfvQ7bpJyBcxRLEgQflOCyC91qdcJbd5AcNGpBC5F8Jp43IWidzDue389RKD01GvWyfJIxD3TRD7yQ1bIAGG8bvOmG1gxZBduKFQaKoStF4Q0ETtaStk4ShkkBo6RqoDs",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
