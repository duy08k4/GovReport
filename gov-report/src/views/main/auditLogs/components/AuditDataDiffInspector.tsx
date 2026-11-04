import React from "react";
import { AuditLogRecord } from "../types";

interface AuditDataDiffInspectorProps {
  record: AuditLogRecord;
  onClose: () => void;
}

const AuditDataDiffInspector: React.FC<AuditDataDiffInspectorProps> = ({
  record,
  onClose,
}) => {
  return (
    <div
      className="rounded bg-surface-container-lowest shadow-sm mb-space-lg overflow-hidden flex flex-col border border-outline-variant/30 animate-fadeIn"
      id="diffViewerPanel"
    >
      {/* Panel Header with Metadata */}
      <div className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded bg-primary-container text-surface-container-lowest flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">rule_folder</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Trình Xem Đối Soát Thay Đổi Dữ Liệu (Data Diff Inspector)
              </span>
              <span className="px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-[#B45309]">
                {record.action}
              </span>
            </div>
            <span className="font-code-tabular text-xs sm:text-label-sm text-on-surface-variant">
              Bản ghi: {record.targetTable} / Khóa: {record.targetKey} • Ghi nhận:{" "}
              {record.timestamp} (UTC+7)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs flex-wrap">
          <span className="inline-flex items-center gap-1 px-space-xs py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[16px]">
              verified
            </span>
            <span>
              Chữ ký số hợp lệ (Căn cước điện tử:{" "}
              {record.actor.identityCard || "001089012984"})
            </span>
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
            type="button"
            title="Đóng trình xem đối soát"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Dual Column JSON State Diff Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-surface-container">
        {/* Left Column: Before State (JSON) */}
        <div className="p-space-md flex flex-col bg-surface-container-lowest/50">
          <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-surface-container">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error shrink-0" />
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Dữ liệu trước thay đổi (before_state)
              </span>
            </div>
            <span className="font-code-tabular text-label-sm text-on-surface-variant">
              {record.diff.beforeSummary}
            </span>
          </div>

          <div className="bg-surface-container-low p-space-md rounded font-code-tabular text-[13px] leading-relaxed overflow-x-auto space-y-1 border border-outline-variant/20">
            <div className="text-outline">{"{"}</div>
            {Object.entries(record.diff.rawBefore).map(([key, value]) => {
              const matchingChange = record.diff.changes.find((c) => c.key === key);
              const isModified = Boolean(matchingChange);

              if (isModified) {
                return (
                  <div
                    key={key}
                    className="pl-4 bg-error-container/40 -mx-space-md px-space-md py-0.5 rounded text-on-error-container font-semibold flex items-center justify-between gap-2"
                  >
                    <span>
                      &quot;{key}&quot;: {JSON.stringify(value)},
                    </span>
                    <span className="text-[11px] text-error uppercase font-label-sm font-bold shrink-0">
                      [CŨ]
                    </span>
                  </div>
                );
              }

              return (
                <div key={key} className="pl-4 text-on-surface">
                  &quot;{key}&quot;:{" "}
                  <span className="text-secondary font-medium">
                    {JSON.stringify(value)}
                  </span>
                  ,
                </div>
              );
            })}
            <div className="text-outline">{"}"}</div>
          </div>
        </div>

        {/* Right Column: After State (JSON) */}
        <div className="p-space-md flex flex-col bg-surface-container-lowest">
          <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-surface-container">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim shrink-0" />
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Dữ liệu sau can thiệp (after_state)
              </span>
            </div>
            <span className="font-code-tabular text-label-sm text-on-surface-variant font-semibold">
              {record.diff.afterSummary}
            </span>
          </div>

          <div className="bg-surface-container-low p-space-md rounded font-code-tabular text-[13px] leading-relaxed overflow-x-auto space-y-1 border border-outline-variant/20">
            <div className="text-outline">{"{"}</div>
            {Object.entries(record.diff.rawAfter).map(([key, value]) => {
              const matchingChange = record.diff.changes.find((c) => c.key === key);
              const isModified = Boolean(matchingChange);

              if (isModified) {
                return (
                  <div
                    key={key}
                    className="pl-4 bg-surface-container-high -mx-space-md px-space-md py-0.5 rounded text-on-surface font-semibold flex items-center justify-between gap-2"
                  >
                    <span className="text-secondary font-bold">
                      &quot;{key}&quot;: {JSON.stringify(value)},
                    </span>
                    <span className="text-[11px] text-secondary uppercase font-label-sm font-bold shrink-0">
                      {matchingChange?.statusTag || "[MỚI - ĐIỀU CHUYỂN]"}
                    </span>
                  </div>
                );
              }

              return (
                <div key={key} className="pl-4 text-on-surface">
                  &quot;{key}&quot;:{" "}
                  <span className="text-secondary font-medium">
                    {JSON.stringify(value)}
                  </span>
                  ,
                </div>
              );
            })}
            <div className="text-outline">{"}"}</div>
          </div>
        </div>
      </div>

      {/* Forensic Environment & Digital Signature Verification Block */}
      <div className="p-space-md bg-surface-container-low border-t border-surface-container grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {/* Box 1 */}
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Thông tin môi trường thực thi (Forensic Fingerprint)
          </span>
          <div className="p-space-sm rounded bg-surface-container-lowest font-code-tabular text-[12px] text-on-surface break-all space-y-1 border border-outline-variant/30">
            <div>
              <strong className="text-on-surface-variant font-medium">User-Agent: </strong>
              {record.forensics.userAgent}
            </div>
            <div>
              <strong className="text-on-surface-variant font-medium">
                Phiên phiên bản token:{" "}
              </strong>
              {record.forensics.tokenVersion}
            </div>
            <div>
              <strong className="text-on-surface-variant font-medium">
                Vị trí IP định danh:{" "}
              </strong>
              {record.forensics.ipGeoLocation}
            </div>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Chứng chỉ ký số &amp; Băm bất biến (SHA-256 Checksum)
          </span>
          <div className="p-space-sm rounded bg-surface-container-lowest font-code-tabular text-[12px] text-on-surface break-all space-y-1 border border-outline-variant/30">
            <div>
              <strong className="text-on-surface-variant font-medium">
                Mã băm khối (Current Hash):{" "}
              </strong>
              {record.fullHash}
            </div>
            <div>
              <strong className="text-on-surface-variant font-medium">
                Khối băm trước (Previous Hash):{" "}
              </strong>
              {record.previousHash}
            </div>
            <div className="flex items-center gap-1 text-secondary font-medium pt-0.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Khóa công khai CA: {record.caCertificate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDataDiffInspector;
