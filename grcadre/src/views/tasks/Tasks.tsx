import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { ROUTES } from '../../config/Routing';

// Child components
import ShiftBanner from './components/ShiftBanner';
import TaskScopeTabs from './components/TaskScopeTabs';
import TaskKpiSummary from './components/TaskKpiSummary';
import UrgentAlertBanner from './components/UrgentAlertBanner';
import TaskItemCard from './components/TaskItemCard';

// Types
import { TaskItem, TaskScope, KpiData, UrgentAlert } from './types';

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    code: 'SC-2026-HN09',
    title: 'Hố ga mất nắp nguy hiểm đối diện số 24 Hàng Trống',
    category: 'Khẩn cấp',
    categoryBg: 'bg-[#FEF2F2]',
    categoryColor: 'text-[#DC2626]',
    distance: 'Cách 320m',
    address: 'Số 24 Hàng Trống, P. Hàng Trống, Q. Hoàn Kiếm',
    slaText: 'Còn 01h:15m trước khi chạm hạn tiếp nhận',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCejEaG2HnhbGUo0oJr_n9_Cc_g44YnlCvRdDHimogNVgXZfA8HY7jGLuHeuQE31bm-cdU0lJf_STLKr3qHD6Q30wdFVsdedvrl3NAoygln5yQl_ldHJle1_XruEBP75BEqAHa3nYidh0nF_XlyoKijtCyM0zDJP71oHspsnAFW0VtLYRXGeYcoiWJCbYgn_sqis3odrNyzMWkNacF2BGH-sD6Gu9rwOn3Y4ovzbuATlcSlTVD6_ZU',
    imageAlt:
      'Hình ảnh thực địa hiện trường ban ngày ghi nhận hố ga hình tròn trên mặt đường đá cũ phố Hàng Trống Hà Nội bị mất nắp thép, được người dân cắm tạm cành cây cảnh báo nguy hiểm cạnh vỉa hè',
    imageBadge: 'Hiện trường gốc • 15:42',
    assignedToMe: true,
    assignmentSource: 'tenant_dispatched',
    assignedTeamName: 'Đội Phản ứng nhanh số 1',
    assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
    tenantDirective: 'Lệnh điều động IOC: Rào chắn cảnh báo khẩn cấp, hoàn thành khắc phục trong 2h',
    status: 'in_progress',
  },
  {
    id: 'task-2',
    code: 'SC-2026-HN11',
    title: 'Cây xà cừ ngã đổ chắn ngang phần đường xe chạy',
    category: 'Cây xanh đô thị',
    categoryBg: 'bg-[#FFFBEB]',
    categoryColor: 'text-[#D97706]',
    distance: 'Cách 650m',
    address: 'Ngã tư Bà Triệu - Lý Thường Kiệt, Hoàn Kiếm',
    slaText: 'SLA: Còn 03h:20m',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEXbfOUvFac8fuFiYXLlnA3j1SACHwquBYnZq_seP3q85St7Y_uZCmDjD50BXHCW-8xjnL5R279aq1dXVEoZxcz_KXYytKZk93m3TYyrP6MejK4v_grueWBWS7cSidx3P2mBakTIZb7ArOiTOPhAw_q0ocjZBGXzFBGxBgdPHRtMGpgE_H_WfnIN3KolHssOHTJDGMLKtT7sbK9brpuX0wTzbsGKfUB-mTvPUaMT-6aqOk-mfhEb8',
    imageAlt:
      'Góc chụp mặt đường phố Hà Nội tại ngã tư Bà Triệu giao Lý Thường Kiệt có cành cây xà cừ lớn bị gió quật gãy đổ rạp che khuất làn xe gắn máy, phương tiện đang phải né tránh di chuyển chậm',
    imageBadge: 'Chờ tiếp nhận',
    assignedToMe: false,
    isUnassigned: true,
    status: 'submitted',
  },
  {
    id: 'task-3',
    code: 'SC-2026-HN07',
    title: 'Thu dọn biển hiệu ngõ Huyện',
    category: 'Trật tự đô thị',
    categoryBg: 'bg-[#F0FDF4]',
    categoryColor: 'text-[#16A34A]',
    distance: 'Cách 120m',
    address: 'Ngõ Huyện, P. Hàng Trống, Q. Hoàn Kiếm',
    slaText: 'Đã hoàn thành',
    assignedToMe: true,
    assignmentSource: 'self_claimed',
    assignedTeamName: 'Đội Phản ứng nhanh số 1',
    assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
    status: 'resolved',
    completedTime: 'Đã chốt biên bản lúc 14:10',
  },
];

