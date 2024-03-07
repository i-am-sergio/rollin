import React, { useState } from "react";
import ScheduleInput from "./ScheduleInput";

interface Schedule {
  startTime: string;
  endTime: string;
  day: string;
}

interface ScheduleManagerProps {
  onChange: (schedules: Schedule[]) => void;
}
const ScheduleManager: React.FC<ScheduleManagerProps> = ({ onChange }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { startTime: "", endTime: "", day: "Lunes" },
  ]);

  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleScheduleChange = (index: number, newSchedule: Schedule) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? newSchedule : schedule
    );
    setSchedules(updatedSchedules);
    onChange(updatedSchedules); // Propaga el cambio hacia arriba
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { startTime: "", endTime: "", day: "Lunes" }]);
  };

  const handleRemoveSchedule = (index: number) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
    onChange(updatedSchedules); // Propaga el cambio hacia arriba
  };

  return (
    <div>
      <div className="flex flex-row justify-between space-y-4 md:space-y-6">
        {schedules.map((schedule, index) => (
          <ScheduleInput
            key={index}
            index={index}
            schedule={schedule}
            onChange={handleScheduleChange}
            onRemove={handleRemoveSchedule}
            daysOfWeek={daysOfWeek}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between space-y-4 md:space-y-6"></div>
      <button
        type="button"
        onClick={handleAddSchedule}
        className="duration-500 ease-in-out hover:translate-y-1 w-full text-gray-600 bg-lime-400 focus: font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-lime-500 hover:text-black"
      >
        Agregar Horario
      </button>
    </div>
  );
};

export default ScheduleManager;
