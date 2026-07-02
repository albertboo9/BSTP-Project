# 🚀 Private Entrepreneur Dashboard - Architecture Plan

## Current Problem

The current private dashboard is **fundamentally broken**:

- Sidebar links go to **public pages** (site vitrine) instead of private entrepreneur pages
- Missing critical private pages: Profile, Mes Formations, Mes Documents, Messages, etc.
- No proper data integration for entrepreneur-specific views

---

## Solution: Complete Private Dashboard Ecosystem

### New Route Structure

```
PrivateLayout Routes (Protected):
├── /dashboard          → Main overview (already exists)
├── /dashboard/profile  → User profile & settings NEW
├── /dashboard/parcours → My enrolled parcours NEW
├── /dashboard/formations → My courses & progress NEW
├── /dashboard/certification → My certifications NEW
├── /dashboard/documents → My documents & files NEW
├── /dashboard/messages → Notifications & messages NEW
└── /dashboard/mentors → My assigned mentors NEW
```

---

## Sidebar Redesign

### Current (Broken):

```jsx
const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "..." },
  { path: "/parcours", label: "Mes parcours", icon: "..." }, // ❌ Goes to public
  { path: "/formations", label: "Formations", icon: "..." }, // ❌ Goes to public
  { path: "/certification", label: "Certification", icon: "..." }, // ✅ OK
];
```

### Fixed:

```jsx
const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { path: "/dashboard/parcours", label: "Mes parcours", icon: RouteIcon },
  { path: "/dashboard/formations", label: "Mes formations", icon: BookIcon },
  { path: "/dashboard/certification", label: "Mes certifs", icon: AwardIcon },
  { path: "/dashboard/documents", label: "Documents", icon: FileIcon },
  { path: "/dashboard/profile", label: "Mon profil", icon: UserIcon },
];
```

---

## New Pages Required

### 1. `/dashboard/profile` - User Profile

**Features:**

- Personal information (name, email, phone, city)
- Entrepreneur type (investor, entrepreneur, partner)
- Business info (company name, sector, experience)
- Profile photo upload
- Password change
- Account settings

**Components:**

- ProfileHeader - Avatar + basic info
- PersonalInfoForm - Edit personal data
- BusinessInfoForm - Business details
- SettingsPanel - Password, notifications

---

### 2. `/dashboard/parcours` - My Enrolled Parcours

**Features:**

- Show ONLY user's enrolled parcours
- Progress tracking per parcours
- Module completion status
- Admission conditions display (locked parcours)
- Direct access to current module
- Certificates earned

**Components:**

- ParcoursCard - Individual parcours with progress
- ProgressBar - Visual progress indicator
- ModuleList - List of modules in parcours
- ConditionBadge - Shows unlock requirements
- CertificatePreview - Preview earned certs

---

### 3. `/dashboard/formations` - My Formations

**Features:**

- All formations from campus integration
- Progress tracking (started, in-progress, completed)
- Certificates for completed formations
- Direct link to campus platform
- Filters by status

**Components:**

- FormationCard - Formation with progress
- CampusIntegration - Link to external campus
- CertificateCard - Display earned certificates
- ProgressRing - Circular progress indicator

---

### 4. `/dashboard/documents` - My Documents

**Features:**

- Generated documents (contracts, certificates)
- Uploaded files
- Templates available for download
- Organization by category
- Download/print functionality

**Components:**

- DocumentCard - Individual document
- CategoryFilter - Filter by type
- UploadZone - Drag & drop upload
- TemplateGallery - Available templates

---

### 5. `/dashboard/messages` - Notifications & Messages

**Features:**

- System notifications
- Mentor messages
- Admin announcements
- Appointment reminders
- Mark as read functionality

**Components:**

- NotificationList - All notifications
- MessageThread - Conversation view
- AppointmentCard - Meeting details
- MarkReadBtn - Quick action

---

