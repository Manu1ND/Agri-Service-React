function joinClasses(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  export default function JobAppliedRow({ jobApplied, handleDialogOpen, size }) {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {jobApplied.jobCategory.name}
              </div>
              <div className="text-sm text-gray-500">
                {/* cut to few words */}
                {jobApplied.description.length > 75 ? jobApplied.description.substring(0, 50) + "..." : jobApplied.description}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{jobApplied.quantity}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{jobApplied.costPerDay}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {/* if status accepted then green, cancelled then red */}
          <span className={joinClasses(jobApplied.status === "accepted" ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800")}>
            {jobApplied.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a className="text-indigo-600 hover:text-indigo-900" onClick={() => handleDialogOpen("lg", jobApplied)}>
            Edit
          </a>
        </td>
      </tr>
    );
  }