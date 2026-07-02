import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Sanketra essays on Hindi input, local speech-to-text, and PC control."
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="narrow py-20">
      <h1 className="text-[clamp(2.375rem,4.4vw,3.375rem)] font-bold leading-[1.05] tracking-[-0.03em]">
        Notes from the studio
      </h1>
      <div className="mt-11">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-t border-rule py-7"
          >
            <p className="text-[13px] text-faint">
              {new Date(post.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
            </p>
            <h2 className="mt-2 text-[26px] font-bold tracking-[-0.02em] transition group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2.5 max-w-[620px] text-[15.5px] leading-relaxed text-muted">{post.excerpt}</p>
            <span className="mt-3.5 inline-block text-[14.5px] font-semibold text-accent">Read →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
