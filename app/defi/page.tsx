import { CMS_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Page from "@/components/utils/Page";
import { getPostBySlug } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function PageMevLearning() {
  return <Page slug="mev" type="secondary" />;
}

export function generateMetadata(): Metadata {
  const post = getPostBySlug("defi", "secondary");

  if (!post) {
    return notFound();
  }

  const title = `${CMS_NAME} | ${post.title}`;

  return {
    title,
    metadataBase: new URL("https://trade.barkprotocol.net"),
    openGraph: {
      title,
      url: "https://trade.barkprotocol.net",
      siteName: "BarkSwap",
      images: [post.ogImage?.url ?? "https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"],
      locale: "en_US",
      type: "website",
    },
  };
}