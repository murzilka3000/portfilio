import { createContext, ReactNode, useContext, useRef, useState } from 'react';

interface AnimationContextType {
  mainTimeline: React.MutableRefObject<gsap.core.Timeline | null>;
  isAnimatingPage: boolean;
  setIsAnimatingPage: (value: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);
  const [isAnimatingPage, setIsAnimatingPage] = useState(false);

  return (
    <AnimationContext.Provider
      value={{
        mainTimeline,
        isAnimatingPage,
        setIsAnimatingPage
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation должен использоваться внутри AnimationProvider');
  }
  return context;
};
