"use client";

export function Dialog({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="relative mx-auto w-full max-w-md rounded-lg bg-white shadow-lg p-6">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
      {children}
    </div>
  );
}
