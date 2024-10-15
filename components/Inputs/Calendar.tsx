"use client";

import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import { ptBR } from "date-fns/locale"

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

function Calendar({ value, onChange, disabledDates }: CalendarProps) {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      locale={ptBR} 
    />
  );
}

export default Calendar;
