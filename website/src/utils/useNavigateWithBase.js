import { useNavigate } from "react-router-dom";

export function useNavigateWithBase() {
  const navigate = useNavigate();
  const withBase = (path) => {
    const currentPath = window.location.pathname;

    const base = currentPath.startsWith("/ui") ? "/ui/" : "/";

    return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  };

  return (path, options) => navigate(withBase(path), options);
}
