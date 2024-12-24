'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useBookingTypes } from '@/context/booking-types';
import { ServiceSteps } from '@/components/service-steps';
import { NavBar } from '@/components/navbar';
import heroImage from '@/../public/img/social-large.jpg';

const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === 'true';

const customLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const imageSrc = heroImage?.src || '/img/social-large.jpg';

export default function HomePage() {
  const { bookingTypes, loading, error } = useBookingTypes();

  // Map `bookingTypes` to `serviceData`
  const serviceData = [
    {
      title: 'Classes',
      items: bookingTypes
        .filter((type) => type.sessionType === 'classSession')
        .map((type) => ({
          title: type.title,
          description: type.details || 'Detailed description not available.',
          duration: `${type.duration || 45}m`,
          type: 'Group', // Stubbed value
          action: `/booking?type=${type._id}`, // Dynamic action based on booking type ID
        })),
    },
    {
      title: 'Personal Classes',
      items: bookingTypes
        .filter((type) => type.sessionType === 'personalSession')
        .map((type) => ({
          title: type.title,
          description:
            type.details || 'Personalized session details not available.',
          duration: `${type.duration || 30}m`,
          type: 'Private', // Stubbed value
          action: `/booking?type=${type._id}`, // Dynamic action based on booking type ID
        })),
    },
    {
      title: 'External Link',
      url: 'https://example.com',
    },
  ].filter((section) => {
    // Remove sections where `items` is an empty array (for `Classes` and `Personal Classes` only)
    if (section.items !== undefined) {
      return section.items.length > 0;
    }
    return true; // Keep sections without `items` (e.g., 'External Link')
  });

  return (
    <div className="relative mx-auto max-w-3xl p-0 sm:p-4 xl:p-10">
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
        <h1 className="text-4xl font-bold text-primary-800">Lula Gym</h1>
        <p className="mt-2 text-left text-lg text-primary-800 sm:text-center">
          Want to get fit and enjoy the journey? <br />
          Book a personal training session with one of our talented trainers.
        </p>
      </div>

      {/* NavBar */}
      <NavBar />

      {/* Service Steps */}
      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p>Error loading services: {error}</p>
      ) : (
        <ServiceSteps steps={serviceData} />
      )}

      {/* Logo Image at Bottom Center */}
      <div className="absolute left-1/2 -translate-x-1/2 transform pt-10">
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
