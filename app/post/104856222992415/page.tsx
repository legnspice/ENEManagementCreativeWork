import Image from "next/image";
import { AppFrame } from "../../_components/AppFrame";
import { Avatar } from "../../_components/Avatar";
import { Comment, type CommentData } from "../../_components/CommentThread";
import { CommentSection } from "../../_components/CommentComposer";
import { PostHeader } from "../../_components/Header";
import { LoadMoreButton } from "../../_components/LoadMoreButton";
import { Votes } from "../../_components/Votes";

const COMMENTS: CommentData[] = [
  {
    id: "user992",
    author: "User992",
    authorHandle: "User992",
    avatarSrc: "/avatars/user992.svg",
    timestamp: "1 hour ago",
    body: (
      <>
        Bro Yani is a scammer. He brought this on himself. Why are you defending a criminal who
        screwed over his fans? He deserves to lose his career and safety bro.
      </>
    ),
    upvotes: "5.2k",
    downvotes: "12",
    replies: [
      {
        id: "drykritkal-r1",
        author: "DryKritkal",
        authorHandle: "DryKritkal",
        avatarSrc: "/avatars/drykritkal.svg",
        badge: "PROPHET",
        timestamp: "45 mins ago",
        body: (
          <>
            I literally said he deserves to lose his channel, try reading the post. But violently
            ending someone&apos;s capacity to live and work violates the{" "}
            <strong>Dignity of Human Labor</strong>. Yes, he needs consequences, but destroying his
            physical life through a doxxing mob isn&apos;t justice, it&apos;s just plain psychotic.
          </>
        ),
        upvotes: "14",
        downvotes: "850",
      },
    ],
  },
  {
    id: "teamhype-1",
    author: "teamHYPE",
    authorHandle: "teamHYPE",
    avatarSrc: "/avatars/teamhype.svg",
    timestamp: "50 mins ago",
    body: (
      <>
        You&apos;re blaming TeamStarr for this??? They just reported the news. They didn&apos;t
        tell those crazy fans to attack his family.
      </>
    ),
    upvotes: "3.1k",
    downvotes: "5",
    replies: [
      {
        id: "drykritkal-r2",
        author: "DryKritkal",
        authorHandle: "DryKritkal",
        avatarSrc: "/avatars/drykritkal.svg",
        badge: "PROPHET",
        timestamp: "35 mins ago",
        body: (
          <>
            You can&apos;t toss a grenade into a room, monetize the explosion, and then act like an
            innocent journalist. That is exactly what a <strong>Structure of Sin</strong> is.
          </>
        ),
        upvotes: "8",
        downvotes: "420",
        replies: [
          {
            id: "teamhype-2",
            author: "teamHYPE",
            authorHandle: "teamHYPE",
            avatarSrc: "/avatars/teamhype.svg",
            timestamp: "22 mins ago",
            body: (
              <>
                And ??? Stop acting like a f*cking saint with your words and sh*t. I mean look at
                you, you&apos;re probably just farming engagement off of this situation yourself
              </>
            ),
            upvotes: "2.2k",
            downvotes: "9",
            replies: [
              {
                id: "drykritkal-r3",
                author: "DryKritkal",
                authorHandle: "DryKritkal",
                avatarSrc: "/avatars/drykritkal.svg",
                badge: "PROPHET",
                timestamp: "20 mins ago",
                body: (
                  <>
                    I always turn off all of the monetization for my videos and posts when I talk
                    about sensitive stuff. AND—the principle of{" "}
                    <strong>Participation</strong> dictates that we can&apos;t just be bystanders
                    watching the fire; we have a duty to hold the people selling the matches
                    accountable.
                  </>
                ),
                upvotes: "40",
                downvotes: "1.7k",
                replies: [
                  {
                    id: "teamhype-3",
                    author: "teamHYPE",
                    authorHandle: "teamHYPE",
                    avatarSrc: "/avatars/teamhype.svg",
                    timestamp: "10 mins ago",
                    body: (
                      <>
                        No monetization? So what????? at the end of the day you&apos;re still tryna
                        get clout anyways f*ckwit
                      </>
                    ),
                    upvotes: "489",
                    downvotes: "6",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "megan",
    author: "Megan",
    authorHandle: "Megan",
    avatarSrc: "/avatars/megan.svg",
    timestamp: "30 mins ago",
    body: (
      <>
        OH PLEASE, don&apos;t act like his family are victims. They are MULTI-MILLIONAIRES living
        in a mansion. They have the money to pay for the hospital and security after. What about the
        poor fans that HE SCAMMED????????.🖕🖕🖕
      </>
    ),
    upvotes: "2.4k",
    downvotes: "2",
    replies: [
      {
        id: "drykritkal-r4",
        author: "DryKritkal",
        authorHandle: "DryKritkal",
        avatarSrc: "/avatars/drykritkal.svg",
        badge: "PROPHET",
        timestamp: "15 mins ago",
        body: (
          <>
            The <strong>Preferential Option for the Poor</strong> isn&apos;t just about who has
            less or more money; it&apos;s a call to care for the vulnerable. And, right now,
            traumatized kids and a woman fighting for her life in an ICU are the most vulnerable
            people in this whole thing. Compassion isn&apos;t conditional on someone&apos;s net
            worth. Having a nice house and a big wallet doesn&apos;t make you immune to physical
            violence.
          </>
        ),
        upvotes: "5",
        downvotes: "300",
      },
    ],
  },
  {
    id: "techbradah",
    author: "TechBradah",
    authorHandle: "TechBradah",
    avatarSrc: "/avatars/techbradah.svg",
    timestamp: "10 mins ago",
    body: (
      <>
        This is just how the internet works man. If you don&apos;t like it, get Youtube or Twitch
        or whatever to ban all of these drama channels.
      </>
    ),
    upvotes: "1.1k",
    downvotes: "0",
    replies: [
      {
        id: "drykritkal-r5",
        author: "DryKritkal",
        authorHandle: "DryKritkal",
        avatarSrc: "/avatars/drykritkal.svg",
        badge: "PROPHET",
        timestamp: "5 mins ago",
        body: (
          <>
            Relying purely on top-down bans violates the principle of{" "}
            <strong>Subsidiarity</strong>. Responsibility needs to be placed as close to the
            grassroots as possible—that means us. We have to uphold the{" "}
            <strong>Integrity of Creation</strong>, which tells us not to pollute the internet,
            which is an environment we all share, with toxic garbage. Remember, we&apos;re the ones
            feeding the algorithm.
          </>
        ),
        upvotes: "1",
        downvotes: "150",
        replies: [
          {
            id: "techbradah-2",
            author: "TechBradah",
            authorHandle: "TechBradah",
            avatarSrc: "/avatars/techbradah.svg",
            timestamp: "Just now",
            body: (
              <>
                Yeah sure buddy that aint happening. That&apos;s easy for you to say, but most
                people would never actually care about all that.
              </>
            ),
            upvotes: "489",
            downvotes: "6",
          },
        ],
      },
    ],
  },
];

const BODY_PARAGRAPHS: React.ReactNode[] = [
  <>It&apos;s all an absolute mess.</>,
  <>
    Let&apos;s just get the obvious out of the way first: Yani is a sorry excuse of a human being.
    Pretending to be a single &ldquo;e-boy&rdquo; streamer to milk donations from lonely,
    parasocial viewers is straight up disgusting. For God&apos;s sake, he&apos;s even reached out
    to people pretending to be struggling and asking for money. It&apos;s greedy, it&apos;s
    manipulative, and he absolutely deserves to get hate on that.
  </>,
  <>
    That said, the way the internet has reacted to all the recent news is just so wrong in so many
    ways.
  </>,
  <>
    Now, I&apos;ve been reading up on some Catholic Social Teachings lately. Normally, I don&apos;t
    get philosophical here, but I just happened to be in this rabbit hole right now and thought that
    I could spread some words of wisdom here for y&apos;all with them.
  </>,
  <>
    First off, drama channels like TeamStarr doxxing him and turning his life into a damn circus
    worship the <strong>&ldquo;Cult of Having&rdquo;</strong>. They&apos;re willing to throw human
    lives into a meatgrinder if it means getting a few extra clicks and ad revenue. They suffer from
    a complete &ldquo;Failure of Being.&rdquo; Then suddenly now that Yani&apos;s wife is in the
    ICU fighting for her life, these same troglodytes have the audacity to tweet &lsquo;thoughts and
    prayers&rsquo; like they didn&apos;t just hand the mob the pitchforks and flaming torches in
    the first place.
  </>,
  <>
    Then there&apos;s the{" "}
    <strong>Life and Dignity of the Human Person</strong>. Just because Yani is a liar and a
    manipulator doesn&apos;t mean you get to strip him of his humanity and launch a goddamn siege on
    his house. We all have our own dignity. It&apos;s <em>Imago Dei</em>. You don&apos;t lose your
    fundamental right to physical safety just because you scammed and lied to people.
  </>,
  <>
    Also, since when did everyone suddenly become executioners? We didn&apos;t even let him have the
    chance to address all this. We didn&apos;t allow for{" "}
    <strong>Integral Human Development</strong>. We didn&apos;t want him to grow or make amends;
    the whole internet mob just wanted the drama. They wanted blood.
  </>,
  <>
    Worse yet, we&apos;ve turned the internet into a digital cockfighting ring. Its platforms should
    serve the <strong>Common Good</strong>, not be playgrounds for drama channels to hoard wealth by
    exploiting human suffering. If we actually care about <strong>Solidarity</strong>, we have a
    moral obligation to stop validating the algorithms that do this.
  </>,
  <>Stop clicking the clickbait. Unsubscribe. Report these bastards.</>,
  <>
    The good news is that we don&apos;t have to live in this bubble. We can pop it. We have the
    power to build a digital community based on empathy, where we hold people accountable without
    destroying them. We can start praying for each other instead of preying on each other.
  </>,
];

export default function DryKritkalPost() {
  return (
    <AppFrame>
      <PostHeader />
      <div>
        <article className="border-b border-border px-4 py-4">
          <div className="flex gap-3">
            <Avatar
              handle="drykritkal"
              name="DryKritkal"
              size={44}
              src="/avatars/drykritkal.svg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-x-1 text-sm">
                <span className="font-bold text-text">DryKritkal</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor" aria-label="Verified">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-bg">
                  PROPHET
                </span>
                <span className="text-text-muted">@drykritkal</span>
                <span className="text-text-muted">· 16h</span>
              </div>
              <h1 className="mt-1 text-xl font-bold leading-snug text-text">
                About the whole Yani situation...
              </h1>
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-border">
            <Image
              src="/embeds/drykritkal-embed.svg"
              alt="About the whole Yani situation static image"
              width={800}
              height={450}
              className="w-full object-cover"
            />
          </div>

          <div className="mt-4 space-y-4 text-[15px] text-text leading-relaxed">
            {BODY_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-4">
            <Votes up="240K" down="478K" />
          </div>
        </article>

        <CommentSection>
          <section className="divide-y divide-border">
            {COMMENTS.map((c) => (
              <div key={c.id} className="px-4">
                <Comment comment={c} />
              </div>
            ))}
          </section>
        </CommentSection>

        <div className="border-t border-border">
          <LoadMoreButton />
        </div>
      </div>
    </AppFrame>
  );
}
