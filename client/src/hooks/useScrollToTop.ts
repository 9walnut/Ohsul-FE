import { useEffect } from "react";
import { useNavigate, To } from "react-router-dom";

const useScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    const unlisten = navigate(handleRouteChange as To, { replace: true });

    return () => {};
  }, [navigate]);
};

export default useScrollToTop;
