type DescriptionCardProps = {
  title: string;
  items: string[];
  renderCustomItem?: (item: string, index: number) => React.ReactNode;
};

export const DescriptionCard = ({ title, items, renderCustomItem }: DescriptionCardProps) => {
  return (
    <div className="bg-white border border-gray-100 border-l-4 border-l-orange-400 rounded-xl p-22">
      <h2 className="text-body3b mb-16">{title}</h2>
      <ul className="text-gray-500 space-y-8 text-body3r">
        {items.map((item, index) => (
          <li key={index} className="flex gap-8 items-start">
            <span className="mt-10 shrink-0 w-6 h-6 rounded-full bg-orange-400" />
            <span>{renderCustomItem ? renderCustomItem(item, index) : item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
