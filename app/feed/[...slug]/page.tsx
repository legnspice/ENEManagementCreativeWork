import { redirect } from "next/navigation";

export default function UnknownFeedPage() {
  redirect("/feed/search?query=%23YaniDrama");
}
