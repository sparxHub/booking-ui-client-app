"use client";

import { useState } from "react";
import { ClockIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


export function ServiceSteps({ steps }) {
  const [activeLevel, setActiveLevel] = useState(0); // Track active level
  const [currentItems, setCurrentItems] = useState(steps);

  const handleItemClick = (item) => {
    if (item.items) {
      // If there is a nested level, show it
      setActiveLevel(activeLevel + 1);
      setCurrentItems(item.items);
    } else if (item.action) {
      // Navigate to action URL
      window.location.href = item.action;
    } else if (item.url) {
      // Navigate to external link
      window.location.href = item.url;
    }
  };

  const handleBackClick = () => {
    // Go back to the previous level
    setActiveLevel(activeLevel - 1);
    setCurrentItems(steps);
  };

  // Handle special case: only one group
  if (steps.length === 1) {
    const singleGroup = steps[0];
    if (singleGroup.items) {
      return (
        <div className={`grid gap-4 sm:grid-cols-2`}>
          {singleGroup.items.map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              onClick={() => handleItemClick(item)}
              hasNested={false}
            />
          ))}
        </div>
      );
    }
  }

  return (
    <div className="mt-10 relative overflow-hidden">
      {activeLevel > 0 && (
        <button
          onClick={handleBackClick}
          className="mb-4 inline-flex items-center text-primary-900 hover:text-primary-900"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>
      )}
      <div
        className={`grid gap-4 ${
          activeLevel === 0 ? "" : "sm:grid-cols-2"
        } transition-transform duration-300`}
        // style={{ transform: `translateX(-${activeLevel * 100}%)` }}
      >
        {currentItems.map((item, index) => (
          <ServiceCard
            key={index}
            item={item}
            onClick={() => handleItemClick(item)}
            hasNested={!!item.items}
          />
        ))}
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ item, onClick, hasNested }) {
  return (
    <div
      className={`relative rounded-lg bg-primary-900 p-6 text-white shadow-lg cursor-pointer hover:bg-primary-800`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold">{item.title}</h3>
      {item.description && <p className="mt-2 text-primary-400">{item.description}</p>}
      {item.duration && item.type && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            {item.duration}
          </span>
          <span className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            {item.type}
          </span>
        </div>
      )}
      {hasNested && (
        <ChevronRightIcon className="absolute top-1/2 right-4 transform -translate-y-1/2 h-5 w-5 text-primary-400 hover:text-primary-200" />
      )}
    </div>
  );
}