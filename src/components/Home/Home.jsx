import React, { useState, useRef, useEffect } from "react";
import welcomeP from "../../image/welcome-page.png";
import App1 from "../../image/app-1.png";
import App2 from "../../image/app-2.png";
import App3 from "../../image/app-3.png";
import gif1 from "../../image/vid1.gif";
import Sign from "../../image/Sign.png";
import gif2 from "../../image/appVid2.gif";
import gif3 from "../../image/appVid3.gif";
import installImg from "../../image/install-sec.png";
import TaxiManagementImg from "../../image/Taxi-managementIcon.png";
import taxiVideo from "../../image/Taxi-management.mp4";
import User1 from "../../image/user1.png";
import User2 from "../../image/user2.png";
import User3 from "../../image/user3.png";
import app1 from "../../image/appStore1.png";
import app2 from "../../image/appStore2.png";
import test1 from "../../image/carasuel1.png";
import test2 from "../../image/carasuel2.png";
import test3 from "../../image/carasuel3.png";
import test4 from "../../image/carasuel4.png";
import test5 from "../../image/carasuel5.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const testimonials = [
  {
    name: "Tom Roberts",
    text: "As a taxidermist for many years, I was skeptical about switching to digital tracking, but Taxidermy Management has been a game-changer. The mount progress monitoring saves me hours of answering client calls, and the automated alerts keep my customers informed without me lifting a finger.",
    img: User1,
  },
  {
    name: "Emily Davis",
    text: "Finally, software that understands our industry! The custom price quote generator has eliminated my pricing headaches, and the financial dashboard gives me a clear picture of my shop's performance. My clients love getting automatic updates about their mounts. It's like having an extra employee without the payroll.",
    img: User2,
  },
  {
    name: "Sarah Williams",
    text: "What sold me was how easy it is to track multiple orders. Before, I was drowning in paperwork and sticky notes. Now I can see all my client's orders, progress, and payments in one place.  Would recommend to any serious taxidermist looking to modernize their shop.",
    img: User3,
  },
  {
    name: "John Doe",
    text: "As a taxidermist for many years, I was skeptical about switching to digital tracking, but Taxidermy Management has been a game-changer. The mount progress monitoring saves me hours of answering client calls, and the automated alerts keep my customers informed without me lifting a finger.",
    img: User1,
  },
  {
    name: "Jane Smith",
    text: "As a taxidermist for many years, I was skeptical about switching to digital tracking, but Taxidermy Management has been a game-changer. The mount progress monitoring saves me hours of answering client calls, and the automated alerts keep my customers informed without me lifting a finger.",
    img: User2,
  },
  {
    name: "Jane Smith",
    text: "As a taxidermist for many years, I was skeptical about switching to digital tracking, but Taxidermy Management has been a game-changer. The mount progress monitoring saves me hours of answering client calls, and the automated alerts keep my customers informed without me lifting a finger.",
    img: User2,
  },
];

const images = [test1, test2, test3, test4, test5];

