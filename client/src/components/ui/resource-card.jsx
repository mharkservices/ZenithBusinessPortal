"use client"

import { Link } from "wouter"
import PropTypes from 'prop-types'

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={resource.image} 
          alt={resource.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="text-xs font-medium text-accent uppercase tracking-wider">
          {resource.category}
        </span>
        <h3 className="font-poppins font-semibold text-lg mt-2 mb-3">{resource.title}</h3>
        <p className="text-[#6c757d] mb-4 line-clamp-2">{resource.description}</p>
        <Link 
          href={resource.link}
          className="text-primary font-medium hover:text-accent transition-colors duration-200 inline-flex items-center"
        >
          Read Article
          <i className="ri-arrow-right-line ml-1"></i>
        </Link>
      </div>
    </div>
  )
}

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired
}

export default ResourceCard
