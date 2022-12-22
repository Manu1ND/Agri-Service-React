import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function FormAction({ handleSubmit, type = 'Button', action = 'submit', text }) {
  return (
    <>
      {
        type === 'Button' ?
          <button
            type={action}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
            onSubmit={handleSubmit}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-purple-400 group-hover:text-purple-300" aria-hidden="true" />
            </span>
            {text}
          </button>
          :
          <></>
      }
    </>
  )
}