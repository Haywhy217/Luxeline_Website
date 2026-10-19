import Image from 'next/image'

const featuredStory = {
  image: '/woman.png',
  category: 'The style journal',
  title: 'A considered wardrobe starts with what you wear every day',
  date: 'October 12, 2026',
  excerpt: 'A thoughtful edit of reliable essentials makes getting dressed feel simple, personal, and entirely your own.',
}

const stories = [
  {
    image: '/trending pic.jpg',
    category: 'Style notes',
    title: 'Build around the pieces you reach for',
    date: 'October 8, 2026',
    excerpt: 'Start with versatile essentials, then add a few details that make them yours.',
  },
  {
    image: '/winter.jpg',
    category: 'Behind the edit',
    title: 'Why good basics earn their place',
    date: 'October 2, 2026',
    excerpt: 'A closer look at the everyday shapes and materials in our current collection.',
  },
  {
    image: '/spring.jpg',
    category: 'Care guide',
    title: 'Keep your everyday favorites in rotation',
    date: 'September 24, 2026',
    excerpt: 'Simple care habits can help clothes and accessories stay ready for the next wear.',
  },
]

const JournalPage = () => (
  <main className="px-4 py-12 md:px-8 md:py-16 lg:px-16 xl:px-32 2xl:px-64">
    <header className="mb-8 border-b border-stone-200 pb-5">
      <p className="text-xs uppercase tracking-[0.25em] text-rose-500">Ideas for everyday style</p>
      <h1 className="mt-2 text-4xl font-semibold text-stone-800">Journal</h1>
    </header>

    <article className="grid overflow-hidden bg-stone-100 md:grid-cols-[1.15fr_0.85fr]">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
        <Image
          src={featuredStory.image}
          alt="Featured fashion story"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-8 md:px-10 lg:px-14">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-500">{featuredStory.category}</p>
        <p className="mt-4 text-xs text-stone-500">{featuredStory.date}</p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-stone-800 md:text-3xl">
          {featuredStory.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-stone-600">{featuredStory.excerpt}</p>
      </div>
    </article>

    <section className="mt-14 md:mt-20">
      <div className="mb-6 flex items-end justify-between border-b border-stone-200 pb-4">
        <h2 className="text-2xl font-semibold text-stone-800">More stories</h2>
        <p className="text-xs uppercase tracking-[0.15em] text-stone-500">Notes from LuxeLine</p>
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <article key={story.title}>
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-rose-500">{story.category}</p>
            <h3 className="mt-2 text-xl font-medium leading-snug text-stone-800">{story.title}</h3>
            <p className="mt-2 text-xs text-stone-500">{story.date}</p>
            <p className="mt-3 text-sm leading-6 text-stone-600">{story.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  </main>
)

export default JournalPage