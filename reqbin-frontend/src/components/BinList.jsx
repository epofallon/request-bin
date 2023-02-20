import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BinList = () => {
  const [bins, setBins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBinIds = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/bins");
        setBins(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getBinIds();
  }, []);

  const handleBinClick = ({ target }) => {
    const binId = target.dataset.id;
    navigate(`/bins/${binId}`);
  };

  const handleNewBinClick = async (e) => {
    // issue post request to /bins
    try {
      const { data } = await axios.post("http://localhost:3000/bins");
      setBins(bins.concat(data.binId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="block">
      <h2>Your Bins</h2>
      <button className="button" onClick={handleNewBinClick}>
        <strong>+</strong> New Bin
      </button>
      <p>This list is based on bins created at your IP address.</p>
      <ul className="binList">
        {bins.map((binId) => (
          <li
            key={binId}
            data-id={binId}
            className="binListItem"
            onClick={handleBinClick}
          >
            {binId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BinList;
