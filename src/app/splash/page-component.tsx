"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useDateFormatter } from "react-aria"

import { Signature } from "@/components/signature"

export default function BookingDetailsPage() {
  const router = useRouter()
  const dateFormatter = useDateFormatter({ dateStyle: "full" })
  const timeFormatter = useDateFormatter({ timeStyle: "short" })

  const searchParams = useSearchParams()
  const time = searchParams?.get("time")

  // TypeScript hints that time is `string | string[]` but we want on only one string...
  const timeString = Array.isArray(time) ? time[0] : time

  const formattedTime = time
    ? `${dateFormatter.format(new Date(timeString))} at ${timeFormatter.format(
        new Date(timeString),
      )}`
    : ""

  return (
    <div className="grid h-full place-items-center p-10">
      <div className="grid justify-items-center">
        <h1 className="mt-4 text-3xl font-bold">All set!</h1>
        <div className="mt-4 space-y-2 text-center">
          <p>
            We're scheduled on{" "}
            <strong className="text-primary-600">{formattedTime}</strong>.
          </p>
          <p>You'll find an invite in your inbox.</p>
          <p>See you then!</p>
        </div>
        <Signature className="mt-6 w-40 text-primary-600" />
      </div>
    </div>
  )
}

