'use client';
import Button from '../../../components/base/Button';
import { useCart } from '../../../hooks/useCart';
import CouponsSection from './CouponSection';
import ManualPromoInput from './ManualPromoInput';
import CartSummary from './CartSummary';

interface CartModalProps {
  show: boolean;
  onClose: () => void;
}

export default function CartModal({ show, onClose }: CartModalProps) {
  const { items, removeItem, clearCart } = useCart();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-white w-full sm:w-[400px] h-full flex flex-col relative shadow-lg">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600">
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4 space-y-3">
          <CouponsSection />
          <ManualPromoInput />
          <CartSummary />
          {items.length > 0 && (
            <>
              <Button className="w-full">Checkout</Button>
              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
