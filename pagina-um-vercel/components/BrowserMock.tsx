export default function BrowserMock() {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white shadow-mock md:-rotate-[1.2deg]">
      <div className="flex items-center gap-1.5 border-b border-line bg-light px-6 py-4">
        <span className="h-[9px] w-[9px] rounded-full bg-line" />
        <span className="h-[9px] w-[9px] rounded-full bg-line" />
        <span className="h-[9px] w-[9px] rounded-full bg-line" />
        <div className="ml-4 rounded-full border border-line bg-white px-3.5 py-1 text-[0.75rem] text-mid">
          suaempresa.com.br
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-2.5 w-[60px] rounded-[3px] bg-ink" />
          <div className="flex gap-2">
            <span className="h-2 w-6 rounded-[3px] bg-line" />
            <span className="h-2 w-6 rounded-[3px] bg-line" />
            <span className="h-2 w-6 rounded-[3px] bg-line" />
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-2.5 h-3 w-4/5 rounded-[3px] bg-dark" />
          <div className="mb-2.5 h-[9px] w-[55%] rounded-[3px] bg-line" />
          <div className="mt-4 h-6 w-[100px] rounded-full bg-ink" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="h-[50px] rounded-sm border border-line bg-light" />
          <div className="h-[50px] rounded-sm border border-line bg-light" />
          <div className="h-[50px] rounded-sm border border-line bg-light" />
        </div>
      </div>
    </div>
  );
}
