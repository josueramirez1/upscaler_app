const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 min-h-[100vh]">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl outline bg-gray-300"></div>
        <div className="bg-muted/50 aspect-video rounded-xl outline"></div>
        <div className="bg-muted/50 aspect-video rounded-xl outline"></div>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min outline"></div>
    </div>
  );
};

export default HomePage;
