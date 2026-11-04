import React, { useState } from 'react';
import { IonAlert, IonToast, useIonRouter } from '@ionic/react';
import { CadreProfile } from './types';
import CadreIdentityCard from './components/CadreIdentityCard';
import CadreAgencyUnitCard from './components/CadreAgencyUnitCard';
import CadreDigitalCertCard from './components/CadreDigitalCertCard';
import CadreDutySettingsCard from './components/CadreDutySettingsCard';
import CadreLogoutFooter from './components/CadreLogoutFooter';
import HandoverShiftModal from './components/HandoverShiftModal';
import ShiftSwapModal from './components/ShiftSwapModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import { ROUTES } from '../../config/Routing';
import { CADRE_DEFAULT_PROFILE, CADRE_DEFAULT_SETTINGS } from '../../config/static/CadreConfig';

export const Profile: React.FC = () => {
  const router = useIonRouter();

  const [profile] = useState<CadreProfile>(CADRE_DEFAULT_PROFILE);
  const [alertOutsideDuty, setAlertOutsideDuty] = useState(CADRE_DEFAULT_SETTINGS.alertOutsideDuty);
  const [sirenVolume, setSirenVolume] = useState(CADRE_DEFAULT_SETTINGS.emergencySirenVolume);

  // Modals & Dialogs state
  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
  const [isShiftSwapOpen, setIsShiftSwapOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleToggleAlertOutside = () => {
    const nextVal = !alertOutsideDuty;
    setAlertOutsideDuty(nextVal);
    notify(
      nextVal
        ? 'Đã bật thông báo sự cố khẩn cấp ngoài ca trực'
        : 'Đã tắt nhận thông báo sự cố ngoài ca trực'
    );
  };

  const handleSirenVolumeChange = (vol: number) => {
    setSirenVolume(vol);
  };

  const handleConfirmLogout = () => {
    notify('Đã hủy ủy quyền an toàn. Hệ thống điều hướng về màn hình Xác thực Công Vụ.');
    setTimeout(() => {
      router.push(ROUTES.LOGIN, 'root', 'replace');
    }, 800);
  };

  const handleHandoverConfirm = (_notes: string) => {
    setIsHandoverOpen(false);
    notify('Đã hoàn tất bàn giao ca trực và ký số biên bản bàn giao thành công.');
  };

  const handleShiftSwapConfirm = (_data: { reason: string; date: string; substitute: string }) => {
    setIsShiftSwapOpen(false);
    notify('Đã gửi đề xuất nghỉ phép / đổi ca trực tới Chỉ huy kíp trực phê duyệt.');
  };

  const handleChangePasswordConfirm = () => {
    setIsChangePasswordOpen(false);
    notify('Đã cập nhật mật khẩu tài khoản công vụ an toàn.');
  };

  return (
    <>
      {/* Container chính bám sát cấu trúc của TaskCode.md */}
      <div className="flex flex-col w-full !pb-6 !px-margin animate-fade-in">
        {/* 1. KHỐI THÔNG TIN ĐỊNH DANH CÁN BỘ */}
        <CadreIdentityCard profile={profile} />

        {/* 2. KHỐI ĐỘI & CƠ QUAN CÔNG TÁC */}
        <CadreAgencyUnitCard
          profile={profile}
          onCallHotline={() => notify(`Đang kết nối Hotline chỉ huy: ${profile.hotlineTel}`)}
        />

        {/* 3. PHÂN HỆ CHỨNG THƯ SỐ & PHÁP LÝ CÔNG VỤ */}
        <CadreDigitalCertCard
          profile={profile}
          onVerifyClick={() =>
            notify('Chứng thư số PKI Ban Cơ yếu Chính phủ đang hợp lệ và kết nối an toàn.')
          }
        />

        {/* 4. CÀI ĐẶT CA TRỰC & ỨNG DỤNG */}
        <CadreDutySettingsCard
          alertOutsideDuty={alertOutsideDuty}
          sirenVolume={sirenVolume}
          onToggleAlertOutside={handleToggleAlertOutside}
          onSirenVolumeChange={handleSirenVolumeChange}
          onOpenHandover={() => setIsHandoverOpen(true)}
          onOpenShiftSwap={() => setIsShiftSwapOpen(true)}
          onOpenChangePassword={() => setIsChangePasswordOpen(true)}
        />

        {/* 5. NÚT ĐĂNG XUẤT AN TOÀN & APP FOOTER */}
        <CadreLogoutFooter onLogout={() => setShowLogoutAlert(true)} />
      </div>

      {/* Modal 1: Bàn giao ca trực & Biên bản số */}
      <HandoverShiftModal
        isOpen={isHandoverOpen}
        profile={profile}
        onClose={() => setIsHandoverOpen(false)}
        onConfirm={handleHandoverConfirm}
      />

      {/* Modal 2: Đăng ký báo nghỉ phép / Đổi ca trực */}
      <ShiftSwapModal
        isOpen={isShiftSwapOpen}
        profile={profile}
        onClose={() => setIsShiftSwapOpen(false)}
        onConfirm={handleShiftSwapConfirm}
      />

      {/* Modal 3: Đổi mật khẩu tài khoản công vụ */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onConfirm={handleChangePasswordConfirm}
      />

      {/* Dialog xác nhận Đăng xuất an toàn theo đúng TaskCode.md */}
      <IonAlert
        isOpen={showLogoutAlert}
        header="Xác nhận kết thúc phiên"
        subHeader="Đ/c Nguyễn Văn Bình (CC-HN-0842)"
        message="Xác nhận kết thúc phiên làm việc an toàn cho Đ/c Nguyễn Văn Bình? Dữ liệu chữ ký số và tọa độ GPS sẽ được thu hồi lập tức."
        buttons={[
          {
            text: 'Hủy bỏ',
            role: 'cancel',
            handler: () => setShowLogoutAlert(false),
          },
          {
            text: 'Đăng xuất',
            role: 'destructive',
            handler: handleConfirmLogout,
          },
        ]}
        onDidDismiss={() => setShowLogoutAlert(false)}
      />

      {/* Toast thông báo phản hồi */}
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

export default Profile;
