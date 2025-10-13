export default function CouponsSection() {
  const coupons = [
    { code: 'SAVE10', description: 'Get 10% off your order' },
    { code: 'FREESHIP', description: 'Free shipping on all items' },
  ];

  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <h4 className="font-semibold mb-2">Available Coupons</h4>
      {coupons.map((coupon) => (
        <div key={coupon.code} className="flex justify-between items-center mb-2">
          <div>
            <p className="font-medium">{coupon.code}</p>
            <p className="text-xs text-gray-500">{coupon.description}</p>
          </div>
          <button className="text-sm text-lavender-600 font-semibold hover:underline">
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}
