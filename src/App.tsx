import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const mykey = ``;
  const [key, setKey] = useState(localStorage.getItem(`key`) || mykey);
  const [img, setImg] = useState(localStorage.getItem(`img`) || ``);
  const [output, setOutput] = useState(``);
  const [outputExpiry, setOutputExpiry] = useState(``);

  function options() {
    const ooptions = {
      method: "POST",
      url: "https://super-image1.p.rapidapi.com/run",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "super-image1.p.rapidapi.com",
      },
      data: {
        upscale: 2,
        image: img,
      },
    };
    return ooptions;
  }
  function Fire() {
    axios
      .request(options())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setOutput(data.output_url);
        setOutputExpiry(data.url_expiry);
      });
  }

  return (
    <>
      <div className="container">
        {output && <img src={output} width={450} alt="" />}
        <div className="input">
          <label htmlFor="key">Key</label>
          <input
            type="password"
            id="key"
            value={key}
            onChange={(e) => {
              e.preventDefault();
              localStorage.setItem(`key`, e.target.value);
              setKey(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <label htmlFor="img">Img URL</label>
          <input
            type="text"
            id="img"
            value={img}
            onChange={(e) => {
              e.preventDefault();
              localStorage.setItem(`img`, e.target.value);
              setImg(e.target.value);
            }}
          />
        </div>
        <div className="btn">
          <button onClick={Fire}>Super</button>
          {output && (
            <button onClick={() => open(output)}>
              Download
            </button>
          )}
        </div>
        <div className="">
          <p>Expiry: {outputExpiry}</p>
        </div>
      </div>
    </>
  );
}

export default App;
