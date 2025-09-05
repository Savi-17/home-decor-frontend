export const featuredProducts = [
  {
    id: '1',
    name: 'Lavender Dreams Scented Candle',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20lavender%20scented%20candle%20in%20elegant%20glass%20jar%20with%20soft%20lighting%2C%20minimalist%20white%20background%2C%20premium%20product%20photography%20style%2C%20warm%20ambient%20lighting&width=400&height=400&seq=candle1&orientation=squarish',
    category: 'Candles',
    rating: 4.8,
    reviews: 156,
    isNew: true,
    onSale: true,
    description: 'Indulge in the calming essence of lavender with our premium scented candle, crafted from natural soy wax for a clean, long-lasting burn.'
  },
  {
    id: '2',
    name: 'Handcrafted Natural Soap Set',
    price: 32.99,
    image: 'https://readdy.ai/api/search-image?query=Artisan%20handmade%20natural%20soap%20bars%20collection%20with%20herbs%20and%20flowers%2C%20rustic%20wooden%20background%2C%20organic%20skincare%20products%2C%20soft%20natural%20lighting%2C%20minimal%20styling&width=400&height=400&seq=soap1&orientation=squarish',
    category: 'Soaps',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    onSale: false,
    description: 'Luxurious handcrafted soap collection made with organic ingredients and essential oils for a gentle, nourishing cleanse.'
  },
  {
    id: '3',
    name: 'Abstract Sunset Canvas Art',
    price: 89.99,
    image: 'https://readdy.ai/api/search-image?query=Modern%20abstract%20sunset%20painting%20on%20canvas%20with%20warm%20colors%20orange%20and%20pink%2C%20contemporary%20art%20piece%20for%20home%20decor%2C%20clean%20white%20background%2C%20professional%20art%20photography&width=400&height=400&seq=painting1&orientation=squarish',
    category: 'Paintings',
    rating: 4.7,
    reviews: 234,
    isNew: true,
    onSale: false,
    description: 'Transform your space with this stunning abstract sunset canvas art, featuring vibrant warm tones that create a captivating focal point.'
  },
  {
    id: '4',
    name: 'Elegant Gypsum Wall Panel',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20white%20gypsum%20decorative%20wall%20panel%20with%20intricate%20geometric%20patterns%2C%20luxury%20interior%20design%20element%2C%20modern%20architectural%20detail%2C%20clean%20studio%20lighting&width=400&height=400&seq=gypsum1&orientation=squarish',
    category: 'Gypsum',
    rating: 4.6,
    reviews: 67,
    isNew: false,
    onSale: true,
    description: 'Elevate your interior design with this sophisticated gypsum wall panel featuring intricate geometric patterns and premium craftsmanship.'
  },
  {
    id: '5',
    name: 'Vanilla Bean Luxury Candle',
    price: 28.99,
    image: 'https://readdy.ai/api/search-image?query=Luxury%20vanilla%20scented%20candle%20in%20frosted%20glass%20container%2C%20premium%20home%20fragrance%20product%2C%20elegant%20minimal%20styling%2C%20soft%20warm%20lighting%2C%20white%20background&width=400&height=400&seq=candle2&orientation=squarish',
    category: 'Candles',
    rating: 4.8,
    reviews: 192,
    isNew: false,
    onSale: false,
    description: 'Experience the warm, comforting aroma of vanilla bean in this luxury candle, perfect for creating a cozy atmosphere in any room.'
  },
  {
    id: '6',
    name: 'Rose & Honey Face Soap',
    price: 18.99,
    image: 'https://readdy.ai/api/search-image?query=Premium%20rose%20and%20honey%20natural%20face%20soap%20bar%20with%20dried%20rose%20petals%2C%20organic%20skincare%20product%2C%20rustic%20spa%20aesthetic%2C%20soft%20natural%20lighting&width=400&height=400&seq=soap2&orientation=squarish',
    category: 'Soaps',
    rating: 4.7,
    reviews: 143,
    isNew: true,
    onSale: false,
    description: 'Pamper your skin with this luxurious rose and honey face soap, enriched with natural ingredients for a gentle and nourishing cleanse.'
  },
  {
    id: '7',
    name: 'Botanical Watercolor Print',
    price: 45.99,
    originalPrice: 65.99,
    image: 'https://readdy.ai/api/search-image?query=Delicate%20botanical%20watercolor%20painting%20of%20tropical%20leaves%20and%20flowers%2C%20soft%20pastel%20colors%2C%20nature%20wall%20art%2C%20elegant%20home%20decor%20piece%2C%20white%20background&width=400&height=400&seq=painting2&orientation=squarish',
    category: 'Paintings',
    rating: 4.9,
    reviews: 78,
    isNew: false,
    onSale: true,
    description: 'Bring nature indoors with this beautiful botanical watercolor print featuring delicate tropical leaves and flowers in soft pastel hues.'
  },
  {
    id: '8',
    name: '3D Gypsum Flower Relief',
    price: 199.99,
    image: 'https://readdy.ai/api/search-image?query=Intricate%203D%20gypsum%20wall%20sculpture%20with%20detailed%20flower%20relief%20patterns%2C%20luxury%20interior%20decoration%2C%20architectural%20art%20piece%2C%20professional%20studio%20photography&width=400&height=400&seq=gypsum2&orientation=squarish',
    category: 'Gypsum',
    rating: 4.8,
    reviews: 45,
    isNew: true,
    onSale: false,
    description: 'Add architectural elegance to your space with this intricate 3D gypsum flower relief, showcasing exceptional craftsmanship and detail.'
  }
];

