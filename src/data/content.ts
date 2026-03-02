export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string;
  type: "article" | "note" | "series";
  seriesTitle?: string;
  seriesPart?: number;
  seriesTotalParts?: number;
}

export const articles: Article[] = [
  {
    slug: "the-silence-between-thoughts",
    title: "The Silence Between Thoughts",
    excerpt: "In the space where one thought ends and another begins, there exists a doorway. Most of us rush past it, unaware.",
    date: "12 February 2026",
    type: "article",
    body: `There is a silence that lives between our thoughts. Not the absence of sound, but the presence of something far more ancient — a stillness that has always been there, waiting to be noticed.

We spend our days in a river of words, plans, memories, and projections. The mind moves ceaselessly, like a weaver at a loom, threading one thought into the next. But have you ever paused to notice what exists in the gaps?

## The Doorway

Between the ending of one thought and the beginning of the next, there is a sliver of pure awareness. It is not empty. It is full — full of the awareness that you are. Not what you are, not who you are, but simply that you are.

This is not a philosophical concept to be debated. It is a lived experience, available to anyone who turns their attention inward with sincerity and patience.

> "The mind is a wonderful servant but a terrible master." — The moment you observe the mind, you are no longer entirely within it.

## Practising the Pause

Begin simply. As you read these words, notice the breath. Not to control it, but to witness it. In that witnessing, thought slows — even if only for a moment. And in that moment, you touch something that thought cannot create or destroy.

This is not meditation as a technique. It is meditation as your natural state — the state of being aware that you are aware.

## Living From Stillness

The invitation is not to abandon thought, but to discover what holds thought. Like the sky holds clouds, your awareness holds every experience without being stained by any of them.

When you begin to live from this understanding, action becomes effortless. Not because life becomes easy, but because you are no longer fighting with what is. You respond rather than react. You move from clarity rather than confusion.

The silence between thoughts is not a destination. It is where you have always been.`,
  },
  {
    slug: "water-finds-its-level",
    title: "Water Finds Its Level",
    excerpt: "On the nature of surrender — not as defeat, but as the deepest intelligence of life itself.",
    date: "28 January 2026",
    type: "article",
    body: `Watch water. It never struggles against the shape of the vessel. It never argues with gravity. And yet, it carves canyons.

There is a teaching in this that the mind resists: the most powerful force in nature is the one that yields.

## The Misunderstanding of Surrender

We have been taught that surrender means giving up. That to yield is to lose. But look at the river — does it lose anything by flowing around the rock? It arrives at the ocean regardless. The rock, in time, is worn smooth.

Surrender, in the spiritual sense, is not passivity. It is the cessation of unnecessary resistance. It is the recognition that life has an intelligence of its own, and that our constant interference — born of fear and the need to control — often creates the very suffering we seek to avoid.

> "The willow bends in the storm and survives. The oak, in its rigidity, breaks."

## The Art of Non-Resistance

This does not mean we stop acting. It means we stop acting from a place of anxiety. There is a vast difference between action born of clarity and action born of fear. One flows; the other grasps.

When you release the need for a particular outcome, something remarkable happens: you become available to outcomes far greater than anything you could have planned. Life begins to move through you rather than being pushed by you.

## The Practice

Today, notice one place where you are resisting what is. Not a grand resistance — perhaps just a subtle tension, a wish that this moment were different. And then, gently, let it be as it is. Not forever. Just for now.

You may find that in that letting go, something loosens. Something breathes. And like water, you begin to find your level.`,
  },
  {
    slug: "on-presence",
    title: "On Presence",
    excerpt: "You are not your past. You are not your future. You are this.",
    date: "15 January 2026",
    type: "note",
    body: `Presence is not something you achieve. It is what remains when you stop trying to be somewhere else.

Notice: right now, as you read this, you are here. The mind may wander to what happened yesterday or what must be done tomorrow, but you — the one who notices the wandering — you are always here.

> This is the great paradox: we search everywhere for what we already are.

The practice is absurdly simple, which is why we overlook it. Stop. Breathe. Notice that you are noticing. That is all. That is everything.`,
  },
  {
    slug: "the-weight-of-a-name",
    title: "The Weight of a Name",
    excerpt: "We carry our identities like stones in a pocket, forgetting we placed them there ourselves.",
    date: "8 January 2026",
    type: "note",
    body: `You were given a name before you could speak. Before you knew what a name was. And from that moment, a story began to be written — not by you, but around you.

Son. Daughter. Student. Employee. Successful. Failing. Good. Bad.

Each label, a thread. And over time, the threads became a garment so familiar you forgot you were wearing it. You began to believe you were the garment.

> Who are you without your story?

This question is not meant to frighten. It is meant to free. Beneath every name, every role, every memory — there is something unnamed, unborn, and utterly at peace.

You do not need to discard your name. Simply hold it lightly. Like a leaf on an open palm, not a stone in a clenched fist.`,
  },
  {
    slug: "the-nature-of-awareness-part-1",
    title: "The Nature of Awareness — Part I: The Mirror",
    excerpt: "Awareness is like a mirror. It reflects everything and holds nothing. This is the first in a series exploring what we truly are.",
    date: "1 January 2026",
    type: "series",
    seriesTitle: "The Nature of Awareness",
    seriesPart: 1,
    seriesTotalParts: 3,
    body: `A mirror reflects everything placed before it — beauty and ugliness, light and shadow — without preference, without judgement, without effort. And when the objects are removed, the mirror remains, unchanged.

Your awareness is like this mirror.

## What Awareness Is Not

Awareness is not thought. Thought appears within awareness. Awareness is not emotion. Emotion rises and falls within awareness. Awareness is not the body. The body is perceived by awareness.

This is not a belief to adopt. It is an observation to verify for yourself. Right now, notice that you are aware. That awareness — is it located somewhere specific? Does it have a colour? A shape? A boundary?

## The Unchanging Witness

Thoughts change. Moods change. The body ages. But the awareness in which all of this occurs — has it ever changed? When you were five, you were aware. Now, you are aware. The content of experience has changed utterly. But awareness itself?

> "I am not what happened to me. I am what I choose to become." — But even before choosing, there is the one who is aware of the choosing.

## An Invitation

For the rest of today, see if you can notice awareness itself — not what you are aware of, but the fact that you are aware. This simple shift in attention is the beginning of everything.

In Part II, we will explore why awareness is often overlooked, and what happens when we begin to rest in it.`,
  },
  {
    slug: "the-nature-of-awareness-part-2",
    title: "The Nature of Awareness — Part II: The Overlooked Obvious",
    excerpt: "We search for peace in experiences, never realising it is the space in which all experience occurs.",
    date: "10 January 2026",
    type: "series",
    seriesTitle: "The Nature of Awareness",
    seriesPart: 2,
    seriesTotalParts: 3,
    body: `A fish does not know it is in water. Not because the water is hidden, but because it is so ever-present, so intimate, that the fish looks past it in search of something more exotic.

We are like this with awareness.

## Why We Miss It

Awareness is not an object. It cannot be seen the way you see a tree or hear a sound. It is the seeing itself. It is the hearing itself. And because we are trained from birth to focus on objects — things, people, events — we overlook the subject, the knower, the space in which all objects appear.

It is like looking for your glasses while wearing them. The search itself is the obstacle.

## The Habit of Seeking

The mind is a seeker by nature. It moves from one experience to the next, always looking for satisfaction, peace, completion. But notice: every experience ends. Every pleasure fades. Every achievement eventually feels insufficient.

This is not a flaw. It is a teaching. The mind is showing you, through its endless dissatisfaction, that what you seek cannot be found in the realm of experience. It must be found in what is prior to experience — in awareness itself.

> "You are not the wave. You are the ocean pretending to be a wave."

## Resting in Awareness

To rest in awareness is not to stop thinking. It is to notice that you are aware, and to let that noticing become primary. Thoughts continue. Sounds continue. Life continues. But there is a background peace that was always there, now gently foregrounded.

This takes no effort. In fact, effort obscures it. It is what is left when all effort ceases.

In Part III, we will explore how living from awareness transforms our relationship with the world.`,
  },
  {
    slug: "the-nature-of-awareness-part-3",
    title: "The Nature of Awareness — Part III: Living as Awareness",
    excerpt: "When the search ends, life begins. Not a different life — this very life, seen with new eyes.",
    date: "20 January 2026",
    type: "series",
    seriesTitle: "The Nature of Awareness",
    seriesPart: 3,
    seriesTotalParts: 3,
    body: `To discover that you are awareness is one thing. To live as awareness is another — not because it is difficult, but because the habits of a lifetime do not dissolve overnight.

And yet, something has shifted. Once you see that you are the mirror and not the reflections, you cannot entirely unsee it.

## The World Does Not Change

Let us be honest: the external world does not rearrange itself because of your insight. Bills still arrive. Relationships still challenge. The body still aches. What changes is your relationship to all of it.

Where once there was resistance, there is space. Where once there was reactivity, there is a pause — brief, almost imperceptible — in which a different response becomes possible. Not suppression. Not detachment. Simply clarity.

## Compassion Arises Naturally

When you recognise awareness in yourself, you begin to recognise it in others. Beneath the personality, beneath the behaviour, there is the same awareness looking out through every pair of eyes. This recognition is the root of genuine compassion — not as a moral obligation, but as a natural seeing.

> "The person who has truly understood themselves has understood everyone."

## No Destination

There is no final state to achieve. Awareness is not a summit to reach but a ground to stand on. Some days, the clouds of thought are thick. Other days, they are thin. But the sky — your sky — remains.

This is the end of the series, but it is not a conclusion. It is an ongoing invitation: to meet each moment freshly, to hold your experience lightly, and to remember — again and again — that you are not what you see. You are the seeing.

And that is enough. That has always been enough.`,
  },
];

export function getArticlesByType(type: Article["type"]): Article[] {
  return articles.filter((a) => a.type === type);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getSeriesGroups(): { title: string; articles: Article[] }[] {
  const seriesMap = new Map<string, Article[]>();
  articles
    .filter((a) => a.type === "series" && a.seriesTitle)
    .sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0))
    .forEach((a) => {
      const existing = seriesMap.get(a.seriesTitle!) ?? [];
      existing.push(a);
      seriesMap.set(a.seriesTitle!, existing);
    });
  return Array.from(seriesMap.entries()).map(([title, arts]) => ({ title, articles: arts }));
}
