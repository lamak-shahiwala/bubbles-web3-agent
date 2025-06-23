import Image from "next/image";
import ChatUI from "./components/chatui/chatui";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";

export default function Home() {
  return (
    <div className="bg-[url('/images/bubbles.png')] bg-cover min-h-screen p-8 pb-25 sm:p-20 font-[family-name:var(--font-geist-sans)] grid place-items-center">
      <main className="flex flex-col gap-[32px] items-center">
        <Image
          className="dark:invert hover:scale-[1.05] transition-transform h-32 w-32 sm:h-36 sm:w-36 md:h-50 md:w-50 lg:h-60 lg:w-60"
          src="/images/bubbles_logo.png"
          alt="Bubbles logo"
          width={200}
          height={50}
          priority
        />
        <p className="text-3xl font-bold pb-10 text-gray-800">
          Launch a Web3 App in <span className="italic">minutes</span>.
        </p>
        <ChatUI />
      </main>
      {<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="text-3xl hover:scale-[1.1]"
          href="https://github.com/lamak-shahiwala"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub />
        </a>
        <a
          className="text-3xl hover:scale-[1.1]"
          href="https://lamaks-desktop.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TbWorldWww />
        </a>
        <a
          className="text-3xl hover:scale-[1.1]"
          href="https://www.linkedin.com/in/lamak-shahiwala-766986256"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLinkedin />
        </a>
      </footer>}
    </div>
  );
}
