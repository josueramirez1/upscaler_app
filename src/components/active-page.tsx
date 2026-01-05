import HomePage from "./home-page";
import Inbox from "./inbox-page";
import TaskBoard from "./task-board";
import {type Page } from "../pages/Dashboard";

export default function ActivePage({ page }: { page: Page }) {
  switch (page) {
    case "Home":
      return <HomePage />;
    case "Inbox":
      return <Inbox />;
    case "Board":
      return <TaskBoard />;
    default:
      return null;
  }
}
