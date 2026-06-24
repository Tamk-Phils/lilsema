type JsonLdProps = {
  data:
    | Record<string, unknown>
    | Array<Record<string, unknown> | null | undefined>
    | null
    | undefined;
};

export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  const payload = (Array.isArray(data) ? data : [data]).filter(
    (item): item is Record<string, unknown> => item != null
  );

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
