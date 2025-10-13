import { Link } from 'react-router-dom';
import Button from '../../../components/base/Button';

export default function CTASection() {
  return (
    <section
      className="py-20 bg-cover bg-center relative text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(108, 43, 217, 0.6), rgba(167, 115, 255, 0.6)), url('https://readdy.ai/api/search-image?query=Cozy%20lavender%20interior&width=1920&height=600')`
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6">Create Your Dream Space</h2>
        <p className="text-xl mb-8">Join thousands of happy customers who have transformed their homes.</p>
        <Link to="/products">
          <Button size="lg" className="px-8 py-4">
            Start Shopping Today <i className="ri-sparkle-line ml-2"></i>
          </Button>
        </Link>
      </div>
    </section>
  );
}
