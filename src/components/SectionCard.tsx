type Props = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({ title, children }: Props) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-300">{children}</div>
    </div>
  );
}