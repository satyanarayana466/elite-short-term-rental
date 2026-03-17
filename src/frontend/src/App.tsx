import AdminDashboard from "@/pages/AdminDashboard";
import PublicSite from "@/pages/PublicSite";
import { useEffect, useState } from "react";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export { navigate };

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  if (pathname === "/admin") {
    return <AdminDashboard />;
  }

  return <PublicSite />;
}
