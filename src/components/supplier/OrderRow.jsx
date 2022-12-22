// row for order table
//
// // create table dashboard tailwind material ui
//
// // fetch orders from database using axios and hook

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderRow({ order, handleDialogOpen, size }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {order.product.name}
            </div>
            <div className="text-sm text-gray-500">
              {/* cut to few words */}
              {order.product.description.length > 75 ? order.product.description.substring(0, 50) + "..." : order.product.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{order.quantity}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{order.product.costPerDay}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {/* if status accepted then green, cancelled then red */}
        <span className={joinClasses(order.status === "accepted" ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800")}>
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a className="text-indigo-600 hover:text-indigo-900" onClick={() => handleDialogOpen("lg", order)}>
          Edit
        </a>
      </td>
    </tr>
  );
}