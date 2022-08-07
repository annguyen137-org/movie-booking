import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectSeat } from "redux/slices/ticketsSlice";

const SeatItem = ({ seat }) => {
  const dispatch = useDispatch();

  const { selectedSeats } = useSelector((state) => {
    return state.tickets;
  });

  // save selected ticket and bind back to UI when user got redirected to purchase page after logged in
  const savedSelect = selectedSeats?.find((item) => {
    return item.maGhe === seat.maGhe;
  });

  const [isSelected, setIsSelected] = useState(false || savedSelect?.isSelected);

  const handleSelectTicket = (seat) => {
    const { tenGhe, maGhe, giaVe } = seat;

    setIsSelected(!isSelected);

    dispatch(selectSeat({ tenGhe, maGhe, giaVe, isSelected: !isSelected }));
  };

  return (
    <div className="rounded-md overflow-hidden">
      <Button
        title={
          seat.daDat ? `Vé ${seat.tenGhe} đã được đặt` : `Click để đặt ghế ${seat.loaiGhe === "Vip" ? "vip" : "thường"} ${seat.tenGhe}`
        }
        size="large"
        className={`flex justify-center items-center w-full text-black hover:text-black rounded-md overflow-hidden border-slate-900 hover:${
          seat.daDat ? "" : "bg-white"
        } ${seat.daDat ? "bg-red-600" : isSelected ? "bg-green-600" : seat.loaiGhe === "Vip" ? "bg-orange-400" : "bg-slate-300"}`}
        disabled={seat.daDat}
        onClick={() => handleSelectTicket(seat)}
      >
        {seat.daDat ? "X" : seat.tenGhe}
      </Button>
    </div>
  );
};

export default SeatItem;
