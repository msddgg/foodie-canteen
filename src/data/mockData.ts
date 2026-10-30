import type { ICanteen, IWindow, IDish, IReview } from './types';

export const MOCK_CANTEENS: ICanteen[] = [
  { id: 'c1', name: '一食堂 · 南门', location: '南门教学楼对面', openHours: '06:30 - 21:30' },
  { id: 'c2', name: '二食堂 · 东门', location: '东门宿舍区旁', openHours: '07:00 - 22:00' },
  { id: 'c3', name: '三食堂 · 北区', location: '北区宿舍 3 栋楼下', openHours: '06:30 - 20:30' },
  { id: 'c4', name: '风味美食街', location: '下沉广场 B1', openHours: '10:00 - 22:30' },
  { id: 'c5', name: '清真食堂 · 西区', location: '西区操场边', openHours: '07:00 - 20:00' },
];

export const MOCK_WINDOWS: IWindow[] = [
  { id: 'w1', canteenId: 'c1', name: '川香小碗菜', cuisine: '川菜', avgPrice: 14, rating: 4.6, queueMinutes: 8, recommendIndex: 92 },
  { id: 'w2', canteenId: 'c1', name: '平价盖饭', cuisine: '家常', avgPrice: 13, rating: 4.4, queueMinutes: 5, recommendIndex: 85 },
  { id: 'w3', canteenId: 'c2', name: '麻辣香锅', cuisine: '川渝', avgPrice: 22, rating: 4.6, queueMinutes: 15, recommendIndex: 90 },
  { id: 'w4', canteenId: 'c2', name: '黄焖鸡米饭', cuisine: '鲁菜', avgPrice: 17, rating: 4.7, queueMinutes: 6, recommendIndex: 94 },
  { id: 'w5', canteenId: 'c2', name: '东北大锅菜', cuisine: '东北', avgPrice: 16, rating: 4.2, queueMinutes: 7, recommendIndex: 78 },
  { id: 'w6', canteenId: 'c3', name: '手工面档', cuisine: '面食', avgPrice: 14, rating: 4.5, queueMinutes: 10, recommendIndex: 88 },
  { id: 'w7', canteenId: 'c3', name: '饺子云吞', cuisine: '面食', avgPrice: 14, rating: 4.3, queueMinutes: 6, recommendIndex: 82 },
  { id: 'w8', canteenId: 'c4', name: '烧烤炸串', cuisine: '烧烤', avgPrice: 18, rating: 4.1, queueMinutes: 12, recommendIndex: 75 },
  { id: 'w9', canteenId: 'c4', name: '奶茶轻食', cuisine: '饮品轻食', avgPrice: 12, rating: 4.4, queueMinutes: 9, recommendIndex: 83 },
  { id: 'w10', canteenId: 'c4', name: '韩式拌饭', cuisine: '韩式', avgPrice: 20, rating: 4.3, queueMinutes: 11, recommendIndex: 80 },
  { id: 'w11', canteenId: 'c5', name: '兰州拉面', cuisine: '清真面食', avgPrice: 13, rating: 4.5, queueMinutes: 4, recommendIndex: 87 },
  { id: 'w12', canteenId: 'c5', name: '清真小炒', cuisine: '清真', avgPrice: 15, rating: 4.2, queueMinutes: 6, recommendIndex: 79 },
];

