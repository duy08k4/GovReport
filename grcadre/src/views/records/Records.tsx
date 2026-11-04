import React, { useMemo, useState } from 'react';
import { IonToast, useIonRouter } from '@ionic/react';
import { IncidentRecord, RecordScope, RecordStatus, AssignedCadre } from './types';
import {
  CADRE_TEAM_ROSTER,
  TENANT_TEAMS_ROSTER,
  TenantTeamItem,
} from '../../config/static/CadreConfig';
import RecordSearchBar from './components/RecordSearchBar';
import RecordScopeToggle from './components/RecordScopeToggle';
import RecordStatusFilter from './components/RecordStatusFilter';
import RecordTeamRosterBanner from './components/RecordTeamRosterBanner';
import RecordItemCard from './components/RecordItemCard';
import AuditDetailModal from './components/AuditDetailModal';

const INITIAL_RECORDS: IncidentRecord[] = [
  {
    id: 'SC-2026-HN14',
    code: 'SC-2026-HN14',
    title: 'Ngập úng đô thị - Tắc cống ngầm',
    address: 'Đoạn trước số 36 Đinh Tiên Hoàng, Hoàn Kiếm',
    status: 'submitted',
    statusLabel: 'Mới gửi',
    statusBadgeBg: 'bg-surface-container-highest',
    statusBadgeColor: 'text-on-surface-variant',
    priority: 'urgent',
    priorityLabel: 'Khẩn cấp',
    timeText: 'Tiếp nhận 18 phút trước • Hotline 1022',
    teamName: 'Chưa phân công',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGkZbidS6FufXfvIeORy76nNw7xQvqPAI5QFzRlDHP1eYQstBhIOjrw4nDqzGOabsCWcwTlG6EB79KB9yGgQx5nxP2e3DJxj4NWdCANPoKBUVSwwjrllnhCIavFkoo5xhxbNpm_QZJX7p2rPzWqiecsCTWJol5_qAKUZuMXLWZVGNJB_fAGZTjkysjejowG4KAXszNfItAN0vhhD4uJAqjfV_UpcRBDCrggwZl6d7Z6UmiO7-h9D4',
    imageAlt: 'Hiện trường ngập úng đô thị trên phố Đinh Tiên Hoàng',
    isMyTeam: true,
  },
  {
    id: 'SC-2026-HN09',
    code: 'SC-2026-HN09',
    title: 'Hố ga mất nắp đậy',
    address: 'Số 42 Tràng Tiền, P. Tràng Tiền',
    status: 'in_progress',
    statusLabel: 'Đang xử lý',
    statusBadgeBg: 'bg-amber-100',
    statusBadgeColor: 'text-[#D97706]',
    timeText: 'Tiếp nhận 42 phút trước',
    slaRemainingText: 'Còn 1h 15m',
    teamName: 'Đội Phản ứng nhanh số 1',
    assignmentSource: 'tenant_dispatched',
    assignedTeam: {
      id: 'team-1',
      name: 'Đội Phản ứng nhanh số 1',
      code: 'DPUN-01',
      leaderName: 'Đ/c Nguyễn Văn Bình',
      leaderRole: 'Đội trưởng',
      leaderPhone: '0912.345.678',
      isMyTeam: true,
    },
    tenantDirective: 'Lệnh điều động IOC: Rào chắn cảnh báo tức thì, khắc phục hố ga trong 2h',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMqd1_NkgzZpoeqmHaIHK0Zuj6Fwe9G7dYX1eyPIPNTEgyFw7iEUbTH6msJhx8L1N_UbQsJI7WPHqVFFFHoCMgfGBqt4zv2S1gU1fD1tcEtiSq2dvIDfYpZwHEcf8kURqvXbQa4NNpLOU2gh0ClKwVGRt2NgHJDPVbhhjLb8BrniRTVH3uAs-_uA_LElYoNDqgGv2iTtbWIrn8YUVEi7keTxL4GxONkBfh75vVL_dlAIJWPj6qo_c',
    imageAlt: 'Hố ga mất nắp trên vỉa hè phố Tràng Tiền Hà Nội',
    assignedCadre: {
      id: 'cadre-1',
      name: 'Đ/c Nguyễn Văn Bình',
      initials: 'B',
      role: 'Cán bộ Trật tự đô thị • Đang xử lý 1 việc',
      statusText: 'Đang xử lý',
      distanceText: 'Cách 350m',
      phone: '0912345678',
      isReady: false,
      avatarBg: 'bg-secondary-container',
      avatarColor: 'text-on-secondary-container',
    },
    progressPercent: 65,
    progressStepText: 'Tiến độ thực địa: Vận chuyển nắp gang thay thế',
    isMyTeam: true,
  },
  {
    id: 'SC-2026-HN03',
    code: 'SC-2026-HN03',
    title: 'Cây gãy đổ chắn lối ngõ',
    address: 'Số 12 Hàng Trống, P. Hàng Trống',
    status: 'resolved',
    statusLabel: 'Đã xử lý xong',
    statusBadgeBg: 'bg-emerald-100',
    statusBadgeColor: 'text-[#16A34A]',
    timeText: 'Nghiệm thu: 09:45 hôm nay',
    teamName: 'Đội Phản ứng nhanh số 1',
    assignmentSource: 'self_claimed',
    assignedTeam: {
      id: 'team-1',
      name: 'Đội Phản ứng nhanh số 1',
      code: 'DPUN-01',
      leaderName: 'Đ/c Nguyễn Văn Bình',
      leaderRole: 'Đội trưởng',
      leaderPhone: '0912.345.678',
      isMyTeam: true,
    },
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe8kzsa23H9aWi_2LHiijespmGGU1qYqh4MEk0y3jBq1CgtfCpZAEXCJzC21sJpZklYkXHJfUO-qQSvR0d_WFAZINrPuxWGJCr7AMmhTyea5HqcGzaiIKXT-IH2A8pVQX5khcffOGTZ9kZmxvgIS6uwseKg3ah5b_WPdhnWT_3lMn3dGHsAEWrQE02QHRgSXw5BDFYOzvUIc9s6jtwaR13RTuoXr9BIzGnchDmTF6axMpW5PO07s',
    imageAlt: 'Cành cây xà cừ lớn bị gãy được cưa gọn gàng',
    photosCount: 2,
    assignedCadre: {
      id: 'cadre-2',
      name: 'Đ/c Lê Hoàng Nam',
      initials: 'LN',
      role: 'Cán bộ Hiện trường',
      statusText: 'Sẵn sàng nhận lệnh',
      distanceText: 'Cách 120m',
      phone: '0987654321',
      isReady: true,
      avatarBg: 'bg-primary-container',
      avatarColor: 'text-on-primary',
    },
    proofNote: 'Đã lưu ảnh đối soát và chữ ký dân cư',
    isMyTeam: true,
  },
  {
    id: 'SC-2026-HN15',
    code: 'SC-2026-HN15',
    title: 'Biển báo giao thông bị cong vẹo che khuất',
    address: 'Số 08 Phố Nhà Thờ, P. Hàng Trống',
    status: 'received',
    statusLabel: 'Chờ tiếp nhận',
    statusBadgeBg: 'bg-purple-100',
    statusBadgeColor: 'text-purple-800',
    priority: 'normal',
    priorityLabel: 'Bình thường',
    timeText: 'Tiếp nhận 1 giờ trước • Cổng Dịch vụ công',
    teamName: 'Đội Phản ứng nhanh số 1',
    assignmentSource: 'tenant_dispatched',
    assignedTeam: {
      id: 'team-1',
      name: 'Đội Phản ứng nhanh số 1',
      code: 'DPUN-01',
      leaderName: 'Đ/c Nguyễn Văn Bình',
      leaderRole: 'Đội trưởng',
      leaderPhone: '0912.345.678',
      isMyTeam: true,
    },
    tenantDirective:
      'UBND Phường yêu cầu Đội kiểm tra thực địa và chỉnh dựng lại biển báo giao thông trong buổi sáng.',
    slaRemainingText: 'SLA: Còn 1h 45m',
    isMyTeam: true,
  },
  {
    id: 'SC-2026-HN07',
    code: 'SC-2026-HN07',
    title: 'Rò rỉ nước sạch từ đường ống ngầm',
    address: 'Số 56 Lý Quốc Sư, P. Hàng Trống',
    status: 'in_progress',
    statusLabel: 'Đang xử lý',
    statusBadgeBg: 'bg-amber-100',
    statusBadgeColor: 'text-[#D97706]',
    timeText: 'Tiếp nhận 2 giờ trước',
    slaRemainingText: 'Còn 2h 30m',
    teamName: 'Đội Phản ứng nhanh số 1',
    assignmentSource: 'self_claimed',
    assignedTeam: {
      id: 'team-1',
      name: 'Đội Phản ứng nhanh số 1',
      code: 'DPUN-01',
      leaderName: 'Đ/c Nguyễn Văn Bình',
      leaderRole: 'Đội trưởng',
      leaderPhone: '0912.345.678',
      isMyTeam: true,
    },
    assignedCadre: {
      id: 'cadre-3',
      name: 'Đ/c Vũ Anh Tuấn',
      initials: 'VT',
      role: 'Cán bộ Địa chính - Xây dựng',
      statusText: 'Đang xử lý',
      distanceText: 'Tại hiện trường',
      phone: '0901234567',
      isReady: true,
    },
    progressPercent: 40,
    progressStepText: 'Tiến độ: Đang đào thăm dò điểm bục vỡ',
    isMyTeam: true,
  },
  {
    id: 'SC-2026-HN01',
    code: 'SC-2026-HN01',
    title: 'Sụt lún mép vỉa hè lối sang đường',
    address: 'Ngã tư Tràng Thi - Quang Trung, Hoàn Kiếm',
    status: 'closed',
    statusLabel: 'Đã đóng',
    statusBadgeBg: 'bg-gray-100',
    statusBadgeColor: 'text-gray-700',
    timeText: 'Đóng hồ sơ 2 ngày trước',
    teamName: 'Đội Quản lý Đô thị Quận',
    isMyTeam: false,
  },
];

