import mountainSketch from "@/assets/mount-kailash-sketch.jpg";

const HimalayanFooter = () => (
  <footer className="relative mt-8 min-h-[260px] overflow-hidden md:mt-14 md:min-h-[390px]">
    <img
      src={mountainSketch}
      alt="A hand-drawn panorama of Mount Kailash and the surrounding Himalayan range"
      loading="lazy"
      width={1920}
      height={768}
      className="absolute inset-x-0 bottom-0 h-full w-full object-cover object-bottom opacity-85 mix-blend-multiply"
    />
    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
    <div className="relative z-10 mx-auto flex min-h-[260px] max-w-[1440px] items-start justify-between px-6 pt-4 md:min-h-[390px] md:px-12 md:pt-8 xl:px-20">
      <div>
        <p className="font-heading text-xl text-primary md:text-2xl">I Am The World</p>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">What runs the world runs the me</p>
      </div>
    </div>
  </footer>
);

export default HimalayanFooter;