// NextTopLoader.tsx
"use client";

import Loader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";

const NextTopLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return (
    <Loader
      color="#f97316"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
};

export default NextTopLoader;
