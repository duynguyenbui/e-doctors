import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore,useMedicalRecordStore } from '@/app/(frontend)/profile/store';


export const useCheckUserCompletion = () => {
  const router = useRouter();
  const isProfileComplete = useUserStore((state) => state.isProfileComplete());
  const isMedicalRecordComplete = useMedicalRecordStore((state) => state.isMedicalRecordComplete());

  useEffect(() => {
    console.log(" Kiểm tra ok chuaw");
    console.log("ho so đầy đủ?", isProfileComplete);
    console.log(" Bệnh án đầy đủ?", isMedicalRecordComplete);
    if (!isProfileComplete || !isMedicalRecordComplete) {
      console.warn("ho so benh an chua day du");
      alert('Bạn cần hoàn thành hồ sơ cá nhân và bệnh án trước khi tiếp tục!');
      router.push('/profile');
    }
    console.log(" Hồ sơ & bệnh án đầy đủ, tiếp tục...");
  }, [isProfileComplete, isMedicalRecordComplete, router]);
};
