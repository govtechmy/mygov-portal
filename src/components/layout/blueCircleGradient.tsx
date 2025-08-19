// components/layout/BlueCircleGradient.tsx
export default function BlueCircleGradient() {
  return (
    <div
      className="absolute inset-0 -top-80 h-[800px] w-full opacity-60"
      style={{
        background: 'radial-gradient(circle at top, #ACE3FF 0%, #D7EEFA 35%, transparent 55%)',
      }}
    />
  );
}
