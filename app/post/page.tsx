import { redirect } from "next/navigation";

export default function PostRootPage() {
  redirect("/feed/search?query=%23YaniDrama");
}
