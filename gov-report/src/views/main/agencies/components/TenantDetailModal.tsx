import React, { useState, useEffect, useMemo } from "react";
import { AgencyItem, TeamItem, TeamMember, TenantCadre } from "../types";

interface TenantDetailModalProps {
  agency: AgencyItem | null;
  isOpen: boolean;
  onClose: () => void;
  teams: TeamItem[];
  cadres: TenantCadre[];
  onAddTeam: (
    agencyId: string,
    teamData: Omit<TeamItem, "id" | "tenantId" | "createdAt" | "updatedAt" | "members">
  ) => void;
  onToggleTeamStatus: (agencyId: string, teamId: string) => void;
  onAddCadreToTeam: (agencyId: string, teamId: string, cadre: TenantCadre) => void;
  onRemoveMemberFromTeam: (agencyId: string, teamId: string, memberId: string, cadreCode?: string) => void;
}

const TenantDetailModal: React.FC<TenantDetailModalProps> = ({
  agency,
  isOpen,
  onClose,
  teams,
  cadres,
  onAddTeam,
  onToggleTeamStatus,
  onAddCadreToTeam,
  onRemoveMemberFromTeam,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Sub-modal states
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  // Add Team Form State
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamCode, setNewTeamCode] = useState("");
  const [newTeamLeader, setNewTeamLeader] = useState("");
  const [newTeamPhone, setNewTeamPhone] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [newTeamIsActive, setNewTeamIsActive] = useState(true);

  // Search Cadre State (Selecting unassigned cadre from tenant)
  const [cadreSearchQuery, setCadreSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keep selected team in sync when teams list changes
  useEffect(() => {
    if (teams.length > 0) {
      if (!selectedTeamId || !teams.some((t) => t.id === selectedTeamId)) {
        setSelectedTeamId(teams[0].id);
      }
    } else {
      setSelectedTeamId(null);
    }
  }, [teams, selectedTeamId]);

  // Cadres belonging to this agency who have NOT joined any team yet (team_id IS NULL)
  const availableUnassignedCadres = useMemo(() => {
    const assignedCadreCodes = new Set<string>();
    teams.forEach((team) => {
      team.members.forEach((m) => {
        if (m.code) assignedCadreCodes.add(m.code);
        if (m.membershipId) assignedCadreCodes.add(m.membershipId);
      });
    });

    return cadres.filter((cadre) => {
      const hasTeam = Boolean(cadre.teamId);
      const isAssigned = assignedCadreCodes.has(cadre.cadreCode) || assignedCadreCodes.has(cadre.id);
      return !hasTeam && !isAssigned;
    });
  }, [cadres, teams]);

  // Filter available cadres based on search query
  const filteredAvailableCadres = useMemo(() => {
    if (!cadreSearchQuery.trim()) return availableUnassignedCadres;
    const q = cadreSearchQuery.toLowerCase().trim();
    return availableUnassignedCadres.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.cadreCode.toLowerCase().includes(q) ||
        c.jobTitle.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    });
  }, [availableUnassignedCadres, cadreSearchQuery]);

  // Pagination for available unassigned cadres list
  const [cadrePage, setCadrePage] = useState(1);
  const CADRE_PAGE_SIZE = 4;

  // Reset to page 1 whenever search query changes
  useEffect(() => {
    setCadrePage(1);
  }, [cadreSearchQuery]);

  const totalCadrePages = Math.max(1, Math.ceil(filteredAvailableCadres.length / CADRE_PAGE_SIZE));

  // Auto-clamp page if data shrinks
  useEffect(() => {
    if (cadrePage > totalCadrePages) {
      setCadrePage(totalCadrePages);
    }
  }, [totalCadrePages, cadrePage]);

  // Paginated cadres to display
  const paginatedAvailableCadres = useMemo(() => {
    const start = (cadrePage - 1) * CADRE_PAGE_SIZE;
    return filteredAvailableCadres.slice(start, start + CADRE_PAGE_SIZE);
  }, [filteredAvailableCadres, cadrePage]);

  const handleSelectCadre = (cadre: TenantCadre) => {
    if (!currentTeam || !agency) return;
    onAddCadreToTeam(agency.id, currentTeam.id, cadre);
    setToastMessage(`Đã thêm cán bộ ${cadre.name} (${cadre.cadreCode}) vào ${currentTeam.name}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  if (!isOpen || !agency) return null;

  const currentTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];

  // Submit Add Team
  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim() || !newTeamCode.trim()) return;

    onAddTeam(agency.id, {
      name: newTeamName.trim(),
      code: newTeamCode.trim().toUpperCase(),
      leaderName: newTeamLeader.trim() || "Chưa phân công",
      phone: newTeamPhone.trim() || "1900.xxxx",
      description: newTeamDesc.trim() || "Tiếp nhận và xử lý sự cố hạ tầng đô thị.",
      isActive: newTeamIsActive,
    });

    // Reset & close
    setNewTeamName("");
    setNewTeamCode("");
    setNewTeamLeader("");
    setNewTeamPhone("");
    setNewTeamDesc("");
    setNewTeamIsActive(true);
    setIsAddTeamModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 backdrop-blur-xs p-3 sm:p-5 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] rounded bg-surface-container-lowest shadow-2xl flex flex-col border border-outline-variant/30 my-auto max-h-[92vh] overflow-hidden animate-scaleUp">
        {/* ========================================================
            1. TENANT HEADER STRIP
        ======================================================== */}
        <div className="p-space-md sm:px-space-lg sm:py-space-md bg-primary-container text-surface flex items-center justify-between border-b border-outline-variant/30 shrink-0">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed shrink-0 border border-outline/20">
              <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-code-tabular text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-primary-container">
                  {agency.code}
                </span>
                <span className="font-headline-sm text-base sm:text-headline-sm font-bold text-surface truncate">
                  {agency.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-label-sm text-[11px] font-bold ${agency.levelBadgeClass}`}
                >
                  {agency.level}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-primary-container mt-0.5 font-medium flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">category</span>
                  {agency.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  Hotline: <strong>{agency.hotline || "024.3825.2222"}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
                  {agency.status === "active" ? "Đang hoạt động" : "Tạm dừng"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface/10 text-on-primary-container hover:text-surface transition-colors cursor-pointer shrink-0 ml-2"
            type="button"
            title="Đóng cửa sổ"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* ========================================================
            2. BODY: 2-COLUMN MASTER-DETAIL LAYOUT
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
          {/* ------------------------------------------------------
              LEFT COLUMN (30-33%): TEAMS ROSTER
          ------------------------------------------------------ */}
          <div className="md:col-span-5 lg:col-span-4 xl:col-span-4 2xl:col-span-3 flex flex-col bg-surface-container-low/40 overflow-hidden">
            {/* Header + Add Team CTA */}
            <div className="p-space-md flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-low shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  groups
                </span>
                <span className="font-label-lg text-sm sm:text-label-lg font-bold text-on-surface">
                  Đội / Tổ Tác Chiến
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container font-code-tabular text-xs font-semibold text-secondary">
                  {teams.length}
                </span>
              </div>

              <button
                onClick={() => setIsAddTeamModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary text-surface-container-lowest font-label-sm text-xs font-semibold hover:bg-secondary/90 transition-colors cursor-pointer shadow-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Thêm Đội</span>
              </button>
            </div>

            {/* List of Teams */}
            <div className="flex-1 overflow-y-auto p-space-sm space-y-space-xs">
              {teams.length === 0 ? (
                <div className="p-space-lg text-center text-on-surface-variant flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-outline mb-1">
                    groups_2
                  </span>
                  <p className="font-medium text-sm">Cơ quan chưa có đội công tác nào</p>
                  <button
                    onClick={() => setIsAddTeamModalOpen(true)}
                    className="mt-3 px-3 py-1.5 bg-secondary text-surface-container-lowest text-xs font-semibold rounded cursor-pointer"
                    type="button"
                  >
                    + Khởi tạo đội đầu tiên
                  </button>
                </div>
              ) : (
                teams.map((team) => {
                  const isSelected = team.id === selectedTeamId;
                  return (
                    <div
                      key={team.id}
                      onClick={() => setSelectedTeamId(team.id)}
                      className={`p-space-sm rounded transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-secondary-fixed/20 border-secondary shadow-xs ring-1 ring-secondary/40"
                          : "bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant/70 hover:bg-surface-container"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-code-tabular text-[11px] font-bold text-secondary uppercase bg-surface-container px-1.5 py-0.5 rounded">
                          {team.code}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              team.isActive ? "bg-tertiary-fixed-dim" : "bg-outline"
                            }`}
                            title={team.isActive ? "Đang trực chiến" : "Tạm nghỉ"}
                          />
                          <span className="font-code-tabular text-[11px] text-on-surface-variant font-medium">
                            {team.members.length} cán bộ
                          </span>
                        </div>
                      </div>

                      <h4 className="font-label-md text-sm font-semibold text-on-surface mt-1 line-clamp-1">
                        {team.name}
                      </h4>

                      <div className="mt-1 flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
                        <span className="flex items-center gap-0.5 truncate max-w-[130px]">
                          <span className="material-symbols-outlined text-[13px] text-outline">
                            person
                          </span>
                          {team.leaderName || "Chưa gán"}
                        </span>
                        <span className="font-code-tabular text-secondary flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">call</span>
                          {team.phone}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ------------------------------------------------------
              RIGHT COLUMN (67-70%): SELECTED TEAM MEMBERS & DETAILS
          ------------------------------------------------------ */}
          <div className="md:col-span-7 lg:col-span-8 xl:col-span-8 2xl:col-span-9 flex flex-col bg-surface-container-lowest overflow-hidden">
            {currentTeam ? (
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Team Details Summary Banner */}
                <div className="p-space-md bg-surface-container-low border-b border-outline-variant/30 flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-code-tabular text-xs font-bold px-2 py-0.5 rounded bg-primary text-on-primary">
                        {currentTeam.code}
                      </span>
                      <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                        {currentTeam.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 cursor-pointer select-none font-label-sm text-xs font-medium text-on-surface">
                        <input
                          type="checkbox"
                          checked={currentTeam.isActive}
                          onChange={() => onToggleTeamStatus(agency.id, currentTeam.id)}
                          className="w-4 h-4 accent-secondary cursor-pointer"
                        />
                        <span>{currentTeam.isActive ? "Trực chiến" : "Tạm dừng"}</span>
                      </label>
                    </div>
                  </div>

                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {currentTeam.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs mt-1 pt-space-xs border-t border-outline-variant/20 font-body-sm text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-on-surface-variant font-medium">Đội trưởng phụ trách:</span>
                      <strong className="text-on-surface font-semibold">
                        {currentTeam.leaderName || "Chưa có"}
                      </strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-on-surface-variant font-medium">Đường dây nóng tác chiến:</span>
                      <strong className="font-code-tabular text-secondary font-bold">
                        {currentTeam.phone}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Team Members List Header & Action Button */}
                <div className="p-space-md flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/30 bg-surface-container-lowest">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      badge
                    </span>
                    <span className="font-label-lg text-sm sm:text-label-lg font-bold text-on-surface">
                      Danh Sách Cán Bộ Trực Chiến
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container font-code-tabular text-xs font-semibold text-secondary">
                      {currentTeam.members.length} nhân sự
                    </span>
                  </div>

                  {/* PROMINENT ADD MEMBER BUTTON REQUESTED BY USER */}
                  <button
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-secondary text-surface-container-lowest font-label-md text-xs sm:text-sm font-semibold hover:bg-secondary/90 transition-all cursor-pointer shadow-sm hover:shadow"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    <span>Thêm Thành Viên</span>
                  </button>
                </div>

                {/* Members Table */}
                <div className="flex-1 overflow-x-auto p-space-md">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-[11px] uppercase tracking-wider font-semibold border-b border-outline-variant/30">
                        <th className="py-2.5 px-3">Cán Bộ &amp; Mã Số</th>
                        <th className="py-2.5 px-3">Vai Trò Nhiệm Vụ</th>
                        <th className="py-2.5 px-3">Liên Hệ</th>
                        <th className="py-2.5 px-3">Trạng Thái</th>
                        <th className="py-2.5 px-3 text-right">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 font-body-sm text-xs text-on-surface">
                      {currentTeam.members.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-3xl text-outline mb-1">
                              person_off
                            </span>
                            <p className="font-medium text-xs">Đội này chưa có thành viên nào.</p>
                            <button
                              onClick={() => setIsAddMemberModalOpen(true)}
                              className="mt-2 text-secondary font-semibold hover:underline cursor-pointer"
                              type="button"
                            >
                              + Bấm vào đây để thêm thành viên
                            </button>
                          </td>
                        </tr>
                      ) : (
                        currentTeam.members.map((member) => (
                          <tr
                            key={member.id}
                            className="hover:bg-surface-container-low transition-colors"
                          >
                            {/* Member Name & Code */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-label-sm text-[11px] font-bold shrink-0">
                                  {member.avatarInitials}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-on-surface">
                                    {member.name}
                                  </span>
                                  <span className="font-code-tabular text-[10px] text-on-surface-variant">
                                    {member.code}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Role Badge */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded font-label-sm text-[11px] font-semibold ${
                                  member.role.includes("Đội trưởng")
                                    ? "bg-primary-fixed text-on-primary-fixed font-bold"
                                    : member.role.includes("Đội phó")
                                    ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                                    : "bg-surface-container text-on-surface"
                                }`}
                              >
                                {member.role}
                              </span>
                            </td>

                            {/* Phone & Email */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex flex-col font-code-tabular text-[11px]">
                                <span className="text-secondary font-medium">{member.phone}</span>
                                <span className="text-on-surface-variant text-[10px]">
                                  {member.email}
                                </span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              {member.dutyStatus === "off_duty" ? (
                                <span className="inline-flex items-center gap-1 text-outline font-medium text-[11px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                                  Tạm nghỉ
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-tertiary-fixed-variant font-semibold text-[11px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim" />
                                  Hoạt động
                                </span>
                              )}
                            </td>

                            {/* Action: Remove */}
                            <td className="py-2.5 px-3 text-right whitespace-nowrap">
                              <button
                                onClick={() =>
                                  onRemoveMemberFromTeam(agency.id, currentTeam.id, member.id, member.code)
                                }
                                className="p-1 rounded hover:bg-error-container text-outline hover:text-error transition-colors cursor-pointer"
                                type="button"
                                title="Xóa khỏi đội (cán bộ sẽ trở về danh sách khả dụng chưa phân đội)"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  delete_outline
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-space-xl flex flex-col items-center justify-center text-center text-on-surface-variant h-full">
                <span className="material-symbols-outlined text-5xl text-outline mb-2">
                  groups
                </span>
                <p className="font-semibold text-base text-on-surface">
                  Chưa chọn Đội / Tổ công tác
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Vui lòng chọn một đội ở danh sách bên trái hoặc bấm &quot;Thêm Đội&quot; để quản lý nhân sự.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-code-tabular">
            <span>Cơ cấu tổ chức tác chiến chuẩn Cấp độ 3</span>
            <span>•</span>
            <span>Đồng bộ thời gian thực với Phân hệ Giám sát</span>
          </div>

          <button
            onClick={onClose}
            className="px-space-md py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold cursor-pointer border border-outline-variant/30"
            type="button"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* ========================================================
          3. SUB-MODAL: CHỌN CÁN BỘ CÓ SẴN TRONG TENANT (CHƯA VÀO ĐỘI)
      ======================================================== */}
      {isAddMemberModalOpen && currentTeam && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-primary/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-2xl rounded bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md border border-outline-variant/40 animate-scaleUp max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-secondary-fixed/40 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">person_search</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-headline-sm text-base font-bold text-on-surface">
                    Thêm Cán Bộ Vào {currentTeam.name}
                  </h4>
                  <span className="font-code-tabular text-[11px] text-on-surface-variant font-medium">
                    Chọn nhân sự thuộc <strong>{agency.name}</strong> chưa tham gia đội nào
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsAddMemberModalOpen(false);
                  setCadreSearchQuery("");
                  setCadrePage(1);
                }}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer p-1 rounded hover:bg-surface-container transition-colors"
                type="button"
                title="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Notification / Toast feedback if a cadre was just added */}
            {toastMessage && (
              <div className="px-3 py-2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-body-sm text-xs font-semibold flex items-center gap-2 animate-fadeIn shrink-0">
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Ô SEARCH THEO YÊU CẦU CỦA USER */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên cán bộ, mã số thẻ (CB-..., CV-...), chức danh, SĐT..."
                  value={cadreSearchQuery}
                  onChange={(e) => setCadreSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-8 bg-surface-container-low text-on-surface rounded font-body-sm text-xs focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary border border-outline-variant/40 placeholder:text-outline transition-all"
                  autoFocus
                />
                {cadreSearchQuery && (
                  <button
                    onClick={() => setCadreSearchQuery("")}
                    className="absolute right-2.5 text-outline hover:text-on-surface p-0.5 rounded cursor-pointer"
                    type="button"
                    title="Xóa tìm kiếm"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-code-tabular px-1">
                <span>
                  Khả dụng: <strong>{availableUnassignedCadres.length}</strong> cán bộ chưa phân đội
                </span>
                {cadreSearchQuery && (
                  <span>
                    Khớp tìm kiếm: <strong>{filteredAvailableCadres.length}</strong> kết quả
                  </span>
                )}
              </div>
            </div>

            {/* KHOẢNG TRỐNG HIỂN THỊ KẾT QUẢ THEO YÊU CẦU CỦA USER */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px] max-h-[380px]">
              {availableUnassignedCadres.length === 0 ? (
                /* Empty state when no cadres are unassigned in tenant */
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center text-on-surface-variant bg-surface-container-low/30 rounded border border-dashed border-outline-variant/40">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed/40 flex items-center justify-center text-tertiary mb-2">
                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                  </div>
                  <p className="font-semibold text-sm text-on-surface">
                    Tất cả cán bộ cơ quan đã được phân công vào các đội
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-md leading-relaxed">
                    Hiện không còn nhân sự nào thuộc <strong>{agency.name}</strong> ở trạng thái chưa có đội.
                    Nếu cần bổ sung thêm nhân sự vào đơn vị, hãy tiếp nhận hoặc điều động thêm cán bộ từ phân hệ <em>Tài khoản &amp; Phân công</em>.
                  </p>
                </div>
              ) : filteredAvailableCadres.length === 0 ? (
                /* Empty state when query matches nothing */
                <div className="py-10 px-4 text-center flex flex-col items-center justify-center text-on-surface-variant bg-surface-container-low/30 rounded border border-dashed border-outline-variant/40">
                  <span className="material-symbols-outlined text-3xl text-outline mb-1.5">
                    person_search
                  </span>
                  <p className="font-semibold text-sm text-on-surface">
                    Không tìm thấy cán bộ phù hợp
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Không có cán bộ chưa tham gia đội nào khớp với từ khóa &ldquo;{cadreSearchQuery}&rdquo;.
                  </p>
                </div>
              ) : (
                /* List of matching available cadres with pagination */
                paginatedAvailableCadres.map((cadre, index) => {
                  const globalIndex = (cadrePage - 1) * CADRE_PAGE_SIZE + index + 1;
                  return (
                    <div
                      key={cadre.id}
                      className="p-3 rounded bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 hover:border-secondary/50 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Số thứ tự đếm bắt đầu từ 1 xuyên suốt các trang */}
                        <span className="w-6 h-6 rounded bg-surface-container-high/70 flex items-center justify-center font-code-tabular text-xs font-bold text-on-surface-variant group-hover:text-secondary group-hover:bg-secondary-fixed/50 shrink-0 select-none border border-outline-variant/30 transition-colors">
                          {globalIndex}
                        </span>

                        <div className="w-10 h-10 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-xs shrink-0 border border-outline/20">
                          {cadre.avatarInitials}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-on-surface">
                              {cadre.name}
                            </span>
                            <span className="font-code-tabular text-[11px] font-bold px-1.5 py-0.2 rounded bg-surface-container text-secondary border border-secondary/20">
                              {cadre.cadreCode}
                            </span>
                            <span className="font-label-sm text-[10px] px-1.5 py-0.2 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant font-medium">
                              {cadre.roleLabel}
                            </span>
                          </div>

                          <span className="text-xs text-on-surface-variant font-medium mt-0.5 truncate">
                            {cadre.jobTitle}
                          </span>

                          <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-code-tabular mt-0.5 flex-wrap">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px] text-secondary">
                                call
                              </span>
                              {cadre.phone}
                            </span>
                            <span>•</span>
                            <span className="truncate">{cadre.email}</span>
                            {cadre.appointmentDecisionNumber && (
                              <>
                                <span>•</span>
                                <span className="text-outline truncate">
                                  {cadre.appointmentDecisionNumber}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectCadre(cadre)}
                        className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded bg-secondary text-surface-container-lowest font-label-sm text-xs font-semibold hover:bg-secondary/90 transition-colors cursor-pointer shadow-2xs hover:shadow-xs"
                        title={`Thêm ${cadre.name} vào ${currentTeam.name}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Thêm vào đội</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination Controls Bar */}
            {filteredAvailableCadres.length > 0 && totalCadrePages > 1 && (
              <div className="flex items-center justify-between px-3 py-2 rounded bg-surface-container-low border border-outline-variant/30 font-code-tabular text-xs text-on-surface-variant shrink-0">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span>
                    Trang <strong>{cadrePage}</strong> / <strong>{totalCadrePages}</strong>
                  </span>
                  <span className="text-outline hidden sm:inline">•</span>
                  <span className="hidden sm:inline">
                    Cán bộ <strong>{(cadrePage - 1) * CADRE_PAGE_SIZE + 1}</strong>-<strong>{Math.min(cadrePage * CADRE_PAGE_SIZE, filteredAvailableCadres.length)}</strong> trên <strong>{filteredAvailableCadres.length}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCadrePage((p) => Math.max(1, p - 1))}
                    disabled={cadrePage === 1}
                    className={`h-7 px-2 rounded font-medium flex items-center gap-1 text-[11px] transition-colors ${
                      cadrePage === 1
                        ? "text-outline/40 cursor-not-allowed"
                        : "text-on-surface hover:bg-surface-container-high cursor-pointer"
                    }`}
                    title="Trang trước"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span className="hidden sm:inline">Trước</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalCadrePages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCadrePage(pageNum)}
                        className={`w-7 h-7 rounded text-xs font-code-tabular font-bold flex items-center justify-center transition-all cursor-pointer ${
                          cadrePage === pageNum
                            ? "bg-secondary text-surface-container-lowest shadow-2xs"
                            : "text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCadrePage((p) => Math.min(totalCadrePages, p + 1))}
                    disabled={cadrePage === totalCadrePages}
                    className={`h-7 px-2 rounded font-medium flex items-center gap-1 text-[11px] transition-colors ${
                      cadrePage === totalCadrePages
                        ? "text-outline/40 cursor-not-allowed"
                        : "text-on-surface hover:bg-surface-container-high cursor-pointer"
                    }`}
                    title="Trang sau"
                  >
                    <span className="hidden sm:inline">Sau</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sub-modal Footer */}
            <div className="flex items-center justify-between pt-space-xs border-t border-surface-container text-xs text-on-surface-variant shrink-0">
              <span className="font-code-tabular text-[11px] text-outline hidden sm:inline">
                Đồng bộ quan hệ: tenant_memberships.team_id &rarr; teams.id
              </span>
              <button
                onClick={() => {
                  setIsAddMemberModalOpen(false);
                  setCadreSearchQuery("");
                  setCadrePage(1);
                }}
                className="px-4 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold cursor-pointer ml-auto border border-outline-variant/30 transition-colors"
                type="button"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. SUB-MODAL: FORM THÊM ĐỘI MỚI (MATCHING TEAMS SCHEMA)
      ======================================================== */}
      {isAddTeamModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-primary/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md border border-outline-variant/40 animate-scaleUp">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-secondary text-surface-container-lowest flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">group_add</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                    Khởi Tạo Đội Tác Chiến Mới
                  </h4>
                  <span className="font-code-tabular text-[11px] text-on-surface-variant font-medium">
                    Trực thuộc: {agency.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAddTeamModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer p-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} className="flex flex-col gap-space-sm">
              {/* Tên đội */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant">
                  Tên đội / tổ công tác <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Đội Phản ứng nhanh số 2"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full h-9 px-3 bg-surface-container-low text-on-surface rounded font-body-sm text-xs focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                />
              </div>

              {/* Mã đội & Hotline */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant">
                    Mã code nội bộ <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: PUN-02"
                    value={newTeamCode}
                    onChange={(e) => setNewTeamCode(e.target.value)}
                    className="w-full h-9 px-3 bg-surface-container-low text-on-surface rounded font-code-tabular text-xs focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 uppercase"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant">
                    Hotline tác chiến
                  </label>
                  <input
                    type="text"
                    placeholder="024.xxxx.xxxx"
                    value={newTeamPhone}
                    onChange={(e) => setNewTeamPhone(e.target.value)}
                    className="w-full h-9 px-3 bg-surface-container-low text-on-surface rounded font-code-tabular text-xs focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                  />
                </div>
              </div>

              {/* Đội trưởng phụ trách */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant">
                  Họ tên Đội trưởng / Chỉ huy trực ban
                </label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn Nam"
                  value={newTeamLeader}
                  onChange={(e) => setNewTeamLeader(e.target.value)}
                  className="w-full h-9 px-3 bg-surface-container-low text-on-surface rounded font-body-sm text-xs focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                />
              </div>

              {/* Mô tả chức năng nhiệm vụ */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant">
                  Mô tả phạm vi chức năng, nhiệm vụ
                </label>
                <textarea
                  rows={2}
                  placeholder="Nêu rõ lĩnh vực chuyên trách tiếp nhận và xử lý sự cố..."
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                  className="w-full p-2.5 bg-surface-container-low text-on-surface rounded font-body-sm text-xs focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                />
              </div>

              {/* Trạng thái hoạt động */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="team-is-active"
                  checked={newTeamIsActive}
                  onChange={(e) => setNewTeamIsActive(e.target.checked)}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
                <label
                  htmlFor="team-is-active"
                  className="font-label-sm text-xs text-on-surface cursor-pointer select-none font-medium"
                >
                  Kích hoạt sẵn sàng nhận điều phối ngay khi tạo
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-space-xs mt-1 border-t border-surface-container">
                <button
                  onClick={() => setIsAddTeamModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-surface-container text-on-surface font-label-md text-xs cursor-pointer"
                  type="button"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-secondary text-surface-container-lowest font-label-md text-xs font-bold hover:bg-secondary/90 transition-colors cursor-pointer shadow-sm"
                >
                  Tạo Đội Tác Chiến
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDetailModal;
