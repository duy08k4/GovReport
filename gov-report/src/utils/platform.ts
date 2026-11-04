/**
 * Utility xác định nền tảng thực thi: Desktop App (Tauri) hay Trình duyệt Web thông thường.
 * Hỗ trợ nhận diện tự động qua Tauri runtime/build-time, cùng cờ giả lập để dễ dàng kiểm thử.
 */

export const isDesktopApp = (): boolean => {
  if (typeof window === "undefined") return false;

  // 1. Kiểm tra Runtime Tauri 2.0 (được Tauri tự động tiêm vào window)
  const hasTauriInternals = Boolean(
    (window as any).__TAURI_INTERNALS__ ||
    (window as any).__TAURI__ ||
    (window as any).__TAURI_METADATA__
  );

  // 2. Kiểm tra Build-time Tauri env (do Tauri CLI tự động inject khi build)
  const isTauriEnv = Boolean(
    import.meta.env.TAURI_ENV_PLATFORM ||
    import.meta.env.VITE_TAURI_ENV_PLATFORM
  );

  // 3. Cho phép giả lập trên trình duyệt để kiểm thử (ví dụ: ?platform=desktop hoặc ?platform=web)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const platformQuery = urlParams.get("platform");
    if (platformQuery === "desktop") return true;
    if (platformQuery === "web") return false;
  } catch {
    // ignore
  }

  return hasTauriInternals || isTauriEnv;
};

export const isWebApp = (): boolean => !isDesktopApp();
