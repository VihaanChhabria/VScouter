import { useNavigate } from "react-router-dom";

export function useNavigateWithBase() {
  const navigate = useNavigate();
  const withBase = (path) => {
    const base = import.meta.env.BASE_URL;
    return `${base}${path}`.replace(/\/{2,}/g, "/");
  };

  return (path, options) => navigate(withBase(path), options);
}
