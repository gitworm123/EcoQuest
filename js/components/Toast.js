// EcoQuest - Toast Notification Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState, useEffect } = React;

  window.EcoQuestComponents.ToastContainer = function({ toasts, onDismiss }) {
    if (!toasts || !toasts.length) return null;

    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out shadow-xl rounded-2xl p-4 border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-900/95 text-white border-emerald-500/40 shadow-emerald-900/20'
                : toast.type === 'badge'
                ? 'bg-gradient-to-r from-amber-900/95 to-emerald-900/95 text-white border-amber-500/40 shadow-amber-900/20'
                : toast.type === 'error'
                ? 'bg-rose-900/95 text-white border-rose-500/40 shadow-rose-900/20'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            <div className="text-2xl flex-shrink-0 mt-0.5">
              {toast.type === 'badge' ? '🏆' : toast.type === 'success' ? '🌱' : toast.type === 'error' ? '⚠️' : '🔔'}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight text-emerald-200">
                {toast.title}
              </h4>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-white/60 hover:text-white text-xs p-1 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    );
  };
})();
