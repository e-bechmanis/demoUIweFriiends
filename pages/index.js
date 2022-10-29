/*********************************************************************************
 * WEB422 – Assignment 4
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Elena Bechmanis      Student ID: 165090218          Date:28/10/2022
 *
 *
 ********************************************************************************/
import * as React from "react";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

//hardcoding in this case urls of images that are changing like a slide-show on the homepage
const urlArray = [
  "/images/levi-meir-clancy-jZaQOzrC3XU-unsplash.jpg",
  "/images/matthieu-joannon-wRtN8AgpvLg-unsplash.jpg",
  "/images/robert-bye-H1T4gvCscTg-unsplash.jpg",
];

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const image = {
    url: urlArray[count % urlArray.length],
    title: "Explore The Met",
    width: "60%",
  };

  //Code for styled button was copied from Mui library
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <>
      <Row>
        <Link href="https://www.metmuseum.org/" passHref={true}>
          <ImageButton
            className="ms-3"
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image alt="The Met button">
              <Typography
                component="span"
                variant="h4"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Link>
        <Col className="ps-5 pe-5">
          <br />
          <p>
            <span className="text-danger">
              <strong>The Metropolitan Museum of Art</strong>
            </span>{" "}
            of New York City, colloquially &ldquo;the Met&ldquo;, is the largest
            art museum in the Americas. Its permanent collection contains over
            two million works, divided among 17 curatorial departments. The main
            building at 1000 Fifth Avenue, along the Museum Mile on the eastern
            edge of Central Park on Manhattan&apos;s Upper East Side, is by area
            one of the world&apos;s largest art museums. A much smaller second
            location, The Cloisters at Fort Tryon Park in Upper Manhattan,
            contains an extensive collection of art, architecture, and artifacts
            from medieval Europe.
          </p>

          <p>
            The Metropolitan Museum of Art was founded in 1870 with its mission
            to bring art and art education to the American people. The
            museum&apos;s permanent collection consists of works of art from
            classical antiquity and ancient Egypt, paintings, and sculptures
            from nearly all the European masters, and an extensive collection of
            American and modern art. The Met maintains extensive holdings of
            African, Asian, Oceanian, Byzantine, and Islamic art. The museum is
            home to encyclopedic collections of musical instruments, costumes,
            and accessories, as well as antique weapons and armor from around
            the world. Several notable interiors, ranging from 1st-century Rome
            through modern American design, are installed in its galleries.
          </p>
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
            className="float-end"
          >
            <span className="text-danger">Read more on Wikipedia</span>
          </a>
        </Col>

        <div className="footer-svg fixed-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff4444"
              fill-opacity="0.2"
              d="M0,288L120,288C240,288,480,288,720,250.7C960,213,1200,139,1320,101.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </Row>
    </>
  );
}
