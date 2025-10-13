import { useWishlist } from '../../../hooks/useWishlist';

export default function WishlistButton({ product }: any) {
  const { toggleItem, isInWishlist } = useWishlist();
  return (
    <button
      onClick={() => toggleItem(product)}
      className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
        isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
      }`}
    >
      <i className={isInWishlist(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}></i>
    </button>
  );
}
