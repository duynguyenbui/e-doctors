import { create } from 'zustand';
// interface Avatar 
interface Avatar {
  id: string;
  url: string;
}
//  User
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dob: string;
  avatar?: Avatar;
}
// MedicalHistory
export interface MedicalHistory {
  chronicDiseases: string[];
  allergies: string[];
  surgeries: string[];
  otherConditions?: string;
}
// Profile
export interface Profile {
  id: string;
  user: User;
  phone: string;
  address: string;
  gender: string;
  dob: string;
  medicalHistory?: MedicalHistory;
}
// UserStore quanr lys profile
export interface UserStore {
  profiles: Profile[];
  setProfiles: (profiles: Profile[]) => void;
  updateProfile: (updatedProfile: Partial<Profile>) => void;
  isProfileComplete: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  profiles: [],
  setProfiles: (profiles) => {
    console.log("📥 Nhận dữ liệu mới cho profiles:", profiles);
    set({ profiles });
    setTimeout(() => {
      console.log("✅ Profiles trong Zustand sau khi cập nhật:", get().profiles);
    }, 100);
    
  },
  // update profile
  updateProfile: (updatedProfile) =>
    set((state) => ({
      profiles: state.profiles.map((profile) =>
        profile.id === updatedProfile.id
          ? {
              ...profile,
              ...updatedProfile,
              user: {
                ...profile.user,
                ...(updatedProfile.user || {}),
              },
              medicalHistory: {
                chronicDiseases:
                  updatedProfile.medicalHistory?.chronicDiseases ??
                  profile.medicalHistory?.chronicDiseases ??
                  [],
                allergies:
                  updatedProfile.medicalHistory?.allergies ??
                  profile.medicalHistory?.allergies ??
                  [],
                surgeries:
                  updatedProfile.medicalHistory?.surgeries ??
                  profile.medicalHistory?.surgeries ??
                  [],
                otherConditions:
                  updatedProfile.medicalHistory?.otherConditions ??
                  profile.medicalHistory?.otherConditions ??
                  '',
              },
            }
          : profile
      ),
    })),
// check xem ho so da ok chuaw
  isProfileComplete: () => {
    const profile = get().profiles[0]; 
    // console.log('Profile kiểm tra:', profile);
    return !!(
      profile &&
      profile.phone &&
      profile.address &&
      profile.gender &&
      profile.dob &&
      profile.user &&
      profile.user.name &&
      profile.user.email
    );
  },
}));

// Định nghĩa Zustand store cho bệnh án
export interface MedicalRecordState {
  recordId: string | null;
  medicalHistory: {
    chronicDiseases: string[];
    allergies: string[];
    surgeries: string[];
    otherConditions: string;
  };
  examinationDate: string;
  setField: (field: keyof MedicalRecordState, value: any) => void;
  isMedicalRecordComplete: () => boolean;
}

export const useMedicalRecordStore = create<MedicalRecordState>((set, get) => ({
  recordId: null,
  medicalHistory: {
    chronicDiseases: [],
    allergies: [],
    surgeries: [],
    otherConditions: '',
  },
  examinationDate: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
// check xem ho so da ok chuaw
  isMedicalRecordComplete: () => {
    const record = get();
    return (
      record.medicalHistory.chronicDiseases.length > 0 ||
      record.medicalHistory.allergies.length > 0 ||
      record.medicalHistory.surgeries.length > 0 ||
      record.medicalHistory.otherConditions.trim() !== ''
    );
  },
}));
