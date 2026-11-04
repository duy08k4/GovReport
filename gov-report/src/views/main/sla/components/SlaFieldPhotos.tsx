import React from "react";

const SlaFieldPhotos: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
      {/* Card 1: Hiện trường giám sát */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col sm:flex-row gap-space-md items-center border border-outline-variant/30">
        <div className="w-full sm:w-44 h-32 rounded overflow-hidden shrink-0 bg-surface-container">
          <img
            className="w-full h-full object-cover"
            alt="Đội ngũ ứng phó kỹ thuật hiện trường thoát nước đô thị"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3JQsIVJcEblnAYMyjL6_kQI1N_ihbZ10DMb2C_J8x4J5SnoCYBzoiRaR7oNsa7_qlB0MizSMznf6OKt4RvcfziwlnEXy9XQajfQQpIqlHIJ82C1hJHxAxCb8mfGLcY8qkHaADwQS0UwXyrN9-Qx-TWbiDrj_ru1Hoj3KXHp9RomgSrAqSp7bJ2fvlR4V4N7zjeUXgz7vnOaGr_C8dTgCs_grh3CSrDzzDN5Yg_wBodaarRygwozk"
          />
        </div>
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
              Hiện trường giám sát
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
              Cơ chế tự động định tuyến hiện trường
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              Hệ thống tự động kích hoạt điều phối qua GPS đến đội cứu hộ gần nhất trong bán
              kính 3km ngay khi công dân gửi phản ánh hợp lệ.
            </p>
          </div>
          <div className="font-code-tabular text-code-tabular text-outline mt-2 text-xs font-medium">
            Mã quy trình: DISPATCH-R07
          </div>
        </div>
      </div>

      {/* Card 2: Tuân thủ pháp chế */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col sm:flex-row gap-space-md items-center border border-outline-variant/30">
        <div className="w-full sm:w-44 h-32 rounded overflow-hidden shrink-0 bg-surface-container">
          <img
            className="w-full h-full object-cover"
            alt="Trung tâm giám sát điều hành đô thị thông minh IOC"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTpIQP5sZ0l1nJhq4RHE7Q3fvsnS22h2YCbxEMqAT6fINvRc98oUow9a38LV-vFy--PjcmFqbal8KnKcES7uBio0q0f4dQES4xBZUpQhjFJE7BB4fB9bs3jtKm4J49zkRYoQhOCJx-afDKFXi5RurSdoZTRHO7YhmNgyPrOyAh2oUxDmBye731cO9obr_loBurux44ImxEqjqp0K6VuYSCBfJirT2umjc17wOADGA2Qxblg-JRnQw"
          />
        </div>
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase tracking-wider">
              Tuân thủ pháp chế
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
              Ghi vết bất biến &amp; Kiểm toán công ích
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              Bất kỳ điều chỉnh nào với SLA cam kết đều được ghi lại trong nhật ký phân hệ
              kiểm toán độc lập <code className="bg-surface-container px-1 py-0.5 rounded text-xs font-code-tabular">system_audit_logs</code> phục vụ thanh tra.
            </p>
          </div>
          <div className="font-code-tabular text-code-tabular text-outline mt-2 text-xs font-medium">
            Chuẩn ISO 37122:2019
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlaFieldPhotos;
