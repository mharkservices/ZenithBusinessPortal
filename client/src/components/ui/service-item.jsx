import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const ServiceItem = ({ service, onSelect, selectedService, selectedSubService }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasSubServices = service.subServices && service.subServices.length > 0;
  const isServiceSelected = selectedService === service.id;
  
  const handleServiceClick = (e) => {
    e.stopPropagation();
    if (hasSubServices) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(service.id);
    }
  };

  const handleSubServiceClick = (subServiceId) => {
    onSelect(service.id, subServiceId);
  };

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Main Service Item */}
      <div 
        className={`flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 ${
          isServiceSelected && !hasSubServices 
            ? 'bg-primary text-white' 
            : 'hover:bg-gray-50'
        }`}
        onClick={handleServiceClick}
      >
        <span className={`font-medium ${isServiceSelected && !hasSubServices ? 'text-white' : 'text-gray-700'}`}>
          {service.name}
        </span>
        {hasSubServices && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={`p-1 rounded transition-colors ${
              isServiceSelected ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      {/* Sub-Services */}
      {isExpanded && hasSubServices && (
        <div className="bg-gray-50 border-t border-gray-100">
          {service.subServices.map((subService) => (
            <div 
              key={subService.id}
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                selectedService === service.id && selectedSubService === subService.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => handleSubServiceClick(subService.id)}
            >
              <span className="text-sm">• {subService.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceItem; 