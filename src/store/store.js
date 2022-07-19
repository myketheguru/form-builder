import create from 'zustand'

export const useDropzoneState = create((set) => ({
    dropzoneData: [],
    selectedDataIndex: -1,
    showProperties: false,
    setDropzoneData: (data) => set((state) => ({ dropzoneData: data })),
    setSelectedDataIndex: (index) => set((state) => ({ selectedDataIndex: index })),
    setShowProperties: (shouldShow) => set((state) => ({ showProperties: shouldShow })),
}))