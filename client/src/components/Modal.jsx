import { motion, AnimatePresence } from "framer-motion"

export default function Modal({
  open,
  title,
  message,
  onClose,
  actions = [],
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-md rounded-xl p-5 space-y-4"
          >
            {title && (
              <h2 className="text-lg font-bold text-gray-800">
                {title}
              </h2>
            )}

            {message && (
              <p className="text-gray-600 text-sm">
                {message}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={`px-4 py-2 rounded-md text-sm transition ${
                    action.variant === "danger"
                      ? "bg-red-600 text-white hover:opacity-90"
                      : action.variant === "primary"
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {action.label}
                </button>
              ))}

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}