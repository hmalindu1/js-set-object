"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -50 }, // Start position for the animation
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Delay each row based on its index
      duration: 0.5, // Duration of the animation
      type: "spring", // Use a spring type animation for a bounce effect
      stiffness: 100, // Spring stiffness, adjust for more/less bounce
      damping: 10, // Spring damping, adjust to change how the bounce behaves
    },
  }),
};

export default function Home() {
  const data = [
    { id: 23423, name: "Alice", age: 28, city: "New York" },
    { id: 75675, name: "Bob", age: 34, city: "San Francisco" },
    { id: 63456, name: "Charlie", age: 22, city: "Los Angeles" },
    { id: 49675, name: "Diana", age: 45, city: "Chicago" },
    { id: 50757, name: "Evan", age: 30, city: "Miami" },
    { id: 64878, name: "Fiona", age: 29, city: "Seattle" },
  ];

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allDataIds = new Set(data.map((item) => item.id));
      setSelectedItems(allDataIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  const toggleItemSelection = (dataId: number) => {
    const newSelection = new Set(selectedItems);
    if (selectedItems.has(dataId)) {
      newSelection.delete(dataId);
    } else {
      newSelection.add(dataId);
    }
    setSelectedItems(newSelection);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-3/4 mx-auto">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-gray-100 border-b border-gray-200">
                <label className="w-full h-full flex cursor-pointer">
                  <input
                    className="form-checkbox h-5 w-5"
                    type="checkbox"
                    checked={selectedItems.size === data.length}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              <th className="p-4 bg-gray-100 border-b border-gray-200">Name</th>
              <th className="p-4 bg-gray-100 border-b border-gray-200">Age</th>
              <th className="p-4 bg-gray-100 border-b border-gray-200">City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item,index) => (
              <motion.tr
                key={item.id}
                variants={variants} // Apply the defined variants
                initial="hidden" // Start with the 'hidden' variant
                custom={index} // Pass the index to the 'visible' variant for staggered animation
                animate="visible" // Animate to the 'visible' variant
              >
                <td className="border px-4 py-2 text-gray-600 ">
                  <label className="w-full h-full flex cursor-pointer">
                    <input
                      type="checkbox"
                      value={item.id}
                      className="form-checkbox h-5 w-5"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                    />
                  </label>
                </td>
                <td className="p-4 border-b border-gray-200">{item.name}</td>
                <td className="p-4 border-b border-gray-200">{item.age}</td>
                <td className="p-4 border-b border-gray-200">{item.city}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <p className="mt-10">Selected Items: {selectedItems.size}</p>
        <p className="mt-4">
          Selected IDs:{" "}
          {Array.from(selectedItems)
            .map((id) => id)
            .join(", ")}
        </p>
        <p className="mt-4">
          Selected Names:{" "}
          {Array.from(selectedItems)
            .map((id) => data.find((item) => item.id === id)?.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}
