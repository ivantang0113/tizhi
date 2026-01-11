
import { ConstitutionType, UserInfo, ScoreMap } from "../types";
import { CONSTITUTION_INFO, SEASONAL_DIET_TIPS } from "../constants";

const getCurrentSeason = (): string => {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

export const generateStaticExpertAdvice = (
  userInfo: UserInfo,
  scores: ScoreMap,
  primaryType: ConstitutionType
): string => {
  const info = CONSTITUTION_INFO[primaryType];
  const { gender, age, province, city, climate } = userInfo;
  const season = getCurrentSeason();
  const seasonalTip = SEASONAL_DIET_TIPS[season];

  // 1. Conclusion Optimization (Location/Climate)
  let climateAdvice = "";
  if (climate.includes("温和")) {
    climateAdvice = `鉴于 ${province}${city} 气候相对温和，您的 ${primaryType} 表现可能较为平稳，但需注意四季更替时的气机转换。`;
  } else if (climate.includes("湿")) {
    climateAdvice = `由于您居住在 ${province}${city}，当地气候 ${climate}，湿邪易困脾胃。对于您的 ${primaryType} 而言，务必加强排湿化浊，防止湿邪加重体质偏颇。`;
  } else if (climate.includes("燥")) {
    climateAdvice = `考虑到 ${province}${city} 气候 ${climate}，易耗伤津液。您的 ${primaryType} 更应注重滋阴润养，防止内热化燥。`;
  } else if (climate.includes("寒")) {
    climateAdvice = ` ${province}${city} 气候 ${climate}，寒主收引。您的 ${primaryType} 需要格外注意温补防御，保护脏腑阳气不受风寒侵袭。`;
  } else {
    climateAdvice = `身处 ${province}${city}，受 ${climate} 影响，建议顺应自然节律，根据当地物候特征及时调整作息。`;
  }

  // 2. Crowd Customization (Age/Gender)
  let crowdAdvice = "";
  const genderTerm = gender === 'male' ? '男性' : '女性';
  if (age < 30) {
    crowdAdvice = `您正值青壮年，作为 ${genderTerm}，调理重心应放在“疏泄”与“固表”上。${gender === 'female' ? '尤其要注意月事前后的情绪调控与补气。' : '要注意避免因熬夜和高压导致的气血损耗。'}`;
  } else if (age < 55) {
    crowdAdvice = `步入中年，身体正处于转型期。作为 ${genderTerm}，${primaryType} 的调理应更侧重于脾胃之气的运化${gender === 'female' ? '，同时关注气血盈亏。' : '，并兼顾护肾固精。'}`;
  } else {
    crowdAdvice = `年过半百，阳气渐衰。作为 ${genderTerm}，您的 ${primaryType} 调理需以“补肾”为纲，通过温和的方式维持脏腑活力，切忌大补大泄。`;
  }

  // 3. Synthesis
  return `
【体质分析】
${climateAdvice}

【人群定制】
${crowdAdvice}

【时令指导】
当前正值${season === 'spring' ? '春季' : season === 'summer' ? '夏季' : season === 'autumn' ? '秋季' : '冬季'}。${seasonalTip}

【健康建议方案】
1. 饮食调理：${info.diet}。日常需${info.avoid}。
2. 生活起居：${info.lifestyle}。
3. 经穴养生：建议每日按揉 ${info.acupoints} 每穴3-5分钟，以酸胀感为度。
4. 心态调节：${info.mind}。

顺天之时，随地之利，守人之和。
搜索小红书：本草君，获取更多养生智慧。
`.trim();
};
