import mountainSketch from "@/assets/mount-kailash-sketch.jpg";

const HimalayanFooter = () => (
  <footer className="relative mt-16 min-h-[360px] overflow-hidden md:mt-28 md:min-h-[560px]">
    <img
      src={mountainSketch}
      alt="A hand-drawn panorama of Mount Kailash and the surrounding Himalayan range"
      loading="lazy"
      width={1920}
      height={768}
      className="absolute inset-x-0 bottom-0 h-full w-full object-cover object-bottom opacity-85 mix-blend-multiply"
    />
    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
    <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1440px] items-start justify-between px-6 pt-20 md:min-h-[560px] md:px-12 md:pt-32 xl:px-20">
      <div>
        <p className="font-heading text-xl text-primary md:text-2xl">I Am The World</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Writings of Sudheendra Chaitanya</p>
      </div>
    </div>
  </footer>
);

export default HimalayanFooter;