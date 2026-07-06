import { AppFrame } from "../../_components/AppFrame";
import { FeedHeader } from "../../_components/Header";
import { PostCard } from "../../_components/PostCard";
import type { Post } from "../../_components/PostCard";

const FEED: Post[] = [
  {
    id: "lsf-expose",
    author: "LiveStreamFails",
    authorHandle: "livestreamfails",
    avatarSrc: "/avatars/lsf.png",
    verified: true,
    pinned: true,
    title: "Popular Streamer Yani Exposed For Having A Secret Family",
    body: (
      <>
        Despite his image of being a young bachelor and innocent streamer, Yani,
        otherwise known as Adrian Capistano, has been found to actually be a
        married man and father of two—after 4chan users dug through his digital
        records by targeting information regarding his known relatives.
      </>
    ),
    embedSrc: "/embeds/livestreamfails.jpg",
    embedAlt: "Photo of Yani",
    upvotes: "14M",
    downvotes: "49K",
    timestamp: "3d",
  },
  {
    id: "teamstarr-expose",
    author: "TeamStarr",
    authorHandle: "TEAMSTARR",
    avatarSrc: "/avatars/teamstarr.png",
    verified: true,
    title: "🚨🚨🚨 DRAMA ALERT: YANI IS A SERIAL LIAR AND MANIPULATOR!!!",
    body: (
      <>
        <br />
        New vid dropping TONIGHT on how the famous THIRST TRAPPER and
        self-proclaimed &ldquo;SINGLE E-BOY&rdquo; Yani has SCAMMED his entire
        audience. <br /> <br />
        HE&apos;S DONE.
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
    avatarSrc: "/avatars/mooji.jpg",
    verified: true,
    title:
      "How this Fake E-Boy just ended his career in the MOST UNHINGED way possible - The Lies of Yani",
    body: null,
    embedSrc: "/embeds/mooji.jpg",
    embedAlt: "Yani's face with black background and the text IT'S OVER.",
    sponsorText: (
      <>
        Use the code &ldquo;MOOJI&rdquo; to get a 10% discount on GamerZups
        RIGHT NOW!{" "}
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
    title:
      'BREAKING: Crazed Fans Attack Internet Celebrity "Yani" in Own Home With Family',
    body: (
      <>
        <br />
        Police have reported that a group of armed individuals stormed Adrian
        &ldquo;Yani&rdquo; Capistano&apos;s residence last night. Shots were
        fired as officers engaged with them on the scene. In the end, all
        suspects were apprehended and taken into custody. <br /> <br />
        After initial questioning, the attack is found to be apparently
        motivated by Yani&apos;s &ldquo;betrayal&rdquo; of their most devoted
        supporters. We have yet to receive a statement from the victims.
      </>
    ),
    upvotes: "9M",
    downvotes: "2K",
    timestamp: "1d",
  },
  {
    id: "teamstarr-prayers",
    author: "TeamStarr",
    authorHandle: "TEAMSTARR",
    avatarSrc: "/avatars/teamstarr.png",
    verified: true,
    title: "That was disgusting.",
    body: (
      <>
        My heart goes out to Adrian&apos;s family right now. Violence is never
        the answer. I always warn you guys about the dangers of parasocial
        relationships... Go f*cking touch grass y&apos;all and pray for his
        family.
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
    avatarSrc: "/avatars/yani.png",
    verified: true,
    title: "Goodbye.",
    body: null,
    embedSrc: "/embeds/apology.png",
    embedAlt: "White background apology statement",
    upvotes: "2M",
    downvotes: "1M",
    timestamp: "20h",
  },
  {
    id: "zhongli-reply",
    author: "Zhongli's Chair",
    authorHandle: "zhonglischair",
    avatarSrc: "/avatars/zhongli.png",
    body: (
      <>
        What happened to @Yani was bad for sure. But with all of the disgusting
        sh*t he&apos;s done, I&apos;d say he deserved it all.
      </>
    ),
    upvotes: "132",
    downvotes: "6",
    timestamp: "18h",
  },
  {
    id: "drykritkal-prophet",
    author: "Niles",

    authorHandle: "DryCr1TiKaL",
    avatarSrc: "/avatars/drykritkal.png",
    verified: true,
    title: "About the whole Yani situation...",
    body: null,
    embedSrc: "/embeds/about.png",
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
