import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <header>
      <h1>RequestBin</h1>
      <button onClick={handleClick} className="button">
        Your Bins
      </button>
      <p>
        A url is provided to you that will collect requests made to it. You can
        inspect those requests in a human-friendly way. RequestBin helps you see
        what your client is sending or to inspect and debug webhook requests.
      </p>
    </header>
  );
};

export default TopBar;
