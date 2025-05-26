// Modal.tsx
import ReactDOM from 'react-dom';

export const AddModal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') return null; // SSR guard
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black-100 bg-opacity-50"></div>

      {/* Modal content */}
      <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-[450px]">
        {children}
      </div>
    </div>,
    document.body
  );
};