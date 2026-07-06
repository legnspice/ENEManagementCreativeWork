import { redirect } from "next/navigation";

export default function UnknownPostPage() {
  redirect("/feed/search?query=%23YaniDrama");
}