function Home() {
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settings2 = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerMode: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  const steps = [
    {
      title: "TAXIDERMY NEAR YOUR LOCATION",
      description:
        "Locate best taxidermy services near you to preserve your hunting trophies",
      icon: gif1,
      rating: 5,
    },
    {
      title: "CUSTOMIZE YOUR TROPHY",
      description: "Create your custom trophy step by step",
      icon: gif2,
      rating: 5,
    },
    {
      title: "PAY AND PLACE THE ORDER",
      description: "Complete payment and place your order",
      icon: gif3,
      rating: 5,
    },
  ];

  const mainSecRef = useRef(null);
  const appProcessSecRef = useRef(null);
  const appSecRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Cursor-effect
  useEffect(() => {
    const cursor = document.getElementById("customCursor");

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.display = "block";
    };

    const handleMouseLeave = () => {
      cursor.style.display = "none";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // VideoTo-playsmooth
  useEffect(() => {
    const video = document.querySelector(".background-video");
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Video play failed:", error);
          video.muted = true;
          video.play();
        });
      }
    }
  });

  const handleClick = () => {
    window.open(
      "https://apps.apple.com/us/app/taxidermy-management/id6670444015",
      "_blank"
    );
  };

  const navigate = useNavigate();
  const [data, setData] = useState("");
  const handleData = async (e) => {
    e.preventDefault();
    if (!data.trim()) {
      toast.error("Please enter a valid ID");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.taxidermyvendor.hunt30.com/api/searchOrder/${data}`
      );
      if (response.data.data.length !== 0) {
        toast.success("ID has been found!");
        setData("");
        setTimeout(() => navigate(`/booking`), 1000);
        localStorage.setItem("orderID", data);
      } else {
        toast.error("ID not found");
        setData("");
      }
    } catch (error) {
      toast.error("Error fetching data. Please try again.");
    }
  };

  return (
    <>
      <div className="home">
        {/* Custom Cursor */}
        <div className="custom-cursor" id="customCursor"></div>

        {/* Navbar */}
        <nav className="navbar2 container2">
          <ul className="nav-links">
            <li>
              <a href="##" onClick={() => scrollToSection(mainSecRef)}>
                HOME
              </a>
              <span className="divider"></span>
            </li>
            <li>
              <a href="##" onClick={() => scrollToSection(appProcessSecRef)}>
                REVIEWS
              </a>
              <span className="divider"></span>
            </li>
            <li>
              <a href="##" onClick={() => scrollToSection(appSecRef)}>
                ABOUT APP
              </a>
              <span className="divider"></span>
            </li>
          </ul>
          <div className="logo">
            <span style={{ color: "#FF0000" }}>Taxidermy</span> Management
          </div>
          <div className="search-box">
            <form onSubmit={handleData}>
              <input
                type="text"
                placeholder="Enter your booking id"
                className="search-input"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <button className="search-btn" onClick={handleData} type="submit">
                🔍
              </button>
            </form>
          </div>
        </nav>

        {/* Main-Sec */}
        <div className="content section" ref={mainSecRef}>
          <div className="text-box">
            <h1 style={{ float: "left" }}>
              <span style={{ color: "#FF0000", float: "left" }}>
                HUNTING IS
              </span>
              <br /> OUR PASSION
            </h1>
            <ul style={{ textAlign: "left" }}>
              <li>Nature's raw connection calls</li>
              <li>Traditions passed through generations</li>
              <li>Challenge tests our limits</li>
              <li>Conservation meets skilled pursuit</li>
              <li>Respect for the hunt</li>
            </ul>
            <button>Let's Hunt</button>
          </div>
        </div>

        {/* Welcome-Sec */}
        <div className="welcome-sec section sectionSpace">
          <img
            src={welcomeP}
            alt="Welcome-page"
            className="welcome-img"
            height="500px"
          />
          <div className="welcome-p">
            <h2 style={{ color: "#fff", fontSize: "40px", fontWeight: "400" }}>
              Streamlining <span style={{ color: "#FF0000" }}>Taxidermy</span>{" "}
              with Our App
            </h2>
            <p style={{ color: "#fff", marginTop: "40px" }}>
              Welcome to our Taxidermy management app- the ultimate solution for
              modern taxidermists. Let's dive into how our app can revolutionize
              your workflow and boost your business.
              <br />
              First off, our app saves you precious time. No more manual
              paperwork or phone calls. Clients can enter their information
              directly into the System.
              <br />
              Say goodbye to cash or checks. Our app allows clients to pay
              securely through their phones. Ever wonder where an item is in
              production? Our app provides real-time updates. Clients can see
              exactly where their prized trophy is. Keep clients informed
              effortlessly. Automated emails notify them of updates - from
              tanning to Our app is secure and user-friendly. No need for client
              accounts or internet worries.
              <br />
              So, fellow taxidermists, embrace efficiency, transparency, and
              client satisfaction. Download our Taxidermy App today.
              <br /> Remember, our app isn't just about saving time; it's about
              preserving the art of taxidermy.
            </p>
            <div className="welcome-bottom">
              <h4 style={{ color: "#fff" }}>#TAXIDERMYMANAGEMENT</h4>
              <img src={Sign} alt="sign"></img>
            </div>
          </div>
        </div>

        {/* App-Sec */}
        <div className="app-sec section sectionSpace" ref={appSecRef}>
          <h2
            style={{
              color: "#fff",
              fontSize: "40px",
              fontWeight: "400",
              textAlign: "center",
            }}
            className="app-h2"
          >
            {" "}
            The <span style={{ color: "#FF0000" }}> Taxidermy</span> Management
            App
          </h2>
          <div
            className="app-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <div className="app-text">
              <h2 style={{ color: "#FF0000" }}>Our App</h2>
              <div style={{ marginTop: "40px" }} className="app-div">
                <h2>Streamlined Workflow</h2>
                <p>
                  Efficiently manage taxidermy projects from start to finish
                  with a user-friendly interface.
                </p>
              </div>
              <div style={{ marginTop: "40px" }} className="app-div">
                <h2>Enhanced Organization</h2>
                <p>
                  {" "}
                  Track orders and schedules in one place to stay organized and
                  productive.
                </p>
              </div>
              <div style={{ marginTop: "40px" }} className="app-div">
                <h2>Time-Saving Taxidermy</h2>
                <p>Streamline your taxidermy workflow with Swift Management.</p>
              </div>
            </div>
            <div
              className="app-img"
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "space-between",
              }}
            >
              <img
                src={App1}
                alt="app-page"
                className="app-img"
                height="400px"
              />
              <img
                src={App2}
                alt="app-page"
                className="app-img"
                height="400px"
              />
              <img
                src={App3}
                alt="app-page"
                className="app-img"
                height="400px"
              />
            </div>
          </div>
        </div>

        {/* AppProcess-Sec */}
        <div className="three-step-container sectionSpace">
          <h2 style={{ fontSize: "40px" }}>
            The <span className="highlight">3 Step</span> Process Of App
          </h2>
          <div className="three-step-cards">
            {steps.map((step, index) => (
              <div className="card" key={index}>
                <div className="gif-container">
                  <img src={step.icon} alt={`${step.title} gif`} />
                </div>
                <button className="app-button" style={{ marginBottom: "1rem" }}>
                  {step.title}
                </button>
                <p>{step.description}</p>
                <div className="rating">{"⭐".repeat(step.rating)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Install-sec */}
        <div className="install-sec section sectionSpace">
          <div className="welcome-p">
            <h2
              style={{ color: "#fff", fontSize: "40px", fontWeight: "bolder" }}
            >
              {" "}
              MAKING THE HUNT <br />{" "}
              <span style={{ color: "#FF0000", fontSize: "50px" }}>
                HAPPEN{" "}
              </span>
            </h2>
            <p style={{ color: "#fff", marginTop: "10px" }}>
              Taxidermy Management is designed to simplify the entire project
              workflow. It efficiently tracks orders and schedules in one
              centralized location, making it easy to manage your taxidermy
              projects from start to finish. The app’s intuitive interface
              allows you to stay informed and ensures timely delivery. Shops can
              coordinate with clients and schedule work, Taxidermy Management
              streamlines the process, so you can focus on delivering
              exceptional service.
            </p>
            <button onClick={handleClick}>INSTALL NOW</button>
          </div>
          <img
            src={installImg}
            alt="Welcome-page"
            className="welcome-img"
            height="400px"
          />
        </div>

        {/* Taxi-management */}
        <div className="video-container">
          <div className="video1"></div>
          <video autoPlay loop muted className="background-video">
            <source src={taxiVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay">
            <img
              src={TaxiManagementImg}
              alt="Silhouette"
              className="silhouette title1"
            />
            <h1 className="title1" style={{ fontSize: "70px" }}>
              <span style={{ color: "#FF0000" }}>TAXIDERMY</span>
              <br /> MANAGEMENT
            </h1>
          </div>
        </div>

        {/* Client-review  */}
        <div
          style={{ textAlign: "center" }}
          className="client-app section3"
          ref={appProcessSecRef}
        >
          <h2 style={{ color: "#fff", fontSize: "40px", fontWeight: "400" }}>
            What <span style={{ color: "#FF0000" }}>Clients</span> Say About Us
          </h2>
          <Slider {...settings} style={{ marginRight: "20px" }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
                style={{
                  width: "350px",
                  margin: "0 10px",
                  padding: "20px",
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    style={{
                      borderRadius: "50%",
                      marginBottom: "10px",
                      border: "2px solid white",
                      height: "50px",
                      width: "50px",
                    }}
                  />
                  <h3 style={{ marginBottom: "10px" }}>{testimonial.name}</h3>
                </div>
                <p>{testimonial.text}</p>
              </div>
            ))}
          </Slider>
        </div>

        {/* Install-App */}
        <div
          className="section inst-sec"
          style={{
            backgroundColor: "#101010",
            color: "white",
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          <h3 style={{ fontSize: "1.2rem" }}>START HUNT</h3>
          <h2 style={{ marginBottom: "20px", fontSize: "40px" }}>
            Install <span style={{ color: "red" }}>App</span> Now
          </h2>

          <div style={{ padding: "10px" }}>
            <Slider {...settings2}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="carousel-item"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                    padding: "0 10px",
                  }}
                >
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div
            className="links-s"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              textAlign: "center",
              gap: "20px",
            }}
          >
            <h4 style={{ marginTop: "25px" }}>Join Us On</h4>
            <a
              href="https://apps.apple.com/us/app/taxidermy-management/id6670444015"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={app1}
                alt="App Store"
                style={{
                  borderRadius: "10px",
                  maxHeight: "65px",
                  maxWidth: "500px",
                }}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hunt30.taxidermy"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={app2}
                alt="Google Play"
                style={{
                  borderRadius: "10px",
                  maxHeight: "65px",
                  maxWidth: "500px",
                }}
              />
            </a>
          </div>
        </div>

        {/* Footer-sec */}
        <footer className="footer section1">
          <div
            className="footer-content"
            style={{ borderBottom: "1px solid white", paddingBottom: "10px" }}
          >
            <div className="footer-brand">
              <h2>
                <span className="highlight">
                  Taxidermy
                  <br />
                </span>{" "}
                Management
              </h2>
              <p>
                Streamline your taxidermy projects with ease using Taxidermy
                Management.
              </p>
            </div>
            <div className="footer-contact">
              <h3>
                Contact <span className="highlight">Us</span>
              </h3>
              <div className="footer-contact-details">
                <div className="contact-item">
                  <strong>PHONE:</strong>
                  <p style={{ width: "120px" }}>
                    <a href="tel:+15025595867">+1 5025595867</a>
                  </p>
                </div>
                <div className="contact-item">
                  <strong>EMAIL:</strong>
                  <p>
                    <a
                      href="mailto:hunt30apps@gmail.com"
                      style={{ whiteSpace: "normal" }}
                    >
                      hunt30apps@gmail.com
                    </a>
                  </p>
                </div>
                <div className="contact-item">
                  <strong>ADDRESS:</strong>
                  <p style={{ width: "350px" }}>
                    889 Colloredo Blvd. Shelbyville, TN 37160
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2024 Taxidermy Management, All Rights Reserved</p>
            <p>
              Developed By{" "}
              <a
                href="https://aayaninfotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Aayan Infotech
              </a>
            </p>
          </div>
        </footer>
      </div>

      <ToastContainer autoClose={8000} />
    </>
  );
}

export default Home;
