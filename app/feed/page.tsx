import { redirect } from "next/navigation";

export default function FeedRootPage() {
  redirect("/feed/search?query=%23YaniDrama");
}
