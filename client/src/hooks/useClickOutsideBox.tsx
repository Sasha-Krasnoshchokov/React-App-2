import { useEffect } from 'react';

const useClickOutsideBox = (boxId: string, isOpen: boolean, callback: () => void) => {
  useEffect(() => {
    const closeDropMenu = (e: Event) => {
      const { id: targetId } = e.target as HTMLElement;
      if (!targetId || !targetId.includes('drop-menu')) {
        callback();
      }
    };
    if (isOpen) {
      window.addEventListener('click', closeDropMenu, true);
    } else {
      window.removeEventListener('click', closeDropMenu, true);
    }
    return () => window.removeEventListener('click', closeDropMenu, true);
  }, [callback, isOpen]);
};

export default useClickOutsideBox;
