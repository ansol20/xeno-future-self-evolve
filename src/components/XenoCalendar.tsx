
import React from 'react';
import { Card } from "@/components/ui/card";

interface CalendarProps {
  currentDate: Date;
}

const XenoCalendar: React.FC<CalendarProps> = ({ currentDate }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  
  // Get the day of the week of the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get the number of days in the month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Create calendar grid
  const days = [];
  const totalCalendarCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
  
  for (let i = 0; i < totalCalendarCells; i++) {
    const dayIndex = i - firstDayOfMonth + 1;
    if (dayIndex > 0 && dayIndex <= daysInMonth) {
      days.push({
        number: dayIndex,
        isCurrentDay: dayIndex === currentDay,
        isInMonth: true
      });
    } else {
      days.push({
        number: dayIndex <= 0 ? new Date(currentYear, currentMonth, dayIndex).getDate() : 
                              new Date(currentYear, currentMonth + 1, dayIndex - daysInMonth).getDate(),
        isCurrentDay: false,
        isInMonth: false
      });
    }
  }

  return (
    <Card className="glass-morphism p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{monthNames[currentMonth]} {currentYear}</h2>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-full
              ${day.isInMonth ? 'text-white' : 'text-gray-500'}
              ${day.isCurrentDay ? 'bg-xeno-purple' : day.isInMonth ? 'hover:bg-xeno-purple/20' : ''}
            `}
          >
            {day.number}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default XenoCalendar;
