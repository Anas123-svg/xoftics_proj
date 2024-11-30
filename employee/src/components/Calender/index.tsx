import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Calendar = () => {
  return (
    <div className="container mx-auto py-12 lg:py-16">
      <Breadcrumb pageName="Calendar" />

      <div className="w-full max-w-full rounded-md border border-gray-700 bg-gradient-to-br from-[#0d1c1e] to-black shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-md bg-gradient-to-r from-teal-500 to-green-700 text-white">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                (day, idx) => (
                  <th
                    key={idx}
                    className={`flex h-16 items-center justify-center ${
                      idx === 0 ? "rounded-tl-md" : ""
                    } ${idx === 6 ? "rounded-tr-md" : ""} p-3 text-sm font-bold uppercase`}
                  >
                    <span className="hidden lg:block">{day}</span>
                    <span className="block lg:hidden">{day.slice(0, 3)}</span>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="grid grid-cols-7">
                {[...Array(7)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="relative h-20 cursor-pointer border border-gray-700 bg-gradient-to-b from-[#102527] to-[#0d1c1e] p-3 text-white transition duration-300 hover:bg-teal-600 hover:text-black"
                  >
                    <span className="font-medium">{rowIndex * 7 + colIndex + 1}</span>
                    <div className="group h-16 w-full flex-grow cursor-pointer py-1">
                      <span className="hidden group-hover:block text-sm font-medium">
                        Event Details
                      </span>
                      <div className="absolute left-2 hidden z-10 w-auto rounded-md bg-teal-500 px-3 py-2 text-left text-sm font-semibold text-white group-hover:block">
                        <p>Event Title</p>
                        <p>Start Date - End Date</p>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
