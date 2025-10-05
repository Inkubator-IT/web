import Link from "next/link";

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0C0C0C]">
      {/*Hero Section*/}
      <section className="w-full max-w-[1200px] flex flex-col items-center justify-center md:gap-[96px] gap-[48px] px-5">
        <div className="w-full flex flex-col md:gap-[48px] gap-[24px] items-center justify-center">
          <div className="w-fit flex flex-col">
            <p className="text-white italic md:text-xl text-xs font-medium">InkubatorIT’s Present</p>
            <div className="mt-2 h-[0.5px] md:h-[1px] bg-gradient-to-r from-white/0 via-white to-white/0"></div>
          </div>
          <h1 className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text md:text-7xl text-3xl text-transparent text-center font-semibold">
            Trusted Digital Solutions by ITB’s Brightest Tech Talents
          </h1>
          <p className="text-white text-center font-normal">
            We build high-quality software with integrity, collaboration, and innovation. From websites to mobile apps
            and beyond, Inkubator IT helps turn your ideas into impactful digital products.
          </p>
        </div>
        <div className="w-fit flex flex-row items-center justify-center md:gap-6 gap-3">
          <Link
            href="/" //change later
            className="text-white bg-white/2 md:rounded-[12px] rounded-[6px] md:text-2xl text-base border-white/12 border md:px-5 md:py-3 px-2 py-1"
          >
            See Our Portfolio
          </Link>
          <Link
            href="/" //change later
            className="bg-[#121212CC] md:rounded-[12px] rounded-[6px] md:text-2xl text-base md:px-5 md:py-3 px-2 py-1"
          >
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent">
              Start Your Project
            </span>
          </Link>
        </div>
      </section>

      {/*Project Highlights Section*/}
      <section></section>
    </div>
  );
}

export default App;
