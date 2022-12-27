function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ApplicationRow({ application, handleDialogOpen }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {application.job.name}
            </div>
            <div className="text-sm text-gray-500">
              {/* cut to few words */}
              {application.job.description.length > 75 ? application.job.description.substring(0, 50) + "..." : application.job.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{application.job.wagePerDay}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {/* if status accepted then green, cancelled then red */}
        <span className={joinClasses(application.status === "accepted" ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800")}>
          {application.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a className="text-indigo-600 hover:text-indigo-900" onClick={() => handleDialogOpen("lg", application)}>
          Edit
        </a>
      </td>
    </tr>
  );
}