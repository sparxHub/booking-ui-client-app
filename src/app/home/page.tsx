"use client";

import { useState } from "react";
import { ClockIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import heroImage from "@/../public/img/social-large.jpg";

const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === "true";

const customLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const imageSrc = heroImage?.src || "/img/social-large.jpg";

export default function HomePage() {
  const serviceData = [
    {
      title: "Classes",
      items: [
        { title: "Yoga", description: "Improve flexibility and core strength.", duration: "45m", type: "Group", action: "/booking?yoga" },
        { title: "Power", description: "High-energy strength training session.", duration: "60m", type: "Group", action: "/booking?power" },
        { title: "Mix", description: "Combination of cardio and strength.", duration: "50m", type: "Group", action: "/booking?mix" },
        { title: "Mix", description: "Combination of cardio and strength.", duration: "50m", type: "Group", action: "/booking?mix" },
        { title: "HIIT", description: "Combination of cardio and strength.", duration: "50m", type: "Group", action: "/booking?mix" },
      ],
    },
    {
      title: "Private Classes",
      items: [
        { title: "Yoga with Dave", description: "1-on-1 private yoga session.", duration: "30m", type: "Private", action: "/booking?dave" },
        { title: "Yoga with Natalie", description: "Personalized yoga instruction.", duration: "30m", type: "Private", action: "/booking?natalie" },
      ],
    },
    {
      title: "External Link",
      url: "https://example.com",
    },
  ];

  return (
    <div className="relative mx-auto max-w-3xl p-6 sm:p-8 xl:p-10">
      {/* Centered Content */}
      <div className="text-center">
        {/* Avatar Image */}
        <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-gray-800 shadow-md">
          <Image
            src={imageSrc}
            loader={isExport ? customLoader : undefined}
            priority
            sizes="(min-width: 640px) 400px, 200px"
            width={128}
            height={128}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Title and Description */}
        <h1 className="text-4xl font-bold text-primary-900">Lula Gym</h1>
        <p className="mt-2 text-lg text-primary-800">
          Want to get fit and enjoy the journey? <br />
          Book a personal training session with one of our talented trainers.
        </p>
      </div>

      {/* Service Steps */}
      <ServiceSteps steps={serviceData} />

      {/* Logo Image at Bottom Center */}
      <div className="absolute pt-10 left-1/2 transform -translate-x-1/2">
        <img
          src="/img/simply_studio_logo_b_w.png"
          alt="Simply Studio Logo"
          width={150}
          height={50}
        />
      </div>
    </div>
  );
}

function ServiceSteps({ steps }) {
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
          className="mb-4 inline-flex items-center text-primary-900 hover:text-primary-700"
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
      className={`relative rounded-lg bg-gray-800 p-6 text-white shadow-lg ${
        hasNested ? "cursor-pointer hover:bg-gray-700" : ""
      }`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold">{item.title}</h3>
      {item.description && <p className="mt-2 text-gray-400">{item.description}</p>}
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
        <ChevronRightIcon className="absolute top-1/2 right-4 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-200" />
      )}
    </div>
  );
}
