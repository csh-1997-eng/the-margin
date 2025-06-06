"use client";
import Script from "next/script";
export default function TweetsWidget() {
  return (
    <>
      <a className="twitter-timeline" data-theme="dark" data-height="600"
         href={`https://x.com/${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`}>
        Posts by @{process.env.NEXT_PUBLIC_TWITTER_HANDLE}
      </a>
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload"
              onLoad={() => window?.twttr?.widgets?.load?.()}/>
    </>
  );
}


{/* <a class="twitter-timeline" href="https://twitter.com/csh_dev_?ref_src=twsrc%5Etfw">Tweets by csh_dev_</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  */}