import React, { useState } from "react";

const OperationalBroadcastRibbon: React.FC = () => {
  const [broadcasted, setBroadcasted] = useState(false);

  const handleBroadcast = () => {
    setBroadcasted(true);
    setTimeout(() => {
      setBroadcasted(false);
    }, 3000);
  };

  return (
    <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border border-outline-variant/30">
      <div className="flex items-center gap-space-sm">
        <div className="w-10 h-10 bg-error/10 text-error flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">
            broadcast_on_personal
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-lg text-label-lg text-on-surface font-semibold">
            Kênh Phát Thông Điệp Cảnh Báo Điều Phối Liên Ngành
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {broadcasted
              ? "✓ Lệnh tác chiến khẩn cấp đã được gửi đến 128 trung tâm điều hành qua WebSocket!"
              : "Phát lệnh can thiệp tập trung tới 128 trung tâm điều hành quận/huyện qua giao thức thời gian thực"}
          </span>
        </div>
      </div>
      <button
        onClick={handleBroadcast}
        className={`whitespace-nowrap px-space-md py-2 font-label-md text-label-md transition-colors shrink-0 font-medium ${
          broadcasted
            ? "bg-on-tertiary-container text-white"
            : "bg-primary text-on-primary hover:bg-primary-container"
        }`}
        type="button"
      >
        {broadcasted ? "Đã phát lệnh thành công" : "Phát Lệnh Tác Chiến"}
      </button>
    </div>
  );
};

export default OperationalBroadcastRibbon;
