import HomeForm from "@/components/home-form";
import Profile from "@/components/profile";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 font-mali font-bold">
      <Profile />
      <h1 className="text-primary text-4xl">Welcome to Music Chat</h1>
      <HomeForm />
    </div>
  )
}
