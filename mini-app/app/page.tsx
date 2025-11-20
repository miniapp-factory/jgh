
import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import JumpDodge from "@/components/jump-dodge";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <JumpDodge />
    </main>
  );
}
