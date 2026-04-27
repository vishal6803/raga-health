import { create } from "zustand";

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  status: "Stable" | "Critical" | "Discharged";
}

interface PatientState {
  patients: Patient[];
  viewMode: "grid" | "list";
  toggleView: () => void;
  setPatients: (data: Patient[]) => void;
}

export const usePatientStore = create<PatientState>()((set) => ({
  patients: [],
  viewMode: "grid",
  toggleView: () =>
    set((state) => ({
      viewMode: state.viewMode === "grid" ? "list" : "grid",
    })),
  setPatients: (data: Patient[]) => set({ patients: data }),
}));
