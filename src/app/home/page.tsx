"use client"
import Image from "next/image";
import { ClockIcon, UserIcon } from "@heroicons/react/24/outline";

import heroImage from "@/../public/img/social-large.jpg";

const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === "true";

const customLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const imageSrc = heroImage?.src || "/img/social-large.jpg";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl p-6 sm:p-8 xl:p-10">
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
        <h1 className="text-4xl font-bold text-white">Lula Gym</h1>
        <p className="mt-2 text-lg text-gray-300">
          Want to get fit and enjoy the journey? <br />
          Book a personal training session with one of our talented trainers.
        </p>
      </div>

      {/* Service Cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          title="HIIT Session (Personal Training)"
          description="A high-intensity workout to get the most out of your time."
          duration="30m"
          type="1-on-1"
        />
        <ServiceCard
          title="Calisthenics Introduction (Personal Training)"
          description="Have one of our experts jumpstart your bodyweight workouts."
          duration="30m"
          type="1-on-1"
        />
        <ServiceCard
          title="Yoga & Pilates (Personal Training)"
          description="Improve flexibility and core strength with our guided sessions."
          duration="45m"
          type="1-on-1"
        />
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ title, description, duration, type }) {
  return (
    <div className="rounded-lg bg-gray-800 p-6 text-white shadow-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5" />
          {duration}
        </span>
        <span className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          {type}
        </span>
      </div>
    </div>
  );
}
