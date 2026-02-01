
export enum ConstitutionType {
  PINGHE = '平和质',
  QIXU = '气虚质',
  YANGXU = '阳虚质',
  YINXU = '阴虚质',
  TANSHI = '痰湿质',
  SHIRE = '湿热质',
  XUEYU = '血瘀质',
  QIYU = '气郁质',
  TEBING = '特秉质',
}

export interface Question {
  id: string;
  text: string;
  type: ConstitutionType;
  priority: number;
}

export interface UserInfo {
  gender: 'male' | 'female';
  age: number;
  province: string;
  city: string;
  climate: string;
}

export interface ScoreMap {
  [key: string]: number;
}

export interface AnalysisResult {
  nature: string;
  benefits: string[];
  recommendations: string;
  cautions: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
