import React from "react";
import Sidebar from "./Sidebar";
import Tasks from "../Tasks";
import { useEffect } from "react";

function Content() {
  return (
    <section className="content">
      <Sidebar />
      <Tasks />
    </section>
  );
}

export default Content;
