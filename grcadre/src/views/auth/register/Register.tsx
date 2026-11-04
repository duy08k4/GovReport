import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { ROUTES } from '../../../config/Routing';
import { TENANT_AGENCIES, WORK_TEAMS } from '../../../config/static/AppConfig';

const Register: React.FC = () => {
  const router = useIonRouter();

  // Form states
  const [fullName, setFullName] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [govEmail, setGovEmail] = useState('');
  const [cadreCode, setCadreCode] = useState('');
  const [tenantAgency, setTenantAgency] = useState('ubnd_hang_trong');
  const [workTeam, setWorkTeam] = useState('rapid_team_1');
  const [cadreRole, setCadreRole] = useState('');
  const [decisionNumber, setDecisionNumber] = useState('');

  // Password & Security states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [commitmentAccepted, setCommitmentAccepted] = useState(false);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dossierId] = useState('HS-2026-8849');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Bộ quy tắc chuẩn: 8-20 ký tự, có chữ thường, chữ hoa, số và ký tự đặc biệt
  const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;

  // 4 điều kiện cốt lõi:
  // 1. Độ dài 8-20 ký tự
  // 2. Chữ in hoa (A-Z)
  // 3. Chữ thường (a-z) và chữ số (0-9)
  // 4. Ký tự đặc biệt
  const condLength = password.length >= 8 && password.length <= 20;
  const condUpper = /[A-Z]/.test(password);
  const condLowerAndNumber = /[a-z]/.test(password) && /[0-9]/.test(password);
  const condSpecial = SPECIAL_CHAR_REGEX.test(password);

  // Đếm số lượng điều kiện đã thỏa mãn (0 đến 4)
  const conditionsMetCount =
    (condLength ? 1 : 0) +
    (condUpper ? 1 : 0) +
    (condLowerAndNumber ? 1 : 0) +
    (condSpecial ? 1 : 0);

  // Phân loại độ mạnh mật khẩu theo đúng yêu cầu:
  // - Chưa nhập: chưa nhập gì hết
  // - Yếu: thỏa được 1-2 điều kiện
  // - Khá: còn 1 điều kiện chưa thỏa (thỏa 3/4 điều kiện)
  // - Mạnh: Thỏa tất cả các điều kiện (4/4 điều kiện)
  const getPasswordStrength = (): {
    level: number;
    label: 'Chưa nhập' | 'Yếu' | 'Khá' | 'Mạnh';
    barCount: number;
    colorClass: string;
    textColorClass: string;
  } => {
    if (!password || password.length === 0) {
      return {
        level: 0,
        label: 'Chưa nhập',
        barCount: 0,
        colorClass: 'bg-surface-container-highest',
        textColorClass: 'text-on-surface-variant',
      };
    }

    if (conditionsMetCount <= 2) {
      return {
        level: 1,
        label: 'Yếu',
        barCount: Math.max(1, conditionsMetCount),
        colorClass: 'bg-error',
        textColorClass: 'text-error',
      };
    }

    if (conditionsMetCount === 3) {
      return {
        level: 2,
        label: 'Khá',
        barCount: 3,
        colorClass: 'bg-secondary',
        textColorClass: 'text-secondary',
      };
    }

    return {
      level: 3,
      label: 'Mạnh',
      barCount: 4,
      colorClass: 'bg-on-tertiary-container',
      textColorClass: 'text-on-tertiary-container',
    };
  };

  const strength = getPasswordStrength();
  const isStrong = strength.label === 'Mạnh';
  const isPasswordMatch = !confirmPassword || password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Chỉ khi mật khẩu đạt mức "Mạnh" mới có thể gửi hồ sơ
    if (!isStrong) {
      if (!password) {
        setErrorMessage('Vui lòng thiết lập mật khẩu khởi tạo.');
      } else if (strength.label === 'Khá') {
        setErrorMessage('Mật khẩu ở mức "Khá" (còn 1 điều kiện chưa thỏa). Chỉ khi đạt mức "Mạnh" mới có thể gửi hồ sơ.');
      } else {
        setErrorMessage('Mật khẩu ở mức "Yếu" (chỉ thỏa 1-2 điều kiện). Chỉ khi đạt mức "Mạnh" mới có thể gửi hồ sơ.');
      }
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu nhập lại không trùng khớp với mật khẩu khởi tạo.');
      return;
    }

    if (!commitmentAccepted) {
      setErrorMessage('Vui lòng đồng ý với cam kết kỷ luật công vụ trước khi gửi.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <IonPage className="bg-surface">
      <IonContent fullscreen className="ion-no-padding">
        {/* Khung chứa chuẩn Mobile First */}
        <div className="w-full min-h-screen bg-surface flex flex-col items-center">
          <main className="w-full max-w-md min-h-screen flex flex-col justify-between bg-surface relative pt-safe pb-safe shadow-sm">
            <div className="flex flex-col w-full px-margin pb-space-xl">
              
              {/* Header / Navigation Bar */}
              <header className="flex items-center justify-between py-space-sm mb-space-sm">
                <button
                  type="button"
                  onClick={() => router.push(ROUTES.LOGIN, 'back', 'pop')}
                  className="flex items-center gap-space-xs text-primary font-label-md text-label-md py-space-xs pr-space-sm hover:opacity-80 active:opacity-60 transition-opacity"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-headline-sm">
                    arrow_back
                  </span>
                  <span>Đăng nhập</span>
                </button>
                <div className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-high rounded-DEFAULT text-on-surface-variant font-label-sm text-label-sm">
                  <span
                    className="material-symbols-outlined text-base text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    security
                  </span>
                  <span>Cổng Dịch Vụ Nội Bộ</span>
                </div>
              </header>

              {/* Page Title & Operational Subtitle */}
              <section className="mb-space-md">
                <div className="flex items-center gap-space-xs mb-1">
                  <span className="inline-block w-1.5 h-4 bg-secondary rounded-DEFAULT"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                    GovReport Cadre System
                  </span>
                </div>
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                  Khai Báo Hồ Sơ Cán Bộ
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Đăng ký định danh phục vụ công tác giám sát hiện trường &amp; xử lý phản ánh đô thị
                </p>
              </section>

              {/* Informational Warning Banner */}
              <aside className="flex items-start gap-space-sm p-space-md bg-surface-container-low rounded-lg mb-space-lg shadow-sm border border-secondary-container/30">
                <span
                  className="material-symbols-outlined text-secondary text-headline-sm shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  info
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Quy trình thẩm định hồ sơ công vụ
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Tài khoản sẽ được kích hoạt sau khi Lãnh đạo đơn vị (Tenant Admin) phê duyệt quyết định điều động công tác.
                  </p>
                </div>
              </aside>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
                
                {/* Section 1: Thông tin nhân sự */}
                <fieldset className="flex flex-col gap-space-md p-0 m-0 border-0">
                  <legend className="flex items-center justify-between w-full pb-1 border-b-0">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      1. Thông tin cá nhân &amp; Định danh
                    </span>
                    <span className="font-code-tabular text-code-tabular text-secondary font-semibold">
                      Mục 01 / 03
                    </span>
                  </legend>

                  {/* Field: Họ và tên */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                      htmlFor="fullName"
                    >
                      <span className="font-medium">
                        Họ và tên đầy đủ <span className="text-error">*</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant opacity-80 font-normal">
                        Chữ in hoa có dấu
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        badge
                      </span>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Đ/c Nguyễn Văn Bình"
                        className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary focus:bg-surface-container-lowest transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field: CCCD / VNeID */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                      htmlFor="citizenId"
                    >
                      <span className="font-medium">
                        Số Căn cước công dân / Định danh VNeID <span className="text-error">*</span>
                      </span>
                      <span className="font-code-tabular text-code-tabular text-on-surface-variant">12 số</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        fingerprint
                      </span>
                      <input
                        id="citizenId"
                        type="tel"
                        required
                        maxLength={12}
                        pattern="[0-9]{12}"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value)}
                        placeholder="12 chữ số CCCD gắn chip"
                        className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface font-code-tabular text-code-tabular placeholder:text-outline rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  {/* Grid: Điện thoại & Email */}
                  <div className="grid grid-cols-1 gap-space-md">
                    {/* Số điện thoại */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="phoneNumber">
                        Số điện thoại công vụ <span className="text-error">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                          call
                        </span>
                        <input
                          id="phoneNumber"
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface font-code-tabular text-code-tabular placeholder:text-outline rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary"
                        />
                      </div>
                    </div>

                    {/* Email công vụ */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                        htmlFor="govEmail"
                      >
                        <span className="font-medium">
                          Email cơ quan (.gov.vn) <span className="text-error">*</span>
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          Tên miền Nhà nước
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                          mail
                        </span>
                        <input
                          id="govEmail"
                          type="email"
                          required
                          value={govEmail}
                          onChange={(e) => setGovEmail(e.target.value)}
                          placeholder="binhnv.ubnd@hanoi.gov.vn"
                          className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* Section 2: Thông tin công tác & Đơn vị trực thuộc */}
                <fieldset className="flex flex-col gap-space-md p-0 m-0 border-0">
                  <legend className="flex items-center justify-between w-full pb-1 border-b-0">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      2. Đơn vị &amp; Quyết định phân công
                    </span>
                    <span className="font-code-tabular text-code-tabular text-secondary font-semibold">
                      Mục 02 / 03
                    </span>
                  </legend>

                  {/* Field: Thẻ công chức */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="cadreCode">
                      Mã số thẻ công chức / viên chức <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        assignment_ind
                      </span>
                      <input
                        id="cadreCode"
                        type="text"
                        required
                        value={cadreCode}
                        onChange={(e) => setCadreCode(e.target.value.toUpperCase())}
                        placeholder="Ví dụ: CC-HN-0842"
                        className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface font-code-tabular text-code-tabular placeholder:text-outline rounded-lg shadow-sm uppercase border border-outline-variant/40 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  {/* Field: Cơ quan trực thuộc (Tenant) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="tenantAgency">
                      Cơ quan trực thuộc (Tenant) <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        account_balance
                      </span>
                      <select
                        id="tenantAgency"
                        required
                        value={tenantAgency}
                        onChange={(e) => setTenantAgency(e.target.value)}
                        className="w-full h-10 pl-10 pr-10 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary appearance-none cursor-pointer"
                      >
                        {TENANT_AGENCIES.map((agency) => (
                          <option key={agency.id} value={agency.id}>
                            {agency.name}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Field: Đội / Tổ công tác */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="workTeam">
                      Đội / Tổ công tác đăng ký <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        groups
                      </span>
                      <select
                        id="workTeam"
                        required
                        value={workTeam}
                        onChange={(e) => setWorkTeam(e.target.value)}
                        className="w-full h-10 pl-10 pr-10 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary appearance-none cursor-pointer"
                      >
                        {WORK_TEAMS.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Field: Chức vụ công tác */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="cadreRole">
                      Chức vụ công tác <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        work
                      </span>
                      <input
                        id="cadreRole"
                        type="text"
                        required
                        value={cadreRole}
                        onChange={(e) => setCadreRole(e.target.value)}
                        placeholder="Chuyên viên Quản lý Trật tự Đô thị"
                        className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  {/* Field: Số quyết định bổ nhiệm / điều động */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                      htmlFor="decisionNumber"
                    >
                      <span className="font-medium">
                        Số quyết định bổ nhiệm / điều động <span className="text-error">*</span>
                      </span>
                      <span className="font-code-tabular text-code-tabular text-on-surface-variant font-normal">
                        Văn bản pháp lý
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        description
                      </span>
                      <input
                        id="decisionNumber"
                        type="text"
                        required
                        value={decisionNumber}
                        onChange={(e) => setDecisionNumber(e.target.value.toUpperCase())}
                        placeholder="QĐ-88/2026/UBND"
                        className="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest text-on-surface font-code-tabular text-code-tabular placeholder:text-outline rounded-lg shadow-sm uppercase border border-outline-variant/40 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Section 3: Mật khẩu & Bảo mật */}
                <fieldset className="flex flex-col gap-space-md p-0 m-0 border-0">
                  <legend className="flex items-center justify-between w-full pb-1 border-b-0">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      3. Thiết lập mật khẩu công vụ
                    </span>
                    <span className="font-code-tabular text-code-tabular text-secondary font-semibold">
                      Mục 03 / 03
                    </span>
                  </legend>

                  {/* Mật khẩu khởi tạo */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="password">
                      Mật khẩu khởi tạo <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        lock
                      </span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu (từ 8 đến 20 ký tự)"
                        className="w-full h-10 pl-10 pr-10 bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-headline-sm">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="grid grid-cols-4 gap-1.5 w-full">
                        <div
                          className={`h-1 rounded-full transition-colors ${
                            strength.barCount >= 1 ? strength.colorClass : 'bg-surface-container-highest'
                          }`}
                        ></div>
                        <div
                          className={`h-1 rounded-full transition-colors ${
                            strength.barCount >= 2 ? strength.colorClass : 'bg-surface-container-highest'
                          }`}
                        ></div>
                        <div
                          className={`h-1 rounded-full transition-colors ${
                            strength.barCount >= 3 ? strength.colorClass : 'bg-surface-container-highest'
                          }`}
                        ></div>
                        <div
                          className={`h-1 rounded-full transition-colors ${
                            strength.barCount >= 4 ? strength.colorClass : 'bg-surface-container-highest'
                          }`}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Độ mạnh:{' '}
                          <span className={`font-bold ${strength.textColorClass}`}>
                            {strength.label}
                          </span>
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Chuẩn mật khẩu cấp II
                        </span>
                      </div>
                    </div>

                    {/* Tiêu chí mật khẩu công vụ trực quan */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-1.5 p-2.5 bg-surface-container-low/70 rounded-lg border border-outline-variant/30">
                      <div
                        className={`flex items-center gap-1.5 text-[11px] font-label-sm transition-colors ${
                          password.length > 20
                            ? 'text-error font-bold'
                            : condLength
                            ? 'text-on-tertiary-container font-bold'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {password.length > 20 ? 'error' : condLength ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>
                          {password.length > 20
                            ? `8 – 20 ký tự (${password.length}/20 - vượt quá)`
                            : `8 – 20 ký tự (${password.length}/20)`}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-[11px] font-label-sm transition-colors ${
                          condUpper ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {condUpper ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Chữ in hoa (A-Z)</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-[11px] font-label-sm transition-colors ${
                          condLowerAndNumber ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {condLowerAndNumber ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Chữ thường &amp; Số (0-9)</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-[11px] font-label-sm transition-colors ${
                          condSpecial ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {condSpecial ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Ký tự đặc biệt (!@#$...)</span>
                      </div>
                    </div>
                  </div>

                  {/* Nhập lại mật khẩu */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="confirmPassword">
                      Nhập lại mật khẩu <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-headline-sm pointer-events-none">
                        lock_reset
                      </span>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại chính xác mật khẩu trên"
                        className="w-full h-10 pl-10 pr-10 bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-secondary"
                      />
                      <button
                        type="button"
                        aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-headline-sm">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {!isPasswordMatch && (
                      <p className="font-label-sm text-label-sm text-error mt-0.5">
                        Mật khẩu nhập lại không trùng khớp.
                      </p>
                    )}
                  </div>
                </fieldset>

                {/* Civic Commitment Checkbox */}
                <div className="p-space-md bg-surface-container-low rounded-lg shadow-sm border border-outline-variant/30">
                  <label className="flex items-start gap-space-sm cursor-pointer select-none">
                    <input
                      id="commitmentCheckbox"
                      type="checkbox"
                      required
                      checked={commitmentAccepted}
                      onChange={(e) => setCommitmentAccepted(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded-DEFAULT accent-primary cursor-pointer shrink-0"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface leading-snug">
                      Tôi cam kết các thông tin khai báo công vụ trên là hoàn toàn chính xác và chịu trách nhiệm kỷ luật hành chính theo quy định nhà nước.
                    </span>
                  </label>
                </div>

                {/* Submit Action Button & Feedback */}
                <div className="flex flex-col gap-space-sm pt-space-xs">
                  {/* Validation Error Banner */}
                  {errorMessage && (
                    <div className="p-space-sm bg-error-container/40 border border-error/30 text-error rounded-lg flex items-start gap-2 text-body-sm shadow-xs">
                      <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                      <span className="font-medium leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  <button
                    id="submitBtn"
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full h-12 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:opacity-95 active:opacity-90 transition-all flex items-center justify-center gap-space-xs disabled:cursor-not-allowed ${
                      isSubmitted ? 'opacity-70' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-headline-sm">
                          progress_activity
                        </span>
                        <span>ĐANG XỬ LÝ KHAI BÁO...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <span
                          className="material-symbols-outlined text-headline-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          task_alt
                        </span>
                        <span>ĐÃ CHUYỂN HỒ SƠ PHÊ DUYỆT</span>
                      </>
                    ) : (
                      <>
                        <span
                          className="material-symbols-outlined text-headline-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          how_to_reg
                        </span>
                        <span>GỬI YÊU CẦU PHÊ DUYỆT HỒ SƠ</span>
                      </>
                    )}
                  </button>

                  {/* Feedback / Success Message Card */}
                  {isSubmitted && (
                    <div
                      id="submissionSuccessBanner"
                      className="p-space-md bg-surface-container-lowest rounded-lg shadow-md flex items-start gap-space-sm border border-on-tertiary-container/30 transition-all"
                    >
                      <span
                        className="material-symbols-outlined text-on-tertiary-container text-headline-sm shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <div className="flex flex-col gap-0.5 flex-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Gửi yêu cầu thành công!
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Mã hồ sơ: <span className="font-code-tabular text-code-tabular text-secondary font-bold">{dossierId}</span>. Vui lòng chờ Tenant Admin UBND Phường phê duyệt.
                        </p>
                        <button
                          type="button"
                          onClick={() => router.push(ROUTES.LOGIN, 'root', 'replace')}
                          className="mt-2 text-left font-label-md text-secondary font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Quay về trang đăng nhập</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {/* Footer Link */}
              <footer className="mt-space-xl text-center py-space-sm">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Đã có tài khoản cán bộ?
                  <button
                    type="button"
                    onClick={() => router.push(ROUTES.LOGIN, 'back', 'pop')}
                    className="font-label-md text-label-md text-secondary hover:underline ml-1 font-semibold"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </footer>

            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
