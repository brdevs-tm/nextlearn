"use client";
import React, { useEffect } from "react";

const Courses = () => {
  useEffect(() => {
    document.title = "Kurslar";
  }, []);
  return <div>Courses</div>;
};

export default Courses;
