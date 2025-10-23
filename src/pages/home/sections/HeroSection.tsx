import bgImage from '../../../images/hero.jpg';
import { Link } from 'react-router-dom';
import Button from '../../../components/base/Button';

export default function HeroSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(159, 168, 141, 0.3), rgba(167, 115, 255, 0.3)), url(${bgImage})`,
       }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-lavender-900/50 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="w-full max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Transform Your <span className="block text-lavender-300">Home</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Discover our curated collection of handcrafted candles and decor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button size="lg" className="text-lg px-8 py-4 whitespace-nowrap">
                Shop Collection <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
