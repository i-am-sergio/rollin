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
}

const ScheduleInput: React.FC<ScheduleInputProps> = ({
  schedule,
  onChange,
  onRemove,
  daysOfWeek,
  index,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(index, { ...schedule, [name]: value });
  };

  return (
    <div>
      <div className="flex flex-row justify-between space-x-4">
        <input
          type="time"
          name="startTime"
          value={schedule.startTime}
          className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
          onChange={handleChange}
        />
        <input
          type="time"
          name="endTime"
          value={schedule.endTime}
          className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row justify-between space-x-4">
        <select
          name="day"
          value={schedule.day}
          onChange={handleChange}
          className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="outline-none duration-500 my-4 ease-in-out hover:translate-y-1 w-24 text-gray-600 bg-lime-400 focus:font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-lime-500 hover:text-black text-center"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ScheduleInput;
