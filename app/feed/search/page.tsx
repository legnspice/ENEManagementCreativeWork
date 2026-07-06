import { AppFrame } from "../../_components/AppFrame";
import { FeedHeader } from "../../_components/Header";
import { PostCard } from "../../_components/PostCard";
import type { Post } from "../../_components/PostCard";

const FEED: Post[] = [
  {
    id: "lsf-expose",
    author: "LiveStreamFails",
    authorHandle: "livestreamfails",
    avatarSrc: "/avatars/livestreamfails.svg",
    verified: true,
    pinned: true,
    title: "Popular Streamer Yani Exposed For Having A Secret Family",
    body: (
      <>
        Yani, otherwise known as Adrian Capistano, has been found to actually be a married man and
        father of two, after 4chan users dug through his digital records by targeting information
        regarding his known relatives.
      </>
    ),
    embedSrc: "/embeds/livestreamfails-yani.svg",
    embedAlt: "Photo of Yani",
    upvotes: "14M",
    downvotes: "49K",
    timestamp: "3d",
  },
  {
    id: "teamstarr-expose",
    author: "TeamStarr",
    authorHandle: "teamstarr",
    avatarSrc: "/avatars/teamstarr.svg",
    verified: true,
    title: "DRAMA ALERT: YANI IS A SERIAL LIAR AND MANIPULATOR!!!",
    body: (
      <>
        New vid dropping TNIGHT on how the famous thirst trapper and self-proclaimed &ldquo;single
        E-Boy&rdquo; streamer Yani has SCAMMED his entire audience. HE&apos;S DONE.
      </>
    ),
    upvotes: "2M",
    downvotes: "5K",
    timestamp: "2d",
  },
  {
    id: "mooji-clickbait",
    author: "Mooji",
    authorHandle: "mooji",
    avatarSrc: "/avatars/mooji.svg",
    verified: true,
    title: "How this Fake E-Boy just ended his career in the MOST UNHINGED way possible - The Lies of Yani",
    body: null,
    embedSrc: "/embeds/mooji-thumbnail.svg",
    embedAlt: "Yani's face with black background and the text IT'S OVER.",
    sponsorText: (
      <>
        Use the code &ldquo;MOOJI&rdquo; to get a 10% discount on GamerZups RIGHT NOW!{" "}
        <span className="text-accent underline">https://gamerzups.com</span>{" "}
        &middot; Sponsored by Raid Light Legends.
      </>
    ),
    upvotes: "432K",
    downvotes: "11K",
    timestamp: "2d",
  },
  {
    id: "tscbn-breaking",
    author: "TSCBN News",
    authorHandle: "tscbn",
    avatarSrc: "/avatars/tscbn.svg",
    verified: true,
    title: "BREAKING: Crazed Fans Attack Internet Celebrity \"Yani\" in Own Home With Family",
    body: (
      <>
        Police have reported that a group of armed individuals stormed Adrian &ldquo;Yani&rdquo;
        Capistano&apos;s residence last night. Multiple shots were fired as officers engaged with
        them on the scene. In the end, all suspects were apprehended and taken into custody. After
        initial questioning, the attack is found to be apparently motivated by Yani&apos;s
        &ldquo;betrayal&rdquo; of their most devoted supporters. We have yet to receive a statement
        from the victims.
      </>
    ),
    upvotes: "9M",
    downvotes: "2K",
    timestamp: "1d",
  },
  {
    id: "teamstarr-prayers",
    author: "TeamStarr",
    authorHandle: "teamstarr",
    avatarSrc: "/avatars/teamstarr.svg",
    verified: true,
    body: (
      <>
        This is disgusting. Sending my deepest prayers to Adrian&apos;s family right now. Violence
        is never the answer. I always warn you guys about the dangers of parasocial
        relationships... Go f*cking touch grass y&apos;all and pray for his family.
      </>
    ),
    upvotes: "5M",
    downvotes: "132K",
    timestamp: "1d",
  },
  {
    id: "yani-goodbye",
    author: "Yani",
    authorHandle: "yani",
    avatarSrc: "/avatars/yani.svg",
    verified: true,
    title: "Goodbye.",
    body: null,
    embedSrc: "/embeds/yani-apology.svg",
    embedAlt: "White background apology statement",
    upvotes: "2M",
    downvotes: "1M",
    timestamp: "20h",
  },
  {
    id: "zhongli-reply",
    author: "Zhongli's Chair",
    authorHandle: "zhonglischair",
    avatarSrc: "/avatars/zhonglischair.svg",
    body: (
      <>
        What happened to @Yani was bad for sure. But with all of the disgusting sh*t he&apos;s
        done, I&apos;d say he deserved it all.
      </>
    ),
    upvotes: "132",
    downvotes: "6",
    timestamp: "18h",
  },
  {
    id: "drykritkal-prophet",
    author: "DryKritkal",
    authorHandle: "drykritkal",
    avatarSrc: "/avatars/drykritkal.svg",
    verified: true,
    title: "About the whole Yani situation...",
    body: null,
    embedSrc: "/embeds/drykritkal-embed.svg",
    embedAlt: "About the whole Yani situation static thumbnail",
    upvotes: "240K",
    downvotes: "478K",
    timestamp: "16h",
    href: "/post/104856222992415",
  },
];

export default function FeedPage() {
  return (
    <AppFrame>
      <FeedHeader />
      {FEED.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppFrame>
  );
}
