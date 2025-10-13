// /app/components/ProductDisplay.jsx
"use client"; // This makes it an interactive component

import { useState } from 'react';

export default function ProductDisplay({ product }) {
  // Set the default main image to the first one in the array
  const [mainImage, setMainImage] = useState(
    product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : ''
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* Image Gallery Column */}
        <div>
          <div className="flex justify-center border rounded-lg p-6 shadow-md bg-gray-50">
            {/* Main Image */}
            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-w-md h-auto object-contain rounded-lg"
            />
          </div>
          {/* Thumbnails */}
          {product.imageUrls && product.imageUrls.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              {product.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  // Change the main image on click
                  onClick={() => setMainImage(url)}
                  className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all ${
                    mainImage === url ? 'border-red-500 shadow-md' : 'border-gray-300'
                  } hover:border-red-300 hover:shadow-md`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="space-y-6">
          <div>
            <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full text-white ${
              product.drugType === 'OTC' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {product.drugType === 'OTC' ? 'Over-the-Counter' : 'Prescription Required'}
            </span>
            <h1 className="text-5xl font-extrabold my-4 text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{product.shortDescription}</p>
          </div>

          {product.usagePoints && product.usagePoints.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Key Benefits & Usage</h3>
              <ul className="space-y-3">
                {product.usagePoints.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.longDescription && (
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Description</h3>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.longDescription }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}