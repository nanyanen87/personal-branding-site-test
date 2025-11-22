// リソースプール - 全リソースを細かく分割して格納
// 各ページで必要なリソースだけimportして使用可能

// 基本情報
export const name = "NaN";
export const role = "Backend Engineer";
export const roleSecondary = "Platform Developer";
export const fullRole = "Backend Engineer / Platform Developer";

// プロフィール
export const bio = "京都大学 総合人間学部 卒。Link-U Technologies にて LAMP/Linux 環境で4年半フルスタック開発に従事。現在は Supabase / Cloudflare / TypeScript を軸にしたプラットフォーム開発に注力。";

// リンク
export const companyLink = {
  label: "Company",
  url: "https://technologies.link-u.co.jp/company"
};

export const blogLink = {
  label: "Tech Blog",
  url: "https://zenn.dev/nanyanen"
};

export const githubLink = {
  label: "GitHub",
  url: "https://github.com/nanyanen87"
};

// スキル
export const skill_supabase = "Supabase";
export const skill_postgresql = "PostgreSQL";
export const skill_cloudflare = "Cloudflare Workers";
export const skill_typescript = "TypeScript";
export const skill_nodejs = "Node.js";
export const skill_rls = "RLS";
export const skill_r2 = "R2";

// コアスタック（配列形式）
export const coreStack = [
  skill_supabase,
  skill_postgresql,
  skill_cloudflare,
  skill_typescript,
  skill_nodejs,
  skill_rls,
  skill_r2
];

// 専門分野
export const expertise_dataModel = "データモデル設計（正規化・非正規化戦略）";
export const expertise_authorization = "権限/公開状態/RLS の整合性ある設計";
export const expertise_costOptimization = "Cloudflare Workers を中心としたコスト最適化";
export const expertise_logging = "ログ基盤・アラート設計（R2 / DO バッファリング）";
export const expertise_platform = "SaaS の土台となる基盤層設計";

export const expertiseList = [
  expertise_dataModel,
  expertise_authorization,
  expertise_costOptimization,
  expertise_logging,
  expertise_platform
];

// 強み
export const strengths = "ややこしい問題を構造で理解し、分解して最適解を組み立てる。冷静にコストと価値のトレードオフを見る。要件から逆算して全体設計を描く（データモデル → API → 認証認可 → 運用）。";

// 現在のフォーカス
export const focus_platform = "Supabase + Cloudflare を軸にした軽量プラットフォーム設計";
export const focus_observability = "オブザーバビリティ / トレーシング / ログ運用";
export const focus_storage = "ストレージ運用（R2 / KV）とキャッシュ戦略";
export const focus_ai = "AI を組み込んだ開発環境整備（Claude Code / Cursor）";

export const currentFocusList = [
  focus_platform,
  focus_observability,
  focus_storage,
  focus_ai
];

// セクション見出し
export const section_profile = "Profile";
export const section_coreStack = "Core Stack";
export const section_expertise = "Expertise";
export const section_strengths = "Strengths";
export const section_currentFocus = "Current Focus";

// その他のメタデータ
export const defaultTitle = "NaN – Backend Engineer / Platform Developer";
export const lang = "ja";
