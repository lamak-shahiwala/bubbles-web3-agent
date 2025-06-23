import Image from "next/image";
import ChatUI from "./components/chatui/chatui";

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
        <ChatUI />
      </main>
      {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>*/}
    </div>
  );
}
