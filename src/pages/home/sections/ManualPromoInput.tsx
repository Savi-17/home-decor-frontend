import { useState } from 'react';
import Button from '../../../components/base/Button';

export default function ManualPromoInput() {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (!code) return alert('Enter a coupon code');
    alert(`Coupon "${code}" applied!`);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <Button size="sm" onClick={handleApply}>
        Apply
      </Button>
    </div>
  );
}
