
import React, { useState, useEffect } from 'react';
import { UserInfo } from '../types';
import { PROVINCE_CITY_DATA, PROVINCE_CLIMATE } from '../constants';

interface UserInfoFormProps {
  onSubmit: (info: UserInfo) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [province, setProvince] = useState('四川');
  const [city, setCity] = useState('成都市');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [info, setInfo] = useState<Omit<UserInfo, 'province' | 'city' | 'climate'>>({
    gender: 'female',
    age: 28,
  });

  const provinces = Object.keys(PROVINCE_CITY_DATA).sort();
  const cities = PROVINCE_CITY_DATA[province] || [];

  useEffect(() => {
    // Attempt to fetch location via IP
    const fetchLocation = async () => {
      setLoadingLocation(true);
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        // Simple mapping attempt for demo (Actual implementation might need region code to CN name mapping)
        // For simulation, we check common region names if the IP is from China
        if (data.country_name === 'China' || data.country === 'CN') {
          const region = data.region; // Often in English like "Sichuan"
          // Very basic mapping
          const regionMap: Record<string, string> = {
            'Sichuan': '四川', 'Guangdong': '广东', 'Zhejiang': '浙江', 
            'Beijing': '北京', 'Shanghai': '上海', 'Jiangsu': '江苏',
            'Fujian': '福建', 'Hubei': '湖北', 'Hunan': '湖南'
          };
          if (regionMap[region]) {
            const cnProvince = regionMap[region];
            setProvince(cnProvince);
            if (PROVINCE_CITY_DATA[cnProvince]) {
              setCity(PROVINCE_CITY_DATA[cnProvince][0]);
            }
          }
        }
      } catch (e) {
        console.error("Location fetch failed", e);
      } finally {
        setLoadingLocation(false);
      }
    };
    fetchLocation();
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProv = e.target.value;
    setProvince(newProv);
    const newCities = PROVINCE_CITY_DATA[newProv] || [];
    setCity(newCities[0] || '');
  };

  const handleStart = () => {
    const climate = PROVINCE_CLIMATE[province] || '四季分明';
    onSubmit({
      ...info,
      province,
      city,
      climate
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto mt-6 border border-emerald-50">
      <h3 className="text-xl font-bold text-emerald-900 mb-6 text-center">基础信息录入</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
          <div className="grid grid-cols-2 gap-4">
            {['male', 'female'].map(g => (
              <button
                key={g}
                onClick={() => setInfo({ ...info, gender: g as 'male' | 'female' })}
                className={`py-2 rounded-lg border transition-all ${info.gender === g ? 'bg-emerald-700 border-emerald-700 text-white shadow-md' : 'border-gray-200 text-gray-600'}`}
              >
                {g === 'male' ? '男' : '女'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">年龄：{info.age} 岁</label>
          <input
            type="range"
            min="10"
            max="100"
            value={info.age}
            onChange={(e) => setInfo({ ...info, age: parseInt(e.target.value) })}
            className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">居住省份</label>
            <select
              value={province}
              onChange={handleProvinceChange}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
            >
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">城市</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={cities.length === 0}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white disabled:bg-gray-50"
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {loadingLocation && (
          <div className="text-[10px] text-emerald-600 animate-pulse text-center">
            正在通过 IP 自动识别您的位置信息...
          </div>
        )}

        <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 border border-emerald-100">
           检测到位置：<strong>{province} {city}</strong><br/>
           对应气候特征：<strong>{PROVINCE_CLIMATE[province] || '四季分明'}</strong>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-emerald-700 text-white py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-lg active:scale-[0.98]"
        >
          开始体质测定
        </button>
      </div>
    </div>
  );
};

export default UserInfoForm;
