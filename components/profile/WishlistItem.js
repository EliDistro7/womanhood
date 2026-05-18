// WishlistItem component
const WishlistItem = ({ item, onRemove }) => {
    return (
      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm mb-3">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image 
            src={`/images/${item.mainImage}`} 
            alt={item.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="ml-4 flex-1">
          <h4 className="font-medium">{item.title}</h4>
          <p className="text-sm text-gray-600">${item.price}</p>
        </div>
        <div>
          <button 
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };