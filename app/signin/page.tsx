import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center"><SignIn /></div>
  )
}

export default page