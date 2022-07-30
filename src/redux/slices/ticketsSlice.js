import ticketsAPI from "services/ticketsAPI";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  isConfirmLoading: false,
  // bookedTickets: [],
  bookedSuccess: "",
  ticketsData: {},
  isPageLoading: false,
  error: "",
};

export const ticketsByShowtime = createAsyncThunk("tickets/ticketsByShowtime", async (showtimeId) => {
  try {
    const data = await ticketsAPI.getTicketsByShowtime(showtimeId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const bookSelectedTickets = createAsyncThunk("ticket/bookSelectedTickets", async (showtimeId, { dispatch, getState }) => {
  try {
    const { selectedSeats } = getState().tickets;
    let filter = selectedSeats.map(({ tenGhe, giaVe, maGhe, isSelected }) => {
      return { maGhe, giaVe };
    });
    const data = await ticketsAPI.sendBookedTickets({ maLichChieu: showtimeId, danhSachVe: [...filter] });

    return data;
  } catch (error) {
    throw error;
  }
});

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: initialState,
  reducers: {
    selectSeat: (state, action) => {
      const { maGhe, isSelected } = action.payload;
      if (isSelected) {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats, { ...action.payload, isSelected: isSelected }],
        };
      } else {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats].filter((ticket) => {
            return ticket.maGhe !== maGhe;
          }),
        };
      }
    },
    resetTicketsReducer: (state) => {
      return {
        ...state,
        selectedSeats: [],
        isConfirmLoading: false,
        bookedSuccess: "",
        ticketsData: {},
        isPageLoading: false,
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ticketsByShowtime.pending, (state, action) => {
      return { ...state, isPageLoading: true };
    });
    builder.addCase(ticketsByShowtime.fulfilled, (state, action) => {
      return { ...state, isPageLoading: false, ticketsData: action.payload };
    });
    builder.addCase(ticketsByShowtime.rejected, (state, action) => {
      return { ...state, isPageLoading: false, error: action.error.message };
    });
    //
    builder.addCase(bookSelectedTickets.pending, (state, action) => {
      return { ...state, isConfirmLoading: true };
    });
    builder.addCase(bookSelectedTickets.fulfilled, (state, action) => {
      return { ...state, isConfirmLoading: false, bookedSuccess: action.payload };
    });
    builder.addCase(bookSelectedTickets.rejected, (state, action) => {
      return { ...state, isConfirmLoading: false, error: action.error.message };
    });
  },
});

export const { selectSeat, resetTicketsReducer } = ticketsSlice.actions;

export default ticketsSlice.reducer;
