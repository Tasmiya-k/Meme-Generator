import React from "react";

export default function Meme() {
  const [meme, setmemeImage] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allmemes, setAllmemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllmemes(data.data.memes));
  }, []);
   console.log(allmemes);
  function getImage() {
    const randomNum = Math.floor(Math.random() * allmemes.length);
    const url = allmemes[randomNum].url;
    
    setmemeImage((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setmemeImage((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main className="main">
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form--input"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getImage} className="form--button">
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
