import LayoutWrapper from "./layout/home-layout-wrapper"

export const metadata = {
  title: "Home | Lula Gym",
  description: "Book your personal training sessions at Lula Gym",
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}
