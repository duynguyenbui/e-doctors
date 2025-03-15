'use client'
import { create } from 'zustand';
import { useEffect,useState } from 'react';
import { useMedicalRecordStore, MedicalRecordState  } from "./store"; 



const diseasesOptions = [
  { label: 'Bệnh Tim Mạch', value: 'heart' },
  { label: 'Huyết Áp Cao', value: 'high_blood_pressure' },
  { label: 'Tiểu Đường', value: 'diabetes' },
  { label: 'Hen Suyễn', value: 'asthma' },
];

const allergiesOptions = [
  { label: 'Thực Phẩm', value: 'food' },
  { label: 'Thuốc', value: 'medicine' },
  { label: 'Phấn Hoa', value: 'pollen' },
];

const surgeriesOptions = [
  { label: 'Cắt Ruột Thừa', value: 'appendectomy' },
  { label: 'Phẫu Thuật Tim', value: 'heart_surgery' },
];

interface MedicalRecordFormProps {
  userId: string;
}

export default function MedicalRecordForm({ userId }: MedicalRecordFormProps) {
  const { medicalHistory, examinationDate, setField } = useMedicalRecordStore();
  const [fetched, setFetched] = useState(false);
  // Fetch dữ liệu hồ sơ hiện có nếu user đã có hồ sơ

  useEffect(() => {
    if (!userId || fetched) return; // 🛑 Chỉ fetch nếu `userId` hợp lệ và chưa fetch trước đó

    const fetchMedicalRecord = async () => {
      try {
        const res = await fetch(`/api/medical-records?user=${userId}`);
        const data = await res.json();

        if (data?.docs?.length > 0) {
          const record = data.docs[0];

          setField("recordId", record.id);
          setField("medicalHistory", {
            chronicDiseases: record.medicalHistory?.chronicDiseases?.map((d: { disease: string }) => d.disease) || [],
            allergies: record.medicalHistory?.allergies?.map((a: { allergy: string }) => a.allergy) || [],
            surgeries: record.medicalHistory?.surgeries?.map((s: { surgery: string }) => s.surgery) || [],
            otherConditions: record.medicalHistory?.otherConditions || "",
          });

          setField("examinationDate", record.examinationDate?.split("T")[0] || "");
        }

        setFetched(true); // ✅ Đánh dấu đã fetch để không gọi lại
      } catch (error) {
        console.error("Lỗi khi lấy hồ sơ:", error);
      }
    };

    fetchMedicalRecord();
  }, [userId]); // ✅ useEffect chỉ chạy khi `userId` thay đổi
  

  const handleSubmit = async () => {
    const { recordId } = useMedicalRecordStore.getState();
  
    const data = {
      user: userId,
      medicalHistory: {
        chronicDiseases: medicalHistory.chronicDiseases.map(disease => ({ disease })), 
        allergies: medicalHistory.allergies.map(allergy => ({ allergy })),
        surgeries: medicalHistory.surgeries.map(surgery => ({ surgery })),
        otherConditions: medicalHistory.otherConditions,
      },
      examinationDate,
    };
  
    try {
      let res;
  
      if (recordId) {
        res = await fetch(`/api/medical-records/${recordId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch(`/api/medical-records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Lưu thất bại!');
      }
  
      const responseData = await res.json();
  
      if (!recordId) {
        setField('recordId', responseData.id);
      }
  
      alert('Lưu thành công!');
    } catch (error: any) {
      alert(`Lỗi: ${error.message}`);
    }
  };
  
  

  return (
    <div className="p-4 max-w-lg mx-auto border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Hồ Sơ Bệnh Án</h2>

      <fieldset>
        <legend className="font-semibold">Bệnh Mãn Tính</legend>
        {diseasesOptions.map((d) => (
          <label key={d.value} className="block">
            <input
              type="checkbox"
              checked={medicalHistory.chronicDiseases.includes(d.value)}
              onChange={() =>
                setField('medicalHistory', {
                  ...medicalHistory,
                  chronicDiseases: medicalHistory.chronicDiseases.includes(d.value)
                    ? medicalHistory.chronicDiseases.filter((v) => v !== d.value)
                    : [...medicalHistory.chronicDiseases, d.value],
                })
              }
            />{' '}
            {d.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Dị Ứng</legend>
        {allergiesOptions.map((a) => (
          <label key={a.value} className="block">
            <input
              type="checkbox"
              checked={medicalHistory.allergies.includes(a.value)}
              onChange={() =>
                setField('medicalHistory', {
                  ...medicalHistory,
                  allergies: medicalHistory.allergies.includes(a.value)
                    ? medicalHistory.allergies.filter((v) => v !== a.value)
                    : [...medicalHistory.allergies, a.value],
                })
              }
            />{' '}
            {a.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Tiền Sử Phẫu Thuật</legend>
        {surgeriesOptions.map((s) => (
          <label key={s.value} className="block">
            <input
              type="checkbox"
              checked={medicalHistory.surgeries.includes(s.value)}
              onChange={() =>
                setField('medicalHistory', {
                  ...medicalHistory,
                  surgeries: medicalHistory.surgeries.includes(s.value)
                    ? medicalHistory.surgeries.filter((v) => v !== s.value)
                    : [...medicalHistory.surgeries, s.value],
                })
              }
            />{' '}
            {s.label}
          </label>
        ))}
      </fieldset>

      <label className="block mt-2">
        Ngày khám bệnh:
        <input
          type="date"
          className="border rounded p-1 w-full"
          value={examinationDate}
          onChange={(e) => setField('examinationDate', e.target.value)}
        />
      </label>

      <label className="block mt-2">
        Các bệnh lý khác:
        <input
          type="text"
          className="border rounded p-1 w-full"
          value={medicalHistory.otherConditions}
          onChange={(e) =>
            setField('medicalHistory', {
              ...medicalHistory,
              otherConditions: e.target.value,
            })
          }
        />
      </label>

      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
        Gửi Hồ Sơ Bệnh Án
      </button>
    </div>
  );
}
