const BinInfo = () => {
  return (
    <div className="block">
      <h2>Your Bin</h2>
      <a href="#" className="refresh">
        <img src="images/refresh.png" alt="" />
      </a>
      <div id="endpoint">
        <p>
          Your endpoint: <span>{{ binUrl }}</span>
        </p>
        <a href="#" className="copy">
          <img src="images/copy.png" alt="" />
        </a>
      </div>
      <table>
        <tr>
          <td>Created:</td>
          <td>{{ time_created }}</td>
        </tr>
        <tr>
          <td>Count:</td>
          <td>{{ count }}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>{{ status }}</td>
        </tr>
      </table>
    </div>
  );
};

export default BinInfo;

// {
//   "binInfo": {
//     "binId": "21995808-f745-4f19-b84b-358a49a7124f",
//     "active": true,
//     "time_created": "2022-09-15T23:44:09.568Z"
//   },
//   "requests": []
// }
