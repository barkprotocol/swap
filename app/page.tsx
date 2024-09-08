import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Card from "@/components/ui/card";

const FEATURES = [
  {
    title: "Trade SPL Tokens",
    description: "Seamlessly trade Solana SPL tokens with our intuitive platform. Manage and exchange your assets efficiently.",
    link: "/swap",
  },
  {
    title: "Mint NFTs",
    description: "Create unique NFTs and showcase your assets on our marketplace. Minting has never been easier.",
    link: "/mint",
  },
  {
    title: "Real-World Asset Backing",
    description: "Explore NFTs backed by real-world assets, adding tangible value to your digital collectibles.",
    link: "/features/real-world-assets",
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your trading patterns and NFT performance with our advanced analytics tools.",
    link: "/features/analytics",
  },
];

export default function Index() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <section className="my-8">
          <h2 className="font-medium text-xl mb-4">Next Steps</h2>
          {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </section>
        
        <section className="my-8">
          <h2 className="font-medium text-xl mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
