import heroImg from '../assets/hero-dog.jpg'

function HeroSection() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        {/* Section 1 — Headline & Description */}
        <div className="flex w-full flex-col gap-4 text-left lg:w-1/3 lg:text-right">
          <h1 className="text-4xl font-bold leading-tight text-[#26231E] md:text-5xl lg:text-[52px] lg:leading-[1.1]">
            Stay Informed,
            <br />
            Stay Inspired
          </h1>
          <p className="text-base leading-relaxed text-[#75716B] md:text-lg">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>

        {/* Section 2 — Portrait Image */}
        <div className="flex w-full shrink-0 justify-center lg:w-auto">
          <img
            src={heroImg}
            alt="A person with their pet"
            className="h-[400px] w-full max-w-[320px] rounded-2xl object-cover shadow-lg md:h-[550px] md:max-w-[360px] lg:max-w-[400px]"
          />
        </div>

        {/* Section 3 — Author Card */}
        <div className="flex w-full flex-col gap-3 text-left lg:w-1/3 lg:pt-4">
          <span className="text-sm text-[#75716B]">- Author</span>
          <h2 className="text-xl font-bold text-[#26231E] md:text-2xl">
            Peerawat K.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-[#75716B]">
              I am a pet enthusiast and freelance writer who specializes in
              animal behavior and wellness. My content helps pet owners build
              stronger, happier relationships with their companions.
            </p>
            <p className="text-sm leading-relaxed text-[#75716B]">
              When I am not writing, I volunteer at my local animal shelter and
              spend time exploring the outdoors with my own rescue dog.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
