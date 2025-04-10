"use client";

import React, { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    document.title = "Yangiliklar";
  }, []);

  return <div>Yangiliklar</div>;
};

export default Blog;
