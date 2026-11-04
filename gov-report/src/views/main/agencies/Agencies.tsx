import React, { useState, useEffect, useMemo } from "react";
import AgenciesHeader from "./components/AgenciesHeader";
import AgenciesKpiRow from "./components/AgenciesKpiRow";
import AgenciesFilterBar from "./components/AgenciesFilterBar";
import AgenciesTable, {
  AgencyItem,
  INITIAL_AGENCIES,
} from "./components/AgenciesTable";
import AgenciesHierarchyTopology from "./components/AgenciesHierarchyTopology";
import CreateAgencyDrawer from "./components/CreateAgencyDrawer";
import TenantDetailModal from "./components/TenantDetailModal";
import {
  INITIAL_TEAMS_DATA,
  INITIAL_TENANT_CADRES,
  getTeamsForAgency,
  getCadresForAgency,
} from "./mockTeamsData";
import { TeamItem, TeamMember, TenantCadre } from "./types";

const Agencies: React.FC = () => {
  const [agencies, setAgencies] = useState<AgencyItem[]>(INITIAL_AGENCIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "tree">("table");
  const [adminLevel, setAdminLevel] = useState("all");
  const [agencyType, setAgencyType] = useState("all");
  const [status, setStatus] = useState("all");
  const [gisBound, setGisBound] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Teams mapping per Tenant according to the new `teams` schema
  const [teamsMap, setTeamsMap] = useState<Record<string, TeamItem[]>>(INITIAL_TEAMS_DATA);

  // Cadres roster per Tenant (tenant_memberships + users)
  const [cadresMap, setCadresMap] = useState<Record<string, TenantCadre[]>>(INITIAL_TENANT_CADRES);

  // Modal detail for Tenant & its Teams
  const [selectedAgencyForDetail, setSelectedAgencyForDetail] = useState<AgencyItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtered agencies list
  const filteredAgencies = useMemo(() => {
    return agencies.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesParent = (item.parentCode || "").toLowerCase().includes(q);
        if (!matchesCode && !matchesName && !matchesParent) return false;
      }

      // Admin level
      if (adminLevel !== "all") {
        if (adminLevel === "province" && !item.level.includes("Tỉnh")) return false;
        if (adminLevel === "district" && !item.level.includes("Quận")) return false;
        if (adminLevel === "commune" && !item.level.includes("Xã") && !item.level.includes("Phường"))
          return false;
        if (adminLevel === "enterprise" && !item.level.includes("Doanh nghiệp")) return false;
      }

      // Agency Type
      if (agencyType !== "all") {
        if (agencyType === "administrative" && !item.category.includes("Hành chính")) return false;
        if (agencyType === "sector" && item.category.includes("Hành chính")) return false;
      }

      // Status
      if (status !== "all" && item.status !== status) return false;

      // GIS Bound
      if (gisBound === "synced" && !item.gisSynced) return false;
      if (gisBound === "not_synced" && item.gisSynced) return false;

      return true;
    });
  }, [agencies, searchQuery, adminLevel, agencyType, status, gisBound]);

  const handleToggleStatus = (id: string) => {
    setAgencies((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  // Open Tenant & Teams Master-Detail Modal
  const handleViewDetail = (agency: AgencyItem) => {
    // Ensure teams are seeded if not already present
    if (!teamsMap[agency.id]) {
      setTeamsMap((prev) => ({
        ...prev,
        [agency.id]: getTeamsForAgency(agency.id, agency.code, agency.name),
      }));
    }
    // Ensure tenant cadres are seeded if not already present
    if (!cadresMap[agency.id]) {
      setCadresMap((prev) => ({
        ...prev,
        [agency.id]: getCadresForAgency(agency.id, agency.code, agency.name),
      }));
    }
    setSelectedAgencyForDetail(agency);
  };

  // Get active teams of currently inspected agency
  const currentAgencyTeams = useMemo(() => {
    if (!selectedAgencyForDetail) return [];
    if (teamsMap[selectedAgencyForDetail.id]) {
      return teamsMap[selectedAgencyForDetail.id];
    }
    return getTeamsForAgency(
      selectedAgencyForDetail.id,
      selectedAgencyForDetail.code,
      selectedAgencyForDetail.name
    );
  }, [selectedAgencyForDetail, teamsMap]);

  // Get cadres list of currently inspected agency (DB: tenant_memberships + users)
  const currentAgencyCadres = useMemo(() => {
    if (!selectedAgencyForDetail) return [];
    if (cadresMap[selectedAgencyForDetail.id]) {
      return cadresMap[selectedAgencyForDetail.id];
    }
    return getCadresForAgency(
      selectedAgencyForDetail.id,
      selectedAgencyForDetail.code,
      selectedAgencyForDetail.name
    );
  }, [selectedAgencyForDetail, cadresMap]);

  // Handler: Add Team to Tenant
  const handleAddTeam = (
    agencyId: string,
    teamData: Omit<TeamItem, "id" | "tenantId" | "createdAt" | "updatedAt" | "members">
  ) => {
    const newTeam: TeamItem = {
      id: `team-${Date.now()}`,
      tenantId: agencyId,
      name: teamData.name,
      code: teamData.code,
      leaderName: teamData.leaderName,
      phone: teamData.phone,
      description: teamData.description,
      isActive: teamData.isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [],
    };

    setTeamsMap((prev) => {
      const existing = prev[agencyId] || [];
      return {
        ...prev,
        [agencyId]: [newTeam, ...existing],
      };
    });
  };

  // Handler: Toggle Team Active Status
  const handleToggleTeamStatus = (agencyId: string, teamId: string) => {
    setTeamsMap((prev) => {
      const existing = prev[agencyId] || [];
      return {
        ...prev,
        [agencyId]: existing.map((team) =>
          team.id === teamId
            ? {
                ...team,
                isActive: !team.isActive,
                updatedAt: new Date().toISOString(),
              }
            : team
        ),
      };
    });
  };

  // Handler: Add Existing Unassigned Cadre into Selected Team (DB: tenant_memberships.team_id = team.id)
  const handleAddCadreToTeam = (
    agencyId: string,
    teamId: string,
    cadre: TenantCadre
  ) => {
    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      membershipId: cadre.id,
      userId: cadre.userId,
      teamId: teamId,
      name: cadre.name,
      code: cadre.cadreCode,
      role: cadre.roleLabel || "Cán bộ tác chiến",
      jobTitle: cadre.jobTitle,
      phone: cadre.phone,
      email: cadre.email,
      dutyStatus: "Sẵn sàng",
      avatarInitials: cadre.avatarInitials,
      joinedAt: new Date().toISOString().slice(0, 10),
    };

    // 1. Add member into team
    setTeamsMap((prev) => {
      const existing = prev[agencyId] || [];
      return {
        ...prev,
        [agencyId]: existing.map((team) => {
          if (team.id !== teamId) return team;
          return {
            ...team,
            updatedAt: new Date().toISOString(),
            members: [...team.members, newMember],
          };
        }),
      };
    });

    // 2. Update cadre's team_id in tenant's cadre roster so they are no longer unassigned
    setCadresMap((prev) => {
      const existing = prev[agencyId] || [];
      return {
        ...prev,
        [agencyId]: existing.map((c) =>
          c.id === cadre.id ? { ...c, teamId: teamId } : c
        ),
      };
    });
  };

  // Handler: Remove Member from Team (DB: reset tenant_memberships.team_id = NULL)
  const handleRemoveMemberFromTeam = (
    agencyId: string,
    teamId: string,
    memberId: string,
    cadreCode?: string
  ) => {
    // 1. Remove member from team's member list
    setTeamsMap((prev) => {
      const existing = prev[agencyId] || [];
      return {
        ...prev,
        [agencyId]: existing.map((team) => {
          if (team.id !== teamId) return team;
          return {
            ...team,
            updatedAt: new Date().toISOString(),
            members: team.members.filter((m) => m.id !== memberId),
          };
        }),
      };
    });

    // 2. Free up cadre in tenant roster: reset teamId to null so they can be assigned again
    setCadresMap((prev) => {
      const existing = prev[agencyId] || [];
      return {
        ...prev,
        [agencyId]: existing.map((c) => {
          if (c.cadreCode === cadreCode || c.id === memberId) {
            return { ...c, teamId: null };
          }
          return c;
        }),
      };
    });
  };

  const handleAddAgency = (data: {
    code: string;
    name: string;
    parentName: string;
    level: string;
    category: string;
    hotline: string;
    isActive: boolean;
  }) => {
    const newAgencyId = `ag-${Date.now()}`;
    const newAgency: AgencyItem = {
      id: newAgencyId,
      code: data.code,
      name: data.name,
      parentCode: data.parentName.split(" ")[0] || "UBND-HN",
      level: data.level,
      levelBadgeClass:
        data.level === "Tỉnh / Thành phố"
          ? "bg-primary-fixed text-on-primary-fixed"
          : data.level === "Quận / Huyện"
          ? "bg-surface-container-high text-on-surface"
          : "bg-surface-container-highest text-on-surface",
      category: data.category,
      status: data.isActive ? "active" : "inactive",
      staffCount: "1 cán bộ quản trị",
      staffSub: "Mới khởi tạo",
      gisSynced: false,
      hotline: data.hotline || "1900.xxxx",
      address: "Trụ sở chính tại địa phương",
    };

    setAgencies((prev) => [newAgency, ...prev]);
    setTeamsMap((prev) => ({
      ...prev,
      [newAgencyId]: getTeamsForAgency(newAgencyId, data.code, data.name),
    }));

    alert(`Đã khởi tạo thành công cơ quan "${data.name}" (${data.code}) và tự động cấp Đội tác chiến!`);
  };

  const handleExportCsv = () => {
    const headers = [
      "Mã Tenant",
      "Tên cơ quan",
      "Cấp hành chính",
      "Phân loại ngành",
      "Số lượng đội",
      "Trạng thái",
      "Nhân sự",
    ];
    const rows = filteredAgencies.map((item) => {
      const tCount = (teamsMap[item.id] || []).length;
      return [
        item.code,
        `"${item.name}"`,
        `"${item.level}"`,
        `"${item.category}"`,
        tCount,
        item.status,
        `"${item.staffCount}"`,
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `danh_ba_tenant_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full pb-space-lg">
      {/* Page Header with Breadcrumb & Master Actions */}
      <AgenciesHeader
        onOpenCreateDrawer={() => setIsDrawerOpen(true)}
        onExportCsv={handleExportCsv}
      />

      {/* KPI Metric Summary Row */}
      <AgenciesKpiRow />

      {/* Filter Toolbar & View Switcher */}
      <AgenciesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        adminLevel={adminLevel}
        onAdminLevelChange={setAdminLevel}
        agencyType={agencyType}
        onAgencyTypeChange={setAgencyType}
        status={status}
        onStatusChange={setStatus}
        gisBound={gisBound}
        onGisBoundChange={setGisBound}
        displayedCount={filteredAgencies.length}
        totalCount={agencies.length}
      />

      {/* Data Table / Hierarchical Tree */}
      <AgenciesTable
        agencies={filteredAgencies}
        viewMode={viewMode}
        onToggleStatus={handleToggleStatus}
        onViewDetail={handleViewDetail}
        teamsMap={teamsMap}
      />

      {/* Dispatch Hierarchy Topology & GIS Sync Roster */}
      <AgenciesHierarchyTopology />

      {/* Slide-over Drawer for Adding New Agency */}
      <CreateAgencyDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleAddAgency}
      />

      {/* Tenant & Teams Master-Detail Modal */}
      <TenantDetailModal
        isOpen={Boolean(selectedAgencyForDetail)}
        agency={selectedAgencyForDetail}
        onClose={() => setSelectedAgencyForDetail(null)}
        teams={currentAgencyTeams}
        cadres={currentAgencyCadres}
        onAddTeam={handleAddTeam}
        onToggleTeamStatus={handleToggleTeamStatus}
        onAddCadreToTeam={handleAddCadreToTeam}
        onRemoveMemberFromTeam={handleRemoveMemberFromTeam}
      />
    </div>
  );
};

export default Agencies;
