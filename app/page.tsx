"use client";
import { useState } from "react";

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

  /**
   * This function handles the event when the select all checkbox is changed.
   *  It updates the selectedItems state based on whether the select all checkbox is checked or not.
   *  */
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    // If the select all checkbox is checked, we want to select all data items.
    // So we create a new Set containing all data item ids and update the selectedItems state with this new Set.
    if (event.target.checked) {
      // We use the map function to create a new array containing all data item ids.
      const allDataIds = new Set(data.map((item) => item.id));

      // We update the selectedItems state with this new Set of all data item ids.
      setSelectedItems(allDataIds);
    }
    // If the select all checkbox is not checked, we want to deselect all data items.
    // So we update the selectedItems state with a new empty Set.
    else {
      // We create a new empty Set and update the selectedItems state with this new Set.
      setSelectedItems(new Set());
    }
  };

  /**
   * This function is used to toggle the selection of a data item.
   * It takes in a dataId as a parameter and updates the selectedItems state accordingly.
   * The function works by creating a new Set from the current selectedItems state.
   * If the dataId is already in the selectedItems Set, it is removed.
   * If the dataId is not in the selectedItems Set, it is added.
   * Finally, the new Set is set as the new state for selectedItems.
   * */
  const toggleItemSelection = (dataId: number) => {
    // Create a new Set from the current selectedItems state.
    // This will be used to update the selection.
    const newSelection = new Set(selectedItems);

    // Check if the dataId is already in the selectedItems Set.
    // If it is, remove it from the new Set.
    if (selectedItems.has(dataId)) {
      newSelection.delete(dataId);
    }
    // If the dataId is not in the selectedItems Set, add it to the new Set.
    else {
      newSelection.add(dataId);
    }

    // Set the new Set as the new state for selectedItems.
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
            {data.map((item) => (
              <tr key={item.id}>
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
              </tr>
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