### 6. `/dashboard/mentors` - My Mentors

**Features:**

- Assigned mentor profile
- Appointment scheduling
- Chat/messaging
- Session history

**Components:**

- MentorCard - Mentor info
- AppointmentScheduler - Book meetings
- SessionHistory - Past sessions

---

## Data Model

### UserProfile

```typescript
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  entrepreneurType: "investor" | "entrepreneur" | "partner";
  companyName?: string;
  sector?: string;
  experience?: string;
  profilePhoto?: string;
}
```

### EnrolledParcours

```typescript
interface EnrolledParcours {
  id: string;
  parcoursId: string;
  title: string;
  status: "enrolled" | "in_progress" | "completed";
  progress: number; // 0-100
  modulesCompleted: number;
  totalModules: number;
  enrolledDate: string;
  completedDate?: string;
  certificateId?: string;
}
```

### UserFormation

```typescript
interface UserFormation {
  id: string;
  formationId: string;
  title: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
  campusUrl: string;
  certificateUrl?: string;
  startedDate?: string;
  completedDate?: string;
}
```

### UserDocument

```typescript
interface UserDocument {
  id: string;
  name: string;
  type: "generated" | "uploaded" | "template";
  category: "contract" | "certificate" | "invoice" | "other";
  url: string;
  uploadedDate: string;
  size?: string;
}
```

---

## Implementation Priority

| Priority | Page                 | Effort  | Impact   |
| -------- | -------------------- | ------- | -------- |
| P0       | Sidebar Fix (routes) | 30 min  | Critical |
| P0       | Dashboard Profile    | 2 hours | High     |
| P0       | Dashboard Parcours   | 3 hours | High     |
| P1       | Dashboard Formations | 2 hours | High     |
| P1       | Dashboard Documents  | 2 hours | Medium   |
| P2       | Dashboard Messages   | 2 hours | Medium   |
| P2       | Dashboard Mentors    | 2 hours | Low      |

---

## Files to Create

1. `src/pages/Dashboard/Profile.jsx` - User profile
2. `src/pages/Dashboard/MyParcours.jsx` - User's parcours
3. `src/pages/Dashboard/MyFormations.jsx` - User's formations
4. `src/pages/Dashboard/MyDocuments.jsx` - User's documents
5. `src/pages/Dashboard/Messages.jsx` - Notifications
6. `src/pages/Dashboard/Mentors.jsx` - Assigned mentors

---

## Files to Modify

1. `src/components/layout/PrivateLayout.jsx` - Update sidebar routes
2. `src/App.jsx` - Add new protected routes
3. `src/context/AuthContext.jsx` - Add user data helpers
4. `src/pages/Dashboard/Dashboard.jsx` - Update links

---

## Quick Wins (This Session)

### 1. Fix Sidebar Routes (30 min)

```jsx
// In PrivateLayout.jsx
const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { path: "/dashboard/parcours", label: "Mes parcours", icon: RouteIcon },
  { path: "/dashboard/formations", label: "Mes formations", icon: BookIcon },
  { path: "/dashboard/certification", label: "Mes certifs", icon: AwardIcon },
  { path: "/dashboard/documents", label: "Documents", icon: FileIcon },
  { path: "/dashboard/profile", label: "Mon profil", icon: UserIcon },
];
```

### 2. Create Dashboard Parcours Page (2 hours)

- Copy structure from existing parcours
- Filter to show only enrolled parcours
- Add progress tracking
- Show locked status with conditions

### 3. Create Profile Page (2 hours)

- Personal info form
- Business info form
- Profile photo upload
- Settings panel

---

## Next Steps

1. ✅ Approve this architecture plan
2. ✅ Fix sidebar routes immediately
3. ⏳ Create Dashboard Parcours page
4. ⏳ Create Profile page
5. ⏳ Create other pages as needed

---

**Plan created:** 2026-02-10
**Status:** Ready for implementation
