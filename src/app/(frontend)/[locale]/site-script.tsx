export default function SiteScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Site-wide scripts can go here
          console.log('MyGOV Malaysia loaded successfully');
        `,
      }}
    />
  );
}
