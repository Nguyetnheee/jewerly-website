import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileNav } from "@/components/mobile-nav";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-5xl text-forest mt-4">Không tìm thấy</h1>
        <p className="mt-4 text-sm text-forest/60">
          Trang bạn tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">Về trang chủ</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-forest">Đã có lỗi xảy ra</h1>
        <p className="mt-2 text-sm text-forest/60">Vui lòng thử lại hoặc về trang chủ.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Thử lại
          </button>
          <a href="/" className="btn-outline">Về trang chủ</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { name: "description", content: "Trang sức handmade cao cấp lấy cảm hứng từ hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa với charm sen, ngọc trai và đá quý." },
      { name: "author", content: "Pure Floral & Co." },
      { property: "og:title", content: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { property: "og:description", content: "Trang sức handmade cao cấp lấy cảm hứng từ hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa với charm sen, ngọc trai và đá quý." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { name: "twitter:description", content: "Trang sức handmade cao cấp lấy cảm hứng từ hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa với charm sen, ngọc trai và đá quý." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c29595e-5d1f-48b6-8216-6abba13ad6fe/id-preview-4939f52a--8f0dd56b-c2f0-4b86-8f30-93709d76bea6.lovable.app-1781328767610.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c29595e-5d1f-48b6-8216-6abba13ad6fe/id-preview-4939f52a--8f0dd56b-c2f0-4b86-8f30-93709d76bea6.lovable.app-1781328767610.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-cream text-forest font-sans">
        <SiteHeader />
        <main className="flex-1 pt-20 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <SiteFooter />
        <MobileNav />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#FCF9F5",
              color: "#1A3A34",
              border: "1px solid rgba(26,58,52,0.1)",
              borderRadius: "0",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}
