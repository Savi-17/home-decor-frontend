import HeroSection from "./sections/HeroSection";
import FeaturedCategories from "./sections/FeaturedCategories";
import FeaturedProducts from "./sections/FeaturedProducts";
import CTASection from "./sections/CTASection";
import LoginModal from "./sections/LoginModal";
import RegistrationModalModal from "./sections/RegistrationModal";
import CartModal from "./sections/CartModal";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
// import { useWishlist } from '../../hooks/useWishlist';
import { useState } from "react";
import RegistrationModal from "./sections/RegistrationModal";

export default function Home() {
  const { login, register } = useAuth();
  const {
    items: cartItems,
    addItem: addToCart,
    updateQuantity,
    removeItem,
  } = useCart();
  // const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [manualPromo, setManualPromo] = useState("");

  const availableCoupons = [
    { code: "SAVE10", discount: 10, description: "10% off your order" },
    {
      code: "WELCOME15",
      discount: 15,
      description: "15% off for new customers",
    },
    {
      code: "LAVENDER20",
      discount: 20,
      description: "20% off lavender collection",
    },
    {
      code: "FREESHIP",
      discount: 0,
      description: "Free shipping on any order",
      freeShipping: true,
    },
  ];

  const applyCoupon = (couponCode: string) => {
    setSelectedCoupon(couponCode);
    setManualPromo("");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const selectedCouponData = availableCoupons.find(
    (c) => c.code === selectedCoupon
  );
  const discount = selectedCouponData
    ? (subtotal * selectedCouponData.discount) / 100
    : 0;

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      setShowLogin(false);
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Login failed");
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await register(
        registerData.name,
        registerData.email,
        registerData.password
      );
      setShowLogin(false);
      setRegisterData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <FeaturedCategories />

      <FeaturedProducts />

      <CTASection />

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />

      <RegistrationModalModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <CartModal show={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}
