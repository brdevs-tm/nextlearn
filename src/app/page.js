"use client";

import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    document.title = "NextLearn ";
  }, []);
  return <div></div>;
};

export default page;