export const MOCK_DISHES: IDish[] = [
  { id: 'd1', windowId: 'w1', canteenId: 'c1', name: '麻婆豆腐盖饭', price: 13, rating: 4.5, tasteScore: 4.6, portionScore: 4.3, valueScore: 4.7, recommendCount: 128, tags: ['下饭', '麻辣', '性价比高'], trend: 'up', trendDelta: 0.2, heat: 86, category: 'rice', taste: 'spicy', description: '嫩豆腐配肉末，花椒麻味正，汤汁拌米饭一绝。' },
  { id: 'd2', windowId: 'w1', canteenId: 'c1', name: '回锅肉盖饭', price: 16, rating: 4.6, tasteScore: 4.7, portionScore: 4.4, valueScore: 4.4, recommendCount: 156, tags: ['分量足', '咸香'], trend: 'stable', heat: 92, category: 'rice', taste: 'savory', description: '五花肉煸出油，配青蒜郫县豆瓣，锅气足。' },
  { id: 'd3', windowId: 'w1', canteenId: 'c1', name: '鱼香肉丝盖饭', price: 14, rating: 4.4, tasteScore: 4.5, portionScore: 4.3, valueScore: 4.5, recommendCount: 98, tags: ['酸甜', '下饭'], trend: 'stable', heat: 70, category: 'rice', taste: 'savory', description: '胡萝卜丝木耳肉丝，鱼香汁调得正，不辣。' },
  { id: 'd4', windowId: 'w2', canteenId: 'c1', name: '番茄炒蛋盖饭', price: 10, rating: 4.7, tasteScore: 4.7, portionScore: 4.5, valueScore: 4.9, recommendCount: 203, tags: ['性价比高', '不辣', '家常'], trend: 'up', trendDelta: 0.1, heat: 95, category: 'rice', taste: 'light', description: '酸甜口，鸡蛋给得多，10 块钱能吃饱。' },
  { id: 'd5', windowId: 'w2', canteenId: 'c1', name: '红烧排骨饭', price: 18, rating: 4.5, tasteScore: 4.6, portionScore: 4.4, valueScore: 4.2, recommendCount: 87, tags: ['肉多', '软烂'], trend: 'stable', heat: 66, category: 'rice', taste: 'savory', description: '排骨炖得脱骨，酱汁浓稠偏甜。' },
  { id: 'd6', windowId: 'w2', canteenId: 'c1', name: '青椒肉丝盖饭', price: 12, rating: 4.3, tasteScore: 4.3, portionScore: 4.4, valueScore: 4.5, recommendCount: 76, tags: ['家常', '实惠'], trend: 'stable', heat: 55, category: 'rice', taste: 'savory', description: '中规中矩的上班族选择，肉丝给得不少。' },
  { id: 'd7', windowId: 'w3', canteenId: 'c2', name: '麻辣香锅（单人份）', price: 22, rating: 4.6, tasteScore: 4.7, portionScore: 4.5, valueScore: 4.3, recommendCount: 189, tags: ['麻辣', '料足', '排队久'], trend: 'up', trendDelta: 0.3, heat: 98, category: 'stirfry', taste: 'spicy', description: '自己选菜称重，藕片午餐肉毛肚必点，微辣就够劲。' },
  { id: 'd8', windowId: 'w3', canteenId: 'c2', name: '冒菜', price: 18, rating: 4.4, tasteScore: 4.5, portionScore: 4.3, valueScore: 4.4, recommendCount: 92, tags: ['热乎', '麻辣'], trend: 'stable', heat: 72, category: 'soup', taste: 'spicy', description: '比火锅快，汤底是牛油的，适合一个人吃。' },
  { id: 'd9', windowId: 'w3', canteenId: 'c2', name: '干锅土豆片', price: 15, rating: 3.2, tasteScore: 3.4, portionScore: 2.8, valueScore: 3.0, recommendCount: 34, tags: ['价格偏贵', '分量少', '最近偏咸'], trend: 'down', trendDelta: -0.9, heat: 40, category: 'stirfry', taste: 'spicy', description: '近期反馈油偏大、盐放得不稳，分量比以前少。' },
  { id: 'd10', windowId: 'w4', canteenId: 'c2', name: '黄焖鸡米饭', price: 16, rating: 4.8, tasteScore: 4.8, portionScore: 4.7, valueScore: 4.6, recommendCount: 267, tags: ['必吃', '分量足', '入味'], trend: 'up', trendDelta: 0.2, heat: 99, category: 'rice', taste: 'savory', description: '鸡腿肉配香菇青椒，汤汁拌饭灵魂，永远排队前三。' },
  { id: 'd11', windowId: 'w4', canteenId: 'c2', name: '黄焖排骨饭', price: 19, rating: 4.5, tasteScore: 4.6, portionScore: 4.4, valueScore: 4.3, recommendCount: 103, tags: ['肉多'], trend: 'stable', heat: 68, category: 'rice', taste: 'savory', description: '比黄焖鸡贵 3 块，排骨块大，但没鸡肉入味。' },
  { id: 'd12', windowId: 'w4', canteenId: 'c2', name: '香辣鸡公煲', price: 21, rating: 3.4, tasteScore: 3.5, portionScore: 3.6, valueScore: 3.1, recommendCount: 41, tags: ['排队久', '口味不稳', '偏贵'], trend: 'down', trendDelta: -0.7, heat: 45, category: 'soup', taste: 'spicy', description: '高峰时段等 20 分钟以上，有时咸有时淡。' },
  { id: 'd13', windowId: 'w5', canteenId: 'c2', name: '地三鲜盖饭', price: 14, rating: 4.3, tasteScore: 4.4, portionScore: 4.3, valueScore: 4.4, recommendCount: 78, tags: ['酱香', '下饭'], trend: 'stable', heat: 58, category: 'stirfry', taste: 'savory', description: '茄子土豆青椒，传统东北味，略油。' },
  { id: 'd14', windowId: 'w5', canteenId: 'c2', name: '锅包肉饭', price: 18, rating: 4.2, tasteScore: 4.3, portionScore: 4.1, valueScore: 4.0, recommendCount: 65, tags: ['酸甜', '偶尔吃'], trend: 'stable', heat: 52, category: 'rice', taste: 'sweet', description: '外壳酥脆，但放凉了就软，建议现买现吃。' },
  { id: 'd15', windowId: 'w6', canteenId: 'c3', name: '重庆小面', price: 13, rating: 4.3, tasteScore: 4.4, portionScore: 4.2, valueScore: 4.4, recommendCount: 134, tags: ['麻辣', '筋道'], trend: 'stable', heat: 80, category: 'noodle', taste: 'spicy', description: '碱水面劲道，花生芽榨菜配齐，油辣子香。' },
  { id: 'd16', windowId: 'w6', canteenId: 'c3', name: '番茄鸡蛋面', price: 12, rating: 4.7, tasteScore: 4.7, portionScore: 4.5, valueScore: 4.8, recommendCount: 176, tags: ['不辣', '汤鲜', '性价比高'], trend: 'up', trendDelta: 0.1, heat: 90, category: 'noodle', taste: 'light', description: '番茄熬出沙，汤底酸甜，适合不想吃辣的日子。' },
  { id: 'd17', windowId: 'w6', canteenId: 'c3', name: '红烧牛肉面', price: 18, rating: 4.5, tasteScore: 4.6, portionScore: 4.4, valueScore: 4.3, recommendCount: 112, tags: ['肉大块', '汤浓'], trend: 'stable', heat: 74, category: 'noodle', taste: 'savory', description: '牛肉给四五块，炖得烂，汤头厚重。' },
  { id: 'd18', windowId: 'w6', canteenId: 'c3', name: '酸辣粉', price: 11, rating: 4.2, tasteScore: 4.3, portionScore: 4.0, valueScore: 4.4, recommendCount: 89, tags: ['开胃', '酸辣'], trend: 'stable', heat: 60, category: 'noodle', taste: 'spicy', description: '红薯粉爽滑，醋味足，女生点得比较多。' },
  { id: 'd19', windowId: 'w7', canteenId: 'c3', name: '猪肉白菜饺子（15个）', price: 14, rating: 4.3, tasteScore: 4.4, portionScore: 4.3, valueScore: 4.3, recommendCount: 95, tags: ['现包', '多汁'], trend: 'stable', heat: 63, category: 'noodle', taste: 'savory', description: '现包的饺子，皮薄馅足，蘸醋绝配。' },
  { id: 'd20', windowId: 'w7', canteenId: 'c3', name: '鲜肉云吞面', price: 13, rating: 4.2, tasteScore: 4.2, portionScore: 4.1, valueScore: 4.3, recommendCount: 58, tags: ['汤清'], trend: 'stable', heat: 48, category: 'noodle', taste: 'light', description: '云吞个小馅鲜，汤底清淡，适合早餐。' },
  { id: 'd21', windowId: 'w8', canteenId: 'c4', name: '烤肉串套餐（10串）', price: 20, rating: 4.2, tasteScore: 4.3, portionScore: 4.2, valueScore: 4.0, recommendCount: 121, tags: ['晚上', '解馋'], trend: 'stable', heat: 78, category: 'bbq', taste: 'savory', description: '牛羊肉串现烤，孜然辣椒面给得猛，晚自习后刚需。' },
  { id: 'd22', windowId: 'w8', canteenId: 'c4', name: '炸鸡排饭', price: 15, rating: 3.1, tasteScore: 3.0, portionScore: 3.5, valueScore: 3.2, recommendCount: 47, tags: ['最近油不好', '偏咸', '不推荐'], trend: 'down', trendDelta: -1.1, heat: 38, category: 'bbq', taste: 'savory', description: '近期反馈炸油反复使用，鸡排颜色发深，慎点。' },
  { id: 'd23', windowId: 'w8', canteenId: 'c4', name: '烤冷面', price: 10, rating: 4.4, tasteScore: 4.5, portionScore: 4.0, valueScore: 4.5, recommendCount: 73, tags: ['新品', '酸甜', '夜宵'], trend: 'up', trendDelta: 0.4, heat: 76, category: 'snack', taste: 'sweet', description: '本周新上的档口，加肠加蛋 12，酸甜口地道。' },
  { id: 'd24', windowId: 'w9', canteenId: 'c4', name: '珍珠奶茶', price: 9, rating: 4.3, tasteScore: 4.3, portionScore: 4.2, valueScore: 4.4, recommendCount: 158, tags: ['不齁甜', '平价'], trend: 'stable', heat: 85, category: 'drink', taste: 'sweet', description: '三分糖刚好，珍珠有嚼劲，比连锁便宜一半。' },
  { id: 'd25', windowId: 'w9', canteenId: 'c4', name: '鸡胸肉沙拉', price: 14, rating: 4.2, tasteScore: 4.1, portionScore: 4.2, valueScore: 4.0, recommendCount: 52, tags: ['健身', '轻食', '不辣'], trend: 'stable', heat: 44, category: 'snack', taste: 'light', description: '减脂期午餐，酱汁自选，量够女生吃。' },
  { id: 'd26', windowId: 'w9', canteenId: 'c4', name: '酸奶水果捞', price: 12, rating: 4.5, tasteScore: 4.6, portionScore: 4.2, valueScore: 4.4, recommendCount: 69, tags: ['新品', '清爽', '夏天'], trend: 'up', trendDelta: 0.5, heat: 71, category: 'dessert', taste: 'sweet', description: '本周新品，水果每天现切，酸奶底不腻。' },
  { id: 'd27', windowId: 'w10', canteenId: 'c4', name: '石锅拌饭', price: 17, rating: 4.3, tasteScore: 4.4, portionScore: 4.3, valueScore: 4.2, recommendCount: 88, tags: ['锅巴香', '拌开好吃'], trend: 'stable', heat: 67, category: 'rice', taste: 'savory', description: '底部有锅巴，加个溏心蛋完美，辣酱自己加。' },
  { id: 'd28', windowId: 'w10', canteenId: 'c4', name: '部队火锅（单人）', price: 25, rating: 4.1, tasteScore: 4.2, portionScore: 4.0, valueScore: 3.8, recommendCount: 44, tags: ['新品', '略贵', '两人更划算'], trend: 'up', trendDelta: 0.2, heat: 56, category: 'soup', taste: 'spicy', description: '本月新上，一个人吃有点贵，适合拼单。' },
  { id: 'd29', windowId: 'w11', canteenId: 'c5', name: '牛肉拉面', price: 14, rating: 4.5, tasteScore: 4.6, portionScore: 4.3, valueScore: 4.5, recommendCount: 142, tags: ['汤清', '快', '不排队'], trend: 'stable', heat: 82, category: 'noodle', taste: 'light', description: '汤是牛骨熬的，面可拉粗细，赶时间首选。' },
  { id: 'd30', windowId: 'w12', canteenId: 'c5', name: '牛肉夹馍', price: 8, rating: 4.2, tasteScore: 4.3, portionScore: 3.9, valueScore: 4.4, recommendCount: 61, tags: ['早餐', '顶饱', '便宜'], trend: 'stable', heat: 50, category: 'snack', taste: 'savory', description: '馍酥脆，牛肉给得实在，配拉面是经典套餐。' },
];

