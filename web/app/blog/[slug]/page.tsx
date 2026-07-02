import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogSlugs } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getBlogPost(slug);
    return {
      title: post.title,
      description: post.excerpt
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;

  try {
    post = getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <main className="narrow py-20">
      {/* Byline is date-only — no author name, per brand rules. */}
      <p className="text-[13.5px] text-faint">{new Date(post.date).toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
      <h1 className="mt-3 text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
        {post.title}
      </h1>
      <article className="prose prose-editorial mt-9 max-w-none text-[17px] leading-[1.75] prose-headings:tracking-[-0.02em] prose-p:my-[22px] prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-[#3C3C42]">
        <MDXRemote source={post.content} />
      </article>
      <div className="mt-12 flex items-center justify-between border-t border-rule pt-6">
        <Link href="/blog" className="text-[14.5px] font-semibold text-muted transition hover:text-ink">
          ← All posts
        </Link>
        <Link
          href="/desktop"
          className="rounded-[10px] bg-accent px-[22px] py-2.5 text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover"
        >
          Try Sanketra free
        </Link>
      </div>
    </main>
  );
}
