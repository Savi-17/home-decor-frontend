export default function ProductBadges({ isNew, onSale }: { isNew?: string ; onSale?: string }) {
  return (
    <div className="absolute top-3 left-3 flex flex-col gap-2">
      {isNew =="on" && <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">New</span>}
      {onSale=="on" && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sale</span>}
    </div>
  );
}
