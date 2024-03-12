import React, { useState, useEffect } from "react";
import ScheduleInput from "./ScheduleInput";

interface Schedule {
  startTime: string;
  endTime: string;
  day: string;
}

interface ScheduleManagerProps {
  onChange: (schedules: Schedule[]) => void;
  value: string;
}
const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  onChange,
  value,
}) => {
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

  useEffect(() => {
    if (value) {
      const scheduleParts = value.split(", ").map((part) => {
        const [times, day] = part.split(" ");
        const [startTime, endTime] = times.split("-");
        return { startTime, endTime, day };
      });
      setSchedules(scheduleParts);
    }
  }, [value]);

  const handleScheduleChange = (index: number, newSchedule: Schedule) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? newSchedule : schedule
    );
    setSchedules(updatedSchedules);
    onChange(updatedSchedules);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { startTime: "", endTime: "", day: "Lunes" }]);
  };

  const handleRemoveSchedule = (index: number) => {
    if (schedules.length > 1) {
      const updatedSchedules = schedules.filter((_, i) => i !== index);
      setSchedules(updatedSchedules);
      onChange(updatedSchedules);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 md:space-y-6">
        {schedules.map((schedule, index) => (
          <ScheduleInput
            key={`${schedule.startTime}-${schedule.endTime}-${index}`}
            index={index}
            schedule={schedule}
            onChange={handleScheduleChange}
            onRemove={handleRemoveSchedule}
            daysOfWeek={daysOfWeek}
            showRemoveButton={schedules.length > 1}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddSchedule}
        className="mt-4 duration-500 ease-in-out hover:translate-y-1 w-full text-gray-600 bg-lime-400 focus:ring-4 focus:ring-lime-300 focus:outline-none rounded-lg text-sm px-5 py-2.5 hover:bg-lime-500 hover:text-black text-center"
      >
        Agregar Horario
      </button>
    </div>
  );
};

export default ScheduleManager;
