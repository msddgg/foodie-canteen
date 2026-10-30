# 饭搭子 · 校园食堂点评推荐平台

校园版大众点评：菜品评分、排队时间、避雷指南、AI 推荐。

## 在线预览

https://wcnu5n3j447h.doubao.link/app/app_17h26syuuvw

## 技术栈

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- shadcn/ui
- lucide-react
- react-router-dom v7
- LocalStorage 持久化

## 本地运行

```bash
npm install
npm run dev
```

> 注：`src/components/ui/` 下的 shadcn/ui 组件由妙搭脚手架生成，未随仓库上传；如需完整工程，从妙搭模板拷贝该目录或 `npx shadcn add` 按需生成。

## 功能

- 首页：搜索、今日推荐/热门/新品、避雷预警、食堂分类
- 食堂探索：价格/评分/排队时间/菜系筛选
- 菜品详情：分项评分（口味/分量/性价比）、用户评价、点赞收藏
- 排行榜：6 个榜单（热门/好评/性价比/必吃/隐藏/避雷）
- 避雷指南：评分下降菜品预警
- 发布评价：星级评分+标签+文字评价，实时入库
- AI 帮我选：按预算/口味/排队时间推荐 3 道菜
- 饭搭子随机抽：选择困难症一键抽签
