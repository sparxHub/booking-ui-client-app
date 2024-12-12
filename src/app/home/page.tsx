"use client";

import { useState } from "react";
import Image from "next/image";

import { ServiceSteps } from "@/components/service-steps";
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
