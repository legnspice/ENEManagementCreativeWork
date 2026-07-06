import { redirect } from "next/navigation";

export default function CatchAllPage() {
  redirect("/feed/search?query=%23YaniDrama");
}
