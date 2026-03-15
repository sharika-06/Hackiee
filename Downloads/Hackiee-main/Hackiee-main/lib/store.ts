import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LevelProgress {
    id: string;
    isUnlocked: boolean;
    isCompleted: boolean;
    score: number;
    stars: number; // 0 to 5
}

interface IntegrityState {
    tabSwitches: number;
    pasteCount: number;
    isInterrogationPending: boolean;
    score: {
        syntax: number;
        logic: number;
        performance: number;
        aiIndependence: number;
    };
    levels: Record<string, LevelProgress>;
    incrementTabSwitches: () => void;
    incrementPasteCount: () => void;
    setInterrogationPending: (pending: boolean) => void;
    updateScore: (newScore: Partial<IntegrityState['score']>) => void;
    completeLevel: (currentLevelId: string, nextLevelId: string | null, score: number, stars: number) => void;
    resetSessionMetrics: () => void; // Call on each new login
}

export const useIntegrityStore = create<IntegrityState>()(
    persist(
        (set) => ({
            tabSwitches: 0,
            pasteCount: 0,
            isInterrogationPending: false,
            score: {
                syntax: 0,
                logic: 0,
                performance: 0,
                aiIndependence: 100,
            },
            // Initial state: first level unlocked, others locked
            levels: {
                'hello-world': { id: 'hello-world', isUnlocked: true, isCompleted: false, score: 0, stars: 0 },
                'odd-or-even': { id: 'odd-or-even', isUnlocked: false, isCompleted: false, score: 0, stars: 0 },
                'prime-number': { id: 'prime-number', isUnlocked: false, isCompleted: false, score: 0, stars: 0 },
                'factorial-calculation': { id: 'factorial-calculation', isUnlocked: false, isCompleted: false, score: 0, stars: 0 },
                'fibonacci-series': { id: 'fibonacci-series', isUnlocked: false, isCompleted: false, score: 0, stars: 0 },
                'armstrong-number': { id: 'armstrong-number', isUnlocked: false, isCompleted: false, score: 0, stars: 0 },
                'palindrome-check': { id: 'palindrome-check', isUnlocked: false, isCompleted: false, score: 0, stars: 0 },
            },
            incrementTabSwitches: () => set((state) => ({ tabSwitches: state.tabSwitches + 1 })),
            incrementPasteCount: () => set((state) => ({ pasteCount: state.pasteCount + 1 })),
            setInterrogationPending: (pending) => set({ isInterrogationPending: pending }),
            updateScore: (newScore) => set((state) => ({ score: { ...state.score, ...newScore } })),
            resetSessionMetrics: () => set({
                tabSwitches: 0,
                pasteCount: 0,
                isInterrogationPending: false,
                score: { syntax: 0, logic: 0, performance: 0, aiIndependence: 100 }
            }),
            completeLevel: (currentLevelId, nextLevelId, score, stars) => set((state) => {
                const newLevels = { ...state.levels };

                // Mark current as completed and update stats
                if (newLevels[currentLevelId]) {
                    // Only update if the new score is higher
                    if (score > newLevels[currentLevelId].score) {
                        newLevels[currentLevelId] = {
                            ...newLevels[currentLevelId],
                            isCompleted: true,
                            score,
                            stars
                        };
                    } else if (!newLevels[currentLevelId].isCompleted) {
                        newLevels[currentLevelId] = {
                            ...newLevels[currentLevelId],
                            isCompleted: true,
                            score,
                            stars
                        };
                    }
                }

                // Unlock next level if score is >= 50%
                if (score >= 50 && nextLevelId && newLevels[nextLevelId]) {
                    newLevels[nextLevelId] = {
                        ...newLevels[nextLevelId],
                        isUnlocked: true
                    };
                }

                return { levels: newLevels };
            }),
        }),
        {
            name: 'veriskill-student-progress',
            version: 1, // Bumping version to clear old cache
            migrate: (persistedState: any, version: number) => {
                if (version === 0) {
                    // return undefined to clear old state entirely
                    return undefined as any;
                }
                return persistedState;
            },
            partialize: (state) => ({ levels: state.levels }), // Only persist level progress
        }
    )
);