const Tasks: React.FC = () => {
  const router = useIonRouter();

  // State: Trực ca / Nghỉ ca
  const [isWorking, setIsWorking] = useState<boolean>(true);

  // State: Sub-tab phạm vi công việc
  const [activeScope, setActiveScope] = useState<TaskScope>('my-tasks');

  // State: Cảnh báo sự cố khẩn cấp cấp 1
  const [urgentAlert, setUrgentAlert] = useState<UrgentAlert>({
    id: 'urgent-1',
    code: 'SC-2026-URG01',
    level: 'Khẩn cấp cấp 1',
    distance: 'Cách 180m',
    title: 'CẢNH BÁO: Đứt cáp điện ngõ 12 Phố Tràng Thi',
    description:
      'Dây điện võng sát mặt đường, nguy cơ chập cháy khi trời ẩm. Đã báo Điện lực Hoàn Kiếm.',
    slaRemaining: 'SLA Tiếp nhận: còn 09 phút',
    isAccepted: false,
  });

  // State: Danh sách nhiệm vụ
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  // State: Thông báo Toast Feedback ngắn
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle ca trực
  const handleToggleShift = () => {
    setIsWorking((prev) => {
      const next = !prev;
      showToast(
        next
          ? 'Đã bật chế độ [Trực ca] - Sẵn sàng nhận nhiệm vụ hiện trường'
          : 'Đã chuyển sang [Nghỉ ca] - Tạm dừng nhận nhiệm vụ tự động'
      );
      return next;
    });
  };

  // Tiếp nhận sự cố khẩn cấp
  const handleAcceptUrgent = (_alertId: string) => {
    setUrgentAlert((prev) => ({ ...prev, isAccepted: true }));
    showToast('Đã nhận việc khẩn cấp! Đang mở chi tiết tác vụ...');
    setTimeout(() => {
      router.push(`/main/tasks/${urgentAlert.code}`, 'forward', 'push');
    }, 250);
  };

  // Nhận việc
  const handleClaimTask = (taskId: string) => {
    let targetCode = taskId;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          targetCode = t.code;
          return {
            ...t,
            assignedToMe: true,
            isUnassigned: false,
            assignmentSource: 'self_claimed' as const,
            assignedTeamName: 'Đội Phản ứng nhanh số 1',
            assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
            status: 'in_progress',
          };
        }
        return t;
      })
    );
    showToast('Đã nhận việc thành công! Đang mở chi tiết tác vụ...');
    setTimeout(() => {
      router.push(`/main/tasks/${targetCode}`, 'forward', 'push');
    }, 250);
  };

  // Xem chi tiết nhiệm vụ (chuyển thẳng đến trang Chi tiết tác vụ)
  const handleViewDetail = (taskId: string) => {
    const item = tasks.find((t) => t.id === taskId || t.code === taskId);
    const targetCode = item ? item.code : taskId;
    router.push(`/main/tasks/${targetCode}`, 'forward', 'push');
  };

  // Điều hướng dẫn đường bản đồ
  const handleNavigateMap = (_taskId: string) => {
    router.push(ROUTES.MAP);
  };

  // Đếm số lượng theo tab
  const myTasksCount = tasks.filter((t) => t.assignedToMe).length;
  const teamTasksCount = tasks.filter((t) => t.isUnassigned).length + 4; // 05 theo đúng TaskCode

  // Danh sách hiển thị theo sub-tab:
  // - Nếu là 'team-tasks': Lọc các việc chung của đội
  // - Nếu là 'my-tasks': Hiển thị danh sách hiện trường cự ly GPS đầy đủ theo đúng TaskCode.md (Thẻ việc cá nhân, Thẻ việc chung, Thẻ hoàn thành)
  const displayedTasks =
    activeScope === 'team-tasks'
      ? tasks.filter((t) => t.isUnassigned)
      : tasks;

  // Số liệu KPI
  const kpiData: KpiData = {
    needReceive: 3,
    inProgress: 2,
    slaWarning: 1,
  };

  return (
    <>
      {/* Thông báo Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-[90%] !px-4 !py-2.5 !rounded-xl bg-primary text-white text-body-sm font-body-sm shadow-lg flex items-center gap-2 transition-all duration-300 border border-surface-container-high/20">
          <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
            info
          </span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Khối nội dung chính của màn hình Tác vụ */}
      <div className="flex flex-col w-full">
        {/* 1. Banner nhận diện ca trực & đội công tác */}
        <ShiftBanner
          cadreName="Đ/c Nguyễn Văn Bình"
          cadreUnit="UBND Phường Hàng Trống • Đội Phản ứng nhanh số 1"
          isWorking={isWorking}
          onToggleShift={handleToggleShift}
          gpsAccuracy="Khớp tâm 4m"
        />

        {/* 2. Sub-tabs phẳng: Phạm vi công việc */}
        <TaskScopeTabs
          activeScope={activeScope}
          onScopeChange={setActiveScope}
          myTasksCount={myTasksCount}
          teamTasksCount={teamTasksCount}
        />

        {/* Khối danh sách nội dung bên dưới sub-tabs */}
        <div className="!p-margin flex flex-col gap-space-md">
          {/* 3. Khối 3 thẻ số liệu KPI nhanh */}
          <TaskKpiSummary
            data={kpiData}
            onKpiClick={(type) => {
              if (type === 'needReceive') setActiveScope('team-tasks');
              if (type === 'inProgress') setActiveScope('my-tasks');
            }}
          />

          {/* 4. Banner sự cố khẩn cấp (priority = urgent) */}
          <UrgentAlertBanner
            alert={urgentAlert}
            onAccept={handleAcceptUrgent}
          />

          {/* 5. Danh sách công việc theo cự ly GPS gần nhất */}
          <section className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  near_me
                </span>
                <h3 className="text-label-lg font-label-lg text-primary">
                  Sắp xếp theo cự ly GPS
                </h3>
              </div>
              <span className="text-label-sm font-label-sm text-on-surface-variant font-code-tabular">
                Định vị: 5s trước
              </span>
            </div>

            {/* Danh sách 3 thẻ chuẩn TaskCode.md */}
            <div className="flex flex-col gap-space-sm">
              {displayedTasks.map((task) => (
                <TaskItemCard
                  key={task.id}
                  task={task}
                  onViewDetail={handleViewDetail}
                  onNavigateMap={handleNavigateMap}
                  onClaimTask={handleClaimTask}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Tasks;
