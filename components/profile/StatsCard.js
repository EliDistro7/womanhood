// Statistics Card component
const StatCard = ({ icon, title, value }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
      </div>
    );
  };