// Extended product list for the products page
export const allProducts = [
  ...featuredProducts,
  {
    id: '9',
    name: 'Citrus Fresh Candle Collection',
    price: 45.99,
    image: 'https://readdy.ai/api/search-image?query=Set%20of%20citrus%20scented%20candles%20with%20orange%20lemon%20and%20lime%20fragrances%2C%20colorful%20glass%20jars%2C%20fresh%20and%20vibrant%20product%20photography%2C%20white%20background&width=400&height=400&seq=candle3&orientation=squarish',
    category: 'Candles',
    rating: 4.6,
    reviews: 128,
    isNew: true,
    onSale: false,
    description: 'Energize your space with this vibrant citrus candle collection featuring orange, lemon, and lime fragrances in beautiful glass containers.'
  },
  {
    id: '10',
    name: 'Charcoal Detox Soap Bar',
    price: 15.99,
    image: 'https://readdy.ai/api/search-image?query=Black%20charcoal%20detox%20soap%20bar%20with%20natural%20ingredients%2C%20spa%20skincare%20product%2C%20minimalist%20dark%20aesthetic%2C%20premium%20product%20photography&width=400&height=400&seq=soap3&orientation=squarish',
    category: 'Soaps',
    rating: 4.5,
    reviews: 203,
    isNew: false,
    onSale: false,
    description: 'Deep cleanse and purify your skin with this activated charcoal detox soap bar, perfect for removing impurities and excess oil.'
  },
  {
    id: '11',
    name: 'Mountain Landscape Oil Painting',
    price: 125.99,
    originalPrice: 175.99,
    image: 'https://readdy.ai/api/search-image?query=Serene%20mountain%20landscape%20oil%20painting%20with%20misty%20peaks%20and%20valley%2C%20traditional%20landscape%20art%2C%20realistic%20painting%20style%2C%20framed%20artwork&width=400&height=400&seq=painting3&orientation=squarish',
    category: 'Paintings',
    rating: 4.9,
    reviews: 92,
    isNew: false,
    onSale: true,
    description: 'Escape to nature with this breathtaking mountain landscape oil painting, featuring serene peaks and valleys in realistic detail.'
  },
  {
    id: '12',
    name: 'Modern Geometric Gypsum Tile',
    price: 89.99,
    image: 'https://readdy.ai/api/search-image?query=Modern%20geometric%20gypsum%20decorative%20tile%20with%20contemporary%20patterns%2C%20white%20architectural%20element%2C%20minimalist%20interior%20design%2C%20clean%20studio%20lighting&width=400&height=400&seq=gypsum3&orientation=squarish',
    category: 'Gypsum',
    rating: 4.7,
    reviews: 156,
    isNew: true,
    onSale: false,
    description: 'Create contemporary elegance with this modern geometric gypsum tile, perfect for accent walls and architectural features.'
  },
  {
    id: '13',
    name: 'Amber & Sandalwood Candle',
    price: 35.99,
    image: 'https://readdy.ai/api/search-image?query=Luxury%20amber%20and%20sandalwood%20scented%20candle%20in%20dark%20glass%20jar%2C%20warm%20and%20sophisticated%20fragrance%2C%20premium%20candle%20photography%2C%20elegant%20styling&width=400&height=400&seq=candle4&orientation=squarish',
    category: 'Candles',
    rating: 4.8,
    reviews: 174,
    isNew: false,
    onSale: false,
    description: 'Immerse yourself in the rich, warm blend of amber and sandalwood with this sophisticated luxury candle.'
  },
  {
    id: '14',
    name: 'Oatmeal & Honey Exfoliating Soap',
    price: 22.99,
    image: 'https://readdy.ai/api/search-image?query=Natural%20oatmeal%20and%20honey%20exfoliating%20soap%20bar%20with%20visible%20oat%20flakes%2C%20organic%20skincare%20product%2C%20rustic%20natural%20styling%2C%20soft%20lighting&width=400&height=400&seq=soap4&orientation=squarish',
    category: 'Soaps',
    rating: 4.6,
    reviews: 267,
    isNew: false,
    onSale: false,
    description: 'Gently exfoliate and moisturize your skin with this nourishing oatmeal and honey soap bar, perfect for sensitive skin.'
  },
  {
    id: '15',
    name: 'Abstract Blue Wave Art',
    price: 75.99,
    image: 'https://readdy.ai/api/search-image?query=Abstract%20blue%20wave%20painting%20with%20fluid%20dynamic%20forms%2C%20contemporary%20ocean%20inspired%20art%2C%20blue%20and%20white%20colors%2C%20modern%20wall%20decor&width=400&height=400&seq=painting4&orientation=squarish',
    category: 'Paintings',
    rating: 4.4,
    reviews: 118,
    isNew: true,
    onSale: false,
    description: 'Add flowing movement to your walls with this dynamic abstract blue wave painting, inspired by ocean currents and natural forms.'
  },
  {
    id: '16',
    name: 'Classical Column Gypsum Detail',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://readdy.ai/api/search-image?query=Classical%20architectural%20gypsum%20column%20detail%20with%20ornate%20carved%20patterns%2C%20traditional%20decorative%20molding%2C%20luxury%20interior%20element%2C%20white%20plaster&width=400&height=400&seq=gypsum4&orientation=squarish',
    category: 'Gypsum',
    rating: 4.9,
    reviews: 34,
    isNew: false,
    onSale: true,
    description: 'Bring classical elegance to your space with this ornate gypsum column detail, featuring traditional carved patterns and luxury craftsmanship.'
  }
];

export const categories = [
  {
    id: 'candles',
    name: 'Candles & Lighting',
    image: 'https://readdy.ai/api/search-image?query=Collection%20of%20beautiful%20scented%20candles%20and%20decorative%20lighting%2C%20warm%20cozy%20atmosphere%2C%20home%20decor%20styling%2C%20elegant%20interior%20design%2C%20soft%20ambient%20lighting&width=600&height=400&seq=cat1&orientation=landscape',
    count: 45
  },
  {
    id: 'soaps',
    name: 'Bath & Body',
    image: 'https://readdy.ai/api/search-image?query=Luxury%20handmade%20soaps%20and%20bath%20products%20collection%2C%20spa%20aesthetic%2C%20natural%20ingredients%2C%20organic%20skincare%20display%2C%20clean%20minimal%20styling&width=600&height=400&seq=cat2&orientation=landscape',
    count: 32
  },
  {
    id: 'paintings',
    name: 'Wall Art',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20wall%20art%20paintings%20collection%20displayed%20in%20modern%20home%20interior%2C%20contemporary%20art%20pieces%2C%20gallery%20wall%20inspiration%2C%20elegant%20home%20decor&width=600&height=400&seq=cat3&orientation=landscape',
    count: 67
  },
  {
    id: 'gypsum',
    name: 'Gypsum Decor',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20gypsum%20decorative%20wall%20panels%20and%20ceiling%20designs%2C%20luxury%20interior%20architecture%2C%20modern%20home%20decoration%2C%20sophisticated%20design%20elements&width=600&height=400&seq=cat4&orientation=landscape',
    count: 23
  }
];