export const MOCK_REVIEWS: IReview[] = [
  { id: 'r1', dishId: 'd10', user: '饭搭子_小周', avatarHue: 12, rating: 5, tasteScore: 5, portionScore: 5, valueScore: 4, waitMinutes: 5, content: '鸡腿肉真的嫩，香菇吸满汤汁，我每周至少吃三次。', tags: ['分量足', '入味'], createdAt: '2026-10-28T12:10:00', isSample: true },
  { id: 'r2', dishId: 'd10', user: '干饭人阿凯', avatarHue: 200, rating: 5, tasteScore: 5, portionScore: 4, valueScore: 5, waitMinutes: 8, content: '汤汁拌饭我能吃两碗，建议加一份土豆。', tags: ['下饭'], createdAt: '2026-10-29T18:30:00', isSample: true },
  { id: 'r3', dishId: 'd7', user: '今天吃什么', avatarHue: 320, rating: 5, tasteScore: 5, portionScore: 5, valueScore: 4, waitMinutes: 18, content: '必点毛肚、藕片、午餐肉，微辣刚好。', tags: ['料足', '排队久'], createdAt: '2026-10-28T19:00:00', isSample: true },
  { id: 'r4', dishId: 'd4', user: '北区老学姐', avatarHue: 90, rating: 5, tasteScore: 5, portionScore: 5, valueScore: 5, waitMinutes: 3, content: '10 块钱还要啥自行车，鸡蛋给得比别家多一倍。', tags: ['性价比高', '不辣'], createdAt: '2026-10-29T11:45:00', isSample: true },
  { id: 'r5', dishId: 'd16', user: '食堂测评君', avatarHue: 45, rating: 5, tasteScore: 5, portionScore: 4, valueScore: 5, waitMinutes: 6, content: '番茄是真的熬出沙了，不是番茄酱兑水。', tags: ['汤鲜'], createdAt: '2026-10-27T12:20:00', isSample: true },
  { id: 'r6', dishId: 'd9', user: '赶课的小李', avatarHue: 210, rating: 2, tasteScore: 2, portionScore: 1, valueScore: 2, waitMinutes: 10, content: '15 块就薄薄几片土豆，油得发亮。', tags: ['价格偏贵', '分量少'], createdAt: '2026-10-29T13:00:00', isSample: true },
  { id: 'r7', dishId: 'd22', user: '减脂中的阿珍', avatarHue: 280, rating: 1, tasteScore: 1, portionScore: 3, valueScore: 2, waitMinutes: 12, content: '鸡排颜色深得不自然，咬开一股油耗味。', tags: ['不推荐'], createdAt: '2026-10-28T20:00:00', isSample: true },
  { id: 'r8', dishId: 'd12', user: '重口味学长', avatarHue: 0, rating: 2, tasteScore: 2, portionScore: 3, valueScore: 2, waitMinutes: 25, content: '等了 25 分钟，咸到发苦，看厨师心情。', tags: ['排队久', '口味不稳'], createdAt: '2026-10-29T19:30:00', isSample: true },
];
