import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../../../components/base/Button';

export default function FeaturedCategories() {
  const [ categories, setCategories ] =useState<any>([]);
  const [ error, setError ] = useState<string | null>(null);


  const productsByCategories = async () => {
      try{
        const response = await axios.get('api/category/productByCategories');
        setCategories(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError('Failed to fetch featured products');
        console.error(err);
      }
    };

  useEffect(() => {
    productsByCategories();
  }, []);

  return (
    <section className="py-16 bg-lavender-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
        <p className="text-gray-600 mb-12">Explore our curated collections</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category : any) => (
            <Link key={category.id} to="/products" className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={category.image[1]} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.total_products} Products</p>
                  <Button variant="outline" size="sm" className="w-full">Shop Now</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
