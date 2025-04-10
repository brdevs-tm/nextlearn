"use client";

import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Aloqa";
  }, []);
  return <div>Contact</div>;
};

export default Contact;
