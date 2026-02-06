import { create } from "zustand";

interface ShowPopUpState {
    show: boolean;
    setShow: (show: boolean) => void;
}

export const useShowPopUp = create<ShowPopUpState>((set) => ({
    show: false,
    setShow: (show: boolean) => set({ show }),
}));