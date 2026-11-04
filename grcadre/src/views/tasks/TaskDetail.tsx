import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIonRouter, IonToast, IonAlert } from '@ionic/react';
import { ROUTES } from '../../config/Routing';

interface TaskDetailData {
  id: string;
  code: string;
  category: string;
  priority: 'urgent' | 'high' | 'normal';
  priorityLabel: string;
  title: string;
  agencyUnit: string;
  cadreName: string;
  cadreInitials: string;
  dispatchStatus: string;
  slaCommitment: string;
  initialSeconds: number;
  initialElapsedPercent: number;
  assignmentSource?: 'self_claimed' | 'tenant_dispatched';
  assignedTeamName?: string;
  assignedLeaderName?: string;
  tenantDirective?: string;
  photos: {
    url: string;
    alt: string;
    coords: string;
    time: string;
    caption: string;
  }[];
  address: string;
  distanceText: string;
  walkingTimeText: string;
  targetCoords: string;
  mapPreviewUrl: string;
  citizenFeedback: string;
  googleMapsUrl: string;
}

const DEFAULT_TASK_DETAILS: Record<string, TaskDetailData> = {
  'SC-2026-HN09': {
    id: 'SC-2026-HN09',
    code: 'SC-2026-HN09',
    category: 'Hạ tầng cầu đường',
    priority: 'urgent',
    priorityLabel: 'KHẨN CẤP (URGENT)',
    title: 'Hố ga mất nắp trên làn đường xe máy',
    agencyUnit: 'UBND Phường Hàng Trống • Đội Phản ứng nhanh số 1',
    cadreName: 'Đ/c Nguyễn Văn Bình',
    cadreInitials: 'NB',
    dispatchStatus: 'Đã tiếp nhận lệnh',
    slaCommitment: '2.0H SLA',
    initialSeconds: 1 * 3600 + 14 * 60 + 52, // 01:14:52
    initialElapsedPercent: 37.5,
    assignmentSource: 'tenant_dispatched',
    assignedTeamName: 'Đội Phản ứng nhanh số 1',
    assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
    tenantDirective:
      'Lãnh đạo UBND Phường & IOC chỉ đạo: Yêu cầu Đội Phản ứng nhanh lập rào chắn bảo vệ khẩn cấp, phối hợp Công ty Thoát nước xử lý dứt điểm trước 17:00.',
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9AbyR7qB1tMVlER3xPU8UXB_TE46FXSXOA6cL06wn2P5rdaJbRBd0cInJf-y1MWaMqarxAbInY3-S4OBpat8p-vEMu01IncviarwRGKvvd0fz64uRakhP4UlB9mcQ2TH4FMUxQ1bHDMJpKv3aTEmWp6jo-O76mxbm5PZmSY0CblQCbJ7NSMjz-RGbXUr2fbDB09XD2qWw4d9T7_iTGQpOXNXAipC3VkomcFalKWh0zwBAozEhmjc',
        alt: 'Ảnh toàn cảnh hiện trường hố ga mất nắp có cành cây cảnh báo',
        coords: '21.0254°N, 105.8561°E',
        time: '08:30:14 • 29/03/2026',
        caption: 'Ảnh 1: Toàn cảnh cắm cây cảnh báo',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAacI1BsfPBjfgl7Mx7FpkmM21nJvTwEoQGPPi2zrF6wXcYQDXLCsJioahCkBwG0uzRXe7DL4kNC9G_ztBwQCSdD0--dO7L8yey0fjzEn8vWpNxPA7tRh_RaQdnEu-MFnmmojRoqiF5irt8WimAqHPVkbQHxhmVnMXOJB4el9sAvvzOUP3o4uWfyNMgJ6nXBsdUsQSKqW0D4J_gClmBr_pz2PD8o13HAFMS8wzg-ZduzqxpT8ugW7U',
        alt: 'Ảnh cận cảnh miệng hố ga sâu hơn 1.8m bị mất nắp thép',
        coords: '21.0254°N, 105.8561°E',
        time: '08:30:28 • 29/03/2026',
        caption: 'Ảnh 2: Cận cảnh miệng hố sâu >1.8m',
      },
    ],
    address: 'Số 42 Tràng Tiền, Phường Tràng Tiền (Giáp ranh P. Hàng Trống), Q. Hoàn Kiếm, Hà Nội',
    distanceText: 'Cự ly: 180m',
    walkingTimeText: 'Khoảng 2 phút đi bộ',
    targetCoords: '21.0254, 105.8561',
    mapPreviewUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWhDluZh5_0ul6DS512xwftVcTwftKHAj-rMTaCTBMm30tjFBShKSvOxtJQtHtzODmgkprBisRIYqqiEBGQv0lKjSqgaXUuCyWnG6PEF4HyddIGv-4uRVT1dNAHKth0VHMA04zf59Zc0cQbAVSNfvr6_EdEKzBOksAxK-Iy1QaIlqPioYmyv1bN1pC6tIoRNStL7QYMGDXT2zmULHaeFrIYMilaDdArC53GfHofV_w6AmKK_EQgw',
    citizenFeedback:
      '"Hố ga sâu hơn 1.8m bị mất hoàn toàn phần nắp gang vào rạng sáng. Hiện trời mưa to ngập nước, người đi xe máy rất dễ lọt xuống tử vong. Người dân tạm cắm nhánh cây cảnh báo nhưng cực kỳ nguy cấp!"',
    googleMapsUrl: 'https://maps.google.com/?q=21.0254,105.8561',
  },
  'SC-2026-HN14': {
    id: 'SC-2026-HN14',
    code: 'SC-2026-HN14',
    category: 'Thoát nước & Ngập úng',
    priority: 'urgent',
    priorityLabel: 'KHẨN CẤP (URGENT)',
    title: 'Ngập úng đô thị - Tắc cống ngầm',
    agencyUnit: 'UBND Phường Hàng Trống • Đội Thoát nước & Chống ngập',
    cadreName: 'Đ/c Đỗ Mạnh Hùng',
    cadreInitials: 'ĐH',
    dispatchStatus: 'Lệnh điều động',
    slaCommitment: '2.0H SLA',
    initialSeconds: 48 * 60 + 30,
    initialElapsedPercent: 60.0,
    assignmentSource: 'tenant_dispatched',
    assignedTeamName: 'Đội Thoát nước & Chống ngập',
    assignedLeaderName: 'Đ/c Đỗ Mạnh Hùng (Đội trưởng)',
    tenantDirective:
      'Lệnh IOC: Điểm ngập úng ảnh hưởng tuyến giao thông huyết mạch, huy động xe bơm hút khẩn cấp thông cống ngầm.',
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGkZbidS6FufXfvIeORy76nNw7xQvqPAI5QFzRlDHP1eYQstBhIOjrw4nDqzGOabsCWcwTlG6EB79KB9yGgQx5nxP2e3DJxj4NWdCANPoKBUVSwwjrllnhCIavFkoo5xhxbNpm_QZJX7p2rPzWqiecsCTWJol5_qAKUZuMXLWZVGNJB_fAGZTjkysjejowG4KAXszNfItAN0vhhD4uJAqjfV_UpcRBDCrggwZl6d7Z6UmiO7-h9D4',
        alt: 'Hiện trường ngập úng đô thị trên phố Đinh Tiên Hoàng',
        coords: '21.0312°N, 105.8524°E',
        time: '09:12:00 • 29/03/2026',
        caption: 'Ảnh 1: Điểm ngập sâu trước số 36 Đinh Tiên Hoàng',
      },
    ],
    address: 'Đoạn trước số 36 Đinh Tiên Hoàng, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distanceText: 'Cự ly: 350m',
    walkingTimeText: 'Khoảng 4 phút đi bộ',
    targetCoords: '21.0312, 105.8524',
    mapPreviewUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWhDluZh5_0ul6DS512xwftVcTwftKHAj-rMTaCTBMm30tjFBShKSvOxtJQtHtzODmgkprBisRIYqqiEBGQv0lKjSqgaXUuCyWnG6PEF4HyddIGv-4uRVT1dNAHKth0VHMA04zf59Zc0cQbAVSNfvr6_EdEKzBOksAxK-Iy1QaIlqPioYmyv1bN1pC6tIoRNStL7QYMGDXT2zmULHaeFrIYMilaDdArC53GfHofV_w6AmKK_EQgw',
    citizenFeedback:
      '"Mưa lớn dồn dập khiến nước ngập quá bánh xe máy, miệng cống bị rác thải bít kín không thể thoát nước. Đề nghị khơi thông ngay!"',
    googleMapsUrl: 'https://maps.google.com/?q=21.0312,105.8524',
  },
  'SC-2026-HN03': {
    id: 'SC-2026-HN03',
    code: 'SC-2026-HN03',
    category: 'Cây xanh đô thị',
    priority: 'high',
    priorityLabel: 'ƯU TIÊN CAO',
    title: 'Cây gãy đổ chắn lối ngõ',
    agencyUnit: 'UBND Phường Hàng Trống • Đội Cây xanh Đô thị',
    cadreName: 'Đ/c Lê Hoàng Nam',
    cadreInitials: 'LN',
    dispatchStatus: 'Đã hoàn thành',
    slaCommitment: '4.0H SLA',
    initialSeconds: 0,
    initialElapsedPercent: 100,
    assignmentSource: 'self_claimed',
    assignedTeamName: 'Đội Cây xanh Đô thị',
    assignedLeaderName: 'Đ/c Lê Hoàng Nam (Đội trưởng)',
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe8kzsa23H9aWi_2LHiijespmGGU1qYqh4MEk0y3jBq1CgtfCpZAEXCJzC21sJpZklYkXHJfUO-qQSvR0d_WFAZINrPuxWGJCr7AMmhTyea5HqcGzaiIKXT-IH2A8pVQX5khcffOGTZ9kZmxvgIS6uwseKg3ah5b_WPdhnWT_3lMn3dGHsAEWrQE02QHRgSXw5BDFYOzvUIc9s6jtwaR13RTuoXr9BIzGnchDmTF6axMpW5PO07s',
        alt: 'Cành cây xà cừ lớn bị gãy được cưa dọn sạch sẽ',
        coords: '21.0298°N, 105.8509°E',
        time: '09:45:00 • 29/03/2026',
        caption: 'Ảnh nghiệm thu: Hiện trường đã giải tỏa',
      },
    ],
    address: 'Số 12 Hàng Trống, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distanceText: 'Cự ly: 120m',
    walkingTimeText: 'Khoảng 1 phút đi bộ',
    targetCoords: '21.0298, 105.8509',
    mapPreviewUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWhDluZh5_0ul6DS512xwftVcTwftKHAj-rMTaCTBMm30tjFBShKSvOxtJQtHtzODmgkprBisRIYqqiEBGQv0lKjSqgaXUuCyWnG6PEF4HyddIGv-4uRVT1dNAHKth0VHMA04zf59Zc0cQbAVSNfvr6_EdEKzBOksAxK-Iy1QaIlqPioYmyv1bN1pC6tIoRNStL7QYMGDXT2zmULHaeFrIYMilaDdArC53GfHofV_w6AmKK_EQgw',
    citizenFeedback:
      '"Cành cây xà cừ mục gãy sà xuống chắn ngang ngõ số 12, bà con không dắt xe qua được."',
    googleMapsUrl: 'https://maps.google.com/?q=21.0298,105.8509',
  },
  'SC-2026-HN15': {
    id: 'SC-2026-HN15',
    code: 'SC-2026-HN15',
    category: 'Trật tự & Biển báo',
    priority: 'normal',
    priorityLabel: 'BÌNH THƯỜNG',
    title: 'Biển báo giao thông bị cong vẹo che khuất',
    agencyUnit: 'UBND Phường Hàng Trống • Đội Phản ứng nhanh số 1',
    cadreName: 'Đ/c Nguyễn Văn Bình',
    cadreInitials: 'NB',
    dispatchStatus: 'Được cơ quan giao xuống',
    slaCommitment: '2.0H SLA',
    initialSeconds: 1 * 3600 + 45 * 60,
    initialElapsedPercent: 12.5,
    assignmentSource: 'tenant_dispatched',
    assignedTeamName: 'Đội Phản ứng nhanh số 1',
    assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
    tenantDirective:
      'UBND Phường yêu cầu Đội kiểm tra thực địa và chỉnh dựng lại biển báo giao thông trong buổi sáng.',
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9AbyR7qB1tMVlER3xPU8UXB_TE46FXSXOA6cL06wn2P5rdaJbRBd0cInJf-y1MWaMqarxAbInY3-S4OBpat8p-vEMu01IncviarwRGKvvd0fz64uRakhP4UlB9mcQ2TH4FMUxQ1bHDMJpKv3aTEmWp6jo-O76mxbm5PZmSY0CblQCbJ7NSMjz-RGbXUr2fbDB09XD2qWw4d9T7_iTGQpOXNXAipC3VkomcFalKWh0zwBAozEhmjc',
        alt: 'Biển báo giao thông bị nghiêng',
        coords: '21.0305°N, 105.8495°E',
        time: '09:00:00 • 29/03/2026',
        caption: 'Ảnh 1: Cột biển báo nghiêng góc',
      },
    ],
    address: 'Số 08 Phố Nhà Thờ, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distanceText: 'Cự ly: 250m',
    walkingTimeText: 'Khoảng 3 phút đi bộ',
    targetCoords: '21.0305, 105.8495',
    mapPreviewUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWhDluZh5_0ul6DS512xwftVcTwftKHAj-rMTaCTBMm30tjFBShKSvOxtJQtHtzODmgkprBisRIYqqiEBGQv0lKjSqgaXUuCyWnG6PEF4HyddIGv-4uRVT1dNAHKth0VHMA04zf59Zc0cQbAVSNfvr6_EdEKzBOksAxK-Iy1QaIlqPioYmyv1bN1pC6tIoRNStL7QYMGDXT2zmULHaeFrIYMilaDdArC53GfHofV_w6AmKK_EQgw',
    citizenFeedback:
      '"Cột biển báo số 08 Phố Nhà Thờ bị va chạm nghiêng 45 độ, che khuất tầm nhìn xe rẽ vào."',
    googleMapsUrl: 'https://maps.google.com/?q=21.0305,105.8495',
  },
  'SC-2026-HN11': {
    id: 'SC-2026-HN11',
    code: 'SC-2026-HN11',
    category: 'Cây xanh đô thị',
    priority: 'urgent',
    priorityLabel: 'KHẨN CẤP (URGENT)',
    title: 'Cây xà cừ ngã đổ chắn ngang phần đường xe chạy',
    agencyUnit: 'UBND Phường Hàng Trống • Đội Phản ứng nhanh số 1',
    cadreName: 'Đ/c Nguyễn Văn Bình',
    cadreInitials: 'NB',
    dispatchStatus: 'Đội tự nhận việc',
    slaCommitment: '3.0H SLA',
    initialSeconds: 3 * 3600 + 20 * 60,
    initialElapsedPercent: 10,
    assignmentSource: 'self_claimed',
    assignedTeamName: 'Đội Phản ứng nhanh số 1',
    assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEXbfOUvFac8fuFiYXLlnA3j1SACHwquBYnZq_seP3q85St7Y_uZCmDjD50BXHCW-8xjnL5R279aq1dXVEoZxcz_KXYytKZk93m3TYyrP6MejK4v_grueWBWS7cSidx3P2mBakTIZb7ArOiTOPhAw_q0ocjZBGXzFBGxBgdPHRtMGpgE_H_WfnIN3KolHssOHTJDGMLKtT7sbK9brpuX0wTzbsGKfUB-mTvPUaMT-6aqOk-mfhEb8',
        alt: 'Cây xà cừ ngã đổ',
        coords: '21.0267°N, 105.8502°E',
        time: '10:15:00 • 29/03/2026',
        caption: 'Ảnh 1: Cành cây xà cừ lớn đổ',
      },
    ],
    address: 'Ngã tư Bà Triệu - Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
    distanceText: 'Cự ly: 650m',
    walkingTimeText: 'Khoảng 7 phút đi bộ',
    targetCoords: '21.0267, 105.8502',
    mapPreviewUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWhDluZh5_0ul6DS512xwftVcTwftKHAj-rMTaCTBMm30tjFBShKSvOxtJQtHtzODmgkprBisRIYqqiEBGQv0lKjSqgaXUuCyWnG6PEF4HyddIGv-4uRVT1dNAHKth0VHMA04zf59Zc0cQbAVSNfvr6_EdEKzBOksAxK-Iy1QaIlqPioYmyv1bN1pC6tIoRNStL7QYMGDXT2zmULHaeFrIYMilaDdArC53GfHofV_w6AmKK_EQgw',
    citizenFeedback:
      '"Cành cây xà cừ lớn bị gió quật gãy đổ rạp che khuất làn xe gắn máy, phương tiện đang phải né tránh di chuyển chậm."',
    googleMapsUrl: 'https://maps.google.com/?q=21.0267,105.8502',
  },
  'SC-2026-URG01': {
    id: 'SC-2026-URG01',
    code: 'SC-2026-URG01',
    category: 'Khẩn cấp cấp 1',
    priority: 'urgent',
    priorityLabel: 'KHẨN CẤP CẤP 1',
    title: 'CẢNH BÁO: Đứt cáp điện ngõ 12 Phố Tràng Thi',
    agencyUnit: 'UBND Phường Hàng Trống • Đội Phản ứng nhanh số 1',
    cadreName: 'Đ/c Nguyễn Văn Bình',
    cadreInitials: 'NB',
    dispatchStatus: 'Lệnh khẩn cấp từ IOC',
    slaCommitment: '15 Phút Tiếp Nhận',
    initialSeconds: 9 * 60,
    initialElapsedPercent: 40,
    assignmentSource: 'tenant_dispatched',
    assignedTeamName: 'Đội Phản ứng nhanh số 1',
    assignedLeaderName: 'Đ/c Nguyễn Văn Bình (Đội trưởng)',
    tenantDirective:
      'IOC phát báo động đỏ: Dây cáp điện võng sát mặt đường nguy cơ giật điện khi mưa ẩm. Rào chắn cách ly trong 10 phút!',
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMqd1_NkgzZpoeqmHaIHK0Zuj6Fwe9G7dYX1eyPIPNTEgyFw7iEUbTH6msJhx8L1N_UbQsJI7WPHqVFFFHoCMgfGBqt4zv2S1gU1fD1tcEtiSq2dvIDfYpZwHEcf8kURqvXbQa4NNpLOU2gh0ClKwVGRt2NgHJDPVbhhjLb8BrniRTVH3uAs-_uA_LElYoNDqgGv2iTtbWIrn8YUVEi7keTxL4GxONkBfh75vVL_dlAIJWPj6qo_c',
        alt: 'Cáp điện đứt võng',
        coords: '21.0285°N, 105.8478°E',
        time: '11:00:00 • 29/03/2026',
        caption: 'Ảnh 1: Cáp điện ngõ 12 Tràng Thi',
      },
    ],
    address: 'Ngõ 12 Phố Tràng Thi, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distanceText: 'Cự ly: 180m',
    walkingTimeText: 'Khoảng 2 phút đi bộ',
    targetCoords: '21.0285, 105.8478',
    mapPreviewUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWhDluZh5_0ul6DS512xwftVcTwftKHAj-rMTaCTBMm30tjFBShKSvOxtJQtHtzODmgkprBisRIYqqiEBGQv0lKjSqgaXUuCyWnG6PEF4HyddIGv-4uRVT1dNAHKth0VHMA04zf59Zc0cQbAVSNfvr6_EdEKzBOksAxK-Iy1QaIlqPioYmyv1bN1pC6tIoRNStL7QYMGDXT2zmULHaeFrIYMilaDdArC53GfHofV_w6AmKK_EQgw',
    citizenFeedback:
      '"Dây điện võng sát mặt đường, nguy cơ chập cháy khi trời ẩm. Đã báo Điện lực Hoàn Kiếm."',
    googleMapsUrl: 'https://maps.google.com/?q=21.0285,105.8478',
  },
};

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();

  // Tra cứu dữ liệu tác vụ theo mã hoặc dùng SC-2026-HN09 làm chuẩn mặc định
  const taskKey = id && DEFAULT_TASK_DETAILS[id] ? id : 'SC-2026-HN09';
  const task = DEFAULT_TASK_DETAILS[taskKey] || DEFAULT_TASK_DETAILS['SC-2026-HN09'];

  // State đếm lùi SLA
  const [secondsRemaining, setSecondsRemaining] = useState<number>(task.initialSeconds);
  const [isArrived, setIsArrived] = useState<boolean>(false);
  const [arrivedTime, setArrivedTime] = useState<string>('');
  const [showEscalateAlert, setShowEscalateAlert] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // SLA Counter Effect
  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  // Format SLA Countdown HH:MM:SS
  const formatSlaTime = (secs: number) => {
    if (secs <= 0) return '00:00:00 (HẾT HẠN)';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainderSecs = secs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(
      remainderSecs
    ).padStart(2, '0')}`;
  };

  // Xử lý nút: Đã có mặt tại hiện trường
  const handleArrived = () => {
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setIsArrived(true);
    setArrivedTime(timeStr);
    setToastMessage(`✓ Đã xác nhận cán bộ có mặt tại hiện trường lúc ${timeStr}`);
  };

  // Xử lý nút: Nghiệm thu xử lý
  const handleResolve = () => {
    setToastMessage(`Chuyển sang quy trình lập biên bản nghiệm thu hồ sơ ${task.code}...`);
  };

  // Xử lý nút: Chuyển trả IOC
  const handleEscalateConfirm = () => {
    setToastMessage(`Đã gửi yêu cầu chuyển trả hồ sơ ${task.code} tới Trung tâm Chỉ huy IOC thành công.`);
    setTimeout(() => {
      router.canGoBack() ? router.goBack() : router.push(ROUTES.RECORDS, 'back', 'pop');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full bg-surface !pb-safe">
      {/* 1. TỔNG QUAN HỒ SƠ & THÔNG BÁO TÁC CHIẾN */}
      <div className="!px-margin !pt-space-md !pb-space-sm bg-surface-container-low flex flex-col gap-space-sm">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="font-code-tabular text-code-tabular text-primary font-bold tracking-tight">
              {task.code}
            </span>
            <span className="w-1.5 h-1.5 !rounded-full bg-outline" />
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {task.category}
            </span>
          </div>

          {/* BADGE KHẨN CẤP PHẲNG CHUẨN ĐỒ HOẠ */}
          <span className="!px-2 !py-0.5 !rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold tracking-wide flex items-center gap-1 shadow-sm">
            <span
              className="material-symbols-outlined text-[13px] leading-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            {task.priorityLabel}
          </span>
        </div>

        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold leading-snug">
            {task.title}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant !mt-0.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              corporate_fare
            </span>
            {task.agencyUnit}
          </p>
        </div>

        {/* ĐỘI NGŨ THỤ LÝ & CƠ CHẾ NHẬN VIỆC (TEAM ASSIGNMENT) */}
        <div className="!p-space-sm bg-surface-container-lowest !rounded-xl shadow-sm !mt-1 border border-outline-variant/30 flex flex-col gap-2">
          {/* Header Cơ chế giao việc */}
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-outline-variant/20 !pb-2">
            <div className="flex items-center gap-1.5">
              {task.assignmentSource === 'tenant_dispatched' ? (
                <span className="!px-2.5 !py-0.5 !rounded-full text-[11px] font-label-sm font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">corporate_fare</span>
                  Được giao
                </span>
              ) : (
                <span className="!px-2.5 !py-0.5 !rounded-full text-[11px] font-label-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">handshake</span>
                  Tự nhận
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 bg-surface-container !px-2.5 !py-0.5 !rounded-full text-secondary font-label-sm text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>{task.dispatchStatus}</span>
            </div>
          </div>

          {/* Đơn vị & Trưởng đội đại diện */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 !rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-lg text-label-lg shrink-0 font-bold shadow-xs">
                {task.cadreInitials}
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary">groups</span>
                  <span>{task.assignedTeamName || 'Đội Phản ứng nhanh số 1'}</span>
                </p>
                <p className="font-label-lg text-label-lg text-on-surface truncate font-bold">
                  {task.assignedLeaderName || `${task.cadreName} (Đội trưởng)`}
                </p>
              </div>
            </div>

            <span className="text-[10px] text-on-surface-variant font-label-sm text-right shrink-0">
              Trưởng team tiếp nhận
            </span>
          </div>

          {/* Chỉ đạo khẩn cấp từ Cơ quan địa phương (Tenant) nếu có */}
          {task.tenantDirective && (
            <div className="!mt-1 !p-2.5 bg-amber-500/10 !rounded-lg border border-amber-500/30 flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0 mt-0.5">
                campaign
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                  Chỉ đạo từ Cơ quan địa phương (Tenant / UBND):
                </span>
                <span className="text-body-sm text-on-surface font-medium leading-snug">
                  {task.tenantDirective}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. SLA COUNTDOWN TIMER BOX (ĐỒNG HỒ ĐẾM LÙI CAM KẾT SLA 2H) */}
      <div className="!px-margin !py-space-sm">
        <div className="bg-secondary-fixed text-on-secondary-fixed !rounded-xl !p-space-md shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm font-semibold tracking-wide uppercase">
              <span
                className="material-symbols-outlined text-[18px] text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                timer
              </span>
              <span>Cam kết tiến độ SLA cấp ủy quyền</span>
            </div>
            <span className="font-code-tabular text-code-tabular bg-surface-container-lowest text-secondary !px-2 !py-0.5 !rounded-lg font-bold">
              {task.slaCommitment}
            </span>
          </div>

          <div className="flex items-baseline justify-between !pt-1">
            <div className="flex flex-col">
              <span className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
                Thời hạn tiếp nhận &amp; xử lý còn:
              </span>
              <span
                id="sla-timer"
                className={`font-headline-md text-headline-md font-bold tracking-tight ${
                  secondsRemaining === 0 ? 'text-error' : 'text-on-secondary-fixed'
                }`}
              >
                {formatSlaTime(secondsRemaining)}
              </span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant">
                Tiến độ tiêu hao
              </span>
              <span className="font-code-tabular text-code-tabular font-bold text-secondary">
                {task.initialElapsedPercent}%
              </span>
            </div>
          </div>

          {/* THANH ĐO TIẾN ĐỘ THỜI GIAN SLA */}
          <div className="w-full h-1.5 bg-surface-container-lowest/60 !rounded-full overflow-hidden !mt-1">
            <div
              className="h-full bg-secondary !rounded-full transition-all duration-500"
              style={{ width: `${100 - task.initialElapsedPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. KHỐI HÌNH ẢNH HIỆN TRƯỜNG TỪ CÔNG DÂN KHAI BÁO */}
      <div className="!px-margin !py-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[18px]">photo_camera</span>
            <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">
              Ảnh chụp hiện trường ban đầu ({String(task.photos.length).padStart(2, '0')})
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Báo cáo qua app Công Dân
          </span>
        </div>

        {/* 2 ẢNH BENTO HIỆN TRƯỜNG CÓ WATERMARK TOẠ ĐỘ & THỜI GIAN */}
        <div className="grid grid-cols-2 gap-space-sm !mt-1">
          {task.photos.map((photo, index) => (
            <div
              key={index}
              className="relative !rounded-xl overflow-hidden shadow-sm bg-surface-container-high h-44 flex flex-col justify-end"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                data-alt={photo.alt}
                style={{ backgroundImage: `url('${photo.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="relative z-10 !p-2 text-on-primary flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-tertiary-fixed">
                    location_pin
                  </span>
                  <span className="font-code-tabular text-[10px] leading-tight font-semibold tracking-tight text-surface-bright">
                    {photo.coords}
                  </span>
                </div>
                <span className="font-code-tabular text-[9px] leading-none text-surface-container-high opacity-90">
                  {photo.time}
                </span>
                <span className="font-label-sm text-[10px] leading-tight font-medium text-surface-bright !mt-0.5 truncate">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CHI TIẾT VỊ TRÍ GIS & MÔ TẢ PHẢN ÁNH TỪ DÂN */}
      <div className="!px-margin !py-space-sm flex flex-col gap-space-sm">
        {/* KHỐI VỊ TRÍ BẢN ĐỒ MINI TÍCH HỢP */}
        <div className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
          <div className="flex items-start gap-space-sm">
            <div className="w-8 h-8 !rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0 !mt-0.5">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                explore
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-sm text-label-sm text-on-surface-variant font-medium uppercase">
                Địa chỉ hiện trường xác thực
              </p>
              <p className="font-body-md text-body-md text-on-surface font-semibold !mt-0.5 leading-snug">
                {task.address}
              </p>
              <div className="flex items-center gap-space-xs !mt-2 flex-wrap">
                <span className="font-code-tabular text-label-sm text-secondary bg-surface-container-low !px-2 !py-0.5 !rounded-lg font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">near_me</span>{' '}
                  {task.distanceText}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium bg-surface-container-low !px-2 !py-0.5 !rounded-lg">
                  {task.walkingTimeText}
                </span>
              </div>
            </div>
          </div>

          {/* MAP PREVIEW EMBEDDED PIPELINE */}
          <div
            className="w-full h-32 !rounded-lg bg-cover bg-center relative overflow-hidden shadow-inner flex items-end !p-2.5"
            data-location={task.address}
            style={{ backgroundImage: `url('${task.mapPreviewUrl}')` }}
          >
            <div className="bg-surface/90 backdrop-blur-md !px-2.5 !py-1 !rounded-lg text-primary flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 !rounded-full bg-error animate-ping" />
              <span className="font-label-sm text-label-sm font-semibold">
                Tọa độ mục tiêu: {task.targetCoords}
              </span>
            </div>
          </div>

          {/* NỘI DUNG MÔ TẢ CÔNG DÂN */}
          <div className="!pt-space-xs flex flex-col gap-1">
            <p className="font-label-sm text-label-sm text-on-surface-variant font-medium uppercase">
              Nội dung phản ánh từ người dân:
            </p>
            <div className="!p-space-sm bg-surface-container-low !rounded-lg text-on-surface">
              <p className="font-body-sm text-body-sm leading-relaxed">
                {task.citizenFeedback}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. NÚT DẪN ĐƯỜNG LỚN (FULL-WIDTH PRIMARY ACTION) */}
      <div className="!px-margin !pt-space-xs !pb-space-sm">
        <a
          className="w-full !py-4 !px-space-md !rounded-xl bg-primary-container text-on-primary flex items-center justify-between shadow-md active:opacity-90 transition-opacity cursor-pointer"
          href={task.googleMapsUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 !rounded-full bg-surface-container-lowest/15 flex items-center justify-center text-secondary-fixed">
              <span className="material-symbols-outlined text-[24px]">navigation</span>
            </div>
            <div className="text-left">
              <p className="font-label-lg text-label-lg font-bold tracking-wide uppercase">
                Dẫn đường Google Maps
              </p>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                Mở bản đồ định vị tuyến đường tức thì
              </p>
            </div>
          </div>
          <div className="flex items-center text-secondary-fixed-dim font-bold">
            <span className="font-label-sm text-label-sm !mr-1">180m</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </a>
      </div>

      {/* 6. CỤM NÚT CHUYỂN ĐỔI TRẠNG THÁI TÁC CHIẾN HIỆN TRƯỜNG */}
      <div className="!px-margin !pt-space-xs !pb-space-xl flex flex-col gap-space-sm">
        {/* NÚT CHÍNH 1: ĐÃ CÓ MẶT TẠI HIỆN TRƯỜNG */}
        <button
          type="button"
          disabled={isArrived}
          onClick={handleArrived}
          className={`w-full !py-3.5 !px-space-md !rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer ${
            isArrived
              ? 'bg-surface-container-highest text-on-surface-variant cursor-default'
              : 'bg-secondary text-on-secondary active:bg-on-secondary-container'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isArrived ? 'check_circle' : 'pin_drop'}
          </span>
          <span>
            {isArrived
              ? `✓ XÁC NHẬN CÓ MẶT (LÚC ${arrivedTime})`
              : 'ĐÃ CÓ MẶT TẠI HIỆN TRƯỜNG'}
          </span>
        </button>

        {/* NÚT CHÍNH 2: TIẾN HÀNH NGHIỆM THU XỬ LÝ */}
        <button
          type="button"
          onClick={handleResolve}
          className="w-full !py-3.5 !px-space-md !rounded-xl bg-on-tertiary-container text-on-tertiary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm active:opacity-90 transition-opacity cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            task_alt
          </span>
          <span>TIẾN HÀNH NGHIỆM THU XỬ LÝ</span>
        </button>

        {/* NÚT PHỤ: BÁO CÁO SAI ĐỊA GIỚI */}
        <button
          type="button"
          onClick={() => setShowEscalateAlert(true)}
          className="w-full !py-2.5 !px-space-md !rounded-xl bg-surface-container-low text-error font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 active:bg-error-container/30 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">wrong_location</span>
          <span>Báo cáo sự cố sai địa giới / Chuyển trả Trung tâm IOC</span>
        </button>
      </div>

      {/* Confirmation Alert Chuyển trả IOC */}
      <IonAlert
        isOpen={showEscalateAlert}
        onDidDismiss={() => setShowEscalateAlert(false)}
        header="Xác nhận chuyển trả IOC"
        message={`Xác nhận chuyển sự cố ${task.code} trả về Trung tâm Điều hành IOC do sai phân cấp/địa giới?`}
        buttons={[
          {
            text: 'Hủy bỏ',
            role: 'cancel',
          },
          {
            text: 'Xác nhận chuyển trả',
            handler: handleEscalateConfirm,
          },
        ]}
      />

      {/* Toast Notification */}
      <IonToast
        isOpen={Boolean(toastMessage)}
        message={toastMessage || ''}
        duration={2500}
        onDidDismiss={() => setToastMessage(null)}
        position="bottom"
      />
    </div>
  );
};

export default TaskDetail;
