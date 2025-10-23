import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoryListing } from "../../store/slice/categorySlice";

export default function FiltersSidebar() {

   const dispatch = useDispatch<any>();

   const { category, subCategory } = useSelector((state: any) => state.category);
   if (!category) return <p>No category available.</p>;

   const parentId = category.id;

   useEffect(() => {
    if (parentId) {
      dispatch(getSubCategoryListing({ parentId: Number(parentId) }));
    }
  }, [parentId, dispatch]);

  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button 
          
          className="text-sm text-lavender-600 hover:text-lavender-700">
            Reset All
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
          {category?.name && (
            <h2 className="col-span-full text-xl font-semibold mb-2">
              {category.name}
            </h2>
          )}
          
           <div className="space-y-2">
          
            {!!subCategory.length &&
            subCategory.map((item: any) => (
              <label key={item.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="subCategory"
                  value={item.id}
                  className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Min Price: $0</label>
              <input
                type="range"
                min="0"
                max="500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max Price: $500</label>
              <input
                type="range"
                min="0"
                max="500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h4>
          <div className="space-y-2">
            {["On Sale", "New Arrivals", "Free Shipping"].map((filter) => (
              <label key={filter} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                />
                <span className="ml-2 text-sm text-gray-700">{filter}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
