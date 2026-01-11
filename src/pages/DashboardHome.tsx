import { Card, CardHeader } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import Draggable from "../components/draggable";
import Droppable from "../components/droppable";

const DashboardHome = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }

  return (
    <div className="flex gap-6 p-6 ">
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <div className="w-full max-w-sm outline rounded">
          <Droppable>
            <h1>Backlog</h1>
            <Card className="m-2">
              <CardHeader>Fix bug related to rehydrating</CardHeader>
            </Card>
          </Droppable>
        </div>
        <div className="w-full max-w-sm outline rounded">
          <h1>To Be Completed</h1>
          <Card className="m-2">
            <CardHeader>Adjust Footer</CardHeader>
          </Card>
          <Card className="m-2">
            <CardHeader>Adjust Footer</CardHeader>
          </Card>
          <Card className="m-2">
            <CardHeader>Adjust Footer</CardHeader>
          </Card>
          <Card className="m-2">
            <CardHeader>Adjust Footer</CardHeader>
          </Card>
        </div>
        <div className="w-full max-w-sm outline rounded">
          <h1>In Progress...</h1>
          <Card className="m-2">
            <CardHeader>Header Color needs changing to red</CardHeader>
          </Card>
        </div>
        <div className="w-full max-w-sm outline rounded">
          <h1>Completed!</h1>
          <Card className="m-2">
            <CardHeader>Pricing subscription update</CardHeader>
          </Card>
        </div>
      </DndContext>
    </div>
  );
};

export default DashboardHome;
