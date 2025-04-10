"use client";

import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Biz haqimizda";
  }, []);
  return <div>About</div>;
};

export default About;