export const Records: React.FC = () => {
  const router = useIonRouter();
  const [records, setRecords] = useState<IncidentRecord[]>(INITIAL_RECORDS);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeScope, setActiveScope] = useState<RecordScope>('team');
  const [activeStatus, setActiveStatus] = useState<RecordStatus>('all');

  // Modals state
  const [auditIncident, setAuditIncident] = useState<IncidentRecord | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  // Mở trang chi tiết tác vụ theo yêu cầu từ nút Xem thực địa / Chi tiết
  const handleOpenDetail = (record: IncidentRecord) => {
    router.push(`/main/tasks/${record.code}`, 'forward', 'push');
  };

  // Scope filter: team vs agency
  const scopeFilteredRecords = useMemo(() => {
    if (activeScope === 'team') {
      return records.filter((r) => r.isMyTeam);
    }
    return records;
  }, [records, activeScope]);

  // Tab counts based on current scope
  const counts = useMemo(() => {
    return {
      all: scopeFilteredRecords.length,
      submitted: scopeFilteredRecords.filter((r) => r.status === 'submitted').length,
      received: scopeFilteredRecords.filter((r) => r.status === 'received').length,
      in_progress: scopeFilteredRecords.filter((r) => r.status === 'in_progress').length,
      resolved: scopeFilteredRecords.filter((r) => r.status === 'resolved').length,
      rejected: scopeFilteredRecords.filter((r) => r.status === 'rejected').length,
      closed: scopeFilteredRecords.filter((r) => r.status === 'closed').length,
    };
  }, [scopeFilteredRecords]);

  // Full filtered records for rendering
  const filteredRecords = useMemo(() => {
    return scopeFilteredRecords.filter((record) => {
      // 1. Status filter
      if (activeStatus !== 'all' && record.status !== activeStatus) {
        return false;
      }

      // 2. Search keyword filter
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase().trim();
        const matchCode = record.code.toLowerCase().includes(query);
        const matchTitle = record.title.toLowerCase().includes(query);
        const matchAddress = record.address.toLowerCase().includes(query);
        return matchCode || matchTitle || matchAddress;
      }

      return true;
    });
  }, [scopeFilteredRecords, activeStatus, searchKeyword]);

  // Handlers
  const handleScopeChange = (scope: RecordScope) => {
    setActiveScope(scope);
    displayToast(
      scope === 'agency'
        ? 'Chuyển chế độ: Toàn cơ quan'
        : 'Chế độ: Đội Phản ứng nhanh số 1'
    );
  };

  // Tiếp nhận xử lý sự cố cấp Đội (1 chạm nhận việc ngay, không popup form rườm rà):
  // - Case 1: Tự nhận việc (nút xanh #0084A3)
  // - Case 2: Được cơ quan giao việc (nút tím purple-700)
  // Bấm xong lập tức cập nhật trạng thái "Đang xử lý" và chuyển thẳng đến trang "Chi tiết tác vụ"
  const handleClaimTask = (record: IncidentRecord) => {
    const isTenantDispatched =
      record.status === 'received' || record.assignmentSource === 'tenant_dispatched';
    const source: 'self_claimed' | 'tenant_dispatched' = isTenantDispatched
      ? 'tenant_dispatched'
      : 'self_claimed';

    const myTeam =
      TENANT_TEAMS_ROSTER.find((t) => t.isMyTeam) || TENANT_TEAMS_ROSTER[0];
    const leaderCadre: AssignedCadre = {
      id: `assigned-${myTeam.id}`,
      name: myTeam.leaderName,
      initials: myTeam.leaderInitials,
      role: myTeam.leaderRole,
      statusText: 'Đang chỉ huy tiếp cận',
      distanceText: myTeam.distanceText,
      phone: myTeam.leaderPhone,
      isReady: true,
      avatarBg: myTeam.avatarBg,
      avatarColor: myTeam.avatarColor,
    };

    setRecords((prev) =>
      prev.map((item) => {
        if (item.id === record.id) {
          return {
            ...item,
            status: 'in_progress',
            statusLabel: 'Đang xử lý',
            statusBadgeBg: 'bg-amber-100',
            statusBadgeColor: 'text-[#D97706]',
            teamName: myTeam.name,
            isMyTeam: true,
            assignmentSource: source,
            assignedTeam: {
              id: myTeam.id,
              name: myTeam.name,
              code: myTeam.code,
              leaderName: myTeam.leaderName,
              leaderRole: myTeam.leaderRole,
              leaderPhone: myTeam.leaderPhone,
              isMyTeam: true,
            },
            assignedCadre: leaderCadre,
            progressPercent: 20,
            progressStepText:
              source === 'self_claimed'
                ? `[Tự nhận] Đang tiếp cận hiện trường`
                : `[Được giao] Đang triển khai theo chỉ đạo`,
          };
        }
        return item;
      })
    );

    displayToast(`Đã nhận việc thành công! Đang mở chi tiết tác vụ ${record.code}...`);

    // Tự động điều hướng ngay sang trang Chi tiết tác vụ
    setTimeout(() => {
      router.push(`/main/tasks/${record.code}`, 'forward', 'push');
    }, 250);
  };

  const handleScanQr = () => {
    displayToast('Kích hoạt máy ảnh quét mã hồ sơ hiện trường...');
  };

  const handleResetFilters = () => {
    setActiveStatus('all');
    setSearchKeyword('');
  };

  return (
    <>
      <div className="flex flex-col w-full pb-6">
        {/* 1. Thanh tìm kiếm và quét mã QR */}
        <RecordSearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onClear={() => setSearchKeyword('')}
          onScanQr={handleScanQr}
        />

        {/* 2. Bộ chuyển đổi phạm vi: Toàn cơ quan vs Đội của tôi */}
        <RecordScopeToggle
          activeScope={activeScope}
          onChangeScope={handleScopeChange}
        />

        {/* 3. Bộ lọc trạng thái cuộn ngang */}
        <RecordStatusFilter
          activeStatus={activeStatus}
          onChangeStatus={setActiveStatus}
          counts={counts}
        />

        {/* 4. Banner ca trực & quân số sẵn sàng */}
        <RecordTeamRosterBanner
          shiftTitle="Ca trực Đội 1 (Sáng)"
          readinessText="3/3 Cán bộ sẵn sàng cơ động"
        />

        {/* 5. Danh sách thẻ hồ sơ hiện trường */}
        <div className="!px-margin flex flex-col gap-space-sm" id="incidentsContainer">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <RecordItemCard
                key={record.id}
                record={record}
                onClaimTask={handleClaimTask}
                onOpenAudit={handleOpenDetail}
              />
            ))
          ) : (
            /* Trạng thái trống khi không có kết quả */
            <div className="flex flex-col items-center justify-center !p-8 bg-surface-container-lowest rounded-xl text-center border border-outline-variant/30 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
                <span className="material-symbols-outlined text-[32px]">folder_off</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                Không tìm thấy hồ sơ
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">
                Không có hồ sơ sự cố nào phù hợp với bộ lọc hoặc từ khóa hiện tại.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 !px-4 !py-2 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg font-label-md text-label-md cursor-pointer transition-colors active:scale-95"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Chi tiết đối soát dữ liệu thực địa */}
      <AuditDetailModal
        isOpen={Boolean(auditIncident)}
        incident={auditIncident}
        onClose={() => setAuditIncident(null)}
      />

      {/* Thông báo Toast Feedback */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2500}
        position="top"
        className="text-[12px] font-label-md"
      />
    </>
  );
};

export default Records;
