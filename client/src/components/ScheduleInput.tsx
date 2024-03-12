import React from "react";

interface Schedule {
  startTime: string;
  endTime: string;
  day: string;
}

interface ScheduleInputProps {
  schedule: Schedule;
  onChange: (index: number, newSchedule: Schedule) => void;
  onRemove: (index: number) => void;
  daysOfWeek: string[];
  index: number;
  showRemoveButton?: boolean;
}

const ScheduleInput: React.FC<ScheduleInputProps> = ({
  schedule,
  onChange,
  onRemove,
  daysOfWeek,
  index,
  showRemoveButton,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(index, { ...schedule, [name]: value });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2 items-center">
          <input
            type="time"
            name="startTime"
            value={schedule.startTime}
            className="col-span-1 outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
            onChange={handleChange}
          />
          <input
            type="time"
            name="endTime"
            value={schedule.endTime}
            className="col-span-1 outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            disabled={!showRemoveButton} // Deshabilitar el botón cuando showRemoveButton sea falso
            className={`col-span-1 outline-none duration-500 ease-in-out hover:translate-y-1 text-gray-600 bg-lime-400 dark:bg-red-400 focus:ring-4 focus:ring-red-300 focus:outline-none rounded-lg text-sm px-5 py-2.5 hover:bg-red-500 hover:text-white text-center ${
              showRemoveButton
                ? ""
                : "disabled:bg-gray-400 disabled:text-gray-500 cursor-not-allowed"
            }`}
          >
            Eliminar
          </button>
        </div>
        <select
          name="day"
          value={schedule.day}
          onChange={handleChange}
          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScheduleInput;
