// components/ui/Card.tsx

import React from 'react';
import Link from 'next/link';
import { IconProps } from 'lucide-react'; // Importing types if needed

interface CardProps {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode; // Optional icon prop
  image?: string; // Optional image prop
  subtitle?: string; // Optional subtitle prop
}

const Card: React.FC<CardProps> = ({ title, description, link, icon, image, subtitle }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-start mb-4">
        {image && <img src={image} alt={`${title} image`} className="w-12 h-12 object-cover rounded-full mr-3" />}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {icon && <div className="mr-3 text-sand-500 hover:text-sand-700 transition-colors">{icon}</div>}
            <h3 className="text-xl font-semibold text-black">{title}</h3>
          </div>
          {subtitle && <h4 className="text-lg font-medium text-gray-600">{subtitle}</h4>}
          <p className="text-gray-800 mb-4">{description}</p>
        </div>
      </div>
      <Link href={link}>
        <a 
          className="text-sand-500 hover:text-sand-700 font-medium"
          aria-label={`Learn more about ${title}`}
        >
          Learn More
        </a>
      </Link>
    </div>
  );
};

export default Card;
