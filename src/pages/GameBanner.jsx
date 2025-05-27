import Slider from "react-slick";
import { Link } from "../Router";
import "../assets/Game.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    ❮
  </div>
);

const GameBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="game-banner">
      <div className="game-banner-container">
        <h1>WELCOME TO THE PLAYGROUND</h1>
        <p>Please select the game you would like to play.</p>
        <Slider {...settings}>
          <div className="game-slide">
            <h2>XOX</h2>
            <p>Play the XOX game!</p>
            <Link href="/start-game">
              <button>Play XOX</button>
            </Link>
          </div>
          <div className="game-slide">
            <h2>Game 2</h2>
            <p>Play the Game 2 game!</p>
            <Link href="/start-game">
              <button>Play Game 2</button>
            </Link>
          </div>
          <div className="game-slide">
            <h2>Game 3</h2>
            <p>Play the Game 3 game!</p>
            <Link href="/start-game">
              <button>Play Game 3</button>
            </Link>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default GameBanner;